export default function Loading() {
    return (
        <div className="min-h-screen bg-background w-full animate-pulse flex flex-col pt-24 pb-20">
            {/* Hero Section */}
            <div className="w-full max-w-7xl mx-auto px-4 mb-12">
                <div className="h-6 w-32 bg-gray-100 rounded-lg mb-4"></div>
                <div className="h-16 w-3/4 max-w-3xl bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-24 w-full max-w-4xl bg-gray-100 rounded-xl mb-8"></div>
                
                <div className="h-[400px] md:h-[500px] w-full bg-gray-200 rounded-3xl"></div>
            </div>

            {/* Content Section */}
            <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="h-8 w-48 bg-gray-200 rounded-xl"></div>
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                        <div className="h-4 w-4/6 bg-gray-100 rounded"></div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="h-96 w-full bg-gray-100 rounded-3xl border border-gray-200 p-8 flex flex-col gap-6">
                        <div className="h-12 w-32 bg-gray-200 rounded-xl mb-4"></div>
                        <div className="h-6 w-full bg-gray-200 rounded-lg"></div>
                        <div className="h-6 w-full bg-gray-200 rounded-lg"></div>
                        <div className="h-14 w-full bg-gray-300 rounded-xl mt-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
