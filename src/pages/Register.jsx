import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { LuUserPlus, LuShieldAlert } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

import registerBgImage from "../assets/books.avif";

export default function Register() {
    const { createUser, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        document.title = "StudyNook - Register";
        
        const globalNavbar = document.querySelector("nav");
        const globalFooter = document.querySelector("footer");

        if (globalNavbar) globalNavbar.style.display = "none";
        if (globalFooter) globalFooter.style.display = "none";

        return () => {
            if (globalNavbar) globalNavbar.style.display = "";
            if (globalFooter) globalFooter.style.display = "";
        };
    }, []);

    const onSubmit = (data) => {
        setValidationError("");
        const { name, email, photoURL, password } = data;

        if (password.length < 6) {
            setValidationError("Criteria failed: Password must consist of at least 6 characters.");
            toast.error("Password too short.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setValidationError("Criteria failed: Password must include at least one uppercase letter.");
            toast.error("Uppercase letter required.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setValidationError("Criteria failed: Password must include at least one lowercase letter.");
            toast.error("Lowercase letter required.");
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photoURL)
                    .then(() => {
                        toast.success("Registration successful! Please login.");
                        navigate("/login");
                    });
            })
            .catch((err) => {
                setValidationError(err?.message || "Registration process encountered an error.");
                toast.error("Registration failed.");
            });
    };

    const handleGoogleRegister = () => {
        setValidationError("");
        loginWithGoogle()
            .then(() => {
                toast.success("Federated authorization confirmed via Google OAuth.");
                navigate("/");
            })
            .catch(() => {
                toast.error("Google authentication encountered an error.");
            });
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-[#FBF8F3] p-2 sm:p-4">
            <div className="bg-white rounded border border-[#EADFC9] max-w-5xl w-full h-full md:h-[85vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-sm">

                <div className="hidden md:block relative bg-[#2C1A11] order-1 h-full w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
                        style={{ backgroundImage: `url(${registerBgImage})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A11] via-transparent to-transparent z-10" />
                    <div className="absolute bottom-12 left-10 right-10 z-20 text-white space-y-2">
                        <p className="font-serif italic text-2xl lg:text-3xl text-[#C29B38] leading-relaxed">"A room without books is like a body without a soul."</p>
                        <p className="text-xs lg:text-sm font-bold uppercase tracking-widest text-stone-400">— Marcus Tullius Cicero</p>
                    </div>
                </div>

                <div className="p-5 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center order-2 w-full h-full overflow-y-auto">
                    <div className="mb-4 sm:mb-5 text-center md:text-left">
                        <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#2E1A0F] tracking-tight mb-0.5 sm:mb-1">Create Account</h2>
                        <p className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-[#C29B38]">Join the library study network</p>
                    </div>

                    {validationError && (
                        <div className="flex items-center justify-center text-center gap-2 p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs sm:text-sm font-semibold animate-fadeIn mx-auto w-full">
                            <LuShieldAlert className="w-4 h-4 shrink-0" />
                            <span className="w-full text-center">{validationError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3.5">
                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-0.5 sm:mb-1">Full Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F]"
                                placeholder="Scholar Resident"
                            />
                            {errors.name && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Full name is required.</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-0.5 sm:mb-1">Email Address</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F]"
                                placeholder="student@university.edu"
                            />
                            {errors.email && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Email context is required.</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-0.5 sm:mb-1">Profile Photo URL String</label>
                            <input
                                type="url"
                                {...register("photoURL", { required: true })}
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F]"
                                placeholder="https://photo..."
                            />
                            {errors.photoURL && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Image resource link is required.</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-0.5 sm:mb-1">Password Credentials</label>
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded border border-[#EADFC9] bg-[#FBF8F3]/40 text-sm focus:bg-white transition-colors text-[#2E1A0F]"
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="text-[11px] font-bold text-rose-600 mt-0.5 block">Password is required.</span>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] font-bold text-xs sm:text-sm uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                            <LuUserPlus className="w-4 h-4" />
                            <span>Register</span>
                        </button>
                    </form>

                    <div className="relative my-3 sm:my-4 flex items-center justify-center">
                        <div className="absolute w-full border-t border-stone-200"></div>
                        <span className="relative bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Or</span>
                    </div>

                    <button
                        onClick={handleGoogleRegister}
                        className="w-full py-2.5 border border-[#EADFC9] text-stone-700 bg-[#FBF8F3]/30 hover:bg-[#FBF8F3] font-bold text-xs sm:text-sm uppercase tracking-widest rounded transition-all flex items-center justify-center gap-1.5 shadow-inner cursor-pointer"
                    >
                        <FaGoogle className="text-amber-700 text-xs sm:text-sm" />
                        <span>Sign Up with Google</span>
                    </button>

                    <p className="text-center text-xs font-semibold text-stone-500 mt-4 sm:mt-5">
                        Already possess operational keys?{" "}
                        <Link to="/login" className="text-[#5C2E16] font-bold hover:underline tracking-wide">
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
