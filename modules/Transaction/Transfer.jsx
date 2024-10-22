'use client'
import React, { useState,useEffect } from 'react';
import '@/modules/Transaction/transfer.css';
import { useTonConnectUI, useTonWallet} from '@tonconnect/ui-react';
import {fromNano} from "@ton/ton";


function toBase64URL(input) {
  let base64 = input;
  base64 = base64.replace(/\+/g, '%').replace(/\//g, '%2F').replace(/=+$/, '%3D');
  return base64;
}


export default function Transfer() {
    const [address, setAddress] = useState('');
    const [timerOn, setTimerOn] = useState(false)
    const [ton, setTon] = useState(fromNano(1));
    const [hash, setHash] = useState(null);

    const wallet = useTonWallet();

    function handleAddressChange(e) {
        setAddress(e.target.value);
    }

    function handleTonChange(e) {
        setTon(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Адрес:', address);
        console.log('Сумма в TON:', ton);

    }
    const transaction = {
        validUntil: Date.now() + 5 * 60 * 1000,
        messages: [
            {
                address: address,
                amount: ton * 1000000000
            }
        ]
    };

    const [tonConnectUI, setOptions] = useTonConnectUI();

    const fetchTransaction = async () => {
        try {
            const result = await tonConnectUI.sendTransaction(transaction);
            console.log('резульатат',result);
            if (result){
              setTimerOn(true)
              const hash= await fetchHash();
              console.log('хеш ', hash.accounts[0].last_transaction_hash);
              console.log('хеш string', String(hash.accounts[0].last_transaction_hash));
              console.log('хеш в base64', toBase64URL(hash.accounts[0].last_transaction_hash));
              const newHash = String(hash.accounts[0].last_transaction_hash)
              console.log(newHash);
              if (newHash){
                setHash(newHash);
                setTimerOn(true); 
                const resulyOf= await fetchStatus(newHash)
                console.log(resulyOf);
              }
            }
        } catch (e) {
            console.error(e);
        }
    }

    const fetchHash = async () => {
      try{
        const response = await fetch(`https://testnet.toncenter.com/api/v3/accountStates?address=${wallet.account.address}`,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok){
          throw new Error(response.statusText)
        }

        const data = await response.json();
        console.log('data',data);
        return data
      } catch(error){
        console.log(error);
      }
    }

    const fetchStatus = async (lth)=>{
      try{
        const response = await fetch (`https://testnet.tonapi.io/v2/events/${toBase64URL(lth)}`, {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
          }
        })
        if (!response.ok){
          throw new Error(response.statusText)
        }

        const data = await response.json();
        if (data.actions[0].status='ok')
        {
          alert('Транзакция успешна')
        }
        console.log('data2',data);
        setTimerOn(false)
        return data
      } catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
      let interval;
      if (timerOn) {
          interval = setInterval(() => {
              if (hash) {
                  fetchStatus(hash);
              }
          }, 3000);
      }
      return () => clearInterval(interval);
  }, [timerOn, hash]);

  return (
    <div className='TransferBox'>
      <form className='TransferForm' onSubmit={handleSubmit}>
      <input
          type='number'
          placeholder='Сумма в нанотонах'
          value={ton}
          onChange={handleTonChange}
          required
        />
        <br />
        <input
          type="text"
          placeholder='Адрес кошелька'
          value={address}
          onChange={handleAddressChange}
          required
        />
        <br />
        <br />
        <button onClick={fetchTransaction}>Перевод</button>
      </form>
    </div>
  )
}

