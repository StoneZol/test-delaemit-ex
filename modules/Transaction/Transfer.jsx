'use client'
import React, { useState } from 'react';
import '@/modules/Transaction/transfer.css';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { fromNano} from "@ton/ton";

export default function Transfer() {
  const [address, setAddress] = useState('');
  const [ton, setTon] = useState(fromNano(1));

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
        amount: ton*1000000000
      },
    ],
  };

    const [tonConnectUI, setOptions] = useTonConnectUI();

  return (
    <div className='TransferBox'>
      <form className='TransferForm' onSubmit={handleSubmit}>
      <input
          type='number'
          placeholder='Сумма в нанотонах'
          value={ton}
          onChange={handleTonChange}
          min={fromNano(1)}
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
        <button onClick={() => tonConnectUI.sendTransaction(transaction)}>Перевод</button>
      </form>
    </div>
  )
}

