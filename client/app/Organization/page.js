"use client"
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/logo.png';

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
    router.push(`/Causes/${orgId}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
        <Image style={{ width: '400px', height: '175px' }} src={logo} alt="..." />
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%',textAlign: 'left', }}>
        <thead>
          <tr>
            <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px"}}>Organization Image</th>
            <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px"}}>Organization Name</th>
            <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px"}}>Organization Description</th>
            <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px"}}>Category</th>
            <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px"}}>Email</th>
            <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px"}}>RIB</th>
            <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org, i) => (
            <tr key={i} style={{borderBottom:"solid",borderColor:"#ddd",borderWidth:"3px"}}>
              <td style={{borderRight:"solid",borderColor:"#ddd",borderWidth:"3px"}}>
                <img
                  src={org.orgImg}
                  alt={org.orgName}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }}
                />
              </td>
              <td style={{borderRight:"solid",borderColor:"#ddd",borderWidth:"3px",textAlign:"center"}}>{org.orgName}</td>
              <td style={{borderRight:"solid",borderColor:"#ddd",borderWidth:"3px",textAlign:"center"}}>{org.description}</td>
              <td style={{borderRight:"solid",borderColor:"#ddd",borderWidth:"3px",textAlign:"center"}}>{org.category}</td>
              <td style={{borderRight:"solid",borderColor:"#ddd",borderWidth:"3px",textAlign:"center"}}>{org.orgEmail}</td>
              <td style={{borderRight:"solid",borderColor:"#ddd",borderWidth:"3px",textAlign:"center"}}>{org.rip}</td>
              <td style={{borderRight:"solid",borderColor:"#ddd",borderWidth:"3px",textAlign:"center"}}>
                <button onClick={() => handleShowCauses(org.orgId)}>Show Causes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
