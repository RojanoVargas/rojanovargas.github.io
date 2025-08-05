import { useState, useEffect } from "react";

const fetchStationsData = async () => {
    const response = await fetch(
        `https://605c94c36d85de00170da8b4.mockapi.io/stations`
    );
    const data = await response.json();
    console.log("in in the beningin ", data );
    const filteredData = data.filter((item) => 
        !item.name.includes('station-name')
    );
    return filteredData;
};

const Autocomplete = () => {
    const [searchStation, setSearchStation] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchStationsData().then(setApiData);
    }, []);

    useEffect(() => {
        if (searchStation.trim() === "") {
            setSearchResults([]);
        } else {
            const results = apiData.filter((item) =>
                item.name.toLowerCase().includes(searchStation.toLowerCase())
            );
            setSearchResults(results);
        }
    }, [searchStation, apiData]);

    const handleInputChange = (e) => {
        setSearchStation(e.target.value);
    };

    return (
        <div>
            <input type="text" value={searchStation} onChange={handleInputChange} />
            <ul>
                {searchResults.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Autocomplete;