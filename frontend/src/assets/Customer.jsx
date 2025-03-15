import React from 'react';
import './Customer.css';

const ClientsSection = () => {
  const clients = [
    { name: 'Reliance', logo: 'c1.png' },
    { name: 'Adani', logo: 'c2.png' },
    { name: 'Sekura', logo: 'c3.png' },
    { name: 'DAE', logo: 'c1.png' },
    { name: 'Indian Railways', logo: 'c2.png' },
    { name: 'NHAI', logo: 'c3.png' },
    { name: 'OMC', logo: 'c1.png' },
    { name: 'OBCC', logo: 'c2.png' },
    { name: 'Transrail', logo: 'c3.png' },
    { name: 'Aditya Birla Hindalco', logo: 'c1.png' },
    { name: 'Aditya Birla Renewables', logo: 'c2.png' },
  ];

  return (
    <div className="clients-section">
      <h1 className="clients-title">Our Customers</h1>
      <div className="clients-slider-container">
        <div className="clients-slider">
          {[...clients, ...clients].map((client, index) => (
            <div className="client-logo" key={index}>
              <img src={client.logo} alt={client.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsSection;
