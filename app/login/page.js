import LoginForm from "../../components/LoginForm";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Вход - zdraveibolest.bg",
  description: "Влезте във вашия акаунт за достъп до пълната информация",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Вход</h2>
          <p className="text-gray-600">Влезте във вашия акаунт</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
