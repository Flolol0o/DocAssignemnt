import React, { useState } from 'react';

const FetchDataComponent = () => {
  const [memberId, setMemberId] = useState('');
  const [memberDetails, setMemberDetails] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setMemberId(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`localhost:8080/members/${memberId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch member details');
      }
      const data = await response.json();
      setMemberDetails(data);
      setError('');
    } catch (error) {
      setMemberDetails(null);
      setError('WebApi provided by our teacher is not working or We dont know how to use it :(');
    }
  };
  
  return (
    <div>
      <h2>Fetch Member Details</h2>
      <div>
        <label htmlFor="memberId">Member ID:</label>
        <input
          type="text"
          id="memberId"
          value={memberId}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {memberDetails && (
        <div>
          <h3>Member Details</h3>
          <p>ID: {memberDetails.id}</p>
          <p>Name: {memberDetails.name}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default FetchDataComponent;
