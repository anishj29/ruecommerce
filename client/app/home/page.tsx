"use client";
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IoStar } from "react-icons/io5";

// Updated dummy data with extra fields for filtering
const dummyServices = [
  {
    id: 1,
    name: "Red Shoes",
    username: "user34",
    rating: 5.0,
    description: "Comfortable and stylish red shoes for any occasion.",
    image: "/service1.jpg",
    category: "Shoes",
    campus: "North",
    price: 100,
  },
  {
    id: 2,
    name: "Blue Sneakers",
    username: "user35",
    rating: 4.8,
    description: "Trendy blue sneakers that blend style and comfort.",
    image: "/service2.jpg",
    category: "Sneakers",
    campus: "South",
    price: 120,
  },
  {
    id: 3,
    name: "Green Boots",
    username: "user36",
    rating: 4.9,
    description: "Durable green boots perfect for outdoor adventures.",
    image: "/service3.jpg",
    category: "Boots",
    campus: "East",
    price: 150,
  },
  {
    id: 4,
    name: "Yellow Sandals",
    username: "user37",
    rating: 4.7,
    description: "Lightweight yellow sandals, great for the summer.",
    image: "/service4.jpg",
    category: "Sandals",
    campus: "West",
    price: 80,
  },
  {
    id: 5,
    name: "Black Heels",
    username: "user38",
    rating: 5.0,
    description: "Elegant black heels that add sophistication to any outfit.",
    image: "/service5.jpg",
    category: "Heels",
    campus: "North",
    price: 200,
  },
  {
    id: 6,
    name: "White Flats",
    username: "user39",
    rating: 4.6,
    description: "Comfortable white flats for everyday wear.",
    image: "/service6.jpg",
    category: "Flats",
    campus: "South",
    price: 90,
  },
];

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-grey-400 ${
        className || ""
      }`}
      {...props}
    />
  );
}

export function Button({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-black-500 hover:bg-background ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-background p-4 rounded-lg shadow ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

/**
 * A custom dropdown component for filtering.
 * The open state is managed by the parent component.
 */
function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
  isOpen,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={onToggle}
        className="w-40 flex items-center justify-between bg-gray-50 text-black px-4 py-2 rounded-lg"
      >
        {selected === "All" ? label : selected} <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-md z-10 transform transition-all duration-300 animate-fadeIn">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => {
                onSelect(option);
                onToggle(); // Close dropdown after selection
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // States for filter selections (default to "All" meaning no filter)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");

  // This state tracks which filter dropdown is currently open.
  // Allowed values: "category", "campus", "price", "rating", or null.
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // Options for each filter
  const categoryOptions = [
    "All",
    "Shoes",
    "Sneakers",
    "Boots",
    "Sandals",
    "Heels",
    "Flats",
  ];
  const campusOptions = ["All", "North", "South", "East", "West"];
  const priceOptions = ["All", "<100", "100-150", ">150"];
  const ratingOptions = ["All", "4+", "4.5+", "5"];

  // Combine all filters with the search query
  const filteredServices = dummyServices.filter((service) => {
    let pass = true;
    if (selectedCategory !== "All") {
      pass = pass && service.category === selectedCategory;
    }
    if (selectedCampus !== "All") {
      pass = pass && service.campus === selectedCampus;
    }
    if (selectedPrice !== "All") {
      if (selectedPrice === "<100") {
        pass = pass && service.price < 100;
      } else if (selectedPrice === "100-150") {
        pass = pass && service.price >= 100 && service.price <= 150;
      } else if (selectedPrice === ">150") {
        pass = pass && service.price > 150;
      }
    }
    if (selectedRating !== "All") {
      if (selectedRating === "4+") {
        pass = pass && service.rating >= 4;
      } else if (selectedRating === "4.5+") {
        pass = pass && service.rating >= 4.5;
      } else if (selectedRating === "5") {
        pass = pass && service.rating === 5;
      }
    }
    if (searchQuery) {
      pass =
        pass &&
        service.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return pass;
  });

  return (
    <>
      {/* The "fade-in" class is added here to apply the fade in transition */}
      <div className="bg-background min-h-screen flex justify-center items-center p-6 hello2 fade-in">
        <div className="bg-foreground mt-6 text-white rounded-2xl p-4 shadow-lg relative ml-20 hello3">
          {/* Header */}
          <div className="flex mb-4 hello">
            <div className="font-poppins font-semibold flex space-x-4">
              <div className="flex space-x-3">
                <Image
                  src="/logo.png" // INSERT LOGO HERE!!
                  alt="Shop Logo"
                  className="ml-2 logo"
                  width={200}
                  height={100}
                />
              </div>
              <Link href="/">
                <Button className="bg-transparent text-white mt-4">Home</Button>
              </Link>
              <Link href="/">
                <Button className="bg-transparent text-white mt-4">Trade</Button>
              </Link>
              <Link href="/">
                <Button className="bg-transparent text-white mt-4">Donate</Button>
              </Link>
            </div>
            <div className="font-poppins font-semibold justify-center flex space-x-4">
              <Link href="/profile">
                <Button className="bg-transparent text-white mt-4">
                  Switch to Selling
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-transparent text-white sign-in mt-4">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="font-poppins font-semibold text-lg flex flex-col md:flex-row md:justify-between md:items-center mb-10 hello">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <FilterDropdown
                label="Category"
                options={categoryOptions}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                isOpen={openFilter === "category"}
                onToggle={() =>
                  setOpenFilter(openFilter === "category" ? null : "category")
                }
              />
              <FilterDropdown
                label="Campus"
                options={campusOptions}
                selected={selectedCampus}
                onSelect={setSelectedCampus}
                isOpen={openFilter === "campus"}
                onToggle={() =>
                  setOpenFilter(openFilter === "campus" ? null : "campus")
                }
              />
              <FilterDropdown
                label="Price"
                options={priceOptions}
                selected={selectedPrice}
                onSelect={setSelectedPrice}
                isOpen={openFilter === "price"}
                onToggle={() =>
                  setOpenFilter(openFilter === "price" ? null : "price")
                }
              />
              <FilterDropdown
                label="Rating"
                options={ratingOptions}
                selected={selectedRating}
                onSelect={setSelectedRating}
                isOpen={openFilter === "rating"}
                onToggle={() =>
                  setOpenFilter(openFilter === "rating" ? null : "rating")
                }
              />
            </div>
            <div className="relative w-full md:w-1/2 ml-5s">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search for services..."
                className="font-poppins font-semibold bg-stone-50 text-gray-400 pl-10 pr-4 py-2 rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-3 gap-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className="bg-gray-300 text-grey-400 p-4 rounded-lg"
                >
                  <CardContent>
                    <div className="h-32 w-full overflow-hidden rounded-lg">
                      <Image
                        src={service.image}
                        alt={service.name}
                        width={300} // adjust as needed
                        height={200} // adjust as needed
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="font-poppins font-semibold text-xs text-gray-600">
                        @{service.username}
                      </p>
                      <h4 className="font-poppins font-semibold text-base text-gray-600">
                        {service.name}
                      </h4>
                      <div className="flex items-center text-yellow-500 text-sm">
                        <IoStar size={16} />
                        <span className="font-poppins font-semibold text-sm ml-1 text-black">
                          {service.rating}
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-white-400 text-xs text-gray-400">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-white font-poppins col-span-3">
                No services found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
