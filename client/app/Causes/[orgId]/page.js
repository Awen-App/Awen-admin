"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'


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
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={styles.header}>Accepted Causes</th>
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
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }}
                /></td>
                <td style={styles.cell}>{cause.causeDescription}</td>
            </tr>
          ))}
          <tr>
            <td style={styles.row} colSpan="2"></td>
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
  },
  listItem: {
    marginBottom: '8px',
  },
};

export default Causes;
