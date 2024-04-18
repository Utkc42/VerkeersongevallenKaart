import { useState } from "react";

const Filters = () => {
  const [language, setLanguage] = useState("nl"); // Default taal

  return (
    <div>
      <div>
        <button onClick={() => setLanguage("nl")}>Nederlands</button>
        <button onClick={() => setLanguage("fr")}>Français</button>
      </div>

      {language === "nl" && (
        <div>
          <h3>Filters</h3>

          <label htmlFor="gemeente-select">Gemeente/Stad:</label>
          <select id="gemeente-select">
            <option value="">Selecteer gemeente/stad</option>
            <option value=""></option>
          </select>
          <br />
          <br />

          <label htmlFor="typeOngeval-select">Ongeval Type:</label>
          <select id="jaar-select">
            <option value="">Selecteer ongeval yype</option>
            <option value="Auto">Auto</option>
            <option value="Bus">Bus</option>
            <option value="Fiets">Fiets</option>
          </select>

          <br />
          <br />
          <label htmlFor="jaar-select">Jaar:</label>
          <select id="jaar-select">
            <option value="">Kies een jaar</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>

          <br />
          <br />
          <label htmlFor="maand-select">Maand:</label>
          <select id="maand-select">
            <option value="">Selecteer een maand</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      )}
      {language === "fr" && (
        <div>
          <h3>Filtres</h3>

          <label htmlFor="municipalité-select">Municipalité/Ville:</label>
          <select id="gemeente-select">
            <option value="">Choisir municipalité/ville</option>
            <option value=""></option>
          </select>
          <br />
          <br />

          <label htmlFor="typeOngeval-select">Type accident:</label>
          <select id="jaar-select">
            <option value="">Choisir Type accident</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
          </select>

          <br />
          <br />
          <label htmlFor="jaar-select">Anée:</label>
          <select id="jaar-select">
            <option value="">Choisir une année</option>
            <option value="voiture">voiture</option>
            <option value="Velo">Velo</option>
            <option value="Piéton">Piéton</option>
          </select>

          <br />
          <br />
          <label htmlFor="mois-select">Mois:</label>
          <select id="mois-select">
            <option value="">Choisir une mois</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Filters;
