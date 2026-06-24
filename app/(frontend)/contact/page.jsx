import { Cinzel, Manrope } from "next/font/google";
import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata = {
  title: "Contact Us - Train at the Dojo | LHBS",
  description: "Visit our martial arts academy. Find our location, hours, and contact information.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
  });

  const page = data.docs[0];

  return (
    <div className="min-h-screen bg-background text-text pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary bg-primary/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-block">
                Visit The Academy
            </span>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-text ${cinzel.className}`}>
                {page?.title || 'Train At The Dojo'}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                Step onto the mat and experience traditional martial arts training. Visit our facility to meet Master Pramod and start your journey.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    
                    {page?.content ? (
                        <div className="prose prose-lg prose-gray max-w-none">
                            <RichText data={page.content} />
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-text">Academy Information</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-text mb-1">Location</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            LHBS Martial Arts Academy<br />
                                            Indore, Madhya Pradesh, Bharat (452018)
                                        </p>
                                        <a 
                                            href="https://maps.app.goo.gl/b5QzmscbyFokUtVT9" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary font-semibold mt-3 hover:underline"
                                        >
                                            Get Directions <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-text mb-1">Training Hours</h3>
                                        <div className="text-gray-600 space-y-1">
                                            <p><span className="font-medium text-text">Mon-Fri:</span> 6:00 AM - 9:00 PM</p>
                                            <p><span className="font-medium text-text">Saturday:</span> 8:00 AM - 2:00 PM</p>
                                            <p><span className="font-medium text-text">Sunday:</span> Closed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-text mb-1">Contact</h3>
                                        <p className="text-gray-600">
                                            Call us or message on WhatsApp to schedule your first trial class.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 blur-[80px] rounded-full"></div>
                    <h2 className={`text-3xl font-bold mb-4 relative z-10 ${cinzel.className}`}>Join the Legacy</h2>
                    <p className="text-gray-300 mb-6 relative z-10">
                        Subscribe to Master Pramod's YouTube channel for free tutorials, philosophy, and training highlights.
                    </p>
                    <a 
                        href="https://youtube.com/@pramodgoswami" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors relative z-10 w-full sm:w-auto"
                    >
                        Subscribe on YouTube
                    </a>
                </div>
            </div>

            {/* Google Map Embed */}
            <div className="h-[600px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.55655388031!2d75.7866324208047!3d22.724228429990543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410bbf%3A0x96e7c1c50406bc4b!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="LHBS Academy Location"
                ></iframe>
            </div>

        </div>
      </div>
    </div>
  );
}
