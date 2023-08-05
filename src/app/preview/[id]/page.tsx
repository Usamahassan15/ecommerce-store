'use client';

import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../../sanity/lib/image';
import { Image as IImage } from 'sanity';
import Size from './size';
import BuyNowButton from '../buynowbutton';
import { useCounterContext } from '@/app/component/usecounterContext';
import { v4 as uuid } from 'uuid';
import { useCookies } from 'react-cookie';
import axios from "axios";

interface IProduct {
  _id: string;
  image: IImage[];
  price: number;
  sale_price: number;
  title: string;
  details: string;
  on_sale: boolean;
}

type CartProduct = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: IImage;
};

export default function Pre({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { counter, setCounter } = useCounterContext();
  const [cookies, setCookie] = useCookies(['cart']); // Set the cookie name you want to use

  const changeQuantity = (value: number) => {
    // Don't allow the quantity to be less than 0
    setQuantity(Math.max(0, value));
  };

  const decreaseQuantity = () => {
    changeQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    changeQuantity(quantity + 1);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    changeQuantity(isNaN(value) ? 0 : value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await client.fetch(
          `*[_type == 'product' && _id == "${params.id}"][0]`
        );

        setProduct(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (params.id && !loading) {
      fetchData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className='h-72 w-full flex justify-center items-center mt-16'>
        Loading...
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Logic for adding product to the cart     local storage

  // const handleAddToCart = async (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
    
  //   let price = product.on_sale ? product.sale_price : product.price;

  //   let cartData: CartProduct[] = [];

  //   let cartProduct: CartProduct = {
  //     _id: product?._id,
  //     title: product?.title,
  //     price: price,
  //     quantity: quantity,
  //     image: product?.image[0],
  //   };

  //    // Generate a unique userId using uuid
  //    const userId = uuid();

  //   if (localStorage.getItem('cart')) {
  //     let data = localStorage.getItem('cart');
  //     cartData = JSON.parse(String(data));
  //     let idx: number = -1;
  //     cartData.map((item: CartProduct, index: number) => {
  //       if (item._id === cartProduct._id) {
  //         let qty: number = item.quantity;
  //         qty = qty + cartProduct.quantity;
  //         cartProduct.quantity = qty;
  //         idx = index;
  //       }
  //     });

  //     if (idx !== -1) {
  //       cartData.splice(idx, 1, cartProduct);
  //     } else {
  //       cartData.push(cartProduct);
  //     }
  //   } else {
  //     cartData.push(cartProduct);
  //   }

  //   console.log('cartProduct: ', cartProduct);
  //   let totalItems = cartData.length;
  //   setCounter(totalItems);

  //   // let data = JSON.stringify(cartData);

  //   const dataToStore = JSON.stringify({
  //     userId: userId,
  //     cartData: cartData,
  //   });

  //   localStorage.removeItem('cart');

  //   setTimeout(() => {
  //     localStorage.setItem('cart', dataToStore);
  //   }, 1000);
  // };

  // const handleAddToCart = (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();

  //   let price = product.on_sale ? product.sale_price : product.price;

  //   let cartData: CartProduct[] = cookies['cart'] || [];

  //   let cartProduct: CartProduct = {
  //     _id: product?._id,
  //     title: product?.title,
  //     price: price,
  //     quantity: quantity,
  //     image: product?.image[0],
  //   };

  //   // Generate a unique userId using uuid
  //   const userId = uuid();

  //   let existingCartItemIndex = cartData.findIndex(
  //     (item: CartProduct) => item._id === cartProduct._id
  //   );

  //   if (existingCartItemIndex !== -1) {
  //     let existingCartItem = cartData[existingCartItemIndex];
  //     existingCartItem.quantity += cartProduct.quantity;
  //     cartData.splice(existingCartItemIndex, 1, existingCartItem);
  //   } else {
  //     cartData.push(cartProduct);
  //   }

  //   let totalItems = cartData.length;
  //   setCounter(totalItems);

  //   const dataToStore = JSON.stringify({
  //     userId: userId,
  //     cartData: cartData,
  //   });

  //   // Set the cart cookie to expire in 7 days
  //   setCookie('cart', dataToStore, { path: '/', maxAge: 7 * 24 * 60 * 60 }); // Max age in seconds

  //   // You can also set an expiration date using Date object:
  //   // setCookie('cart', dataToStore, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  // }; 

  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let price = product.on_sale ? product.sale_price : product.price;

     // Ensure cartData is an array or initialize it as an empty array
    let cartData: CartProduct[] = cookies["cart"] || [];

    let cartProduct = {
      _id: product?._id,
      title: product?.title,
      price: price,
      quantity: quantity,
      image: product?.image[0],
    };

    let existingCartItemIndex = cartData.findIndex(
      (item: CartProduct) => item._id === cartProduct._id
    );

    if (existingCartItemIndex !== -1) {
      let existingCartItem = cartData[existingCartItemIndex];
      existingCartItem.quantity += cartProduct.quantity;
      cartData.splice(existingCartItemIndex, 1, existingCartItem);
    } else {
      cartData.push(cartProduct);
    }

    let totalItems = cartData.length;
    setCounter(totalItems);
     // Generate a unique userId using uuid
     const userId = uuid();

    const dataToStore = JSON.stringify({
      userId: uuid(),
      cartData: cartData,
    });

    // Set the cart cookie to expire in 7 days
    setCookie("cart", dataToStore, { path: "/", maxAge: 7 * 24 * 60 * 60 }); // Max age in seconds

    try {
      // Make the POST request to the API endpoint to save cart data to the database
      const response = await axios.post("/api/add-to-cart", {
        userId: userId,
        cartData: cartData,
      });
      console.log("POST API Response:", response.data);
    } catch (error) {
      // Perform type assertion to convert 'error' to type { message: string }
      const errorMessage = (error as { message: string }).message;
      console.error("Error adding to cart:", errorMessage);
    }
  };



  return (
    <section>
      <div className='relative mx-auto max-w-screen-xl lg:mt-32 mt-20 px-4 lg:px-16 py-8'>
        <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2 p-8'>
          <div className='grid grid-cols-1 gap-4'>
            {product.image && product.image[0] && (
              <Image
                alt='product image'
                src={urlForImage(product.image[0] as any).url()}
                height={300}
                width={300}
                className='aspect-square w-full rounded-xl object-cover'
              />
            )}
            <div className='grid grid-cols-3 gap-4 lg:mt-4'>
              {product.image &&
                product.image.map((image, index) => (
                  <Image
                    key={index}
                    alt={`Product Image ${index + 1}`}
                    src={(urlForImage(image) as any).url()}
                    height={200}
                    width={200}
                    className='aspect-square w-full rounded-xl object-cover'
                  />
                ))}
            </div>
          </div>

          <div className='sticky top-0 pt-10'>
            <strong className='rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600'>
              Pre Order
            </strong>

            <div className='mt-8 flex justify-between items-center'>
              <div className='max-w-[35ch] space-y-2'>
                <h1 className='text-xl font-bold sm:text-2xl'>
                  {product.title}
                </h1>
              </div>
              {product.sale_price ? (
                <div className='flex space-x-8 items-center mt-1.5'>
                  <p className='my-2 font-bold text-lg text-green-500 line-through'>
                    ${product.price}
                  </p>
                  <p className='my-2 font-bold text-lg text-red-500 '>
                    ${product.sale_price}
                  </p>
                </div>
              ) : (
                <p className='my-2 font-bold text-lg text-gray-700'>
                  ${product.price}
                </p>
              )}
            </div>

            <div className='prose max-w-none mt-4'>
              <p>{product.details}</p>
            </div>

            <form className='mt-8'>
              <fieldset className='mt-4'>
                <legend className='mb-1 text-sm font-medium'>Size</legend>
                <Size />
              </fieldset>

              <div className='flex mt-8 space-x-4'>
              

                <div className='flex items-center border border-gray-200 rounded'>
                  <button
                    type='button'
                    className='w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75'
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>

                  <input
                    type='number'
                    id='Quantity'
                    value={quantity}
                    onChange={onInputChange}
                    className='h-12 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
                  />

                  <button
                    type='button'
                    className='w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75'
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='flex-col justify-start mt-6'>
               
                <button
                  onClick={handleAddToCart}
                  className='block rounded bg-gray-800 px-12 py-4 font-normal text-white hover:bg-blue-700'>
                  Add To Cart
                </button>
               
                <div className='pt-6'>
                <Link href={`/checkout`}>
                <BuyNowButton />
                </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}









// import { FC } from 'react';
// import Link from 'next/link';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import Image from 'next/image';
// import { client } from '@/lib/sanityClient';
// import { urlForImage } from '../../../../sanity/lib/image';
// import { Image as IImage } from 'sanity';
// import Size from './size';
// import BuyNowButton from '../buynowbutton';
// import { useCounterContext } from '@/app/component/usecounterContext';
// import { debounce } from 'lodash';
// import { v4 as uuid } from "uuid";
// import { NextPageContext } from 'next';



// interface IProduct {
//   _id: string;
//   image: IImage[];
//   price: number;
//   sale_price: number;
//   title: string;
//   details: string;
//   on_sale: boolean;
// }

// type CartProduct = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: IImage;
// };

//  const Pre:FC<{ params:any }> = ({ params}) => {
//   // const Pre: FC<{ params: any; cookies: any }> = ({ params, cookies }) => {
//   const [loading, setLoading] = useState(false);
//   const [product, setProduct] = useState<IProduct | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const { counter, setCounter } = useCounterContext();

//   const changeQuantity = (value: number) => {
//     // Don't allow the quantity to be less than 0
//     setQuantity(Math.max(0, value));
//   };

//   const decreaseQuantity = () => {
//     changeQuantity(quantity - 1);
//   };

//   const increaseQuantity = () => {
//     changeQuantity(quantity + 1);
//   };

//   const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value);
//     changeQuantity(isNaN(value) ? 0 : value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const result = await client.fetch(
//           `*[_type == 'product' && _id == "${params.id}"][0]`
//         );

//         setProduct(result);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     if (params.id && !loading) {
//       fetchData();
//     }
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className='h-72 w-full flex justify-center items-center mt-16'>
//         Loading...
//       </div>
//     );
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   // Logic for adding product to the cart
 
// // const handleAddToCart = async (event: React.MouseEvent<HTMLElement>) => {
// //     event.preventDefault();
// //     let price = product.on_sale ? product.sale_price : product.price;
  
// //     let cartData: CartProduct[] = [];
  
// //     let cartProduct: CartProduct = {
// //       _id: product?._id,
// //       title: product?.title,
// //       price: price,
// //       quantity: quantity,
// //       image: product?.image[0],
// //     };
  
// //     if (localStorage.getItem('cart')) {
// //       let data = localStorage.getItem('cart');
// //       cartData = JSON.parse(data!);
// //       let idx: number = -1;
// //       cartData.map((item: CartProduct, index: number) => {
// //         if (item._id === cartProduct._id) {
// //           let qty: number = item.quantity;
// //           qty = qty + cartProduct.quantity;
  
// //           cartProduct.quantity = qty;
// //           idx = index;
// //         }
// //       });
  
// //       if (idx !== -1) {
// //         cartData.splice(idx, 1, cartProduct);
// //       } else {
// //         cartData.push(cartProduct);
// //       }
// //     } else {
// //       cartData.push(cartProduct);
// //     }
  
// //     console.log('cartProduct: ', cartProduct);
// //     let totalItems = cartData.length;
// //     setCounter(totalItems);
  
// //     let data = JSON.stringify(cartData);
  
// //     localStorage.removeItem('cart');
  
// //     setTimeout(() => {
// //       localStorage.setItem('cart', data);
// //     }, 1000);
  
// //     // Save userId in localStorage
// //     const userId = localStorage.getItem('user_id') || uuid();
// //     localStorage.setItem('user_id', userId);
  
// //     // Save data to database
    
// //     try {
// //       const res = await fetch('/api/cart', {
// //         method: 'POST',
// //         body: JSON.stringify({
// //           ...cartProduct,
// //           user_id: userId,
// //           product_id: product._id, // Add the product_id to the request body
// //         }),
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       const result = await res.json();
// //       console.log(result);
// //     } catch (error) {
// //       console.error('Error saving to database:', error);
// //     }
// //   }; 

// // Logic for adding product to the cart

// const handleAddToCart = async (event: React.MouseEvent<HTMLElement>) => {
//   event.preventDefault();
//   let price = product.on_sale ? product.sale_price : product.price;

//   let cartData: CartProduct[] = [];

//   let cartProduct: CartProduct = {
//     _id: product?._id,
//     title: product?.title,
//     price: price,
//     quantity: quantity,
//     image: product?.image[0],
//   };

//   // Generate a user ID using uuid if not available in local storage
//   let userId = localStorage.getItem('user_id');
//   if (!userId) {
//     userId = uuid();
//     localStorage.setItem('user_id', userId);
//   }

//   // Get cart data from local storage and update it
//   if (localStorage.getItem('cart')) {
//     let data = localStorage.getItem('cart');
//     cartData = JSON.parse(data || '');
//     let idx: number = -1;
//     cartData.map((item: CartProduct, index: number) => {
//       if (item._id === cartProduct._id) {
//         let qty: number = item.quantity;
//         qty = qty + cartProduct.quantity;

//         cartProduct.quantity = qty;
//         idx = index;
//       }
//     });

//     if (idx !== -1) {
//       cartData.splice(idx, 1, cartProduct);
//     } else {
//       cartData.push(cartProduct);
//     }
//   } else {
//     cartData.push(cartProduct);
//   }

//   // Update the cart in local storage
//   let data = JSON.stringify(cartData);
//   localStorage.setItem('cart', data);

//   // Update the counter for the total number of items in the cart
//   let totalItems = cartData.length;
//   setCounter(totalItems);

//   // Save the cart data to the database using the generated user ID
//   try {
//     const res = await fetch('/api/cart', {
//       method: 'POST',
//       body: JSON.stringify({
//         ...cartProduct,
//         user_id: userId,
//         product_id: product._id, // Add the product_id to the request body
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const result = await res.json();
//     console.log(result);
//   } catch (error) {
//     console.error('Error saving to database:', error);
//   }
// };
  
//   return (
//     <section>
//       <div className="relative mx-auto max-w-screen-xl lg:mt-20 mt-16 px-4 lg:px-16 py-8">
//         <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 p-8">
//           <div className="grid grid-cols-1 gap-4">
//             {product.image && product.image[0] && (
//               <Image
//                 alt="product image"
//                 src={urlForImage(product.image[0] as any).url()}
//                 height={300}
//                 width={300}
//                 className="aspect-square w-full rounded-xl object-cover"
//               />
//             )}
//             <div className="grid grid-cols-3 gap-4 lg:mt-4">
//               {product.image &&
//                 product.image.map((image, index) => (
//                   <Image
//                     key={index}
//                     alt={`Product Image ${index + 1}`}
//                     src={(urlForImage(image) as any).url()}
//                     height={200}
//                     width={200}
//                     className="aspect-square w-full rounded-xl object-cover"
//                     />
//                 ))}
//             </div>
//           </div>

//           <div className="sticky top-0 pt-10">
//             <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
//               Pre Order
//             </strong>

//             <div className="mt-8 flex justify-between items-center">
//               <div className="max-w-[35ch] space-y-2">
//                 <h1 className="text-xl font-bold sm:text-2xl">
//                   {product.title}
//                 </h1>
//               </div>
//               {product.sale_price ? (
//                 <div className="flex space-x-8 items-center mt-1.5">
//                   <p className="my-2 font-bold text-lg text-green-500 line-through">
//                     ${product.price}
//                   </p>
//                   <p className="my-2 font-bold text-lg text-red-500 ">
//                     ${product.sale_price}
//                   </p>
//                 </div>
//               ) : (
//                 <p className="my-2 font-bold text-lg text-gray-700">
//                   ${product.price}
//                 </p>
//               )}
//             </div>

//             <div className="prose max-w-none mt-4">
//               <p>{product.details}</p>
//             </div>

//             <form className="mt-8">
//               <fieldset className="mt-4">
//                 <legend className="mb-1 text-sm font-medium">Size</legend>
//                 <Size />
//               </fieldset>

//               <div className="flex mt-8 space-x-4">
//                 <div className="flex items-center border border-gray-200 rounded">
//                   <button
//                     type="button"
//                     className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
//                     onClick={decreaseQuantity}
//                   >
//                     -
//                   </button>

//                   <input
//                     type="number"
//                     id="Quantity"
//                     value={quantity}
//                     onChange={onInputChange}
//                     className="h-12 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
//                   />

//                   <button
//                     type="button"
//                     className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
//                     onClick={increaseQuantity}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <div className="flex-col justify-start mt-6">
//                 <button
//                   onClick={handleAddToCart}
//                   className="block rounded bg-gray-800 px-12 py-4 font-normal text-white hover:bg-blue-700"
//                 >
//                   Add To Cart
//                 </button>

//                 <div className="pt-6">
//                   <Link href={`/checkout`}>
//                     <BuyNowButton />
//                   </Link>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Pre;
