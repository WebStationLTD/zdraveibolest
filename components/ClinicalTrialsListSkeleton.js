/**
 * Skeleton loader for clinical trials list
 */
export default function ClinicalTrialsListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {/* Image Skeleton */}
            <div className="relative h-[200px] md:h-[250px] bg-gray-200"></div>

            {/* Content Skeleton */}
            <div className="md:col-span-3 p-6 flex flex-col justify-center space-y-4">
              {/* Tags Skeleton */}
              <div className="flex gap-2">
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
              </div>

              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="h-7 bg-gray-200 rounded w-3/4"></div>
                <div className="h-7 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Date Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-32"></div>

              {/* Excerpt Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>

              {/* Link Skeleton */}
              <div className="h-5 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
