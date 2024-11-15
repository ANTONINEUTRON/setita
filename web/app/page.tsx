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


      {/* FAQ Section */}
      {/* <div className=" w-full px-5">
        <section className="bg-w-50 py-10 w-full lg:w-1/2 mx-auto">
          <h2 className="text-2xl text-center text-b-900 font-bold mb-7">
            Frequently Asked Questions
          </h2>
          <div className="bg-w-600 bg-gray-400 py-5 px-10 rounded-lg text-black">
            <div className="collapse collapse-arrow border-b-2 border-b-200 rounded-none">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                How does milestone-based crowdfunding work?
              </div>
              <div className="collapse-content text-b-400">
                Anyone with a valid project and a plan...
              </div>
            </div>

            <div className="collapse collapse-arrow border-b-2 border-b-200 mt-4 rounded-none">
              <input type="checkbox" />
              <div className="collapse-title font-semibold text-black">
                How do I donate
              </div>
              <div className="collapse-content text-b-400">
                Anyone with a valid project and a plan...
              </div>
            </div>

            <div className="collapse collapse-arrow border-b-2 border-b-200 mt-4 rounded-none">
              <input type="checkbox" />
              <div className="collapse-title font-semibold text-black">
                What type of campaigns are eligible
              </div>
              <div className="collapse-content text-b-400">
                Anyone with a valid project and a plan...
              </div>
            </div>

            <div className="collapse collapse-arrow border-b-2 border-b-200 mt-4 rounded-none">
              <input type="checkbox" />
              <div className="collapse-title font-semibold text-black">
                Who can start a campaign
              </div>
              <div className="collapse-content text-b-400">
                Anyone with a valid project and a plan...
              </div>
            </div>

            <div className="collapse collapse-arrow border-b-2 border-b-200 mt-4 rounded-none">
              <input type="checkbox" />
              <div className="collapse-title font-semibold text-black">
                Who can start a campaign?
              </div>
              <div className="collapse-content text-b-400">
                Anyone with a valid project and a plan...
              </div>
            </div>
          </div>
        </section>
      </div> */}
      
      {/* CTA 2 */}
      <div className="flex justify-center items-center py-12 bg-[#c3B2D0] text-black">
        <div className="flex flex-col items-center text-center w-full gap-5 lg:w-1/2">
          <h2 className="text-2xl font-semibold  text-b-900">
            Ready to fund your vision?
          </h2>
          <div className="text-b-400">
            Setita connects your ideas with supporters through milestone-based
            crowdfunding, helping bring your project to life with trust and
            transparency.
          </div>
          <div className="flex   w-full gap-4 mt-8">
            <Link href={"/app/dn"} className="w-full  bg-secondary text-white py-2  rounded-md">
                Start Donating
            </Link>
            <Link href={"/app/"} className="w-full  bg-primary text-white py-2  rounded-md">
                Explore Campaigns
            </Link>
          </div>
        </div>
      </div>

      {/*Stay updated*/}
      {/* <section className="flex justify-center items-center   py-12">
        <div className="flex flex-col items-center text-center max-w-xl w-full">
          <h2 className="text-2xl font-bold text-b-900 mb-4">Stay Updated!</h2>
          <p className="text-lg text-b-400 mb-6">
            Subscribe to Setita for the latest updates on campaigns, features,
            and platform news. Let’s build something impactful together.
          </p>
          <div className="flex gap-4 w-full">
            <input
              type="text"
              placeholder="Enter your email address"
              className="w-[70%] px-4 py-3 border-2 border-gray-300 bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-[30%] py-3 text-b-900 border-[0.5px] border-gray-300 outline-none">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}


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