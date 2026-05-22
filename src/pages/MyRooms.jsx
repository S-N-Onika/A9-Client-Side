import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    LuLayers,
    LuUsers,
    LuDollarSign,
    LuTrash2,
    LuInbox,
    LuLoaderCircle,
    LuArrowRight
} from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";

export default function MyRooms() {
    const { user } = useContext(AuthContext);
    const [myRooms, setMyRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "StudyNook - My Managed Rooms";
        if (user?.email) {
            axios.get(`http://localhost:5000/api/rooms?email=${user.email}`, { withCredentials: true })
                .then((res) => {
                    const roomData = Array.isArray(res.data) ? res.data : [];
                    const filtered = roomData.filter(room => room.ownerEmail === user.email);
                    setMyRooms(filtered);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to fetch managed Rooms.");
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleDelete = (roomId) => {
        if (!window.confirm("Are you absolutely sure you want to delete this study Room asset permanent record?")) {
            return;
        }

        const clearToastId = toast.loading("Expunging study sanctuary record...");

        axios.delete(`http://localhost:5000/api/rooms/${roomId}`, { withCredentials: true })
            .then(() => {
                toast.success("Study sanctuary record expunged successfully!", { id: clearToastId });
                setMyRooms(prev => prev.filter(room => room._id !== roomId));
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response?.data?.message || "Failed to process target index deletion request.", { id: clearToastId });
            });
    };

    if (loading) {
        return (
            <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-[#FBF8F3]">
                <LuLoaderCircle className="w-8 h-8 text-[#C29B38] animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-3">
                    Fetching managed Rooms...
                </span>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#FBF8F3] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                <div className="mb-10 text-center md:text-left border-b border-[#EADFC9] pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#2E1A0F] tracking-tight mb-1">
                            Managed Rooms
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-500 font-medium">
                            Track, audit, modify, or terminate listed infrastructure assets across campus library wings.
                        </p>
                    </div>
                    <Link
                        to="/add-room"
                        className="inline-flex items-center justify-center gap-2 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] px-5 py-3 rounded text-xs font-bold uppercase tracking-widest shadow-sm transition-all active:scale-95 shrink-0"
                    >
                        <span>Deploy New Room</span>
                        <LuArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {myRooms.length === 0 ? (
                    <div className="bg-white border border-[#EADFC9] rounded p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm">
                        <div className="w-12 h-12 bg-[#FBF8F3] text-stone-400 flex items-center justify-center rounded mx-auto mb-4 border border-[#EADFC9]/60">
                            <LuInbox className="w-5 h-5" />
                        </div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#2E1A0F] mb-1">
                            No Operational Assets Found
                        </h3>
                        <p className="text-xs text-stone-400 font-medium max-w-xs mx-auto mb-6">
                            You have not registered any custom public study spaces under your owner profile account .
                        </p>
                        <Link
                            to="/add-room"
                            className="inline-flex items-center justify-center py-2.5 px-4 rounded border-2 border-[#5C2E16] text-[#5C2E16] font-bold text-xs uppercase tracking-widest hover:bg-[#5C2E16] hover:text-white transition-all"
                        >
                            List First Sanctuary
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* MOBILE VIEW (NO SCROLL) */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {myRooms.map((room) => (
                                <div
                                    key={room._id}
                                    className="bg-white border border-[#EADFC9] rounded p-4 shadow-sm flex flex-col gap-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={room.image}
                                            alt={room.name}
                                            className="w-14 h-14 rounded object-cover border border-[#EADFC9] shrink-0"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d";
                                            }}
                                        />
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-sm text-[#2E1A0F] truncate">
                                                {room.name}
                                            </h4>
                                            <p className="text-[10px] text-stone-400 truncate">
                                                {room._id}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-[#FBF8F3] p-2 rounded border border-[#EADFC9]">
                                            <p className="text-[10px] text-stone-400">Floor</p>
                                            <p className="font-bold">{room.floor}</p>
                                        </div>

                                        <div className="bg-[#FBF8F3] p-2 rounded border border-[#EADFC9]">
                                            <p className="text-[10px] text-stone-400">Capacity</p>
                                            <p className="font-bold">{room.capacity}</p>
                                        </div>

                                        <div className="bg-[#FBF8F3] p-2 rounded border border-[#EADFC9] col-span-2">
                                            <p className="text-[10px] text-stone-400">Rate</p>
                                            <p className="font-bold text-[#5C2E16]">
                                                {parseFloat(room.hourlyRate).toFixed(2)} /hr
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            to={`/edit-room/${room._id}`}
                                            className="flex-1 text-center py-2 text-xs font-bold border border-stone-200 rounded"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(room._id)}
                                            className="flex-1 py-2 text-xs font-bold border border-rose-200 text-rose-700 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded border border-[#EADFC9] overflow-hidden shadow-sm hidden md:block">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="bg-[#2C1A11] border-b-2 border-[#C29B38] text-[#FBF8F3] text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                                            <th className="py-4 px-6">Room Identity Reference</th>
                                            <th className="py-4 px-4">Floor Plan</th>
                                            <th className="py-4 px-4">Max Capacity</th>
                                            <th className="py-4 px-4">Hourly Cost</th>
                                            <th className="py-4 px-6 text-center">Operational Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-stone-100 text-[#2E1A0F] text-xs sm:text-sm">
                                        {myRooms.map((room) => (
                                            <tr key={room._id} className="hover:bg-[#FBF8F3]/30 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={room.image}
                                                            alt={room.name}
                                                            className="w-12 h-12 rounded object-cover border border-[#EADFC9]"
                                                            onError={(e) => {
                                                                e.target.src =
                                                                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d";
                                                            }}
                                                        />
                                                        <div>
                                                            <h4 className="font-bold text-sm truncate">
                                                                {room.name}
                                                            </h4>
                                                            <p className="text-[10px] text-stone-400">
                                                                {room._id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4 font-bold ">{room.floor}</td>
                                                <td className="py-4 px-4 font-bold">{room.capacity}</td>
                                                <td className="py-4 px-4 font-bold">
                                                    {parseFloat(room.hourlyRate).toFixed(2)} /hr
                                                </td>

                                                <td className="py-4 px-6">
                                                    <div className="flex justify-center gap-2">
                                                        <Link
                                                            to={`/edit-room/${room._id}`}
                                                            className="p-2 border rounded"
                                                        >
                                                            <FiEdit className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(room._id)}
                                                            className="p-2 border rounded text-rose-700"
                                                        >
                                                            <LuTrash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}