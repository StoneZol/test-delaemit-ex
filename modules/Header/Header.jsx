'use client'
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react'
import React, { useContext, useEffect, useState } from 'react'
import { TonClient,fromNano } from "@ton/ton";
import '@/modules/Header/header.css'
import { getHttpEndpoint} from '@orbs-network/ton-access';
import Link from 'next/link';
import { useHeaderContext } from '../context';


export default function Header() {
  const [balance, setBalance] = useState('');

  const {visible, setVisible} = useHeaderContext()

  const wallet = useTonWallet();

  useEffect(() => {
    const fetchBalance = async () =>{
      try {
        const endpoint = await getHttpEndpoint({ network: "testnet" });
        console.log('endpoint', endpoint);
        const client = new TonClient({ endpoint });
        console.log('клиент', client);
        const newBalance = await client.getBalance(wallet.account.address);
        console.log("balance:", newBalance);
        setBalance(fromNano(newBalance))
        const walletContract = client.open(wallet);
        const seqno = await walletContract.getSeqno();
        console.log("seqno:", seqno);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
    fetchBalance()
  }, [wallet]);
  
  console.log('кошелек', wallet);
  return (
    <div className='header'>
    {wallet && <span>Баланс: {balance}</span>} 
    {visible ? (<Link href='/' onClick={()=>{setVisible(false)}}>Назад</Link>):(< TonConnectButton/>)}
    </div>
  )
}
