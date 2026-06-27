"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Cinzel, Manrope } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function CourseFAQ({ faqs }) {
    const [openIndex, setOpenIndex] = useState(null);

    const defaultFaqs = [
        {
            question: "Do I need prior martial arts experience?",
            answer: "No prior experience is required. Our programs are designed to accommodate everyone from absolute beginners to advanced practitioners, scaling the intensity to your level."
        },
        {
            question: "How long will I have access to the course?",
            answer: "Once enrolled, you get lifetime access to the course materials, including all future updates and additions to the curriculum."
        },
        {
            question: "Is there a money-back guarantee?",
            answer: "Yes! We offer a no-questions-asked 30-day money-back guarantee. If you put in the work and don't see results, we will refund your investment."
        },
        {
            question: "Can I access the training on my phone?",
            answer: "Absolutely. Our platform is fully responsive and optimized for mobile devices, so you can train anywhere, anytime."
        }
    ];

    const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-16 pt-10 border-t border-gray-100">
            <div className="text-center mb-10">
                <h2 className={`text-3xl font-bold text-text mb-4 ${cinzel.className}`}>Frequently Asked Questions</h2>
                <p className={`text-gray-500 max-w-2xl mx-auto ${manrope.className}`}>
                    Everything you need to know about the program. Still have questions? Contact our support team.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {displayFaqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                        >
                            <span className={`text-lg font-semibold text-text ${manrope.className}`}>
                                {faq.question}
                            </span>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className={`flex-shrink-0 ml-4 ${openIndex === index ? 'text-primary' : 'text-gray-400'}`}
                            >
                                <ChevronDown size={20} />
                            </motion.div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className={`px-6 pb-5 pt-0 text-gray-600 leading-relaxed ${manrope.className}`}>
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
