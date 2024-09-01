import WaitlistForm from '@/components/ui/waitlist_form';
import Image from 'next/image';
import Link from 'next/link';

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
        <section className="relative flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-b from-primary to-secondary text-white py-20">
          <h1 className="text-4xl font-bold mb-4">Crowdfunding with Accountability</h1>
          <p className="max-w-xl mb-6">
            Milestone-Based Crowdfunding on Web3: Empowering Fundraisers to Build Donor Trust
          </p>
          <Link href="https://dial.to/?action=solana-action%3Ahttps://setita.com/blink/create">
            <button className="px-6 py-2 bg-gradient-to-tr from-primary to-secondary text-white rounded hover:bg-primary hover:shadow-2xl">
              Try out our Blink
            </button>
          </Link>
        </section>
      </div>
      {/* About us */}
      <div className='flex flex-col justify-center items-center py-10 text-lg'>
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
      <Link href="https://dial.to/?action=solana-action:https://setita.com/blink/create">
        <button className="px-6 py-2 bg-secondary text-white rounded hover:bg-blue-700">
          Get Started
        </button>
      </Link>
    </div>
  );
}

