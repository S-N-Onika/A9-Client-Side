import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { MdLocalLibrary } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-[#2C1A11] text-[#FBF8F3]/80 border-t-4 border-[#C29B38] py-14 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-center md:text-left items-start">

                <div className="space-y-4 flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2.5 text-white font-serif font-black text-xl lg:text-3xl tracking-tight">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded bg-[#C29B38] flex items-center justify-center text-[#2C1A11]">
                            <MdLocalLibrary className="w-5 h-4 lg:w-7 lg:h-6" />
                        </div>
                        <span>Study<span className="text-[#C29B38] font-normal italic">Nook</span></span>
                    </div>
                    <p className="text-xs lg:text-sm text-stone-300 leading-relaxed max-w-sm">
                        Providing premium, quiet environments to maximize academic focus and facilitate seamless group collaboration.
                    </p>
                </div>

                <div>
                    <h4 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-[#C29B38] mb-5">Links</h4>
                    <ul className="space-y-2.5 text-xs lg:text-sm font-semibold">
                        <li><Link to="/" className="hover:text-white transition-colors duration-150">Home</Link></li>
                        <li><Link to="/rooms" className="hover:text-white transition-colors duration-150">Rooms</Link></li>
                        <li><Link to="/login" className="hover:text-white transition-colors duration-150">About Portal</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-[#C29B38] mb-5">Contact Information</h4>
                    <ul className="space-y-2.5 text-xs lg:text-sm font-semibold text-stone-300">
                        <li>Email: services@studynook.edu</li>
                        <li>Phone: +1 (555) 234-8900</li>
                        <li>Library Services, Wing B</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-[#C29B38] mb-5">Social Icons</h4>
                    <div className="flex gap-3.5 justify-center md:justify-start">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 lg:w-10 lg:h-10 rounded bg-[#FBF8F3]/10 hover:bg-[#C29B38] text-[#C29B38] hover:text-[#2C1A11] flex items-center justify-center transition-all shadow-sm">
                            <FaFacebookSquare size={18} />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noreferrer" className="w-9 h-9 lg:w-10 lg:h-10 rounded bg-[#FBF8F3]/10 hover:bg-[#C29B38] text-[#C29B38] hover:text-[#2C1A11] flex items-center justify-center transition-all shadow-sm">
                            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 lg:w-10 lg:h-10 rounded bg-[#FBF8F3]/10 hover:bg-[#C29B38] text-[#C29B38] hover:text-[#2C1A11] flex items-center justify-center transition-all shadow-sm">
                            <FaLinkedin size={18} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 lg:w-10 lg:h-10 rounded bg-[#FBF8F3]/10 hover:bg-[#C29B38] text-[#C29B38] hover:text-[#2C1A11] flex items-center justify-center transition-all shadow-sm">
                            <FaInstagramSquare size={18} />
                        </a>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-stone-700 text-center text-[11px] lg:text-xs font-bold uppercase tracking-wider text-stone-400">
                <p>© {new Date().getFullYear()} StudyNook. All rights reserved.</p>
            </div>
        </footer>
    );
}
