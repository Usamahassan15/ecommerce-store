'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Image as IImage } from 'sanity';
import { urlForImage } from '../../../sanity/lib/image';
import { useCounterContext } from '../component/usecounterContext';
import { AiFillDelete } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


type CartProduct = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: IImage;
};

function CheckOut() {
  const router = useRouter();

  const { counter, setCounter } = useCounterContext();
  const [cartData, setCartData] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (totalPrice === 0 && cartData.length === 0) {
      if (localStorage.getItem('cart')) {
        console.log('useEffect-checkout');
        let data = localStorage.getItem('cart');
        setTimeout(() => {
          console.log('Data: ', data);
          let cData = JSON.parse(String(data));

          setCartData(cData);
          let tPrice = 0;
          cData.forEach((item: CartProduct) => {
            let price = item.price * item.quantity;
            tPrice = tPrice + price;
            console.log('tPrice: ', tPrice);
            setTotalPrice(tPrice);
          });
        }, 2000);
      }
    }
  }, [totalPrice]);


  const deleteProduct = (productId: string) => {
    // Remove the product from the cart
    const updatedCartData = cartData.filter((item) => item._id !== productId);
  
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
  
    setTimeout(() => {
      // Update cart data state
      setCartData(updatedCartData);
  
      // Update total price
      let tPrice = 0;
      updatedCartData.forEach((item: CartProduct) => {
        let price = item.price * item.quantity;
        tPrice = tPrice + price;
      });
      setTotalPrice(tPrice);
  
      // Update counter
      const totalCount = updatedCartData.reduce((total, item) => total + item.quantity, 0);
      setCounter(totalCount);
    }, 0);
  };
  

  const emptyCart = () => {
    // Clear cart data
    setCartData([]);
    setTotalPrice(0);
    setCounter(0);

    // Clear local storage
    localStorage.removeItem('cart');
  };

  const ProceedCheckOut = async () => {
    try {
      const stripePublishableKey =
        "pk_test_51NIF96Bgbn4bXZo0uyrGRpyb63MvmQEfC3iILxnPXTHelGJ7Q0nsXRzPXnktbZD3u9Qw8co6Aa7pIpO4bIF3gg8Z00vdiw06Ix";
      if (!stripePublishableKey) {
        console.error('Stripe publishable key is not defined');
        return;
      }
      //let data = JSON.stringify(cartData);
      const res = await fetch('/api/create-stripe-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      console.log("Ress", res);

      if (res.ok) {
        await res
          .json()
          .then((data) => {
            console.log('api-res: ', res);

            console.log('api-jData: ', data.data);

            router.push(data.data);
          })
          .catch((error) => {
            console.log('res-error: ', error);
          });
      } else {
        console.error('Error-api-res:', res);
      }
    } catch (error) {
      console.error('Error-stripe-session:', error);
    }
  };


  return (
    <div className='w-full min-h-screen h-fit flex flex-col justify-center items-center '>
      <div className='w-2/3 flex justify-center my-6'>
        
        <button
          onClick={emptyCart}
          className='bg-black py-2 px-4 text-white rounded-lg'
        >
          Empty Cart
        </button>
      </div>
      <div className='w-2/3 shadow-lg rounded-xl flex flex-col justify-center items-center'>
      <ul className='space-y-4 '>
         {cartData.map((item: CartProduct, index: number) => {
            return (
              <li
                key={index}
                className='flex border-b-2 py-4 border-gray-200 justify-center items-center gap-4'
              >
                <div className='w-1/2 flex'>
                 <div className='w-full flex justify-center items-center'>
                    <Image
                      alt='product image'
                      src={urlForImage(item.image).url()}
                      height={300}
                      width={300}
                      className='h-16 w-16 rounded object-cover'
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div className='m-2'>
                    <h3 className='text-sm text-gray-900'>{item.title}</h3>

                    <dl className='mt-0.5 space-y-px text-[12px] text-gray-600'>
                      <div>
                        <dt className='inline'>Price:</dt>
                        <dd className='inline'>${item.price}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className='w-1/3'>
                  <div className='flex flex-1 items-center justify-end gap-2'>
                    <form>
                      <label className='sr-only'> Quantity </label>

                      <input
                        type='number'
                        min='1'
                        value={item.quantity}
                        id='Line1Qty'
                        className='h-8 w-10 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                      />
                    </form>

                    <button
                      onClick={() => deleteProduct(item._id)}
                      className='text-gray-600 transition hover:text-red-600'
                    >
                      <span className='sr-only'>Remove item</span>
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className='space-y-4 text-center my-4'>
          <div className='w-full flex flex-row gap-4'>
            <div className='block rounded px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400'>
              Items In Cart ({counter})
            </div>

            <div className='block rounded  px-5 py-3 text-base font-bold text-gray-600 transition hover:ring-1 hover:ring-gray-400'>
              Total Price: ${totalPrice}
            </div>
          </div>

          <div className='flex justify-center item-center'>
            <button
              onClick={ProceedCheckOut}
              className='block  rounded bg-gray-800 px-10 py-4 font-normal text-white hover:bg-blue-700'
            >
              Checkout
            </button> </div>
          <Link
            href='/'
            className='inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600'
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;



















