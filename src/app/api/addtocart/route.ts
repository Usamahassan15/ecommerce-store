
// import { NextRequest, NextResponse } from 'next/server';
// import { db, cartTable } from '@/lib/drizzle';
// import { Image as IImage } from 'sanity';
// import { v4 as uuid } from 'uuid';
// import { Placeholder, SQL } from 'drizzle-orm';
// import { Client } from '@vercel/postgres'
// import { drizzle } from 'drizzle-orm/vercel-postgres';

// type CartProduct = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: IImage;
// };



// export const GET = async (request: Request) => {
//   try {
//     const res = await db.select().from(cartTable);
//     console.log('GET - res:', res);
//     return NextResponse.json({ res });
//   } catch (error) {
//     console.log('GET - error:', error);
//     return NextResponse.json({ message: 'Oops!!! Something Went Wrong' });
//   }
// };

// export const POST = async (request: Request) => {
//   try {
//     const { data } = await request.json();
//     console.log('data: ', data);

//     let userId = localStorage.getItem('userId');

//     // Generate a new UUID if userId is not available in local storage
//     // if (!userId) {
//     //   userId = uuid();
//     //   localStorage.setItem('userId', userId);
//     // }

//     // const cartData: CartProduct[] = data;

//     // // Create a new array with updated user_id values
//     // const dbData = cartData.map((item) => ({
//     //   product_id: item._id,
//     //   quantity: item.quantity,
//     //   user_id: userId,
//     // }));

//     // const dbRes = await db.insert(cartTable).values(dbData).returning().execute();

//  // Generate a new UUID if userId is not available in local storage
// if (!userId) {
//   userId = uuid();
//   localStorage.setItem('userId', userId);
// }

// const cartData: CartProduct[] = data;

// // Create a new array with updated user_id values
// const dbData = cartData.map((item) => ({
//   product_id: item._id,
//   quantity: item.quantity,
//   // Use SQL.null() instead of null
//   user_id: userId ?? SQL.null(),
// }));

// const dbRes = await db
//   .insert(cartTable)
//   .values(dbData)
//   .returning()
//   .execute();



//     // Save cart data to local storage
//     localStorage.setItem('cartData', JSON.stringify(cartData));

//     return NextResponse.json({ data: dbRes });
//   } catch (error) {
//     console.log('POST - error:', error);
//     return NextResponse.json({ message: 'Oops!!! Something Went Wrong' });
//   }
// };


// import { NextRequest, NextResponse } from 'next/server';
// import { db, cartTable } from '@/lib/drizzle';
// import { Image as IImage } from 'sanity';
// import { v4 as uuid } from 'uuid';
// import { Placeholder } from 'drizzle-orm';
// import { Client } from '@vercel/postgres'
// // Use drizzle from drizzle-orm/vercel-postgres
// import { drizzle } from 'drizzle-orm/vercel-postgres';
// import { SQL } from 'drizzle-orm';


// type CartProduct = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: IImage;
// };



// export const GET = async (request: Request) => {
//   try {
//     const res = await db.select().from(cartTable);
//     console.log('GET - res:', res);
//     return NextResponse.json({ res });
//   } catch (error) {
//     console.log('GET - error:', error);
//     return NextResponse.json({ message: 'Oops!!! Something Went Wrong' });
//   }
// };

// export const POST = async (request: Request) => {
//   try {
//     const { data } = await request.json();
//     console.log('data: ', data);

//     let userId = localStorage.getItem('userId');

//     // Generate a new UUID if userId is not available in local storage
//     // if (!userId) {
//     //   userId = uuid();
//     //   localStorage.setItem('userId', userId);
//     // }

//     // const cartData: CartProduct[] = data;

//     // // Create a new array with updated user_id values
//     // const dbData = cartData.map((item) => ({
//     //   product_id: item._id,
//     //   quantity: item.quantity,
//     //   user_id: userId,
//     // }));

//     // const dbRes = await db.insert(cartTable).values(dbData).returning().execute();

//  // Generate a new UUID if userId is not available in local storage
// if (!userId) {
//   userId = uuid();
//   localStorage.setItem('userId', userId);
// }

// const cartData: CartProduct[] = data;

// // Create a new array with updated user_id values
// const dbData = cartData.map((item) => ({
//   product_id: item._id,
//   quantity: item.quantity,
//   // Use SQL.null() instead of null
//   user_id: userId ?? SQL.null(),
// }));

// const dbRes = await db
//   .insert(cartTable)
//   .values(dbData)
//   .returning()
//   .execute();



//     // Save cart data to local storage
//     localStorage.setItem('cartData', JSON.stringify(cartData));

//     return NextResponse.json({ data: dbRes });
//   } catch (error) {
//     console.log('POST - error:', error);
//     return NextResponse.json({ message: 'Oops!!! Something Went Wrong' });
//   }
// };


