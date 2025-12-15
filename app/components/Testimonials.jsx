import { Manrope, Cinzel } from "next/font/google";
import { Quote, Star } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500", "700"] });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

const REVIEWS = [
    {
        name: "Trisha Kakati",
        text: "For several days, I had been searching for a dedicated martial arts and fitness trainer who could teach my son the importance of physical fitness, discipline, and self-defence. I am truly grateful that we finally found the right coach Pramod Sir. From the very first day, the coach demonstrated remarkable sincerity, hard work, and professionalism. What sets him apart is his focus not just on training the body, but also on shaping the mind and behaviour of each student.",
        rating: 5,
    },
    {
        name: "Manju",
        text: "I am writing this feedback to give my thanks to Pramod Goswami sir for teaching my son self defense in Martial Arts. I got to know about Pramod sir from the best unbiased medium that require no further investigation and that are the kids of our colony. Pramod sir visited their school for free workshop and the impact he had on the kids was clearly visible to me. Pramod sir is a well educated International Martial Arts trainer who is the only trainer to provide online Martial Arts training across the world.",
        rating: 5,
    },
    {
        name: "Ashutosh Kaushik",
        text: "Recently i and my some friends joined a physical event in Martial Art School. Here our instructor Shri Pramod Goswami (sir) taught us, how can we do self defense? And he also taught us various type of self defense technique and their implementation. Thanks sir to make us a Warrior. I pray for Bhagwaan to you sir and his School, leave long for betterment. Jai Hind, Jai Bharat 🙏",
        rating: 5,
    },
];

const ReviewCard = ({ review, index }) => (
    <div
        className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 flex flex-col gap-6"
        data-aos="fade-up"
        data-aos-delay={index * 100}
    >
        <div className="flex gap-1 text-yellow-500">
            {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
            ))}
        </div>

        <div className="relative">
            <Quote className="absolute -top-2 -left-2 text-white/10 rotate-180" size={40} />
            <p className={`text-gray-300 leading-relaxed relative z-10 ${manrope.className}`}>
                "{review.text}"
            </p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
            <p className={`text-white font-bold tracking-wide ${cinzel.className}`}>
                {review.name}
            </p>
        </div>
    </div>
);

export default function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-down">
                    <p className={`text-[#FD5D2F] text-sm tracking-[0.2em] uppercase mb-4 ${manrope.className}`}>
                        Community Voices
                    </p>
                    <h2 className={`text-4xl md:text-5xl font-bold text-white tracking-tighter ${cinzel.className}`}>
                        STORIES OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8295E] to-[#FD5D2F]">TRANSFORMATION</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REVIEWS.map((review, index) => (
                        <ReviewCard key={index} review={review} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
