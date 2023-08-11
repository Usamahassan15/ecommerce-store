'use client';

import { useEffect, useState } from "react";
import { RiCloseFill, RiMenuFoldFill } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { useCounterContext } from "../usecounterContext";
import { useRouter } from "next/navigation";
import CardSingle from "@/app/views/Cards/page";
import Link from "next/link";




export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {counter, setCounter } = useCounterContext(); // Access the counter value from the CounterContext
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuLinks = [
    { name: "Product", link: "/" },
    { name: "Account", link: "/signin" },
    
  ];

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      let data = localStorage.getItem('cart');

      let cData = JSON.parse(String(data));

      setCounter(cData.length);
    }
  }, []);   

  return (
    <div>
      {/* Menubar */}
      <div className="flex justify-between md:justify-evenly items-center px-4 py-4 fixed top-0 left-0 w-full z-50 bg-white">
        <div className="font-semibold text-3xl text-black">
          <h1>Get First</h1>
        </div>

        {/* Shopping icon */}
        <div className="md:hidden flex space-x-2">

       <div className="relative flex items-center">
           <button  onClick={(e) => {
              router.push('/checkout');
            }}
            className='ml-2'><HiOutlineShoppingCart className="w-8 h-8" /></button>
              <div className="absolute -top-2 right-0 flex items-center justify-center w-5 h-5 bg-red-600 rounded-full">
                <div className="font-light text-sm text-white">{counter}</div>
              </div>
            </div>

          {/* hamburger icon */}
          <button className="md:hidden" onClick={toggleMenu}>
            <RiMenuFoldFill className="w-9 h-7" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex space-x-4 items-center">
          <div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[400px] lg:w-[600px] pl-4 p-2.5"
              placeholder="Search"
              required
            />
          </div>
          <div className="md:flex hidden justify-center items-center rounded-md h-10 w-10 bg-black">
            <BsSearch className="w-4 h-4 fill-white" />
          </div>
        </div>

        <div className="hidden md:block lg:hidden">
        <button  onClick={(e) => {
            router.push('/checkout');
          }}
          className='ml-2'><HiOutlineShoppingCart className="w-8 h-8" /></button>
        </div>

        {/* Delivery Icon */}
        <div className="hidden lg:flex items-center py-4">
          <div className="lg:flex hidden pt-2">
            <FiTruck className="w-16 h-8" />
          </div>

          <div className="text-sm">
            <div className="lg:block hidden">
              <h1>Fast Dispatch</h1>
            </div>
            <div className="lg:block hidden text-gray-400">
              <h1>Get your order in 2-3 days</h1>
            </div>
          </div>

         
       <div className="relative flex items-center">
           <button  onClick={(e) => {
              router.push('/checkout');
            }}
            className='ml-2'><HiOutlineShoppingCart className="w-8 h-8" /></button>
              <div className="absolute -top-2 right-0 flex items-center justify-center w-5 h-5 bg-red-600 rounded-full">
                <div className="font-light text-xs text-white">{counter}</div>
              </div>
            </div>
               </div>
      </div>

      {/* Responsive Menu */}

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-end">
          <div className="md:hidden bg-white w-3/4 h-screen flex flex-col items-center">
            <div className="flex justify-center items-center px-4 gap-24 py-2 pt-8">
              <h1 className="text-2xl pr-4">Menu</h1>
              <button onClick={toggleMenu}>
                <RiCloseFill className="w-7 h-7" />
              </button>
            </div>
            <div className="my-4">
              <input
                type="text"
                id="responsive-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[200px] px-4 py-2.5"
                placeholder="Search"
                required
              />
            </div>
            <div className=" flex-col space-y-4 gap-4 justify-center items-center">
              <button
                onClick={() => {
                  router.push("/"); // Redirect to the product page when "Products" button is clicked
                }}
              >
                Products
              </button>
              <button>
                Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}