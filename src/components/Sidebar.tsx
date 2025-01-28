import Dashboard from '@/app/dashboard/dashboard/page'
import Organization from '@/app/dashboard/organization/page'
import Payment from '@/app/dashboard/payment/page'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='h-screen bg-[#304251] text-white p-20 max-w-[260px] rounded-r-[40px] flex flex-col justify-between'>
      <div className='flex flex-col gap-5 '>

        <Link href="/dashboard/dashboard">
        Dashboard
        </Link>
        <Link href="/dashboard/organization">
        Organization
        </Link>
        <Link href="/dashboard/payment">
        payment
        </Link>
        <Link href="/dashboard/transaction-history">
        Transaction History
        </Link>
      </div>
      <div>
        <h1>logout</h1>
      </div>
    </div>
  )
}

export default Sidebar
