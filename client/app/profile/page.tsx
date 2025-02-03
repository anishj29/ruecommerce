'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPen, FaBell, FaCamera } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { IoSearch, IoGridOutline, IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import "./sell.css";

 function Card({ className, children }: { className?: string; children: React.ReactNode; }) {
  return <div className={`bg-background p-4 rounded-lg shadow ${className || ""}`}>{children}</div>;
}

 function CardContent({ children }: { children: React.ReactNode; }) {
  return <div>{children}</div>;
}


export default function SellerProfile() {
  const [notifOpen, setNotifOpen] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isProfileImageLoaded, setIsProfileImageLoaded] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("profileImage");
    if (saved) {
      setProfileImage(saved);
      setIsProfileImageLoaded(false);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (profileImage && typeof window !== "undefined") {
      const img = new window.Image();
      img.src = profileImage;
      img.onload = () => setIsProfileImageLoaded(true);
      img.onerror = () => setIsProfileImageLoaded(true);
    }
  }, [profileImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setProfileImage(base64data);
        setIsProfileImageLoaded(false);
        localStorage.setItem("profileImage", base64data);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-white font-poppins text-xl">Loading profile...</p>
      </div>
    );
  }
  if (profileImage && !isProfileImageLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-white font-poppins text-xl">Loading profile...</p>
      </div>
    );
  }

  // ----- (Optional) Dummy Grid Items -----
  // This section remains as-is from your original code.
  const gridItems = [1, 2]; // replace with dynamic content if needed

  return (
    <div className="fade-in bg-background min-h-screen flex justify-center items-center p-6 hello2">
      <div className="bg-foreground mt-6 text-white rounded-2xl p-4 w-full shadow-lg relative hello3">
        {/* Header */}
        <div className="flex mb-4 hello">
          <div className="font-poppins font-semibold flex space-x-4">
            <div className="flex space-x-3">
              <Image src="/logo.png" alt="Shop Logo" className="ml-2 logo" width={200} height={100} />
            </div>
            <Link href="/">
              <button className="bg-transparent text-white mt-4">Trade</button>
            </Link>
            <Link href="/">
              <button className="bg-transparent text-white mt-4">Donate</button>
            </Link>
          </div>
          <div className="font-poppins font-semibold justify-center flex space-x-4">
            <Link href="/">
              <button className="bg-transparent text-white mt-4">Switch to Buying</button>
            </Link>
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="text-3xl cursor-pointer mt-5">
                <FaBell />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-lg z-50">
                  <ul className="p-2 text-gray-800">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New order received!</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item liked by a user</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Message from a buyer</li>
                  </ul>
                </div>
              )}
            </div>
            <HiUserCircle className="text-3xl cursor-pointer mt-5" />
          </div>
        </div>

        {/* Profile & Shop Info Section */}
        <div className="flex mt-20 space-x-20">
          <div className="p-6 max-w-2xl">
            {/* Profile Upload Section */}
            <label htmlFor="profile-upload" className="upload-container cursor-pointer">
              {profileImage ? (
                <img src={profileImage} alt="Profile Picture" className="rounded-full object-cover" />
              ) : (
                <IoPersonCircleOutline className="w-full h-full upload-icon" />
              )}
              <div className="upload-overlay">
                <FaCamera className="text-white text-2xl" />
              </div>
            </label>
            <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mt-14">My Shop</h2>
            <div className="flex items-center left-20 space-x-2 text-gray-50">
              <span className="underline cursor-pointer">Edit</span>
              <FaPen className="text-sm" />
            </div>
          </div>
        </div>

        <hr className="h-px my-14 bg-background border-0 dark:background" />

        {/* Search & Sales Section */}
        <div className="mt-6">
          <div>
            <div className="flex items-center space-x-2">
              <IoGridOutline className="text-xl text-gray-50" />
              <h3 className="text-lg font-poppins font-semibold">All Items</h3>
            </div>
            <div className="relative mt-2">
              <IoSearch className="absolute left-3 top-2.5 text-xl text-gray-800" />
              <input placeholder="       Search Items" className="w-full px-4 py-2 bg-gray-50 text-gray-400 rounded-3xl" />
            </div>
          </div>

          {/* Services Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {gridItems.map((item) => (
              <Card key={item} className="bg-gray-300 p-4 rounded-lg">
                <CardContent>
                  <div className="h-32 bg-gray-50 rounded"></div>
                  <h4 className="mt-2 text-lg font-semibold text-gray-600 font-poppins text-base">
                    Service #{item}
                  </h4>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <IoStar size={16} />
                    <span className="font-poppins font-semibold text-sm ml-1 text-black">5.0</span>
                  </div>
                  <p className="font-poppins font-semibold text-gray-600 text-xs">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </CardContent>
              </Card>
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
