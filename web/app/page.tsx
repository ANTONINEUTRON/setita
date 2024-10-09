import UnfurlBlink from '@/components/view_blink';
import WaitlistForm from '@/components/waitlist_form';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CustomButton from '@/components/buttons/custom_button';

export default function Page() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Header Section */}
        <header className=" bg-primary sticky">
          <div className="flex justify-between items-center p-4 container m-auto">
            <Image src="/brand/setita.png" width="400" height="150" alt={'setita_logo'} className="h-7 w-32"/>
          
            <GetStartedButton/>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-b from-primary to-secondary text-white py-20 px-2 md:px-0">
          <h1 className="text-4xl font-bold mb-4">Fundraising with Accountability</h1>
          <p className="max-w-xl mb-6">
            Milestone-Based Crowdfunding on Web3: Empowering Fundraisers to Build Donor Trust
          </p>
          {/* <Link href="/blink/view/">/ */}
          <Link href="https://dial.to/?action=solana-action%3Ahttps://setita.com/blink/create">
            <CustomButton text="Try out our Blink" />
          </Link>
          
        </section>
        
      </div>
      <section className='bg-secondary opacity-90 text-white flex flex-col items-center p-8'>
        <div className='font-bold text-2xl my-8'>HOW IT WORKS</div>
        <div className='grid grid-cols-1 md:grid-cols-3 text-black'>
          <HowItWorksItem
            titleNum='1'
            details='Fill in details of your fundraising campaign' />
          <HowItWorksItem
            titleNum='2'
            details='Create Campaign' />
          <HowItWorksItem
            titleNum='3'
            details='Share with your donors' />
        </div>
      </section>
      {/* About us */}
      <div className='flex flex-col justify-center items-center py-10 text-lg text-center px-2 md:px-0'>
        <div className='font-semibold text-2xl'>We are currently building and integrating other features</div>
        <div>Help us in achieving this lofty goal by Joining our waitlist</div>
        <div>
          <WaitlistForm/>
        </div>
      </div>
    </div>
    
  );
}


function GetStartedButton() {
  return (
    <div>
      <Link href="/app">
        <button className="px-6 py-2 bg-secondary text-white rounded hover:bg-blue-700">
          Get Started
        </button>
      </Link>
    </div>
  );
}

function HowItWorksItem({titleNum, details}:{
  titleNum: string,
  details: string,
}){
  return (
    <div className='flex flex-col items-center bg-white m-5 rounded-lg p-6'>
      <div className='bg-gradient-to-tr from-primary to-secondary text-white rounded-full px-2'>
        {titleNum}
      </div>
      <span className='mt-4 text-lg text-center'>
        {details}
      </span>
    </div>
  )
}