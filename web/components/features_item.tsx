import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FaChartGantt } from "react-icons/fa6";

export default function FeaturesItem() {
    return (
        <div className='bg-secondaryAccent text-black rounded-md p-4'>
            <div className='bg-secondary text-white flex justify-center items-center w-12 h-12 mb-4 rounded-lg'>
                <FaChartGantt className='text-2xl' />
            </div>
            <div className='font-bold text-lg'>Feature #1</div>
            <div className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos doloribus sapiente sint numquam esse dolores rerum illo accusantium dolorum aliquam animi aspernatur, delectus magni est repudiandae veritatis, eius, asperiores magnam!</div>
            <Link href={""} className="flex gap-3 items-center mb-4 hover:text-primary text-sm font-semibold">
                Learn more
                <BsArrowRight />
            </Link>
        </div>
    );
}