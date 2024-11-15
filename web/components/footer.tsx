import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image"; 
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";
import { BsSend } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { APP_NAME } from "@/src/constants";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-br-50 text-white bg-[#AE8D5B]">
            <div className="relative px-6 py-8">
                <div className="absolute top-[-70%] left-[50%] transform -translate-x-1/2  w-[90%] md:w-[50%] bg-gradient-to-r from-[#E4D9C8] to-[#3E0566] p-6 rounded-lg flex justify-between items-center flex-wrap gap-3">
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold">
                            Bring Your Vision to Life with Setita
                        </div>
                        <div className="flex gap-1 text-[10px]">
                            <div className="flex items-center mr-2 gap-1 font-medium text-gray-700">
                                <FaCheckCircle className="text-dark-800" /> Transparent
                            </div>
                            <div className="flex items-center mr-2 gap-1 font-medium text-gray-700">
                                <FaCheckCircle className="text-dark-800" /> Secure
                            </div>
                            <div className="flex items-center mr-2 gap-1 font-medium text-gray-700">
                                <FaCheckCircle className="text-dark-800" /> Empowering
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6">
                        <button className="bg-b-900 bg-black rounded-full text-w-50 py-2 px-6 hover:bg-blue-600 transition-all">
                            Get Started
                        </button>
                        <button className="bg-gray-300 text-gray-800 py-2 px-6 rounded-full hover:bg-gray-400 transition-all">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            <section className="text-white py-10">
                <div className="container mx-auto px-8">
                    <Image src={"/brand/setita.png"} width={150} height={40} className="mb-8 mt-8 lg:mt-0" alt="Logo" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <div>
                            <h2 className="font-semibold text-xl mb-4">Get Started</h2>
                            <div className="flex flex-col">
                                <Link href={"/app/"} className="text-sm mb-2">Join us</Link>
                                <Link href={"/app/create/"} className="text-sm mb-2">Start a Campaign</Link>
                                <Link href={"/app/dn/"} className="text-sm mb-2">Donate</Link>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-xl mb-4">Browse</h2>
                            <div>
                                <h4 className="text-sm mb-2">New</h4>
                                <h4 className="text-sm mb-2">Trending</h4>
                                <h4 className="text-sm mb-2">Recently funded</h4>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-xl mb-4">Resources</h2>
                            <div>
                                <h4 className="text-sm mb-2">About us</h4>
                                <h4 className="text-sm mb-2">FAQ</h4>
                                <h4 className="text-sm mb-2">Contact Us</h4>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-xl mb-4">Legal</h2>
                            <div>
                                <h4 className="text-sm mb-2">Privacy Policy</h4>
                                <h4 className="text-sm mb-2">Terms of services</h4>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-xl mb-4">Let's do it</h2>
                            <div className="flex">
                                <FaXTwitter className="mr-4 text-lg" />
                                <SlSocialLinkedin className="mr-4 text-lg" />
                                <FiInstagram className="mr-4 text-lg" />
                                <FiFacebook className="mr-4 text-lg" />
                                <BsSend className="mr-4 text-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="relative z-50">
                <Image
                    className="w-full object-cover"
                    src={"/frame/footer.png"}
                    width={1000}
                    height={50}
                    alt="Footer decoration"
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white">
                    &copy; {new Date().getFullYear()} {"   " + APP_NAME.toLowerCase()}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
