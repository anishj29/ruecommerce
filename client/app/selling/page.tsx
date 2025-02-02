'use client';

import { useState } from 'react';
import { Search, ChevronDown, Star } from 'lucide-react';
import Image from 'next/image';
import { FaPen, FaBell, FaCamera } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';
import { IoSearch } from 'react-icons/io5';
import { IoGridOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
// Remove or review the contents of this file if it conflicts with your inline styles
import "./sell.css"; 
import Link from 'next/link';


export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400 ${className || ''}`}
      {...props}
    />
  );
}

export function Button({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-black-500 hover:bg-background ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`bg-background p-4 rounded-lg shadow ${className || ''}`}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function Dropdown({ label }: { label: string }) {
  return (
    <button className="w-40 flex items-center justify-between bg-gray-50 text-gray-700 px-4 py-2 rounded-lg">
      {label} <ChevronDown size={16} />
    </button>
  );
}

export default function SellerProfile() {
  
  return (
    <div className="bg-background min-h-screen flex justify-center items-center p-6 hello2">

      <div className="bg-foreground mt-6 text-white rounded-2xl p-4 w-full shadow-lg relative ml-20 hello3">
        <div className="flex mb-4 hello">
        <div className="font-poppins font-semibold flex space-x-4">
          <div className="flex space-x-3">
            
          <Image
                    src="/logo.png" //INSERT LOGO HERE!!
                    alt="Shop Logo"
                    className="ml-2 logo"
                    width={200}
                    height={100}
                  />

          </div>
  
            <Button className="bg-transparent text-white">Home</Button>
            <Button className="bg-transparent text-white">Trade</Button>
            <Button className="bg-transparent text-white">Donate</Button>
       
      
          </div>
          <div className="font-poppins font-semibold justify-center flex space-x-4">
            <Link href="/app/page"><Button className="bg-transparent text-white ">Switch to Buying</Button></Link> 
            <FaBell className="text-3xl cursor-pointer" />
            <HiUserCircle className="text-3xl cursor-pointer" />
            </div>
        </div>

        <div className="flex mt-20 space-x-20">
       


        <div className="p-6 max-w-2xl">
        <div className="flex space-x-3">
            
            <Image
                      src="/pfp.png" //INSERT LOGO HERE!!
                      alt="pfp "
                      className="rounded-full object-cover mt-[-30px]"
                      width={200}
                      height={300}
                    />

                    
  
            </div>
        </div>

            
          <div>
            <h2 className="text-3xl font-bold">My Shop</h2>
            <div className="flex items-center left-20 space-x-2 text-gray-50">
              <span className="underline cursor-pointer">Edit</span>
              <FaPen className="text-sm" />
            </div>
          </div>
        </div>




          <div className="mt-6">
            {/* Section: Search & Sales */}
            <div>
              <div className="flex items-center space-x-2">
                <IoGridOutline className="text-xl text-gray-50" />
                <h3 className="text-2xl font-poppins font-semibold">All Items</h3>
              </div>
              <div className="relative mt-2">
                <IoSearch className="absolute left-3 top-2.5 text-xl text-gray-800 " />
                <input type="text " placeholder="       Search Items" className="w-full px-4 py-2 bg-gray-50 text-gray-400 font-poppins  rounded-3xl " />
              </div>
            </div>

            {/* Section: Grid of Items (Stacked Below) */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-gray-300 p-4 rounded-lg">
                  <div className="h-32 bg-gray-50 rounded"></div>
                  <h4 className="mt-2 text-gray-800 text-lg font-semibold font-poppins text-base">Service #{item}</h4>
                  <div className="flex items-center text-yellow-400 text-sm">
                    <Star size={16} /> <span className="font-poppins font-semibold text-sm ml-1">5.0</span>
                  </div>
                  <p className="font-poppins font-semibold text-white-400 text-xs">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </div>
              ))}
            </div>
          </div>




        <div className="mt-6 flex justify-end">
          <button className="flex items-center space-x-4 shadow-lg bg-gray-50 text-gray-800 px-8 py-3 rounded-2xl font-poppins">
            <span className="font-poppins font-semibold text-base">Edit Shop</span>
            <FaPen />
          </button>
        </div>
      </div>
    </div>
  );
}
