import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCity,
  FaTrafficLight,
  FaBuilding,
  FaRoad,
  FaCloudSun,
  FaSun,
} from "react-icons/fa";
import {
  BEBOUWINGSGEBIED,
  REGIO,
  KRUISPUNT,
  wegtype,
  WEER,
  WEERLICHT,
} from "../components/DataConstants";
import { formatTime } from "../components/TimeFormat";

const Filters = forwardRef(({ setFilterCriteria }, ref) => {
  const [options, setOptions] = useState({
    jaarMaand: [],
    tijd: [],
    regio: [],
    stad: [],
    kruispunt: [],
    bebouwingsgebied: [],
    wegtype: [],
    weer: [],
    weerlicht: [],
  });
  const [selectedOptions, setSelectedOptions] = useState({
    jaarMaand: null,
    tijd: null,
    regio: null,
    stad: null,
    kruispunt: null,
    bebouwingsgebied: null,
    wegtype: null,
    weer: null,
    weerlicht: null,
  });

  useImperativeHandle(ref, () => ({
    resetFilters() {
      setSelectedOptions({
        jaarMaand: null,
        tijd: null,
        regio: null,
        stad: null,
        kruispunt: null,
        bebouwingsgebied: null,
        wegtype: null,
        weer: null,
        weerlicht: null,
      });
      setFilterCriteria({});
    },
  }));

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/filters")
      .then((response) => {
        const data = response.data;
        if (data) {
          setOptions({
            jaarMaand: data.jaarMaand.map((value) => ({
              value: `${value.maand.toString().padStart(2, "0")}/${value.jaar}`,
              label: `${value.maand.toString().padStart(2, "0")}/${value.jaar}`,
            })),
            tijd: data.tijd.map((value) => ({
              value,
              label: formatTime(value),
            })),
            regio: Object.keys(REGIO).map((key) => ({
              value: key,
              label: REGIO[key],
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
            wegtype: Object.keys(wegtype).map((key) => ({
              value: parseInt(key, 10),
              label: wegtype[key],
            })),
            weer: Object.keys(WEER).map((key) => ({
              value: parseInt(key, 10),
              label: WEER[key],
            })),
            weerlicht: Object.keys(WEERLICHT).map((key) => ({
              value: parseInt(key, 10),
              label: WEERLICHT[key],
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

  const handleFilterChange = (filterName, selectedOption) => {
    const value = selectedOption ? selectedOption.value : null;
    setSelectedOptions((prev) => ({
      ...prev,
      [filterName]: selectedOption,
    }));
    setFilterCriteria((prev) => {
      const newCriteria = { ...prev };
      if (value === null) {
        delete newCriteria[filterName];
      } else {
        newCriteria[filterName] = value;
      }
      return newCriteria;
    });
  };

  const filterItems = [
    {
      label: "Maand/Jaar",
      items: options.jaarMaand,
      filterName: "jaarMaand",
      icon: <FaCalendarAlt className="inline mr-2" />,
    },
    {
      label: "Tijd",
      items: options.tijd,
      filterName: "tijd",
      icon: <FaClock className="inline mr-2" />,
    },
    {
      label: "Regio",
      items: options.regio,
      filterName: "regio",
      icon: <FaMapMarkerAlt className="inline mr-2" />,
    },
    {
      label: "Stad",
      items: options.stad,
      filterName: "stad",
      icon: <FaCity className="inline mr-2" />,
    },
    {
      label: "Kruispunt",
      items: options.kruispunt,
      filterName: "kruispunt",
      icon: <FaTrafficLight className="inline mr-2" />,
    },
    {
      label: "Bebouwingsgebied",
      items: options.bebouwingsgebied,
      filterName: "bebouwingsgebied",
      icon: <FaBuilding className="inline mr-2" />,
    },
    {
      label: "Wegtype",
      items: options.wegtype,
      filterName: "wegtype",
      icon: <FaRoad className="inline mr-2" />,
    },
    {
      label: "Weer",
      items: options.weer,
      filterName: "weer",
      icon: <FaCloudSun className="inline mr-2" />,
    },
    {
      label: "Weerlicht",
      items: options.weerlicht,
      filterName: "weerlicht",
      icon: <FaSun className="inline mr-2" />,
    },
  ];

  return (
    <div className="p-4 border border-gray-600 rounded-md bg-gray-800">
      <div className="space-y-2">
        {filterItems.map(({ label, items, filterName, icon }) => (
          <Dropdown
            key={filterName}
            label={label}
            id={`${filterName}-select`}
            items={items}
            icon={icon}
            onChange={(selectedOption) =>
              handleFilterChange(filterName, selectedOption)
            }
            value={selectedOptions[filterName]}
          />
        ))}
      </div>
    </div>
  );
});

Filters.displayName = "Filters";

const Dropdown = ({ label, id, items, icon, onChange, value }) => (
  <div className="my-2">
    <label htmlFor={id} className="block mb-2 text-base font-medium text-white">
      {icon}
      {label}:
    </label>
    <Select
      name={id}
      options={items}
      onChange={onChange}
      className="basic-single-select"
      classNamePrefix="select"
      isClearable
      value={value}
    />
  </div>
);

Filters.propTypes = {
  setFilterCriteria: PropTypes.func.isRequired,
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  icon: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default Filters;
