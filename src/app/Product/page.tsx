import Image from "next/image";
import chair from "@/assets/Office-Chair.jpg"
import CardSingle from "../component/cardsingle";
// import ViewP from "./viewP";


export default function Product(){
    return(
        <div className="space-y-12 xl:px-20 px-7">
            
            <div>
                <div className="bg-white shadow-md border border-gray-200 rounded-lg ">
                <a href="#">
                    <Image className="rounded-t-lg h-40 w-full" src={chair} alt="Image"/>
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Products</h5>
                    </a>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lore</p>
                    <a href="#" className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-gray-200 dark:hover:bg-gray-200 dark:focus:ring-gray-200">
                        Show more
                        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>
                </div>
            </div>


        {/* Products list */}
       
            <div>
                {/* @ts-expect-error Async Server Component */}
                <CardSingle/>
            </div>


        </div> 
    )
}