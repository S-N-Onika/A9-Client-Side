import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-[#FBF8F3] text-[#2E1A0F] font-sans antialiased">
            <ScrollRestoration />
            <Navbar />
            <main className="flex-grow">
                <Outlet key={window.location.pathname} />
            </main>

            <Footer />
        </div>
    );
}
