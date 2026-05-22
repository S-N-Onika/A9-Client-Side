import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { LuLayers, LuUsers, LuDollarSign, LuHeading, LuImage, LuTextQuote, LuLoaderCircle } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";

const AVAILABLE_AMENITIES = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

export default function UpdateRoom() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        document.title = "StudyNook - Modify Chamber Specifications";

        axios.get(`https://studynook-server-alpha.vercel.app/api/rooms/${id}`, { withCredentials: true })

            .then(res => {
                const room = res.data;
                if (room) {
                    setValue("name", room.name);
                    setValue("image", room.image);
                    setValue("floor", room.floor);
                    setValue("capacity", room.capacity);
                    setValue("hourlyRate", room.hourlyRate);
                    setValue("description", room.description);
                    setValue("amenities", room.amenities || []);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load existing room information.");
                setLoading(false);
            });
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const clearToastId = toast.loading("Updating study room...");

        const payload = {
            name: data.name,
            description: data.description,
            image: data.image,
            floor: data.floor,
            capacity: parseInt(data.capacity),
            hourlyRate: parseFloat(data.hourlyRate),
            amenities: data.amenities || [],
            ownerName: user?.displayName || "Scholar Resident"
        };

        try {
            await axios.put(`https://studynook-server-alpha.vercel.app/api/rooms/${id}`, payload, { withCredentials: true });
            toast.success("Specifications updated successfully!", { id: clearToastId });
            navigate("/my-rooms");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to process modifications.", { id: clearToastId });
        }
    };

    if (loading) {
        return (
            <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-[#FBF8F3]">
                <LuLoaderCircle className="w-8 h-8 text-[#C29B38] animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-3">Extracting Specifications Ledger...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#FBF8F3] px-4 py-12">
            <div className="bg-white rounded border border-[#EADFC9] max-w-3xl w-full p-6 sm:p-10 lg:p-12 shadow-sm">

                <div className="mb-8 text-center md:text-left border-b border-[#EADFC9] pb-5">
                    <h2 className="text-3xl font-serif font-black text-[#2E1A0F] tracking-tight mb-1">Modify Chamber Data</h2>
                    <p className="text-sm text-stone-500 font-medium">Overhaul architectural and access settings for your registered space resource.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" autoComplete="off">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Chamber Title</label>
                            <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                                <LuHeading className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                    placeholder="e.g. Oakwood Vault Room"
                                />
                            </div>
                            {errors.name && <span className="text-xs font-bold text-rose-600 mt-1 block">Title parameter is required.</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Picture Reference URL Link</label>
                            <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                                <LuImage className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />
                                <input
                                    type="url"
                                    {...register("image", { required: true })}
                                    className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                    placeholder="https://unsplash.com..."
                                />
                            </div>
                            {errors.image && <span className="text-xs font-bold text-rose-600 mt-1 block">Valid image URL is required.</span>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Library Floor Plan Location</label>
                        <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                            <LuLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />
                            <input
                                type="text"
                                {...register("floor", { required: true })}
                                className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                placeholder="e.g. Floor 3, West Wing B"
                            />
                        </div>
                        {errors.floor && <span className="text-xs font-bold text-rose-600 mt-1 block">Floor description is required.</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Seat Capacity Limit</label>
                            <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                                <LuUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />
                                <input
                                    type="number"
                                    {...register("capacity", { required: true, min: 1 })}
                                    className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                    placeholder="e.g. 4"
                                />
                            </div>
                            {errors.capacity && <span className="text-xs font-bold text-rose-600 mt-1 block">Must be at least 1 person.</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Hourly Fee (USD \$)</label>
                            <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                                <LuDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 z-10" />
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register("hourlyRate", {
                                        required: "Valid hourly rate is required.",
                                        min: { value: 1, message: "Minimum fee must be \$1/hr." },
                                        max: { value: 100, message: "Maximum fee cannot exceed \$100/hr." }
                                    })}
                                    className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20"
                                    placeholder="e.g. 5.50"
                                />
                            </div>
                            {errors.hourlyRate && <span className="text-xs font-bold text-rose-600 mt-1 block">{errors.hourlyRate.message}</span>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Detailed Chamber Description</label>
                        <div className="relative w-full rounded border border-[#EADFC9] bg-[#FBF8F3] focus-within:bg-white transition-colors">
                            <LuTextQuote className="absolute left-3 top-3 text-stone-400 w-4 h-4 z-10" />
                            <textarea
                                rows={4}
                                {...register("description", { required: true })}
                                className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-[#2E1A0F] focus:outline-none relative z-20 resize-none"
                                placeholder="Elaborate on ambient acoustic parameters, general rules..."
                            />
                        </div>
                        {errors.description && <span className="text-xs font-bold text-rose-600 mt-1 block">Description summary is required.</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">Available Shared Infrastructure Amenities</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {AVAILABLE_AMENITIES.map((amenity, idx) => (
                                <label key={idx} className="flex items-center gap-2.5 p-3 rounded border border-stone-200 bg-[#FBF8F3]/30 hover:bg-[#FBF8F3] transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider text-stone-700 select-none group">
                                    <input
                                        type="checkbox"
                                        value={amenity}
                                        {...register("amenities")}
                                        className="w-4 h-4 text-[#C29B38] accent-[#C29B38] border-stone-300 focus:ring-0 rounded cursor-pointer checked:bg-[#C29B38] checked:border-[#C29B38]"
                                    />
                                    <span className="group-hover:text-[#5C2E16] transition-colors">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] text-xs font-bold uppercase tracking-widest rounded shadow transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span>Save Updates</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
