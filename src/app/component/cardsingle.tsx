// import React from 'react';
// import Image from 'next/image';
// import { client } from '@/lib/sanityClient';
// import { urlForImage } from '../../../sanity/lib/image';
// import { Image as IImage } from 'sanity';
// import { Item } from '@radix-ui/react-navigation-menu';
// import Link from 'next/link';

// export const getProductData = async () => {
//   const res = await client.fetch(
//     `*[_type=="product"] {
//       price,
//       _id,
//       title,
//       details,
//       image,
//       category -> {
//         name
//       }
//     }`
//   );
//   return res;
// };

// interface IProduct {
//   _id: string;
//   image: IImage[] | undefined;
//   price: number;
//   title: string;
//   details: string;
// }

// export default async function CardSingle() {
//   const data: IProduct[] = await getProductData();

  

//   return (
//     <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
//       {data.map((item: IProduct) => (
//         <div key={item._id} className="card xl:w-[300px]">
//           {item.image && item.image[0] &&   (
//             <Image
//               src={urlForImage(item.image[0]as any).url()}
//               alt="Image"
//               className="w-[900px] h-[188px] bg-gray-200 shadow-sm object-cover"
//               width={800}
//               height={180}
//             />
//           )}
//           <div className="flex-col pt-3">
//             <h2 className='font-semibold'>{item.title}</h2>
//             <h3 className='font-semibold'>${item.price}</h3>
//           </div>
          

//           <div className="lg:flex justify-between items-center">
//             <div className="justify-center py-2">
//               <Link href={`/preview/$[item.id]`}>
//               <button className="text-center text-white bg-slate-800 h-10 w-full lg:w-40 rounded-lg">
//                 Shop Now
//               </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React from 'react';
import Image from 'next/image';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../sanity/lib/image';
import { Image as IImage } from 'sanity';
import { Item } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

export const getProductData = async () => {
  const res = await client.fetch(
    `*[_type=="product"] {
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

  // Slice the data array to contain only the first four items
  // const slicedData = data.slice(0, 4);

  return (
    <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
      {data.map((item: IProduct) => (
        
        <div className="card xl:w-[300px]" key={item._id}>

          {
          item.image && item.image[0] && (
            <Image
              src={urlForImage(item.image[0] as any).url()}
              alt="Image"
              className="w-[900px] h-[188px] bg-gray-200 shadow-sm object-cover"
              width={800}
              height={180}
            />
          )}    
          <div className="flex-col pt-3">
            <h2 className="font-semibold">{item.title}</h2>
            <h3 className="font-semibold">${item.price}</h3>
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
  );
}





// import React from 'react';
// import Image from 'next/image';
// import { client } from '@/lib/sanityClient';
// import { urlForImage } from '../../../sanity/lib/image';
// import { Image as IImage } from 'sanity';
// import { Item } from '@radix-ui/react-navigation-menu';

// export const getProductData = async () => {
//   const res = await client.fetch(
//     `*[_type=="product"]{
//       price,
//       _id,
//       title,
//       details,
//       image,
//       category -> {
//         name
//       }
//     }`
//   );
//   return res;
// };

// interface IProduct {
//   _id: string;
//   image: IImage[] | undefined;
//   price: number;
//   title: string;
//   details: string;
// }

// export default async function CardSingle() {
//   const data: IProduct[] = await getProductData();

//   return (
//     <div className="container flex flex-row w-[700px] h-96 space-x-8">
//       {data.map((item: IProduct) => (
//         <div key={item._id} className="card">
//           {item.image && (
//             <Image
//               key={item.image[0]?._key || ''}
//               src={urlForImage(item.image[0]?.asset?._ref || '').url()}
//               alt="Image"
//               className="w-[800px] h-[180px] bg-gray-200 shadow-sm"
//               width={800}
//               height={180}
//             />
//           )}
//           <div className="flex-col pt-3 ">
//             <h3 className='font-semibold'>{item.title}</h3>
//             <span className='font-semibold'>{item.price}</span>
//           </div>
//           <div><p>{item.details}</p></div>

//           <div className="lg:flex justify-between items-center">
//             {/* <div className="self-center pt-3">
//               <button className="text-justify-center text-black border-2 border-inherit rounded h-10 w-full lg:w-40">
//                 Quick View
//               </button>
//             </div> */}
//             <div className="justify-center py-2">
//               <button className="text-center text-white bg-slate-800 h-10 w-full lg:w-40 rounded-lg">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


