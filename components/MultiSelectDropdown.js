"use client";
import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const MultiSelectDropdown = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = countryList().getData();

  const changeHandler = (value) => {
    // Limit the selection to 5 options
    if (props.check && value.length > 5) {
      return;
    }
    setSelectedOptions(value);
    props.setSelectedValues(value);
  };

  return (
    <Select
      style={{
        width: "12%",
        marginTop: "1rem",
        marginBottom: "1rem",
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "0.5rem",
        fontSize: "1rem",
        fontWeight: "500",
      }}
      options={options}
      value={props.value? props.value : selectedOptions}
      onChange={changeHandler}
      isMulti={props.check}
      placeholder="Select Country"
    />
  );
};

export default MultiSelectDropdown;
