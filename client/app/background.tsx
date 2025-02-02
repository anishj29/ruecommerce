'use client';
import { Search} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import 'react';

export default function Background() {
  return (
    <div className="bg-background min-h-screen flex justify-center items-center p-6">
      <Image
              src="/logo.png" //INSERT LOGO HERE!!
              alt="Shop Logo"
              className="ml-2 logo"
              width={200}
              height={100}
            />

      <div className="bg-foreground mt-24 text-white rounded-2xl p-6 w-full shadow-lg relative ml-20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            
         
  
          </div>
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input placeholder="Where are we shopping today?" className="font-poppins font-semibold bg-stone-50 text-gray-400 pl-10 pr-4 py-2 rounded-lg w-full" />
          </div>
          <div className="font-poppins font-semibold flex space-x-4">
            <button className="bg-transparent text-white">Home</button>
            <button className="bg-transparent text-white">Trade</button>
            <button className="bg-transparent text-white">Donate</button>
            <Link href="/selling"><button className="bg-transparent !text-teal-400 text-xs">Switch to Selling</button></Link>
            <Link href="/login"><button className="bg-transparent text-white sign-in">Sign In</button></Link>
            <button className="bg-black text-white">Contact</button>
          </div>
        </div>
      </div>
    </div>
);
}
