import Image from "next/image"
import { BsChevronDown } from "react-icons/bs"
import shoes from "@/assets/shoes-2.jpeg"
import { NavigationMenuDemo } from "../../../../components/menubar"
import cover from "@/assets/shoes.jpg"

export default function Home(){
    return (
            <div>    
                <div className="hidden md:block pl-6 mt-28"><NavigationMenuDemo /></div>
                <div className="flex justify-center items-center bg-gray-100 py-4 pt-20 md:pt-0">
                    <h1 className="flex justify-center md:mt-3 ">New summer sale - Limited time only!</h1>
                </div>
                <div className="lg:hidden">
                    <Image src={shoes} alt="Image" className="w-[1500px] h-[400px]"/>
                </div>
                <div className="hidden lg:block bg-green-300">
                    <Image src={cover} alt="Image" className="w-full h-[520px]"/>
                </div>
            </div> 
    )   
}