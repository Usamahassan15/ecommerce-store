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
      let cData = JSON.parse(String(data));

      setCartData(cData);

      // Calculate total price
      let tPrice = 0;
      cData.forEach((item: CartProduct) => {
        let price = item.price * item.quantity;
        tPrice = tPrice + price;
      });
      setTotalPrice(tPrice);

      // Add your logic for processing the order here if needed.

      // Remove the loading state when you are done processing the order.
      setLoading(false);
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
          <p className='flex justify-center item-center m-4 lg:text-xl text-sm'>
            Order will be delivered to you in the next 3-4 working days.
          </p>
        </div>
      )}
    </div>
  );
}









// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Image as IImage } from 'sanity';
// import { urlForImage } from '../../../../sanity/lib/image';
// import { useCounterContext } from '@/app/component/usecounterContext'; 
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@clerk/nextjs';

// type CartProduct = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: IImage;
// };

// export default function Page() {
//   const router = useRouter();

//   const { userId, sessionId, getToken } = useAuth();
//   const { counter, setCounter } = useCounterContext();
//   const [cartData, setCartData] = useState<CartProduct[]>([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem('cart') && totalPrice === 0) {
//       setLoading(true);
//       let data = localStorage.getItem('cart');
//       let cData = JSON.parse(String(data));

//       setCartData(cData);

//       // let tPrice = 0;
//       // cartData.map((item: CartProduct) => {
//       //   let price = item.price * item.quantity;
//       //   tPrice = tPrice + price;
//       //   console.log('tPrice: ', tPrice);
//       //   setTotalPrice(tPrice);
//       // });

//       async function fetchData() {
//         console.log('going to call api');
//         let data = {
//           userId: userId,
//           data: cartData,
//         };

//         console.log('data: ', data);

//         const res = await fetch('/api/order', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
//         if (res.ok) {
//           res
//             .json()
//             .then((data) => {
//               console.log('api-res: ', data);
//               localStorage.removeItem('cart');
//               setCounter(0);
//               setLoading(false);
//             })
//             .catch((error) => {
//               console.log('res-error: ', error);
//               setLoading(false);
//             });
//         } else {
//           console.error('Error-api-res:', res);
//           setLoading(false);
//         }
//       }

//       if (userId !== undefined) {
//         fetchData();
//       }
//     }
//   }, [totalPrice, userId]);

//   return (
//     <div className='min-h-screen w-full flex justify-center items-center'>
//       {loading ? (
//         <div className='flex flex-col justify-center items-center'>
//           <h1>Processing Order</h1>
//           <p>Please Wait</p>
//         </div>
//       ) : (
//         <div className='flex flex-col justify-center items-center space-y-2'>
//           <h1 className='text-green-500 font-medium lg:text-4xl text-xl'>Payment Successful</h1>
//           <p className=' flex justify-center item-center m-4 lg:text-xl text-sm'>
//             Order will be delivered to you in next  3-4 working days.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }