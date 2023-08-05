// import React from 'react';
// import { client } from '@/lib/sanityClient';
// import { urlForImage } from '../../../sanity/lib/image';
// import { Image as IImage} from 'sanity';
// import { Item } from '@radix-ui/react-navigation-menu';

// export const getProductData = async () => {
//   const res = await client.fetch(`*[_type=="product"]{
//     title,
//     description,
//     image,
//   }`);
//   return res;
// };

// interface Iproduct {
//   _id: string;
//   image: IImage;
// }

// export default async function Data() {
//   const data: Iproduct[] = await getProductData();

//   return (
//     <div className="flex justify-center items-center gap-x-10">
//       {data.map((item:any) => (
//         <div key={item.title}>
//           <img
//             width={200}
//             height={300}
//             src={urlForImage(item.image).url()}
//             alt="product"
//           />
//           <div>
//             <h3>{item.title}</h3>
//             <p>{item.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from 'react';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../sanity/lib/image';
import { Image as IImage } from 'sanity';
import Image from 'next/image';
import { Item } from '@radix-ui/react-navigation-menu';

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    title,
    description,
    image,
  }`);
  return res;
};

interface Iproduct {
  title:string;
  description:string;
  _id: string;
  image: IImage[];
}

export default async function Data() {
  const data: Iproduct[] = await getProductData();

  return (
    <div className="flex justify-center items-center gap-x-10">
      {data.map((item: Iproduct) => (
        <div key={item._id}>
          <Image
            width={200}
            height={300}
            src={urlForImage(item.image[0]).url()}
            alt="product"
          />
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


