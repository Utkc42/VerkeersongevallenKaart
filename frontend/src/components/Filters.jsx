import { useState, useEffect } from "react";
import axios from "axios";

const Filters = () => {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/accidents")
      .then((response) => {
        setAccidents(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      {/* Voorbeeld van het tonen van een dropdown gevuld met data */}
      <select>
        {accidents.map((accident) => (
          <option key={accident.id} value={accident.JAAR}>
            {accident.JAAR}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
