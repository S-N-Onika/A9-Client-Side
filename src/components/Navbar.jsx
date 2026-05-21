import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { MdLocalLibrary } from "react-icons/md";
import toast from "react-hot-toast";

export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleSignOut = () => {
        logoutUser()
            .then(() => {
                toast.success("Signed out safely. Wishing you a peaceful study hour.");
                setIsProfileDropdownOpen(false);
                setIsMobileMenuOpen(false);
            })
            .catch(() => {
                toast.error("An error occurred during logout.");
            });
    };

    const getNavLinkClass = ({ isActive }) =>
        `inline-flex items-center h-full px-1 pt-1 border-b-2 text-sm uppercase tracking-wider font-bold transition-all duration-200 ${isActive
            ? "border-[#C29B38] text-[#5C2E16]"
            : "border-transparent text-stone-500 hover:text-[#5C2E16] hover:border-stone-300"
        }`;

    const getMobileNavLinkClass = ({ isActive }) =>
        `block pl-4 pr-4 py-2.5 border-l-4 text-sm uppercase tracking-wider font-bold transition-all duration-150 ${isActive
            ? "bg-[#5C2E16]/5 border-[#C29B38] text-[#5C2E16]"
            : "border-transparent text-stone-600 hover:bg-stone-100/50 hover:text-stone-900"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-[#FBF8F3]/95 backdrop-blur-md border-b border-[#EADFC9] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded bg-[#5C2E16] flex items-center justify-center text-[#FBF8F3] shadow-inner transition-transform group-hover:scale-105">
                                <MdLocalLibrary className="text-[#FBF8F3] text-xl"/>
                            </div>
                            <span className="text-3xl font-serif font-black tracking-tight text-[#2E1A0F]">
                                Study<span className="text-[#C29B38] font-normal italic">Nook</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex justify-center flex-grow h-16 space-x-8">
                        <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                        <NavLink to="/rooms" className={getNavLinkClass}>Rooms</NavLink>
                        {user && (
                            <>
                                <NavLink to="/add-room" className={getNavLinkClass}>Add Room</NavLink>
                                <NavLink to="/my-listings" className={getNavLinkClass}>My Listings</NavLink>
                                <NavLink to="/my-bookings" className={getNavLinkClass}>My Bookings</NavLink>
                            </>
                        )}
                    </div>

                    <div className="hidden md:flex items-center flex-shrink-0">
                        {user ? (
                            <div className="relative">
                                <div className="flex items-center gap-1 border border-[#EADFC9] rounded bg-white/60 hover:bg-white transition-colors duration-150">
                                    <Link to="/my-profile" className="flex items-center gap-2.5 p-1.5 focus:outline-none group cursor-pointer">
                                        <img
                                            className="h-7 w-7 rounded object-cover border border-stone-200 shrink-0"
                                            src={user?.photoURL && user.photoURL.startsWith("http") ? user.photoURL : "https://dicebear.com"}
                                            alt="Profile Portrait Map"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://dicebear.com";
                                            }}
                                        />
                                        <span className="text-sm font-bold text-stone-700 tracking-wider uppercase">My Profile</span>
                                    </Link>
                                    <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="pr-2 pl-1 h-full flex items-center justify-center text-stone-400 hover:text-stone-600 focus:outline-none border-l border-[#EADFC9]/60 cursor-pointer">
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {isProfileDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)}></div>
                                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded bg-[#FBF8F3] border border-[#EADFC9] shadow-xl py-1.5 z-20 animate-fadeIn">
                                            <div className="px-4 py-2 border-b border-[#EADFC9] mb-1">
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-[#C29B38]">Scholar Account</p>
                                                <p className="text-sm font-serif font-bold text-[#2E1A0F] truncate mt-0.5">{user.displayName || "Active Student"}</p>
                                                <p className="text-xs text-stone-500 truncate">{user.email}</p>
                                            </div>
                                            <Link to="/my-profile" onClick={() => setIsProfileDropdownOpen(false)} className="w-full text-left block px-4 py-2 text-xs uppercase tracking-wider font-bold text-stone-700 hover:bg-stone-50 transition-colors">
                                                View Detailed Profile
                                            </Link>
                                            <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#5C2E16] hover:bg-[#5C2E16] flex items-center gap-2 transition-colors duration-150 cursor-pointer">
                                                <LogOut className="w-3.5 h-3.5" /> Sign Out
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-xs uppercase tracking-widest font-bold text-stone-600 hover:text-[#5C2E16] px-3 py-2 transition-all">Login</Link>
                                <Link to="/register" className="text-xs uppercase tracking-widest font-bold text-white bg-[#5C2E16] hover:bg-[#42200F] px-4 py-2 rounded shadow-sm transition-all">Register</Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded text-stone-500 hover:text-stone-800 hover:bg-[#EADFC9]/30 focus:outline-none transition-colors">
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#FBF8F3] border-b border-[#EADFC9] shadow-inner">
                    <div className="pt-2 pb-3 space-y-1">
                        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={getMobileNavLinkClass}>Home</NavLink>
                        <NavLink to="/rooms" onClick={() => setIsMobileMenuOpen(false)} className={getMobileNavLinkClass}>Rooms</NavLink>
                        {user && (
                            <>
                                <NavLink to="/add-room" onClick={() => setIsMobileMenuOpen(false)} className={getMobileNavLinkClass}>Add Room</NavLink>
                                <NavLink to="/my-listings" onClick={() => setIsMobileMenuOpen(false)} className={getMobileNavLinkClass}>My Listings</NavLink>
                                <NavLink to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className={getMobileNavLinkClass}>My Bookings</NavLink>
                                <NavLink to="/my-profile" onClick={() => setIsMobileMenuOpen(false)} className={getMobileNavLinkClass}>My Profile</NavLink>
                            </>
                        )}
                    </div>

                    <div className="pt-4 pb-4 border-t border-[#EADFC9] bg-[#5C2E16]/5">
                        {user ? (
                            <div className="px-4">
                                <button onClick={handleSignOut} className="w-full text-center py-2 bg-[#5C2E16] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer">
                                    <LogOut className="w-3.5 h-3.5" /> End Session
                                </button>
                            </div>
                        ) : (
                            <div className="px-4 flex flex-col gap-2">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2.5 text-stone-700 font-bold text-xs uppercase tracking-wider hover:bg-stone-100 rounded transition-colors">Login</Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2.5 bg-[#5C2E16] text-white font-bold text-xs uppercase tracking-wider rounded">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

