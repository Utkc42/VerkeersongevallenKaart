import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Filters = ({ setFilterCriteria }) => {
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueTimes, setUniqueTimes] = useState([]);
  const [uniqueRegions, setUniqueRegions] = useState([]);
  const [uniqueProvinces, setUniqueProvinces] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueCrossroads, setUniqueCrossroads] = useState([]);
  const [uniqueBuildingAreas, setUniqueBuildingAreas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/filters")
      .then((response) => {
        const data = response.data;
        if (data) {
          setUniqueYears(data.jaar.map(String));
          setUniqueMonths(data.maand.map(String));
          setUniqueTimes(data.tijd.map(String));
          setUniqueRegions(data.regio.map(String));
          setUniqueProvinces(data.provincie.map(String));
          setUniqueCities(data.stad.map(String));
          setUniqueCrossroads(data.kruispunt.map(String));
          setUniqueBuildingAreas(data.bebouwingsgebied.map(String));
        } else {
          console.error("Expected an object with filter arrays but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching filter data:", error);
      });
  }, []);

  const handleFilterChange = (filterName, event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFilterCriteria((prev) => ({
      ...prev,
      [filterName]: selectedOptions,
    }));
  };

  return (
    <div className="space-y-4">
      {[
        { label: "Jaar", items: uniqueYears, filterName: "jaar" },
        { label: "Maand", items: uniqueMonths, filterName: "maand" },
        { label: "Tijd", items: uniqueTimes, filterName: "tijd" },
        { label: "Regio", items: uniqueRegions, filterName: "regio" },
        { label: "Provincie", items: uniqueProvinces, filterName: "provincie" },
        { label: "Stad", items: uniqueCities, filterName: "stad" },
        {
          label: "Kruispunt",
          items: uniqueCrossroads,
          filterName: "kruispunt",
        },
        {
          label: "Bebouwingsgebied",
          items: uniqueBuildingAreas,
          filterName: "bebouwingsgebied",
        },
      ].map(({ label, items, filterName }) => (
        <Dropdown
          key={filterName}
          label={label}
          id={`${filterName}-select`}
          items={items}
          onChange={(e) => handleFilterChange(filterName, e)}
          multiple={true}
        />
      ))}
    </div>
  );
};

const Dropdown = ({ label, id, items, onChange, multiple }) => (
  <div className="my-2">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-cyber-green"
    >
      {label}:
    </label>
    <select
      multiple={multiple}
      id={id}
      className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyber-blue focus:border-cyber-blue block w-full p-2.5"
      onChange={onChange}
      size={multiple ? 3 : undefined}
    >
      {items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

Filters.propTypes = {
  setFilterCriteria: PropTypes.func.isRequired,
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default Filters;
