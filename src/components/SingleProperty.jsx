import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SingleProperty = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Properties.json');
        setProperties(response.data);
        const numericId = Number(id);
        const foundProperty = response.data.find(p => p.id === numericId);
        setProperty(foundProperty);
      } catch (error) {
        console.error('Error fetching the properties data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBackButton = () => {
    navigate(-1);
  }

  if (!property) {
    return <div>Loading...</div>;
  }
  return (
    <>
        <p className='back-button' onClick={handleBackButton}><i className="fa-solid fa-arrow-left"></i> Back</p>
        <div className='single-container'>
            <img src={property.image} alt="" className='single-image' />
            <div className="single-property-details">
                <h1>{property.name}</h1>
                <p className='location-text'>{property.location}</p>
                <p className='sub-title'>${property.price.toFixed(2)} NZD per night</p>
                <p dangerouslySetInnerHTML={{__html: property.description}}/>
                <p className='sub-title'>Ammenities:</p>
                <div className='single-property-ammenities'>
                    <p><i class="fa-solid fa-bed"></i>{property.bedrooms} </p>
                    <p><i class="fa-solid fa-bath"></i>{property.bathrooms}</p>
                    {property.wifi && <p><i class="fa-solid fa-wifi"></i><span>Wifi</span></p>}
                    {property.familyFriendly && <p><i class="fa-solid fa-baby"></i> Family Friendly</p>}
                    {property.offStreetParking && <p><i class="fa-solid fa-car"></i> Off Street Parking</p>}
                </div>    
            </div> 
        </div>
    </>
  )
}

export default SingleProperty
