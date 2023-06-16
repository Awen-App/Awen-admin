"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const Causes = () => {
  const [acceptedCauses, setAcceptedCauses] = useState([]);
  const [nonAcceptedCauses, setNonAcceptedCauses] = useState([]);

  useEffect(() => {
    fetchCauses();
  }, []);

  const fetchCauses = async () => {
    try {
      const acceptedResponse = await axios.get('http://localhost:3001/accepted');
      setAcceptedCauses(acceptedResponse.data);

      const nonAcceptedResponse = await axios.get('http://localhost:3001/nonaccepted');
      setNonAcceptedCauses(nonAcceptedResponse.data);
    } catch (error) {
      console.log('Error fetching causes:', error);
    }
  };

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={styles.header}>Accepted Causes</th>
            <th style={styles.header}>Nonaccepted Causes</th>
          </tr>
        </thead>
        <tbody>
          {acceptedCauses.map((cause, i) => (
            <tr key={i}>
              <td style={styles.cell}>{cause.name}</td>
              <td style={styles.cell}></td>
            </tr>
          ))}
          <tr>
            <td style={styles.row} colSpan="2"></td>
          </tr>
          {nonAcceptedCauses.map((cause, i) => (
            <tr key={i}>
              <td style={styles.cell}></td>
              <td style={styles.cell}>{cause.name}</td>
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
    verticalAlign: 'top',
  },
  listItem: {
    marginBottom: '8px',
  },
};

export default Causes;
