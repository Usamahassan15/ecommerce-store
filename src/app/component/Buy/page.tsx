import Link from "next/link"

export default function Button(){
    return(
        <div className="flex-col justify-center items-center py-10">
            <div className="flex justify-center items-center py-10 space-x-2">
            <Link href="/download"
                className="inline-block rounded bg-slate-300 px-8 py-3 text-sm  font-medium text-black 
                transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-white">
                For Buyers
            </Link>
            
            <Link href="/download"
                className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-slate-600 
                transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-slate-600">
                For Sellers
            </Link>
            </div>
            <div>
                <div className="font-extrabold text-4xl px-4 text-center">
                    <h1>Online shopping made easy.</h1>
                </div>
                <div className="font-semibold text-3xl text-center px-4 pt-2 text-slate-600">
                    <h1>Shop hundreds of products from sellers worldwide.</h1>
                </div>
             </div>
      </div>
    )
}



// import Link from "next/link";


// export default function Button() {
//     return(
//         <div className="flex-col justify-center ">
//             <div className="flex justify-center font-semibold text-center  py-10 text-black">
//                 <div className="bg-red-100 h-10 w-52 rounded space-x-6 py-2">  
                   
//                     <Link href='/Buy2'>For Buyers</Link>
//                     <Link href='/Sale'>For Seller</Link>
                    
//                 </div>
//                 <div>
                   
//                 </div>
//                 <div>
                    
//                 </div>
//             </div>
//         </div>
//     )
// }