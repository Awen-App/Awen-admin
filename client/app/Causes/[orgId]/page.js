"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'
import logo from "../../../public/logo.png"
import Image from 'next/image';

const Causes = () => {
  const [acceptedCauses, setAcceptedCauses] = useState([]);
  const params = useParams()
  console.log(params.orgId)
  
  const fetchCauses = async () => {
    try {
      const acceptedResponse = await axios.get(`http://localhost:3001/causes/${params.orgId}`);
      setAcceptedCauses(acceptedResponse.data);
      console.log(acceptedResponse.data)
    } catch (error) {
      console.log('Error fetching causes:', error);
    }
  };
  
  useEffect(() => {
    fetchCauses();
  }, []);
  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
        <Image style={{ width: '400px', height: '175px' }} src={logo} alt="..." />
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
          <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px", textAlign: 'left'}}>Cause Name</th>
          <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px", textAlign: 'left'}}>Organization Image</th>
          <th style={{borderBlockEnd:"solid",padding:"30px",borderColor:"#ddd",borderWidth:"5px", textAlign: 'left'}}>Category</th>
          </tr>
        </thead>
        <tbody>
          {acceptedCauses.map((cause, i) => (
            <tr key={i}>
              <td style={styles.cell}>{cause.title}</td>
              <td style={styles.cell}><img
                  src={cause.causeImg
                  }
                  alt=""
                  style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '30px' }}
                /></td>
                <td style={styles.cell}>{cause.causeCategory}</td>
            </tr>
          ))}
          <tr>
            <td style={styles.row} colSpan="4"></td>
          </tr>
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
    verticalAlign: 'top',
    textAlign: 'left',
  },
  listItem: {
    marginBottom: '8px',
  },
};

export default Causes;
