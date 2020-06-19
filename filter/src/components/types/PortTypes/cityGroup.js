import React, { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { DEPARTURE_PORT,ARRIVAL_PORT} from "../../../constants/filtertypeconstants";

export default function CityGroup(props) {
  const [labelName, setLabelName] = useState();
  const [labelType, setLabelType] = useState();
  const [enabled, setEnabled] = useState(true);
  const [textStatus, setTextStatus] = useState(false)
  const [switchId,setSwitchId]=useState();

  useEffect(() => {
    if(props.name===DEPARTURE_PORT){
      setSwitchId("departureCityGroup")
    }
    else
    if(props.name===ARRIVAL_PORT){
      setSwitchId("arrivalCityGroup")
    }
    if (props.type === "City Group") {
      setLabelName(props.name);
      setLabelType(props.type);
    }
  }, [props]);

  const closeCityGroup = () => {
    setLabelName("");
    setLabelType("");
  };
  const enableSwitchChange = (e) => {
    setEnabled(e.target.checked);
    if (!enabled) {
      setTextStatus(false)
    }
    else {
      setTextStatus(true)
    }
  }
  if (labelType === "City Group") {
    return (
      <React.Fragment>
        <div className="displayFlex">
          <div className="alignLeft">
            <p>{labelName}</p>
            <span>&nbsp;&gt;&nbsp;</span>
            <p>{labelType}</p>
          </div>
          <div className="marginLeft">
          <Form.Check type="switch" id={switchId} label="" checked={enabled} onClick={(e) => {
              enableSwitchChange(e); 
              if(labelName===DEPARTURE_PORT){props.departureCityGroupEnabledSave(e.target.checked);}
              else if (labelName===ARRIVAL_PORT){props.arrivalCityGroupEnabledSave(e.target.checked);}
            }} />
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                closeCityGroup();
                props.clearValues();
              }}
            />
          </div>
        </div>
        <div className="displayFlex">
          <input
          disable={textStatus}
            type="text"
            placeholder="filter"
            className="form-control"
            onChange={(e) => {
              props.valueToSave(e, labelName, labelType);
            }}
          ></input>
        </div>
      </React.Fragment>
    );
  } else return <div></div>;
}
