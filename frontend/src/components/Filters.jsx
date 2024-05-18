import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  wegtype,
  WEER,
  BEBOUWINGSGEBIED,
  PROVINCIE,
  WEERLICHT,
  REGIO,
  KRUISPUNT,
  WEGCONDITIE,
  VERKEERSSLACHTOFFERS,
  VOERTUIGTYPE1,
  VOERTUIGTYPE2,
  BOTSINGTYPE,
  OBSTAKELS,
} from "../components/DataConstants";

const Filters = ({ setFilterCriteria }) => {
  const [options, setOptions] = useState({
    jaar: [],
    maand: [],
    tijd: [],
    regio: [],
    provincie: [],
    stad: [],
    kruispunt: [],
    bebouwingsgebied: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/filters")
      .then((response) => {
        const data = response.data;
        if (data) {
          setOptions({
            jaar: data.jaar.map((value) => ({ value, label: value })),
            maand: data.maand.map((value) => ({ value, label: value })),
            tijd: data.tijd.map((value) => ({ value, label: value })),
            regio: Object.keys(REGIO).map((key) => ({
              value: key,
              label: REGIO[key],
            })),
            provincie: Object.keys(PROVINCIE).map((key) => ({
              value: key,
              label: PROVINCIE[key],
            })),
            stad: data.stad.map((value) => ({ value, label: value })),
            kruispunt: Object.keys(KRUISPUNT).map((key) => ({
              value: key,
              label: KRUISPUNT[key],
            })),
            bebouwingsgebied: Object.keys(BEBOUWINGSGEBIED).map((key) => ({
              value: key,
              label: BEBOUWINGSGEBIED[key],
            })),
          });
        } else {
          console.error("Expected an object with filter arrays but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching filter data:", error);
      });
  }, []);

  const handleFilterChange = (filterName, selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFilterCriteria((prev) => ({
      ...prev,
      [filterName]: values,
    }));
  };

  return (
    <div className="space-y-4">
      {[
        { label: "Jaar", items: options.jaar, filterName: "jaar" },
        { label: "Maand", items: options.maand, filterName: "maand" },
        { label: "Tijd", items: options.tijd, filterName: "tijd" },
        { label: "Regio", items: options.regio, filterName: "regio" },
        {
          label: "Provincie",
          items: options.provincie,
          filterName: "provincie",
        },
        { label: "Stad", items: options.stad, filterName: "stad" },
        {
          label: "Kruispunt",
          items: options.kruispunt,
          filterName: "kruispunt",
        },
        {
          label: "Bebouwingsgebied",
          items: options.bebouwingsgebied,
          filterName: "bebouwingsgebied",
        },
      ].map(({ label, items, filterName }) => (
        <Dropdown
          key={filterName}
          label={label}
          id={`${filterName}-select`}
          items={items}
          onChange={(selectedOptions) =>
            handleFilterChange(filterName, selectedOptions)
          }
        />
      ))}
    </div>
  );
};

const Dropdown = ({ label, id, items, onChange }) => (
  <div className="my-2">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-cyber-green"
    >
      {label}:
    </label>
    <Select
      isMulti
      name={id}
      options={items}
      onChange={onChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  </div>
);

Filters.propTypes = {
  setFilterCriteria: PropTypes.func.isRequired,
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filters;
