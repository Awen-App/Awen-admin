"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from '../../public/logo.png';
const Donor = () => {
  const [data, setData] = useState(null);
  const[tracker,setTracker] = useState(false);
  useEffect(() => {
    fetchData();
  }, [tracker]);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3001/users/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleDeleteEmail = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteu/${id}`);
      setTracker(!tracker)
     console.log('sarhane');
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  
  return (
    <div style={styles.container}>
         <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
        <Image style={{ width: '400px', height: '175px' }} src={logo} alt="..." />
      </div>
      <h1 style={styles.header}>Donor List</h1>
      {data ? (
        <ul style={styles.list}>
          {data.map((item) => (
            <li
              key={item.id}
              style={{
                ...styles.item,
               
              }}
            >
              <span style={styles.emailLabel}>email:</span> {item.email}
              <button
                style={styles.deleteButton}
                onClick={() => handleDeleteEmail(item.userId)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.loading}>Loading data...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
    maxWidth: '500px',
  },
  item: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    color: '#555',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
  },
  emailLabel: {
    fontWeight: 'bold',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    background: 'red',
    color: 'white',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  loading: {
    fontStyle: 'italic',
    color: '#888',
  },
};

export default Donor;
