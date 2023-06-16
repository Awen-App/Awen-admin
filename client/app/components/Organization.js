"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Organization = () => {
  const [organizations, setOrganizations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('http://localhost:3001/organizations');
      setOrganizations(response.data);
    } catch (error) {
      console.log('Error fetching organizations:', error);
    }
  };

  const handleShowCauses = (orgId) => {
    router.push(`/causes/${orgId}`);
  };

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Organization Image</th>
          <th>Organization Name</th>
          <th>Organization Description</th>
          <th>Category</th>
          <th>Email</th>
          <th>RIB</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {organizations.map((org, i) => (
          <tr key={i}>
            <td>
              <img
                src={org.orgImg}
                alt={org.orgName}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }}
              />
            </td>
            <td>{org.orgName}</td>
            <td>{org.description}</td>
            <td>{org.category}</td>
            <td>{org.orgEmail}</td>
            <td>{org.rip}</td>
            <td>
              <button onClick={() => handleShowCauses(org.id)}>Show Causes</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  header: {
    background: '#f2f2f2',
    padding: '8px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  row: {
    borderBottom: '1px solid #ddd',
  },
  cell: {
    padding: '8px',
  },
  button: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    background: 'orange',
    color: 'white',
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

export default Organization;
