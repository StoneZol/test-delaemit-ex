'use client'
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react'
import React, { useContext, useEffect, useState } from 'react'
import { TonClient,fromNano } from "@ton/ton";
import '@/modules/Header/header.css'
import { getHttpEndpoint} from '@orbs-network/ton-access';
import Link from 'next/link';
import { useHeaderContext} from '../context';


export default function Header() {
  const [balance, setBalance] = useState('');

  const {visible, setVisible} = useHeaderContext()

  const wallet = useTonWallet();

  useEffect(() => {
    const fetchBalance = async () =>{
      try {
        const endpoint = await getHttpEndpoint({ network: "testnet" });
        const client = new TonClient({ endpoint });
        const newBalance = await client.getBalance(wallet.account.address);
        setBalance(fromNano(newBalance))
      } catch (error) {
      }
    }
    fetchBalance()
    setInterval(()=>{
      fetchBalance()
    }, 5000)
  }, [wallet]);
  return (
    <div className='header'>
    {wallet && <span>Баланс: {balance}</span>} 
    {visible ? (<Link href='/' onClick={()=>{setVisible(false)}}>Назад</Link>):(< TonConnectButton/>)}
    </div>
  )
}