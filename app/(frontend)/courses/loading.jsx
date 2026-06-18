export default function Loading() {
    return (
        <div className="min-h-screen bg-background w-full animate-pulse flex flex-col pt-32 pb-20">
            <div className="max-w-7xl mx-auto w-full px-4 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Skeleton */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-6 hidden lg:block">
                    <div className="h-6 w-32 bg-gray-100 rounded-md"></div>
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                    </div>
                </div>

                {/* Courses Grid Skeleton */}
                <div className="flex-1 w-full flex flex-col gap-8">
                    <div className="h-10 w-48 bg-gray-100 rounded-xl"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
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
        </div>
    );
}
