"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useFetch from '@/useFetch';
import logo from '../../public/logo.png'
const AllCauses=()=>{
    const { data: pending, error } = useFetch(
        'http://localhost:3001/getcauses',
          []
      );
      return (
        <div>
            <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
            <Image style={{ width: '450px', height: '175px', }} src={logo} alt='...'/>
          </div>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={styles.header } >Pending Causes</th>
                <th style={styles.header } ></th>
                <th style={styles.header } ></th>
                <th style={styles.header } ></th>
                <th style={styles.header } ></th>
              </tr>
          
            </thead>
            <tbody>
              {pending.map((cause, i) => (
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
          fontWeight: 'bold',
          justifyContent: 'center',
        },
        listItem: {
          marginBottom: '8px',
        },
        btn: {
         width: 20,
         height : 20,
        }, 
        logo : {
            justifyContent: 'center',
            height : "175px",
            display: 'flex',
            width: '400px'
        }
      };
      export default AllCauses