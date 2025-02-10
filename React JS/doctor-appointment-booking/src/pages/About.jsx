import { assets } from "../assets/assets_frontend/assets";

export default function About()
{
    return (
        <div>
             <div className="text-center text-2xl pt-10 text-gray-500"> 
                <p>ABOUT <span className="text-gray-700 font-medium ">US</span></p>
             </div>

             <div className="my-10 flex flex-col md:flex-row gap-12">
                <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600  ">
                    <p>Welcome to ZphereHealth Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta, justo at dapibus mollis, magna erat malesuada lacus, ut vulputate lacus purus a tortor. Mauris id molestie ipsum. Maecenas ut justo elit. Sed a quam quis eros iaculis volutpat. Duis molestie enim id augue tincidunt malesuada. Aliquam congue ante et euismod pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis, odio sed viverra porta, metus magna egestas nunc, at aliquet dui neque et neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam non viverra enim. Aliquam quis justo velit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis, odio sed viverra porta, metus magna egestas nunc, at aliquet dui neque et neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam non viverra enim. Aliquam quis justo velit.</p>
                    <b className="text-gray-600">Our Vision</b>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis, odio sed viverra porta, metus magna egestas nunc, at aliquet dui neque et neque. </p>
                </div>
             </div>

             <div className="text-xl my-4">
                <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span> </p>
             </div>

             <div className="flex flex-col md:flex-row mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600">
                    <b>Efficiency:</b>
                    <p>Steamlined appointment scheduling that fits into your busy lifestyle</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600">
                    <b>Convenience:</b>
                    <p>Access to a network trusted healthcare professionals in your area</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600">
                    <b>Personalization:</b>
                    <p>Tailored recommendations and remiders to help you stay on top of your health.</p>
                </div>
             </div>


        </div>
    )
}