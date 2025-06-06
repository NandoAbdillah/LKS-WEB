import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {AppContext} from "../context/AppContext";


export default function Doctors()
{
    // Mengambil parameter
    const {speciality} = useParams();

    const {doctors} = useContext(AppContext);

    const [filterDoc, setFilterDoc] = useState([]);

    const navigate = useNavigate();

    useEffect(()=> {
        const applyFilter = () => {
            if(speciality) 
            {
                setFilterDoc(doctors.filter(doc=>doc.speciality === speciality));
            } else {
                setFilterDoc(doctors);
            }
        }
        applyFilter();
        console.log(doctors);
    }, [doctors, speciality])

    return (
        <div>
             <p className="text-gray-600">Browse through the doctor specialist</p>
             <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <div className="flex flex-col gap-4 text-sm text-gray-600 ">
                    <p onClick={()=> speciality === 'General physician' ? navigate('/doctors'):navigate(`/doctors/General physician`)} className={`w-[94-vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-500 ${speciality === 'General physician' ? 'bg-indigo-100 text-black' : ''} `}>General Physician</p>
                    <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors'):navigate(`/doctors/Gynecologist`)} className={`w-[94-vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-500 ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''} `}>Gynecologist</p>
                    <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors'):navigate(`/doctors/Dermatologist`)} className={`w-[94-vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-500 ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''} `}>Dermatologist</p>
                    <p onClick={()=> speciality === 'Pediatricans' ? navigate('/doctors'):navigate(`/doctors/Pediatricians`)} className={`w-[94-vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-500 ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''} `}>Pediatricians</p>
                    <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors'):navigate(`/doctors/Neurologist`)} className={`w-[94-vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-500 ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''} `}>Neurologist</p>
                    <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors'):navigate(`/doctors/Gastroenterologist`)} className={`w-[94-vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-500  ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''}`}>Gastroenterologist</p>
                </div>

                <div className="w-full grid grid-cols-auto gap-4 gap-y-6 ">
                    {
                        filterDoc.map((doctor,index)=>(
                            <div onClick={()=>navigate(`/appointment/${doctor._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={index}>
                            <img className="bg-blue-50 hover:bg-blue-500" src={doctor.image} alt={doctor.name} />
                            <div className="p-4 ">
                                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                    <p>Available</p>
                                </div>
                                <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                                <p className="text-gray-600 text-sm ">{doctor.speciality}</p>
                            </div>
                        </div>
                        ))
                    }
                </div>
             </div>
        </div>
    )
}