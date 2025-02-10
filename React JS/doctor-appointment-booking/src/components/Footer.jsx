import { assets } from "../assets/assets_frontend/assets";

export default function Footer() {
    
    return(
        <div className="md:mx-10 ">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* --------- Left Section --------- */}
                <div>
                    <img className="mb-5 w-40 " src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6"> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nunc fermentum, lobortis nunc non, sollicitudin purus. Integer ac augue feugiat, pretium ante non, suscipit ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus elit risus, finibus non condimentum vel, finibus nec metus. Curabitur cursus nulla egestas nisl ultricies malesuada. Vestibulum ultrices enim leo, id eleifend sem hendrerit quis. Sed pulvinar libero sollicitudin condimentum pulvinar.
                    </p>
                </div>
                {/* --------- Center Section --------- */}
                <div>
                 <p className="text-xl font-medium mb-5">COMPANY</p>
                 <ul className="flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                 </ul>

                </div>
                {/* --------- Right Section --------- */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+62 858-9562-7228</li>
                        <li>nandoabdilah@gmail.com</li>
                    </ul>

                </div>

            </div>

            {/* -------- Copyright Text -------- */}
            <div>
                <hr/>
                <p className="py-5 text-sm text-center">Copyright 202%@ Zphere - All Right Reserved.</p>
            </div>
        </div>
    );

}