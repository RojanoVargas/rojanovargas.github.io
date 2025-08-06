import { useState, useEffect } from "react";
import "./Autocomplete.css";

const fetchStationsData = async () => {
  const response = await fetch(`https://605c94c36d85de00170da8b4.mockapi.io/stations`);
  const data = await response.json();
  return data.filter((item) => !item.name.includes("station-name"));
};

const Autocomplete = ({ onSelectStation }) => {
  const [searchStation, setSearchStation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch all stations once on mount
    fetchStationsData().then(setApiData).catch(console.error);
  }, []);

  useEffect(() => {
    if (searchStation.trim() === "" || !showDropdown) {
      setSearchResults([]);
    } else {
      const results = apiData.filter((item) =>
        item.name.toLowerCase().includes(searchStation.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchStation, apiData, showDropdown]);

  const handleInputChange = (e) => {
    setSearchStation(e.target.value);
    setShowDropdown(true);
  };

  const handleSelect = (item) => {
    setSearchStation(item.name);
    setSearchResults([]);
    setShowDropdown(false);
    onSelectStation(item);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={searchStation}
        onChange={handleInputChange}
        placeholder="Search stations..."
        aria-label="Station search"
        className="autocomplete-input"
      />
      {showDropdown && searchResults.length > 0 && (
        <ul className="autocomplete-list">
          {searchResults.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              tabIndex={0}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;