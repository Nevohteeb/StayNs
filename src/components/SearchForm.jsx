import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const SearchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    bedrooms: '1',
    bathrooms: '1',
    startDate: null,
    endDate: null,
  });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Properties.json');
        console.log('Fetched data:', response.data);  // Debug log
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching the properties data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/results', { state: { formData } });
  };

  const uniqueLocations = [...new Set(properties.map(property => property.location))].sort();

  return (
    <form className="filter-container" onSubmit={handleSubmit}>
      <div className="filter">
        <label htmlFor="location">Location</label>
        <select
          name="location"
          id="location"
          className="full-width-select"
          value={formData.location}
          onChange={handleChange}
        >
          <option value="">Any</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="filter">
        <label htmlFor="bedrooms">Bedrooms Min:</label>
        <select
          name="bedrooms"
          id="bedrooms"
          className="full-width-select"
          value={formData.bedrooms}
          onChange={handleChange}
          required
        >
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
        </select>
      </div>

      <div className="filter">
        <label htmlFor="bathrooms">Bathrooms Min.:</label>
        <select
          name="bathrooms"
          id="bathrooms"
          className="full-width-select"
          value={formData.bathrooms}
          onChange={handleChange}
          required
        >
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4 or more</option>
        </select>
      </div>

      <div className="filter">
        <label htmlFor="startDate">Start Date:</label>
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => handleDateChange('startDate', date)}
          dateFormat="dd/MM/yyyy"
          className="full-width-select"
          placeholderText="Select Start Date"
          required
        />
      </div>

      <div className="filter">
        <label htmlFor="endDate">End Date:</label>
        <DatePicker
          selected={formData.endDate}
          onChange={(date) => handleDateChange('endDate', date)}
          dateFormat="dd/MM/yyyy"
          className="full-width-select"
          placeholderText="Select End Date"
          required
        />
      </div>

      <button type="submit" id="searchBtn">Search Rooms</button>

      <div id="error-message"></div>
    </form>
  );
};

export default SearchForm;
