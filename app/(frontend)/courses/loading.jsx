export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]">
            <div className="relative flex flex-col items-center gap-8">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Subtle Back Glow */}
                    <div className="absolute inset-0 bg-[#FD5D2F]/10 blur-xl rounded-full animate-pulse"></div>

                    {/* Outer Ring - Static Thin White */}
                    <div className="absolute inset-0 border border-white/5 rounded-full"></div>

                    {/* Rotating Gradient Arc - The "Expensive" Feel */}
                    <div className="absolute inset-0 rounded-full border-t border-[#FD5D2F] animate-spin shadow-[0_0_15px_#FD5D2F40]"></div>

                    {/* Inner Ring - Counter-rotating or slower */}
                    <div
                        className="absolute inset-3 rounded-full border-b border-[#C8295E] animate-spin"
                        style={{ animationDuration: '3s', animationDirection: 'reverse' }}
                    ></div>

                    {/* Center Brand Text */}
                    <div className="relative z-10 w-10 h-10 flex items-center justify-center">
                        <img src="/logo.png" alt="LHBS" className="w-full h-full object-contain opacity-90 drop-shadow-[0_0_10px_rgba(253,93,47,0.5)]" />
                    </div>
                </div>

                {/* Loading Description */}
                <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-[family-name:var(--font-manrope)] animate-pulse">
                    Initializing
                </p>
            </div>
        </div>
    );
}
