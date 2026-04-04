import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { useState } from 'react';

function Verify() {
     const [searchParams,setSearchParams] = useSearchParams();
     const success = searchParams.get('success');
     const orderId = searchParams.get('orderId');
     // console.log("Payment result received:", { success, orderId });

     const { url } = useContext(StoreContext);
     const navigate = useNavigate();

    
          const verifyPayment = async () => {
               try {
                    const response = await axios.post(url+"/api/order/verify", { success, orderId });
                    if (response.data.success) {
                         navigate('/myorders');
                    } else {
                         navigate('/');
                    }
               } catch (err) {
                    console.error('Payment verification failed:', err);
                    navigate('/');
               }
          };

           useEffect(() => {
            verifyPayment();
            }, [])

     return (
          <div className="verify">
               <div className="spinner" />
          </div>
     );
}

export default Verify;