import RegisterForm from "../../components/RegisterForm";
import { getServices } from "../../services/services";
import Link from "next/link";

export const metadata = {
  title: "Регистрация - zdraveibolest.bg",
  description: "Регистрирайте се за достъп до пълната информация за клинични проучвания",
};

export default async function RegisterPage() {
  let therapeuticAreas = [];

  try {
    therapeuticAreas = await getServices();
  } catch (error) {
    console.error("Error fetching therapeutic areas:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold text-[#04737d]">
              zdraveibolest.bg
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Регистрация
          </h2>
          <p className="text-gray-600">
            Създайте акаунт за достъп до пълната информация
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <RegisterForm therapeuticAreas={therapeuticAreas} />
        </div>
      </div>
    </div>
  );
}

