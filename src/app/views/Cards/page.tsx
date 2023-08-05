import React from 'react';
import Image from 'next/image';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../../sanity/lib/image';
import { Image as IImage } from 'sanity';
import { Item } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

export const getProductData = async () => {
  const res = await client.fetch(
    `*[_type=="product"]{
      price,
      _id,
      title,
      details,
      image,
      category -> {
        name
      }
    }`
  );
  return res;
};

interface IProduct {
  _id: string;
  image: IImage[] | undefined;
  price: number;
  title: string;
  details: string;
}

export default async function CardSingle() {
  const data: IProduct[] = await getProductData();

  

  return (
    <div>
            <div className="pt-12 lg:pl-20 pl-6 font-semibold text-2xl">
                 <h1>Top Picks</h1>
            </div>
    <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 lg:px-20 lg:gap-8 xl:grid-cols-4 px-6 pt-8  xl:px-16">
      {data.map((item: IProduct) => (
        <div key={item._id} className="card xl:w-[300px]">
          {item.image && item.image[0] && (
            <Image

              src={urlForImage(item.image[0]as any).url()}
              alt="Image"
              className="w-[900px] h-[188px] bg-gray-200 shadow-sm object-cover"
              width={800}
              height={180}
            />
          )}
          <div className="flex-col pt-3">
            <h2 className='font-semibold'>{item.title}</h2>
            <h3 className='font-semibold'>${item.price}</h3>
          </div>
         

          <div className="lg:flex justify-between items-center">
            <div className="justify-center py-2">
            <Link href={`/preview/${item?._id}`}>
              <button className="text-center text-white bg-slate-800 h-10 w-full lg:w-40 rounded-lg">
                Shop Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
 </div>
 
        <div className="flex justify-center item-center py-10">
               <Link href='/Product'><button className="text-center text-white py-2 bg-slate-800 h-10 w-40 rounded">View All Products</button></Link>
        </div>
    </div>
  );
}









