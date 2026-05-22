import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { LuLayers, LuUsers, LuCalendarDays, LuClock, LuBookmarkCheck, LuLoaderCircle, LuCircleHelp } from "react-icons/lu";
import toast from "react-hot-toast";

export default function RoomDetails() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.title = "StudyNook - Room Overview";
        axios.get(`${import.meta.env.VITE_API_URL}/api/rooms/${id}`, { withCredentials: true })
            .then(res => {
                setRoom(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to fetch room information.");
                setLoading(false);
            });
    }, [id]);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Authentication required to reserve space.");
            return navigate("/login");
        }

        if (startTime >= endTime) {
            toast.error("Invalid timeframe: Start time must precede end time.");
            return;
        }

        setIsModalOpen(true);
    };

    const confirmBooking = async () => {
        setIsModalOpen(false);
        const clearToastId = toast.loading("Evaluating times scheduling filters...");

        const bookingPayload = {
            roomId: id,
            roomName: room.name,
            roomImage: room.image,
            hourlyRate: room.hourlyRate,
            date: bookingDate,
            startTime,
            endTime,
            userEmail: user.email,
            userName: user.displayName || "Anonymous Scholar"
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, bookingPayload, { withCredentials: true });
            toast.success("Room booked successfully!", { id: clearToastId });
            navigate("/my-bookings");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Time conflict block detected.", { id: clearToastId });
        }
    };

    if (loading) {
        return (
            <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-[#FBF8F3]">
                <LuLoaderCircle className="w-8 h-8 text-[#C29B38] animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-3">Fetching Room Information...</span>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-[75vh] w-full flex items-center justify-center bg-[#FBF8F3]">
                <p className="text-sm font-bold uppercase tracking-wider text-stone-400">Target record completely unavailable.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#FBF8F3] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto mb-6 text-center md:text-left pb-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#2E1A0F] tracking-tight">Room Details</h2>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded border border-[#EADFC9] overflow-hidden shadow-sm">
                        <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-72 sm:h-96 object-cover border-b border-[#EADFC9]"
                        />
                        <div className="p-6 sm:p-8 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
                                <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2E1A0F] tracking-tight">{room.name}</h2>
                                <div className="text-xl font-serif font-black text-[#5C2E16] bg-[#FBF8F3] px-3 py-1 rounded border border-[#EADFC9]">
                                    \${room.hourlyRate}/hr
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FBF8F3] border border-[#EADFC9]/60 text-xs font-bold uppercase tracking-wider text-stone-600">
                                    <LuLayers className="w-4 h-4 text-[#C29B38]" />
                                    <span>{room.floor}</span>
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FBF8F3] border border-[#EADFC9]/60 text-xs font-bold uppercase tracking-wider text-stone-600">
                                    <LuUsers className="w-4 h-4 text-[#C29B38]" />
                                    <span>Capacity: {room.capacity} Scholars</span>
                                </div>
                            </div>

                            <p className="text-stone-500 text-sm sm:text-base leading-relaxed font-medium pt-2">
                                {room.description}
                            </p>

                            <div className="pt-4 border-t border-stone-100">
                                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">room amenities</h4>
                                <div className="flex flex-wrap gap-2">
                                    {room.amenities?.map((item, idx) => (
                                        <span key={idx} className="text-xs font-bold uppercase bg-stone-50 text-stone-600 border border-stone-200 px-3 py-1 rounded">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded border border-[#EADFC9] p-6 shadow-sm sticky top-6 space-y-6">
                        <div className="border-b border-[#EADFC9] pb-3 text-center lg:text-left">
                            <h3 className="text-lg font-serif font-black text-[#2E1A0F] tracking-tight">Reserve Room</h3>
                            <p className="text-xs text-stone-400 font-medium">Verify booking times below.</p>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                                    <LuCalendarDays className="w-3.5 h-3.5" /> Booking Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full border border-[#EADFC9] bg-[#FBF8F3] text-sm text-[#2E1A0F] px-3 py-2 rounded focus:outline-none focus:bg-white transition-colors cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                                        <LuClock className="w-3.5 h-3.5" /> Starting Time
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full border border-[#EADFC9] bg-[#FBF8F3] text-sm text-[#2E1A0F] px-3 py-2 rounded focus:outline-none focus:bg-white transition-colors cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                                        <LuClock className="w-3.5 h-3.5" /> Ending Time
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full border border-[#EADFC9] bg-[#FBF8F3] text-sm text-[#2E1A0F] px-3 py-2 rounded focus:outline-none focus:bg-white transition-colors cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest rounded shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <LuBookmarkCheck className="w-4 h-4" />
                                    <span>Execute Booking Transaction</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded border border-[#EADFC9] max-w-md w-full p-6 text-center shadow-2xl relative animate-scaleUp">
                        <div className="w-12 h-12 rounded-full bg-[#FBF8F3] text-[#C29B38] border border-[#EADFC9] flex items-center justify-center mx-auto mb-4">
                            <LuCircleHelp className="w-6 h-6 animate-pulse" />
                        </div>
                        <h3 className="text-xl font-serif font-black text-[#2E1A0F] tracking-tight mb-2">Confirm Reservation Slot?</h3>
                        <p className="text-sm text-stone-500 font-medium mb-6 leading-relaxed">
                            You are requested to verify the operational assignment constraints for <span className="font-bold text-[#5C2E16]">{room.name}</span> on <span className="font-bold text-[#5C2E16]">{bookingDate}</span> from <span className="font-bold text-[#5C2E16]">{startTime}</span> to <span className="font-bold text-[#5C2E16]">{endTime}</span>.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2.5 rounded border border-[#EADFC9] text-stone-600 text-xs font-bold uppercase tracking-wider hover:bg-[#FBF8F3] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBooking}
                                className="px-5 py-2.5 rounded bg-[#5C2E16] text-[#FBF8F3] text-xs font-bold uppercase tracking-wider hover:bg-[#42200F] transition-colors cursor-pointer"
                            >
                                Confirm Transaction
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


