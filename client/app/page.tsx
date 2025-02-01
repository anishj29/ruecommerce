'use client';
import { Search, ChevronDown, Star } from 'lucide-react';


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

export default function Marketplace() {
  return (
    <div className="bg-background min-h-screen flex justify-center items-center p-6">
      <img
              src="/logo.png" //INSERT LOGO HERE!!
              alt="Shop Logo"
              className="absolute top-12 left-6 w-23 h-12"
            />

      <div className="bg-foreground text-white rounded-2xl p-6 w-full max-w-6xl shadow-lg relative left-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            
         
  
          </div>
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <Input placeholder="Where are we shopping today?" className="font-poppins font-semibold bg-stone-50 text-gray-400 pl-10 pr-4 py-2 rounded-lg w-full" />
          </div>
          <div className="font-poppins font-semibold flex space-x-4">
            <Button className="bg-transparent text-white">Home</Button>
            <Button className="bg-transparent text-white">Trade</Button>
            <Button className="bg-transparent text-white">Donate</Button>
            <Button className="bg-transparent text-teal-400 !important text-xs">Switch to Selling</Button>
            <Button className="bg-transparent text-white">Sign In</Button>
            <Button className="bg-black text-white">Contact</Button>
          </div>
        </div>

        <div className="font-poppins font-semibold text-lg flex space-x-6 mb-10"> 
          <Dropdown label="Categories" />
          <Dropdown label="Distance" />
          <Dropdown label="Rating" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="bg-foreground text-white p-4 rounded-lg">
              <CardContent>
                <div className="h-32 bg-gray-100 "></div>
                <div className="mt-2">
                  <p className="font-poppins font-semibold text-xs text-gray-400">@user_name</p>
                  <h4 className="font-poppins font-semibold text-base ">Service #{item}</h4>
                  <div className="flex items-center text-yellow-400 text-sm">
                    <Star size={16} /> <span className="font-poppins font-semibold text-sm ml-1">5.0</span>
                  </div>
                  <p className="font-poppins font-semibold text-white-400 text-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}