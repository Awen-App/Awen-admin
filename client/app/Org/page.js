"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import notif from '../../public/notif.png';
import noNotif from '../../public/noNotif.png';
import org from '../../public/Org.png';
import cause from '../../public/causes.png';
import useFetch from '@/useFetch';
import logo from '../../public/logo.png'
import './Org.css';

const Org = () => {
  const { data: organizations, error } = useFetch(
    'http://localhost:3001/organizations',
    []
  );
  const { data: pending, error: err } = useFetch(
    'http://localhost:3001/causenonaccepted',
    []
  );
  const { data: causes, error:er } = useFetch(
    'http://localhost:3001/getcauses',
    []
  );
  const route = useRouter();
  console.log(organizations.length);
  return (
    <div>
           <div style={{ display: 'flex', marginBottom: '1px', justifyContent: 'center' }}>
            <Image style={{ width: '450px', height: '175px', }} src={logo} alt='...'/>
          </div>
        <div className="notification">
        {pending.length ? (
          <div className="notif-container">
            <Image src={notif} style={{ height: '30px', width: '30px' }} onClick={() => route.push('/Pending')}/>
            <h4 className="notifnumber">{pending.length}</h4>
          </div>
        ) : (
          <Image src={noNotif} style={{ height: '30px', width: '30px' }} />
        )}
      </div>

<div class="wrapper">
  <div class="container">
    <div class="number">{organizations.length}</div>
    <h1 class="title">Number Of Organizations</h1>
    <button onClick={() => route.push('/Organization')} style={{ backgroundColor: "#ff6600",
    color: "#fff",
    border: "none",
    padding: "10px" ,
    borderRadius: "4px",
    fontSize: "16px"}}>
        See All Organizations
      </button>
  </div>

  <div class="container">
    <div class="number">{causes.length}</div>
    <h1 class="title">Number Of Causes</h1>
    <button onClick={() => route.push('/AllCauses')} style={{ backgroundColor: "#ff6600",
    color: "#fff",
    border: "none",
    padding: "10px" ,
    borderRadius: "4px",
    fontSize: "16px",
    width:200}}>
        See All Causes
      </button>
  </div>
</div>
<div>
<Image src={org} style={{ height: '300px', width: '400px' , marginLeft:200 , marginTop:50}} />
<Image src={cause} style={{ height: '300px', width: '400px' , marginLeft:250 , marginTop:50}} />
</div>

      
    </div>
  );
};

export default Org;