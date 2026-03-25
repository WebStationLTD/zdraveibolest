import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#04737d] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Страницата не е намерена
        </h2>
        <p className="text-gray-600 mb-8">
          Страницата, която търсите, не съществува или е преместена.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#04737d] hover:bg-[#035057] text-white font-medium rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Към началната страница
        </Link>
      </div>
    </div>
  );
}
