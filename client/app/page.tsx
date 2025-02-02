'use client';
import { Search, ChevronDown, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const serviceImages = [
  '/service1.jpg',
  '/service2.jpg',
  '/service3.jpg',
  '/service4.jpg',
  '/service5.jpg',
  '/service6.jpg',
];

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-grey-400 ${className || ''}`}
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


export default function Marketplace() {
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
            <Link href="/selling"><Button className="bg-transparent text-white">Switch to Selling</Button></Link>
            <Link href="/login"><Button className="bg-transparent text-white sign-in">Sign In</Button></Link>
            </div>
        </div>

        <div className="font-poppins font-semibold text-lg flex space-x-6 mb-10 hello"> 
          <div className="font-poppins font-semibold text-lg flex space-x-6 mb-4">
            <Dropdown label="Category" />
            <Dropdown label="Campus" />
            <Dropdown label="Price" />
            <Dropdown label="Rating" />
          </div>
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <Input placeholder="Where are we shopping today?" className="font-poppins font-semibold bg-stone-50 text-gray-400 pl-10 pr-4 py-2 rounded-lg w-full" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
      {serviceImages.map((imgSrc, index) => (
        <Card key={index} className="bg-gray-300 text-grey-400 p-4 rounded-lg">
          <CardContent>
            {/* Replace the placeholder div with your Next.js Image */}
            <div className="h-32 w-full overflow-hidden rounded-lg">
              <Image
                src={imgSrc}
                alt={`Service #${index + 1}`}
                width={300}       // or a suitable width
                height={200}      // or a suitable height
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-2">
              <p className="font-poppins font-semibold text-xs text-gray-600">@user{index + 34}</p>
              <h4 className="font-poppins font-semibold text-base text-gray-600">Shoe #{index + 1}</h4>
              <div className="flex items-center text-yellow-100 text-sm">
                <Star size={16} />
                <span className="font-poppins font-semibold text-sm ml-1">5.0</span>
              </div>
              <p className="font-poppins font-semibold text-white-400 text-xs text-gray-400">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </CardContent>
        </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
