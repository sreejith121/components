import React, { useState, useEffect } from "react";
import { ARRIVAL_PORT } from "../../constants/filtertypeconstants";
import Airport from "./porttypes/airport";
import AirportGroup from "./porttypes/airportGroup";
import City from "./porttypes/city";
import CityGroup from "./porttypes/cityGroup";
import Country from "./porttypes/country";

let airportToDisplay = "", airportGroupToDisplay = "",
  cityToDisplay = "", cityGroupToDisplay = "", countryToDisplay = "";
const ArrivalPort = (props) => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [enabled, setEnabled] = useState();
  useEffect(() => {
    if (props.name) {
      if (props.isReset === true) {
        setName("");
        setType("");
      } else if (props.name === ARRIVAL_PORT) {
        setName(props.name);
        setType(props.type);
      }

    }
  }, [props]);
  useEffect(
    () => {

      if (props.filterInfoToShow !== undefined) {
        props.filterInfoToShow.filter((item) => item.column === "Arrival Port" &&
          item.types !== undefined && Array.isArray(item.types)).map(item => (
            item.types.map(subItem =>
              subItem.column === "Airport" ? airportToDisplay = subItem.value :
                subItem.column === "Airport Group" ? airportGroupToDisplay = subItem.value :
                  subItem.column === "City" ? cityToDisplay = subItem.value :
                    subItem.column === "City Group" ? cityGroupToDisplay = subItem.value :
                      subItem.column === "Country" ? countryToDisplay = subItem.value : "")
          ));
        //condition necessary for showing filter resutls in right Drawer
        props.filterInfoToShow.forEach(item => {
          if (item.column === ARRIVAL_PORT && item.types !== undefined) {
            item.types.forEach(type => {
              setName(item.column)
              setType(type.column)
              setEnabled(true)
              props.PortvalueToSave(type.value, item.column, type.column, true)
            })
          }
        })
      }
    }
    , []);
  const closeAirport = () => {
    setType('');
  }
  if (name === ARRIVAL_PORT) {
    return (
      <React.Fragment>
        <Airport
          name={name}
          type={type}
          enabled={enabled}
          clearValues={(resetStateVariableMap) => props.clearValues(resetStateVariableMap)}
          valueToSave={props.PortvalueToSave}
          arrivalAirportEnabledSave={props.arrivalAirportEnabledSave}
          isReset={props.isReset}
          airportToDisplay={airportToDisplay}
          clearAirport={props.clearArrivalPort}
          closeAirport={closeAirport}
        />
        <AirportGroup
          name={name}
          type={type}
          clearValues={props.clearValues}
          valueToSave={props.PortvalueToSave}
          arrivalAirportGroupEnabledSave={props.arrivalAirportGroupEnabledSave}
          isReset={props.isReset}
          airportGroupToDisplay={airportGroupToDisplay}
          closeAirport={closeAirport}
        />
        <City
          name={name}
          type={type}
          clearValues={props.clearValues}
          valueToSave={props.PortvalueToSave}
          arrivalCityEnabledSave={props.arrivalCityEnabledSave}
          isReset={props.isReset}
          cityToDisplay={cityToDisplay}
          closeAirport={closeAirport}
        />
        <CityGroup
          name={name}
          type={type}
          clearValues={props.clearValues}
          valueToSave={props.PortvalueToSave}
          arrivalCityGroupEnabledSave={props.arrivalCityGroupEnabledSave}
          isReset={props.isReset}
          cityGroupToDisplay={cityGroupToDisplay}
          closeAirport={closeAirport}
        />
        <Country
          name={name}
          type={type}
          clearValues={props.clearValues}
          valueToSave={props.PortvalueToSave}
          arrivalCountryEnabledSave={props.arrivalCountryEnabledSave}
          isReset={props.isReset}
          countryToDisplay={countryToDisplay}
          closeAirport={closeAirport}
        />
      </React.Fragment>
    );
  } else {
    return <div></div>;
  }
};

export default ArrivalPort;
