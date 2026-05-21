import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { LuUser, LuMail, LuCalendar, LuAward, LuShieldCheck, LuBookOpen, LuCheck, LuX, LuLink, LuLogOut } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

import toast from "react-hot-toast";

export default function MyProfile() {
    const { user, updateUserProfile, logoutUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

    const fallbackAvatar = `https://dicebear.com${encodeURIComponent(user?.displayName || "Scholar")}`;

    const [imgSrc, setImgSrc] = useState(fallbackAvatar);

    useEffect(() => {
        if (user?.photoURL && user.photoURL.trim().startsWith("http")) {
            setImgSrc(user.photoURL);
        } else {
            setImgSrc(fallbackAvatar);
        }
    }, [user?.photoURL, fallbackAvatar]);


    const handleSave = () => {
        if (!name.trim()) {
            toast.error("Profile name parameter cannot be empty.");
            return;
        }
        if (!photoURL.trim() || !photoURL.startsWith("http")) {
            toast.error("Please provide a valid direct image URL reference link.");
            return;
        }

        const clearToastId = toast.loading("Updating academic identity profile details...");

        updateUserProfile(name, photoURL)
            .then(() => {
                toast.success("Scholar profile records synchronized successfully!", { id: clearToastId });
                setIsEditing(false);
                window.location.reload();
            })
            .catch(() => {
                toast.error("Failed to commit profile updates. Please try again.", { id: clearToastId });
            });
    };

    const handleLogOut = () => {
        const logoutToastId = toast.loading("Ending session inside network library...");
        logoutUser()
            .then(() => {
                toast.success("Logged out successfully.", { id: logoutToastId });
            })
            .catch(() => {
                toast.error("Failed to log out. Please try again.", { id: logoutToastId });
            });
    };

    return (
        <div className="min-h-[85vh] w-full flex items-center justify-center px-4 py-4 bg-[#FBF8F3]">
            <div className="bg-white rounded border border-[#EADFC9] max-w-3xl w-full overflow-hidden shadow-sm transition-all duration-300">

                <div className="bg-[#2C1A11] p-8 text-center relative border-b-4 border-[#C29B38]">
                    <div className="absolute inset-0 bg-[url('https://unsplash.com')] opacity-5 bg-cover bg-center mix-blend-luminosity"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative group mb-4">
                            <img
                                className="h-28 w-28 rounded-full object-cover border-4 border-[#C29B38] bg-white shadow-md transition-transform duration-200 group-hover:scale-105"
                                src={imgSrc}
                                alt=""
                                onError={() => {
                                    setImgSrc(fallbackAvatar);
                                }}
                            />
                        </div>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-[#FBF8F3] tracking-tight">
                            {user?.displayName || "Scholar Resident"}
                        </h2>

                        <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#C29B38]/20 border border-[#C29B38]/30 text-xs font-bold uppercase tracking-widest text-[#C29B38]">
                            <LuAward className="w-3.5 h-3.5" /> Verified Scholar
                        </span>
                    </div>
                </div>

                <div className="p-4 sm:p-10 lg:p-10 space-y-4">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-4">
                        <div>
                            <h3 className="text-lg lg:text-xl font-serif font-bold text-[#2E1A0F]">Account Parameters</h3>
                            <p className="text-xs text-stone-400 font-medium">Manage your public credentials inside the network library.</p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            {!isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] text-xs uppercase tracking-widest font-bold rounded shadow-sm transition-colors cursor-pointer"
                                    >
                                        <FiEdit className="w-3.5 h-3.5" /> Edit Profile
                                    </button>
                                    <button
                                        onClick={handleLogOut}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] text-xs uppercase tracking-widest font-bold rounded shadow-sm transition-colors cursor-pointer"
                                    >
                                        <LuLogOut className="w-3.5 h-3.5" /> LogOut
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setName(user?.displayName || "");
                                            setPhotoURL(user?.photoURL || "");
                                        }}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs uppercase tracking-widest font-bold rounded transition-colors cursor-pointer"
                                    >
                                        <LuX className="w-3.5 h-3.5" /> Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C29B38] hover:bg-[#A6822E] text-[#2C1A11] text-xs uppercase tracking-widest font-bold rounded shadow-sm transition-colors cursor-pointer"
                                    >
                                        <LuCheck className="w-3.5 h-3.5" /> Save Changes
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="p-5 rounded border border-[#EADFC9] bg-[#FBF8F3]/50 space-y-4 animate-fadeIn">
                            <div>
                                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Modify Scholar Name</label>
                                <div className="relative">
                                    <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 rounded border border-[#EADFC9] bg-white text-base text-[#2E1A0F]"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Modify Avatar Image Link (URL)</label>
                                <div className="relative">
                                    <LuLink className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                                    <input
                                        type="url"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 rounded border border-[#EADFC9] bg-white text-base text-[#2E1A0F]"
                                        placeholder="https://unsplash.com..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded border border-stone-100 bg-[#FBF8F3]/40 flex items-center gap-4 transition-shadow hover:shadow-sm">
                            <div className="w-11 h-11 rounded bg-[#5C2E16]/10 text-[#5C2E16] flex items-center justify-center shrink-0">
                                <LuUser className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                                <p className="text-[11px] uppercase font-black tracking-widest text-stone-400 mb-0.5">Account Identity</p>
                                <p className="text-base lg:text-xl font-semibold text-[#2E1A0F] truncate">{user?.displayName || "Not Available"}</p>
                            </div>
                        </div>

                        <div className="p-5 rounded border border-stone-100 bg-[#FBF8F3]/40 flex items-center gap-4 transition-shadow hover:shadow-sm">
                            <div className="w-11 h-11 rounded bg-[#5C2E16]/10 text-[#5C2E16] flex items-center justify-center shrink-0">
                                <LuMail className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                                <p className="text-[11px] uppercase font-black tracking-widest text-stone-400 mb-0.5">Email Address</p>
                                <p className="text-base lg:text-xl font-semibold text-[#2E1A0F] truncate">{user?.email || "Not Available"}</p>
                            </div>
                        </div>

                        <div className="p-5 rounded border border-stone-100 bg-[#FBF8F3]/40 flex items-center gap-4 transition-shadow hover:shadow-sm">
                            <div className="w-11 h-11 rounded bg-[#5C2E16]/10 text-[#5C2E16] flex items-center justify-center shrink-0">
                                <LuCalendar className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                                <p className="text-[11px] uppercase font-black tracking-widest text-stone-400 mb-0.5">Account Created</p>
                                <p className="text-base lg:text-xl font-semibold text-[#2E1A0F] truncate">
                                    {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Active Session"}
                                </p>
                            </div>
                        </div>

                        <div className="p-5 rounded border border-stone-100 bg-[#FBF8F3]/40 flex items-center gap-4 transition-shadow hover:shadow-sm">
                            <div className="w-11 h-11 rounded bg-[#5C2E16]/10 text-[#5C2E16] flex items-center justify-center shrink-0">
                                <LuShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                                <p className="text-[11px] uppercase font-black tracking-widest text-stone-400 mb-0.5">Authorization Status</p>
                                <p className="text-base lg:text-xl font-semibold text-emerald-700 flex items-center gap-1">
                                    <span>Token Active</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded border border-[#EADFC9] bg-[#FBF8F3] flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded bg-[#C29B38]/10 text-[#C29B38] flex items-center justify-center shrink-0 mt-0.5">
                            <LuBookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm uppercase font-black tracking-wider text-[#2E1A0F] mb-1">Library Compliance Rules</h4>
                            <p className="text-xs text-stone-500 leading-relaxed font-medium">
                                Your account remains bound by the university library network regulatory codes. All user space listings, calculated hourly charges, and time slots are continuously audited to ensure fair access conditions for everyone in the campus learning community.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}