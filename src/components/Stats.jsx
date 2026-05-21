import { LuBookmark, LuUsers, LuClock, LuActivity } from "react-icons/lu";

export default function Stats() {
    const metrics = [
        {
            id: 1,
            icon: <LuBookmark className="w-6 h-6" />,
            value: "45+",
            label: "Active Chambers Listed",
            desc: "Distributed across East, West, and Central wings."
        },
        {
            id: 2,
            icon: <LuClock className="w-6 h-6" />,
            value: "1,200+",
            label: "Study Hours Logged",
            desc: "Productive, distraction-free reservation units spent."
        },
        {
            id: 3,
            icon: <LuUsers className="w-6 h-6" />,
            value: "350+",
            label: "Verified Scholars",
            desc: "Token-authenticated student and faculty user profiles."
        },
        {
            id: 4,
            icon: <LuActivity className="w-6 h-6" />,
            value: "99.4%",
            label: "Conflict Isolation Check",
            desc: "Handled seamlessly by server-side collision filters."
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                    <div key={metric.id} className="bg-white rounded border border-[#EADFC9] p-6 text-center md:text-left flex flex-col md:flex-row md:items-start gap-4 hover:bg-[#FBF8F3]/40 transition-colors duration-200">
                        <div className="w-12 h-12 rounded bg-[#5C2E16]/10 text-[#5C2E16] flex items-center justify-center mx-auto md:mx-0 shrink-0">
                            {metric.icon}
                        </div>
                        <div className="space-y-1">
                            <span className="block text-3xl font-serif font-black text-[#2E1A0F] tracking-tight">
                                {metric.value}
                            </span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C29B38]">
                                {metric.label}
                            </h4>
                            <p className="text-[11px] text-stone-400 font-medium leading-relaxed">
                                {metric.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
