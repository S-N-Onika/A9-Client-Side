import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { LuCalendarDays, LuClock, LuTrash2, LuInbox, LuLoaderCircle, LuCompass } from "react-icons/lu";
import toast from "react-hot-toast";

export default function MyBookings() {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "StudyNook - My Active Reservations";
        if (user?.email) {
            axios.get(`http://localhost:5000/api/bookings`, { withCredentials: true })
                .then((res) => {
                    setBookings(Array.isArray(res.data) ? res.data : []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to compile active reservation matrix records.");
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleCancelBooking = (bookingId) => {
        if (!window.confirm("Are you absolutely sure you want to terminate this study chamber reservation slot?")) {
            return;
        }

        const clearToastId = toast.loading("Processing atomic cancellation pipeline...");

        axios.patch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {}, { withCredentials: true })
            .then(() => {
                toast.success("Reservation cancelled successfully!", { id: clearToastId });
                setBookings(prev =>
                    prev.map(b => b._id === bookingId ? { ...b, status: "cancelled" } : b)
                );
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response?.data?.message || "Failed to execute request terminus.", { id: clearToastId });
            });
    };

    if (loading) {
        return (
            <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-[#FBF8F3]">
                <LuLoaderCircle className="w-8 h-8 text-[#C29B38] animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-3">Consulting Active Ledger Allocations...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#FBF8F3] pt-8 mt-6 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                <div className="mb-10 text-center md:text-left border-b border-[#EADFC9] pb-6 pt-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#2E1A0F] tracking-tight mb-1">My Bookings</h2>
                    <p className="text-xs sm:text-sm text-stone-500 font-medium">Review secure chronological timeframe windows allocated across university library sectors.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white border border-[#EADFC9] rounded p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm">
                        <div className="w-12 h-12 bg-[#FBF8F3] text-stone-400 flex items-center justify-center rounded mx-auto mb-4 border border-[#EADFC9]/60">
                            <LuInbox className="w-5 h-5" />
                        </div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#2E1A0F] mb-1">No Active Reservations</h3>
                        <p className="text-xs text-stone-400 font-medium max-w-xs mx-auto mb-6">You do not hold any registered timeframe allocations inside our platform tracking grid.</p>
                        <Link to="/rooms" className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[#5C2E16] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest hover:bg-[#42200F] transition-all w-full sm:w-auto">
                            <LuCompass className="w-4 h-4" />
                            <span>Browse Sanctuaries</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {bookings.map((booking) => (
                                <div key={booking._id} className="bg-white rounded border border-[#EADFC9] p-4 shadow-sm flex flex-col space-y-4 animate-fadeIn">
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={booking.roomImage}
                                            alt={booking.roomName}
                                            className="w-16 h-16 rounded object-cover border border-[#EADFC9] bg-stone-50 shrink-0"
                                            onError={(e) => { e.target.src = "https://unsplash.com"; }}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-serif font-bold text-base text-[#2E1A0F] leading-tight line-clamp-2">{booking.roomName}</h4>
                                            <p className="text-[10px] text-stone-400 font-medium mt-1 truncate">ID: {booking._id}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 border-t border-b border-stone-100 py-3 text-center bg-[#FBF8F3]/50 px-2 rounded">
                                        <div className="min-w-0">
                                            <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">Date</span>
                                            <div className="inline-flex items-center gap-1 font-bold text-stone-700 text-xs truncate max-w-full">
                                                <LuCalendarDays className="w-3 text-[#C29B38] shrink-0" />
                                                <span className="truncate">{booking.date}</span>
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">Interval</span>
                                            <div className="inline-flex items-center gap-1 font-bold text-stone-700 text-xs truncate max-w-full">
                                                <LuClock className="w-3 text-stone-400" />
                                                <span className="truncate">{booking.startTime}-{booking.endTime}</span>
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">Status</span>
                                            <div className="truncate max-w-full pt-0.5">
                                                <span className={`inline-block text-[8px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded border ${booking.status === "confirmed"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/40"
                                                    : "bg-stone-100 text-stone-400 border-stone-200"
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.status === "confirmed" && (
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-rose-700 bg-rose-50/40 border border-rose-100 rounded text-xs font-bold uppercase tracking-wider hover:bg-rose-700 hover:text-white transition-colors shadow-sm cursor-pointer"
                                        >
                                            <LuTrash2 className="w-3.5 h-3.5" />
                                            <span>Cancel Booking</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <div className="hidden md:block bg-white rounded border border-[#EADFC9] overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-[#2C1A11] border-b-2 border-[#C29B38] text-[#FBF8F3] text-xs uppercase tracking-widest font-bold">
                                            <th className="py-4 px-6">Chamber Particulars</th>
                                            <th className="py-4 px-4">Scheduled Date</th>
                                            <th className="py-4 px-4">Timeframe Bounds</th>
                                            <th className="py-4 px-4">Status</th>
                                            <th className="py-4 px-6 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100 text-[#2E1A0F] text-sm">
                                        {bookings.map((booking) => (
                                            <tr key={booking._id} className="hover:bg-[#FBF8F3]/30 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3 max-w-xs">
                                                        <img
                                                            src={booking.roomImage}
                                                            alt={booking.roomName}
                                                            className="w-12 h-12 rounded object-cover border border-[#EADFC9] bg-stone-50 shrink-0"
                                                            onError={(e) => { e.target.src = "https://unsplash.com"; }}
                                                        />
                                                        <div className="truncate">
                                                            <h4 className="font-serif font-bold text-base text-[#2E1A0F] truncate">{booking.roomName}</h4>
                                                            <p className="text-xs text-stone-400 font-medium truncate mt-0.5">Booking Ref: {booking._id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 font-bold text-stone-700">
                                                    <div className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200/60 px-2.5 py-1 rounded text-xs uppercase tracking-wider">
                                                        <LuCalendarDays className="w-3.5 h-3.5 text-[#C29B38]" />
                                                        <span>{booking.date}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 font-bold text-stone-700">
                                                    <div className="flex items-center gap-1.5">
                                                        <LuClock className="w-4 h-4 text-stone-400" />
                                                        <span>{booking.startTime} - {booking.endTime}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${booking.status === "confirmed"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/40"
                                                        : "bg-stone-100 text-stone-400 border-stone-200"
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center">
                                                        {booking.status === "confirmed" ? (
                                                            <button
                                                                onClick={() => handleCancelBooking(booking._id)}
                                                                className="p-2 text-rose-700 hover:text-white hover:bg-rose-700 rounded border border-rose-100 bg-rose-50/40 transition-colors shadow-sm flex items-center justify-center cursor-pointer"
                                                                title="Cancel Reservation Window"
                                                            >
                                                                <LuTrash2 className="w-4 h-4" />
                                                            </button>
                                                        ) : (
                                                            <span className="text-xs text-stone-400 font-medium italic select-none">No Actions Pending</span>
                                                        )}
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
