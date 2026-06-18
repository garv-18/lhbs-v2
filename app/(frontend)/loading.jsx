export default function Loading() {
    return (
        <div className="min-h-screen bg-background w-full animate-pulse flex flex-col">
            {/* Hero Skeleton */}
            <div className="h-screen w-full bg-gray-100 flex flex-col items-center justify-center gap-6 px-4">
                <div className="h-8 w-48 bg-gray-200 rounded-full"></div>
                <div className="h-24 w-full max-w-2xl bg-gray-200 rounded-2xl mt-4"></div>
                <div className="h-16 w-full max-w-xl bg-gray-200 rounded-2xl mt-4"></div>
                <div className="h-14 w-48 bg-gray-200 rounded-full mt-8"></div>
            </div>

            {/* Content Skeletons */}
            <div className="max-w-7xl mx-auto w-full px-4 py-20 flex flex-col gap-16">
                {/* Section Title */}
                <div className="w-full flex justify-between items-end">
                    <div className="h-12 w-64 bg-gray-100 rounded-xl"></div>
                    <div className="hidden md:flex gap-4">
                        <div className="h-10 w-24 bg-gray-100 rounded-lg"></div>
                        <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                        <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                    </div>
                </div>

                {/* Grid Skeletons */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <div className="h-48 w-full bg-gray-100 rounded-2xl"></div>
                            <div className="h-6 w-3/4 bg-gray-100 rounded-md"></div>
                            <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                            <div className="h-10 w-full bg-gray-100 rounded-xl mt-2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
