'use client'
import { useTonAddress } from '@tonconnect/ui-react'
import React, { useContext } from 'react'
import '@/modules/Address/address.css'
import Link from 'next/link';
import { useHeaderContext } from '../context';
export default function Address() {
    const {visible, setVisible} = useHeaderContext();
    const userFriendlyAddress = useTonAddress();
    const rawAddress= useTonAddress(false)
  return (
    userFriendlyAddress && (
        <div className='AddressBox'>
        <span className='Address'>{userFriendlyAddress}</span>
        <br />
        <Link href={'/transaction'} onClick={()=>{setVisible(true)}}>Перевод</Link>
        </div>
    )
  )
}
