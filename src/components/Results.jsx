import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Results = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Properties.json');
        const fetchedProperties = response.data;
        console.log('Fetched data:', fetchedProperties);  // Debug log

        // Filter the properties based on the formData criteria
        const filteredProperties = fetchedProperties.filter(property => {
          const matchesLocation = !formData.location || formData.location.trim() === "" || property.location.toLowerCase().includes(formData.location.toLowerCase());
          const matchesBedrooms = formData.bedrooms ? property.bedrooms === parseInt(formData.bedrooms) : true;
          const matchesBathrooms = formData.bathrooms ? property.bathrooms === parseInt(formData.bathrooms) : true;

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
      } catch (error) {
        console.error('Error fetching the properties data:', error);
      }
    };

    fetchData();
  }, [formData]);

  const handleBackButton = () => {
    navigate(-1);
  }

  const handleReadMore = (e) => {
    const propertyId = e.target.getAttribute('data-id');
    navigate(`/property/${propertyId}`);
  }

  return (
    <>
      <p className='back-button' onClick={handleBackButton}><i className="fa-solid fa-arrow-left"></i> Back</p>
      <div id="results">
        {(properties) && properties.length > 0 ? (
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
          <p>No Results found</p>
        )}
      </div>
    </>
  );
}

export default Results;
