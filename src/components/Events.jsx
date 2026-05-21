import { LuCalendarDays, LuClock, LuMapPin, LuBell } from "react-icons/lu";
import toast from "react-hot-toast";

export default function Events() {
    const workshopList = [
        {
            id: 1,
            date: "May 25",
            time: "02:00 PM",
            title: "Advanced Archival Research Methods",
            location: "East Wing, Room 3A",
            slots: "4 seats remaining"
        },
        {
            id: 2,
            date: "May 28",
            time: "10:30 AM",
            title: "Thesis Writing & Style Compliance Nook",
            location: "Central Library Vault",
            slots: "8 seats remaining"
        },
        {
            id: 3,
            date: "June 02",
            time: "04:00 PM",
            title: "Digital Citation & Database Management",
            location: "Media Center Wing B",
            slots: "Fully open"
        }
    ];

    const handleReminder = (title) => {
        toast.success(`Academic reminder set for: ${title}`);
    };

    return (
        <section className="bg-white border-t border-b border-[#EADFC9] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#5C2E16]/5 border border-[#EADFC9] text-[10px] uppercase font-bold tracking-widest text-[#5C2E16]">
                        Campus Seminars
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#2E1A0F] tracking-tight mt-3">
                        Upcoming Academic Workshops
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {workshopList.map((event) => (
                        <div key={event.id} className="bg-[#FBF8F3]/50 rounded border border-[#EADFC9] p-6 flex flex-col justify-between hover:shadow-sm transition-shadow duration-200">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-[#EADFC9]/60 pb-3">
                                    <div className="flex items-center gap-1.5 text-[#C29B38] font-bold text-xs uppercase tracking-wider">
                                        <LuCalendarDays className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-stone-400 font-bold text-[11px] uppercase tracking-wider">
                                        <LuClock className="w-3.5 h-3.5" />
                                        <span>{event.time}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-base font-serif font-bold text-[#2E1A0F] leading-tight line-clamp-2 min-h-[44px]">
                                        {event.title}
                                    </h4>

                                    <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium">
                                        <LuMapPin className="w-3.5 h-3.5 text-[#5C2E16]" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                                    {event.slots}
                                </span>

                                <button
                                    onClick={() => handleReminder(event.title)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5C2E16] hover:text-[#C29B38] transition-colors focus:outline-none cursor-pointer"
                                >
                                    <LuBell className="w-3.5 h-3.5" />
                                    <span>Notify Me</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
