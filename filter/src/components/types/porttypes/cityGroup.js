import React, { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import {
  DEPARTURE_PORT,
  ARRIVAL_PORT,
} from "../../../constants/filtertypeconstants";

export default function CityGroup(props) {
  const [labelName, setLabelName] = useState();
  const [labelType, setLabelType] = useState();
  const [enabled, setEnabled] = useState(true);
  const [textStatus, setTextStatus] = useState(false);
  const [switchId, setSwitchId] = useState();
  const [allowEdit, setAllowEdit] = useState(true); 

  useEffect(() => {
    if (props.name === DEPARTURE_PORT) {
      setLabelName(DEPARTURE_PORT)
      setSwitchId("departureCityGroup");
    } else if (props.name === ARRIVAL_PORT) {
      setLabelName(ARRIVAL_PORT)
      setSwitchId("arrivalCityGroup");
    }
    if (props.type === "City Group") {
      setLabelType(props.type);
    }
  }, [props]);
useEffect(
  ()=>{
    if(props.cityGroupToDisplay!==""){
      setLabelName(props.name === "Departure Port" ? "Departure Port": "Arrival Port");
      setLabelType("City Group");
      setEnabled(true);
    }
  }
,[props.cityGroupToDisplay]);
  const closeCityGroup = () => {
    props.closeAirport(labelName,labelType);
    setLabelName("");
    setLabelType("");
  };
  const enableSwitchChange = (e) => {
    setEnabled(e.target.checked);
    setTextStatus(!e.target.checked);
  };
  if (labelType === "City Group") {
    return (
      <div className="filter__input">
        <div className="filter__input-title">
          <div className="filter__label">
            <span>{labelName}</span>
            <span>&nbsp;&gt;&nbsp;</span>
            <span>{labelType}</span>
          </div>
          <div className="filter__control">
            <Form.Check
              type="switch"
              id={switchId}
              label=""
              defaultChecked={enabled}
              onClick={(e) => {
                enableSwitchChange(e);
                if (labelName === DEPARTURE_PORT) {
                  props.departureCityGroupEnabledSave(e.target.checked);
                } else if (labelName === ARRIVAL_PORT) {
                  props.arrivalCityGroupEnabledSave(e.target.checked);
                }
              }}
            />
            <FontAwesomeIcon
              icon={faTimes}
              type="button"
              onClick={(e) => {
                closeCityGroup();
                props.clearValues({name:props.name, type:"City Group"});
              }}
            />
          </div>
        </div>
        <div className="displayFlex">
          <input
            disabled={textStatus}
            type="text"
            className="form-control"
            onChange={(e) => {
              setAllowEdit(false);
              props.valueToSave(e.target.value, labelName, labelType, enabled);
            }}
            value= { allowEdit && props.cityGroupToDisplay !=="" ? 
            props.cityGroupToDisplay : null}
          ></input>
        </div>
      </div>
    );
  } else if (props.isReset === true) {
    return <div></div>;
  } else return <div></div>;
}
