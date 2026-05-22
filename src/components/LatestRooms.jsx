import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { LuLayers, LuUsers, LuArrowRight } from "react-icons/lu";

export default function LatestRooms() {
    const [latestRooms, setLatestRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://studynook-server-alpha.vercel.app/api/rooms`)
            .then(res => {
                setLatestRooms(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-12 text-center md:text-left border-b border-[#EADFC9] pb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-black text-[#2E1A0F] tracking-tight">Available Study Rooms</h2>
                    <p className="text-sm text-stone-500 font-medium mt-1">Explore our newly listed quiet sanctuaries and collaborative alcoves.</p>
                </div>
                <Link to="/rooms" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5C2E16] hover:text-[#C29B38] transition-colors group">
                    <span>View All Rooms</span>
                    <LuArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5C2E16]"></div>
                </div>
            ) : latestRooms.length === 0 ? (
                <div className="bg-white rounded border border-[#EADFC9] p-16 text-center max-w-xl mx-auto shadow-sm">
                    <p className="text-sm uppercase tracking-wider font-bold text-stone-400">No Chambers Published Yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestRooms.map((room, idx) => (
                        <motion.div
                            key={room._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            whileHover={{
                                y: -6,
                                scale: 1.01,
                                boxShadow: "0 10px 25px -5px rgba(92, 46, 22, 0.1), 0 8px 10px -6px rgba(92, 46, 22, 0.1)"
                            }}
                            className="bg-white rounded border border-[#EADFC9] overflow-hidden flex flex-col transition-shadow duration-200 group w-full"
                        >
                            <div className="h-48 w-full bg-stone-100 relative overflow-hidden">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = "https://unsplash.com"; }}
                                />
                                <div className="absolute top-3 right-3 bg-[#5C2E16] text-[#FBF8F3] font-serif font-bold text-sm px-3 py-1 rounded shadow">
                                    ${room.hourlyRate}/hr
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-[#2E1A0F] line-clamp-1 mb-2">{room.name}</h3>
                                    <p className="text-stone-500 text-xs font-medium leading-relaxed mb-5">
                                        {room.description?.length > 100 ? `${room.description.substring(0, 100)}...` : room.description}
                                    </p>
                                </div>

                                <div>
                                    <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 mb-5 border-t border-b border-stone-100 py-3 bg-[#FBF8F3]/30 px-2 rounded">
                                        <div className="flex items-center gap-1.5 truncate">
                                            <LuLayers className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                                            <span>{room.floor}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 truncate">
                                            <LuUsers className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                                            <span>{room.capacity} people</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mb-6 min-h-[26px]">
                                        {room.amenities?.slice(0, 3).map((amenity, idx) => (
                                            <span key={idx} className="text-[10px] uppercase font-bold bg-[#FBF8F3] text-stone-600 px-2.5 py-1 rounded border border-[#EADFC9]">
                                                {amenity}
                                            </span>
                                        ))}
                                        {room.amenities?.length > 3 && (
                                            <span className="text-[10px] uppercase font-bold bg-amber-50 text-[#C29B38] px-2.5 py-1 rounded border border-amber-200/60">
                                                +{room.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        to={`/rooms/${room._id}`}
                                        className="block w-full py-3 text-center text-xs uppercase tracking-widest font-bold text-[#5C2E16] bg-[#FBF8F3] hover:bg-[#5C2E16] hover:text-white rounded border border-[#EADFC9] transition-all cursor-pointer"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}
