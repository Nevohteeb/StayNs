import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { toast } from 'react-hot-toast';

const EmailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property } = location.state;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: property.email,
        property_name: property.name,
        property_id: property.id
      };

      await emailjs.send(
        'service_mw3y09g', // Replace with your EmailJS service ID
        'template_zol0a9h', // Replace with your EmailJS template ID
        templateParams,
        'Y9VP0-3or7exioUHq'
      );

      setSending(false);
      toast.success('Email sent successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Error sending email');
      toast.error('Error sending email');
      setSending(false);
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  }

  return (
    <>
        <p className='back-button' onClick={handleBackButton}><i className="fa-solid fa-arrow-left"></i> Back</p>
        <div className="email-form-container">
        <h2>Enquire About:<br></br>{property.name}</h2>
        <form onSubmit={handleSubmit}>
            <div className="filter">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="filter">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="filter">
                <label>Message:</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
                
            <button type="submit" disabled={sending}>Send</button>
        </form>
        {error && <p>{error}</p>}
        </div>
    </>
  );
};

export default EmailForm;
