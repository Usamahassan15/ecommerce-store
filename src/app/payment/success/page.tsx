"use client"
import React, { useEffect, useState } from 'react';
import { Image as IImage } from 'sanity';
import { urlForImage } from '../../../../sanity/lib/image';
import Link from 'next/link';
import { MdOutlineCheckCircleOutline } from "react-icons/md";

type CartProduct = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: IImage;
};

export default function Page() {
  const [cartData, setCartData] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cart') && totalPrice === 0) {
      setLoading(true);
      let data = localStorage.getItem('cart');
      let parsedData = JSON.parse(String(data));
  
      if (parsedData && Array.isArray(parsedData.cartData)) {
        setCartData(parsedData.cartData);
  
        // Calculate total price
        let tPrice = 0;
        parsedData.cartData.forEach((item: CartProduct) => {
          let price = item.price * item.quantity;
          tPrice = tPrice + price;
        });
        setTotalPrice(tPrice);
  
        // Add your logic for processing the order here if needed.
  
        // Remove the loading state when you are done processing the order.
        setLoading(false);
      } else {
        console.error('Invalid data structure:', parsedData);
        setLoading(false);
      }
    }
  }, [totalPrice]);
  

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      {loading ? (
        <div className='flex flex-col justify-center items-center'>
          <h1>Processing Order</h1>
          <p>Please Wait</p>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center space-y-2'>
          <h1 className='flex text-green-500  gap-4 font-medium lg:text-4xl text-xl'>Payment Successful <MdOutlineCheckCircleOutline/> </h1>
          <p className='flex justify-center item-center mx-4 lg:text-xl text-sm'>
            Order will be delivered to you in the next 3-4 working days.
          </p>
        </div>
      )}
    </div>
  );
};