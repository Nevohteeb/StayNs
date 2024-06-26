import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const Results = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Properties.json');
        const fetchedProperties = response.data;

        // Filter the properties based on the formData criteria
        const filteredProperties = fetchedProperties.filter(property => {
          const matchesLocation = !formData.location || formData.location.trim() === "" || property.location.toLowerCase().includes(formData.location.toLowerCase());

          // Check if property has at least the number of bedrooms specified in formData
          const matchesBedrooms = !formData.bedrooms || parseInt(property.bedrooms) >= parseInt(formData.bedrooms);

          // Check if property has at least the number of bathrooms specified in formData
          const matchesBathrooms = !formData.bathrooms || parseInt(property.bathrooms) >= parseInt(formData.bathrooms);

          let matchesStayDuration = true;
          if (formData.startDate && formData.endDate) {
            const startDate = new Date(formData.startDate);
            const endDate = new Date(formData.endDate);
            const stayDuration = (endDate - startDate) / (1000 * 60 * 60 * 24); // Difference in days

            matchesStayDuration = stayDuration >= property.minStay && stayDuration <= property.maxStay;
          }

          return matchesLocation && matchesBedrooms && matchesBathrooms && matchesStayDuration;
        });

        setProperties(filteredProperties);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching the properties data:', error);
      }
    };

    fetchData();
  }, [formData]); // Dependency on formData ensures useEffect runs when formData changes

  const handleBackButton = () => {
    navigate(-1);
  }

  const handleReadMore = (e) => {
    const propertyId = e.target.getAttribute('data-id');
    navigate(`/property/${propertyId}`);
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <>
      <p className='back-button' onClick={handleBackButton}><i className="fa-solid fa-arrow-left"></i> Back</p>
      <div id="results">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <div className="property" key={index}>
              <img src={property.image} alt={property.name}/>
              <div className="property-details">
                <h3>{property.name}</h3>
                <p>{property.location}</p>
                <p>{property.bedrooms} Bedrooms</p>
                <p>{property.bathrooms} Bathrooms</p>
                <p>Min Stay: {property.minStay} nights</p>
                <p>Max Stay: {property.maxStay} nights</p>
                <button className="read-more" data-id={property.id} onClick={handleReadMore}>See More</button>
              </div>
            </div>
          ))
        ) : (
          <p id="no-results">No Results found<br></br>Please try again</p>
        )}
      </div>
    </>
  );
}

export default Results;
