import React, { useEffect, useState } from 'react';

const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState([]);

  const fetchDeliveries = async () => {
    // Replace with your API endpoint
    const response = await fetch('https://api.example.com/deliveries');
    const data = await response.json();
    setDeliveries(data);
  };

  useEffect(() => {
    fetchDeliveries();
    const interval = setInterval(fetchDeliveries, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateDeliveryStatus = async (id) => {
    // Update delivery status to completed
    await fetch(`https://api.example.com/deliveries/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' }),
    });
    fetchDeliveries(); // Refresh the deliveries after update
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'flying':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return '';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Deliveries</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Drone</th>
            <th className="py-2">Destination</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td className="py-2">{delivery.id}</td>
              <td className="py-2">{delivery.drone}</td>
              <td className="py-2">{delivery.destination}</td>
              <td className="py-2">
                <span className={`badge ${getStatusBadgeColor(delivery.status)}`}>{delivery.status}</span>
              </td>
              <td className="py-2">
                {delivery.status !== 'completed' && (
                  <button onClick={() => updateDeliveryStatus(delivery.id)} className="px-4 py-2 bg-blue-500 text-white rounded">Mark as Completed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveriesPage;