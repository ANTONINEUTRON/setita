import Image from 'next/image';
import Link from 'next/link';
import GetStartedButton from '../buttons/get_started_button';

export default function HomeNavbar(){
    return (
        <header className=" bg-primary sticky">
            <div className="flex justify-between items-center p-4 container m-auto">
                <Link href={"/"}>
                    <Image src="/brand/setita.png" width="400" height="150" alt={'setita_logo'} className="h-7 w-32" />
                </Link>
                

                <GetStartedButton />
            </div>
        </header>
    )
}