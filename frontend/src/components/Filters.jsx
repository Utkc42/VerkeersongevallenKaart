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
          setUniqueYears(data.jaar.map((year) => String(year)));
          setUniqueMonths(data.maand.map((month) => String(month)));
          setUniqueTimes(data.tijd.map((time) => String(time)));
          setUniqueRegions(data.regio.map((region) => String(region)));
          setUniqueProvinces(
            data.provincie.map((province) => String(province))
          );
          setUniqueCities(data.stad.map((city) => String(city)));
          setUniqueCrossroads(
            data.kruispunt.map((crossroad) => String(crossroad))
          );
          setUniqueBuildingAreas(
            data.bebouwingsgebied.map((area) => String(area))
          );
        } else {
          console.error("Expected an object with filter arrays but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching filter data:", error);
      });
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilterCriteria((prev) => ({ ...prev, [filterName]: value }));
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
          onChange={handleFilterChange}
          filterName={filterName}
        />
      ))}
    </div>
  );
};

const Dropdown = ({ label, id, items, onChange, filterName }) => (
  <div className="my-2">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-cyber-green"
    >
      {label}:
    </label>
    <select
      id={id}
      className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyber-blue focus:border-cyber-blue block w-full p-2.5"
      onChange={(e) => onChange(filterName, e.target.value)}
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
  filterName: PropTypes.string.isRequired,
};

export default Filters;
