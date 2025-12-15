import React from 'react';
import { Cinzel, Manrope } from "next/font/google";
import { Youtube, Instagram, Facebook, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "500"] });

const Footer = () => {
    return (
        <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C8295E] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <img
                            src="/lhbs-logo.png"
                            alt="LHBS Logo"
                            className="h-16 w-auto mb-6 opacity-90"
                        />
                        <p className={`text-gray-400 max-w-sm ${manrope.className}`}>
                            Providing Customized Martial Arts Training for your Busy Lifestyle. Master the art of self-defense and discipline.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className={`text-xl text-white font-bold mb-8 tracking-widest ${cinzel.className}`}>
                            Follow Us
                        </h3>
                        <div className="flex gap-6">
                            <a
                                href="https://www.youtube.com/@pramodgoswami"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#FF0000] transition-colors transform hover:scale-110 duration-300"
                            >
                                <Youtube size={32} />
                            </a>
                            <a
                                href="https://www.instagram.com/ninjapramod/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#E1306C] transition-colors transform hover:scale-110 duration-300"
                            >
                                <Instagram size={32} />
                            </a>
                            <a
                                href="https://www.facebook.com/NinjaPramod/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#1877F2] transition-colors transform hover:scale-110 duration-300"
                            >
                                <Facebook size={32} />
                            </a>
                            <a
                                href="https://api.whatsapp.com/send?phone=919713600085&text=Hello"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#25D366] transition-colors transform hover:scale-110 duration-300"
                            >
                                <MessageCircle size={32} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <h3 className={`text-xl text-white font-bold mb-8 tracking-widest ${cinzel.className}`}>
                            Contact
                        </h3>
                        <ul className={`space-y-4 text-gray-400 ${manrope.className}`}>
                            <li className="flex items-center gap-3 justify-center md:justify-end">
                                <span>Indore, Madhya Pradesh, Bharat (452018)</span>
                                <MapPin size={18} className="text-[#FD5D2F]" />
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-end">
                                <a href="mailto:livehealthybesafe@gmail.com" className="hover:text-white transition-colors">
                                    livehealthybesafe@gmail.com
                                </a>
                                <Mail size={18} className="text-[#FD5D2F]" />
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-end">
                                <a href="tel:+919713600085" className="hover:text-white transition-colors">
                                    +91 9713600085
                                </a>
                                <Phone size={18} className="text-[#FD5D2F]" />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className={`border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 ${manrope.className}`}>
                    <p>© 2025 Martial Arts School. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="/refundpolicy" className="hover:text-white transition-colors">Refund Policy</a>
                        <a href="/termsandconditions" className="hover:text-white transition-colors">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;