import Banner from "../components/Banner";
import LatestRooms from "../components/LatestRooms";
import Stats from "../components/Stats";
import Events from "../components/Events";

export default function Home() {
    return (
        <div className="bg-[#FBF8F3] min-h-screen flex flex-col">
            <Banner />

            <div className="bg-white">
                <LatestRooms />
            </div>

            <div className="bg-[#FBF8F3] border-t border-[#EADFC9]/70 py-10">
                <Stats />
            </div>

            <div className="bg-white border-t border-[#EADFC9]/70">
                <Events />
            </div>
        </div>
    );
}
