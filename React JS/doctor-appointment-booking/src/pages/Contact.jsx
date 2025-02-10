import { assets } from "../assets/assets_frontend/assets";

export default function Contact()
{
    return (
        <div>
             <div className="text-center text-2xl pt-10 text-gray-500">
                <p>CONTACT <span className="text-gray-700 font-semibold"></span></p>
             </div>

             <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
                <img src={assets.contact_image} alt="" />

                <div>
                    <p>Our OFFICE</p>
                    <p>54709 Willms Station <br/> Suite 350, Wahington, USA</p>
                    <p>Tel: </p>
                </div>
             </div>
        </div>
    )
}