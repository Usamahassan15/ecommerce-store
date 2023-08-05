import { NextApiRequest, NextApiResponse } from 'next';
import { db, cartTable } from "../../../lib/drizzle";
import { sql } from "@vercel/postgres";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";
import { serialize } from "cookie"; // Import the 'serialize' function from the 'cookie' library

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  switch (request.method) {
    case 'GET':
      try {
        // It will create table if not exists
        await sql`
          CREATE TABLE IF NOT EXISTS cart( 
            id serial PRIMARY KEY , 
            user_id varchar(255) NOT NULL , 
            product_id varchar(255) NOT NULL, 
            quantity int NOT NULL 
          )
        `;
            
        const user_id = request.cookies.user_id || uuid(); // Use the cookie value or generate a new user_id
        const res = await db.select().from(cartTable).where(eq(cartTable.user_id, user_id));
        console.log("GET Request - Database Response:", res); // Log the database response
        return response.json(res);
      } catch (error) {
        console.error("GET Request - Database Error:", error); // Log the database error
        return response.json({ msg: "something went wrong" });
      }
    case 'POST':
      try {
        // body data passed from post req
        const req = request.body;

        let user_id = request.cookies.user_id || uuid(); // Use the cookie value or generate a new user_id
        if (!request.cookies.user_id) {
          // Set the 'user_id' cookie in the response
          const setCookieHeader = serialize("user_id", user_id, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week (adjust as needed)
            path: "/", // Adjust the path based on your requirements
          });
          response.setHeader("Set-Cookie", setCookieHeader);
        }

        if (req) {
          const res = await db.insert(cartTable).values({
            product_id: req.product_id,
            user_id: user_id,
            quantity: req.quantity,
          }).returning();
          console.log("POST Request - Database Response:", res); // Log the database response
          return response.json({ msg: "data added successfully", result: res });
        } else {
          throw new Error("Task field is required");
        }
      } catch (error) {
        console.error("POST Request - Database Error:", error); // Log the database error
        return response.json({ message: (error as { message: string }).message });
      }
    case 'DELETE':
      try {
        const user_id = request.cookies.user_id || uuid(); // Use the cookie value or generate a new user_id
        const res = await db.delete(cartTable).where(eq(cartTable.user_id, user_id)).returning();
        console.log("DELETE Request - Database Response:", res); // Log the database response
        return response.json(res);
      } catch (error) {
        console.error("DELETE Request - Database Error:", error); // Log the database error
        return response.json({ msg: "something went wrong" });
      }
    default:
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}










// import { NextRequest, NextResponse } from "next/server";
// import { db, cartTable } from "../../../lib/drizzle";
// import { sql } from "@vercel/postgres";
// import { v4 as uuid } from "uuid";
// import { setAtPath } from "sanity";
// import { eq } from "drizzle-orm";
// import { request } from "http";

// export const GET = async (request: NextRequest, response: NextResponse) => {
//   try {
//     // Retrieve the cart products from localStorage
//     const cartProducts: CartProduct[] = JSON.parse(
//       localStorage.getItem("cart_products") || "[]"
//     );

//     return NextResponse.json(cartProducts);
//   } catch (error) {
//     console.log((error as { message: string }).message);
//     return NextResponse.json({ msg: "something went wrong" });
//   }
// };


// type CartProduct = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
// };


// export const POST = async (request: NextRequest) => {
//   try {
//     const req: CartProduct = await request.json();
//     const uid = uuid();
//     let user_id = localStorage.getItem("user_id");

//     if (!user_id) {
//       // If user_id is not present in localStorage, set it to the generated uid
//       user_id = uid;
//       localStorage.setItem("user_id", uid);
//     }

//     // Retrieve the existing cart products from localStorage or initialize an empty array
//     const existingCartProducts: CartProduct[] = JSON.parse(
//       localStorage.getItem("cart_products") || "[]"
//     );

//     // Add the new cart product to the existing cart products
//     existingCartProducts.push(req);

//     // Store the updated cart products back in localStorage
//     localStorage.setItem("cart_products", JSON.stringify(existingCartProducts));

//     return NextResponse.json({ msg: "data added successfully", result: req });
//   } catch (error) {
//     return NextResponse.json({ message: (error as { message: string }).message });
//   }
// };


// export const DELETE = async (request: NextRequest) => {
//   try {
//     const user_id: string | null = localStorage.getItem("user_id");

//     // Retrieve the cart products from localStorage
//     const cartProducts: CartProduct[] = JSON.parse(
//       localStorage.getItem("cart_products") || "[]"
//     );

//     // Filter out the cart products belonging to the user
//     const updatedCartProducts = cartProducts.filter(
//       (product) => product._id !== user_id
//     );

//     // Store the updated cart products back in localStorage
//     localStorage.setItem("cart_products", JSON.stringify(updatedCartProducts));

//     return NextResponse.json(updatedCartProducts);
//   } catch (error) {
//     console.log((error as { message: string }).message);
//     return NextResponse.json({ msg: "something went wrong" });
//   }
// };
























// import { NextRequest, NextResponse } from "next/server";
// import { cartTable, db } from "@/lib/drizzle";
// import { v4 as uuid } from "uuid"; // Import uuid library
// import { eq } from "drizzle-orm";

// // Helper function to generate a new user ID
// const generateUserId = () => uuid();

// // GET method to retrieve user's cart items
// export async function GET(request: NextRequest) {
//   const userId = request.headers.get("Authorization"); // Get the userId from the Authorization header
//   if (!userId) {
//     return NextResponse.error();
//   }
//   try {
//     const res = await db
//       .select()
//       .from(cartTable)
//       .where(eq(cartTable.user_id, userId));
//     return NextResponse.json({ cartItems: res }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     return NextResponse.json({ error: "An error occurred while fetching cart items" }, { status: 500 });
//   }
// }

// // POST method to add an item to the cart
// export async function POST(request: NextRequest) {
//   const req = await request.json();

//   // Generate a new user ID
//   const userId = generateUserId();

//   // Validate request payload here if needed

//   try {
//     const res = await db
//       .insert(cartTable)
//       .values({
//         product_id: req.product_id,
//         quantity: req.quantity,
//         title: req.title,
//         image: req.image,
//         price: req.price,
//         description: req.description,
//         user_id: userId, // Use the generated userId
//       })
//       .returning();
//     return NextResponse.json({ cartItem: res }, { status: 201 });
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     return NextResponse.json({ error: "An error occurred while adding item to cart" }, { status: 500 });
//   }
// }

// // DELETE method to remove an item from the cart
// export async function DELETE(request: NextRequest) {
//   const req = await request.json();
//   const userId = request.headers.get("Authorization"); // Get the userId from the Authorization header

//   if (!userId) {
//     return NextResponse.error();
//   }

//   // Validate request payload here if needed

//   try {
//     const res = await db.delete(cartTable).where(eq(cartTable.id, req.id));
//     return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting item from cart:", error);
//     return NextResponse.json({ error: "An error occurred while deleting item from cart" }, { status: 500 });
//   }
// }

// // PUT method to update cart item quantities
// export async function PUT(request: NextRequest) {
//   const req = await request.json();
//   const userId = request.headers.get("Authorization"); // Get the userId from the Authorization header

//   if (!userId) {
//     return NextResponse.error();
//   }

//   // Validate request payload here if needed

//   try {
//     const promises = req.map(async (item: any) => {
//       const updateFields = {
//         quantity: item.quantity,
//         // Add other fields to update as needed
//       };

//       const res = await db
//         .update(cartTable)
//         .set(updateFields)
//         .where(eq(cartTable.id, item.id))
//         .returning();
//       return res;
//     });

//     const results = await Promise.all(promises);

//     return NextResponse.json({ updatedItems: results }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating cart items:", error);
//     return NextResponse.json({ error: "An error occurred while updating cart items" }, { status: 500 });
//   }
// }






// import { NextRequest, NextResponse } from 'next/server';
// import { db, cartTable } from '@/lib/drizzle';
// import { Image as IImage } from 'sanity';
// import { a, ad } from 'drizzle-orm/column.d-66a08b85';
// import { v4 as uuid } from "uuid";

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
//     return NextResponse.json({ res });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: 'Oops!!! Something Went Wrong' });
//   }
// };

// export const POST = async (request: Request) => {
//   let cartData: CartProduct[] = [];
//   let dbData: {
//     user_id: string | a<unknown> | ad<string, any>;
//     product_id: string | a<unknown> | ad<string, any>;
//     quantity: number | a<unknown> | ad<string, any>;
//     id?: number | a<unknown> | ad<string, any> | undefined;
//   }[] | { product_id: string; quantity: number; user_id: any }[] = [];

//   const localStorageData = localStorage.getItem('cart');
//   const userId = localStorage.getItem('userid'); // Retrieve the user ID from localStorage

//   console.log('localStorageData:', localStorageData);
//   console.log('userId:', userId);

//   if (localStorageData) {
//     cartData = JSON.parse(localStorageData);
//   }

//   console.log('cartData:', cartData);

//   cartData.map((item) => {
//     let data = {
//       product_id: item._id,
//       quantity: item.quantity,
//       user_id: userId, // Use the retrieved user ID
//     };

//     dbData.push(data);
//   });

//   console.log('dbData:', dbData);

//   try {
//     const dbRes = await db.insert(cartTable).values(dbData).returning();
//     localStorage.removeItem('cart');
//     console.log('dbRes:', dbRes);
//     return NextResponse.json({ success: true, message: 'Cart data saved to database' });
//   } catch (error) {
//     console.log('dbError:', error);
//     return NextResponse.json({ success: false, message: 'Error saving cart data to database' });
//   }
// };


// import { NextRequest, NextResponse } from "next/server";
// import { db, cartTable } from "@/lib/drizzle";
// import { v4 as uuid } from "uuid";
// import { cookies } from "next/headers";

// //------- GET
// export const GET = async (request:Request) => {
//     try {
//         const res = await db.select().from(cartTable);
//         return NextResponse.json({res});        
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({message: "AWW ERROR !!"});     
//     }  
// }

// //------- POST

// export const POST = async (request:Request) => {

//     const req = await request.json();

//     //----- To save user ID in user's browser cookies

//     const uid = uuid(); // Generate random string that we use as ID 
//     const setCookies = cookies(); // Create new cookie object 
//     const userId = cookies().get("user_id"); // Get userID that is saved in the browser
    
//     if(!userId){ // if it doesn't exist, create one 
//         setCookies.set("user_id", uid);  // Set ID in the cookies of user browser     
//     }

//     try { 
//         const res = await db.insert(cartTable).values({ // Set data in database
//             product_id: req.product_id,
//             quantity: 1,
//             user_id: cookies().get("user_id")?.value as string

//         }).returning();
//         console.log("result ", res);
        
//         return NextResponse.json({res});        
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({message: "ERROR !!"})      
//     }  
// }