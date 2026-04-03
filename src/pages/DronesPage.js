import React from 'react';
import './DronesPage.css';

const droneData = [
  { id: 1, name: 'Drone A', status: 'Active', battery: '85%', weightCapacity: '5kg' },
  { id: 2, name: 'Drone B', status: 'Maintenance', battery: '60%', weightCapacity: '10kg' },
  { id: 3, name: 'Drone C', status: 'Active', battery: '90%', weightCapacity: '8kg' },
];

const DronesPage = () => {
  return (
    <div className="drones-page">
      <h1>Drone Fleet Management</h1>
      <div className="drone-cards">
        {droneData.map(drone => (
          <div key={drone.id} className="drone-card">
            <h2>{drone.name}</h2>
            <p>Status: {drone.status}</p>
            <p>Battery: {drone.battery}</p>
            <p>Weight Capacity: {drone.weightCapacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DronesPage;
