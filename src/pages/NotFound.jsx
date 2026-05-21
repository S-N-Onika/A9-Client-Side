import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuCompass, LuBookOpen } from "react-icons/lu";

import loginBgImage from "../assets/books1.webp";

export default function NotFound() {
    useEffect(() => {

        document.title = "StudyNook - Not Found";

        const globalNavbar = document.querySelector("nav");
        const globalFooter = document.querySelector("footer");

        if (globalNavbar) globalNavbar.style.display = "none";
        if (globalFooter) globalFooter.style.display = "none";

        return () => {
            if (globalNavbar) globalNavbar.style.display = "";
            if (globalFooter) globalFooter.style.display = "";
        };
    }, []);

    const waveContainerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const characterBounceVariants = {
        initial: {
            y: 0
        },
        animate: {
            y: [0, -40, 0],
            transition: {
                duration: 1.0,
                repeat: Infinity,
                ease: [0.25, 1, 0.5, 1],
            },
        },
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center p-4 bg-[#FBF8F3] relative select-none">

            <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-luminosity pointer-events-none"
                style={{ backgroundImage: `url(${loginBgImage})` }}
            ></div>

            <div className="max-w-md w-full text-center space-y-12 relative z-10">

                <div className="relative flex justify-center items-center h-44">
                    <motion.div
                        className="absolute w-48 h-48 rounded-full bg-[#C29B38]/10 border border-[#C29B38]/20"
                        animate={{
                            scale: [1, 1.08, 0.95, 1.02, 1],
                            opacity: [0.3, 0.5, 0.4, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <motion.div
                        variants={waveContainerVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute flex text-[#5C2E16] text-8xl sm:text-9xl font-serif font-black select-none tracking-tighter gap-3 z-10 drop-shadow-[0_10px_20px_rgba(92,46,22,0.15)]"
                    >
                        <motion.span variants={characterBounceVariants}>4</motion.span>
                        <motion.span variants={characterBounceVariants}>0</motion.span>
                        <motion.span variants={characterBounceVariants}>4</motion.span>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="space-y-3"
                >
                    <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2E1A0F] tracking-tight">
                        Not Found: The page doesn't exist.
                    </h1>
                    <p className="text-stone-500 text-sm leading-relaxed font-medium max-w-sm mx-auto">
                        The shelf partition or room index entry you are consulting appears to be missing or cataloged under a different archive division.
                    </p>
                </motion.div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#5C2E16] hover:bg-[#42200F] text-[#FBF8F3] font-bold text-xs uppercase tracking-widest rounded shadow transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                        <LuBookOpen className="w-4 h-4" />
                        <span>Library Entrance</span>
                    </Link>

                    <Link
                        to="/rooms"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-stone-300 hover:border-[#C29B38] text-stone-600 hover:text-[#5C2E16] font-bold text-xs uppercase tracking-widest rounded transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                        <LuCompass className="w-4 h-4" />
                        <span>All Rooms</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
