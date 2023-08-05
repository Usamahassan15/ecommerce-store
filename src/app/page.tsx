import Home from "./views/Home/page";
import Navbar from "./component/Navbar/page";
import Buy from "./component/Buy/page";
import Footer from "./component/Footer/page";
import Cards from "./views/Cards/page";

import Signin from "./views/SignIn/page";


export default function app(){
  return(
    <div>
     
      <Home/>
      <Buy/>
      {/* @ts-expect-error Async Server Component */}
      <Cards/>
      {/* <Signin /> */}
      <data/>
      
    </div>
    
  )
}













// import {client} from "@/lib/sanityClient"
// import { Item } from "@radix-ui/react-navigation-menu";

// export const getProductData = async () => {
//   const res = await client.fetch(`*[_type=="product"]{
//     title,
//     description,
//   }`);
//   return res
// }

// interface Iproduct {
//   title:string,
//   description:string,
//   image:string[]
// }

// export default async function Data(){

//   const data:Iproduct[] = await getProductData()
  
//   return(
//     <div>
//       {data.map((Item) => (
//         <>
//         <h1>{Item.title}</h1>
//         </>
//       ))}
//     </div>

//   )
// }














