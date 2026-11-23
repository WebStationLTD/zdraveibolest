import Link from "next/link";
import { pageUrls } from "../../lib/seo";

export const metadata = {
  title: "Политика за бисквитки | Здраве и Болест",
  description:
    "Информация за бисквитките, локалното съхранение и външните технологии в сайта Здраве и Болест.",
  ...pageUrls("/cookie-policy"),
};

const storageItems = [
  {
    name: "zb_consent_v1",
    type: "Бисквитка",
    category: "Необходима",
    purpose: "Запазва избора за външна медия и версията на настройките.",
    duration: "До 12 месеца",
  },
  {
    name: "auth_token и user_data",
    type: "Локално съхранение",
    category: "Необходима при вход",
    purpose: "Поддържа потребителската сесия и данните на профила.",
    duration: "До изход, изтриване или изтичане на сесията",
  },
  {
    name: "clinical_trial_form_data",
    type: "Сесийно съхранение",
    category: "Необходима за формата",
    purpose:
      "Пази временна чернова на формата за клинично проучване в текущия раздел.",
    duration: "До изпращане, отказ или затваряне на раздела",
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-[#d7e4e6] bg-[#f1f8f7]">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <h1 className="text-3xl font-black text-[#035057] sm:text-4xl">
            Политика за бисквитки и външни технологии
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-700">
            Тази страница описва техническите средства, които сайтът
            zdraveibolest.bg използва в момента, и начина, по който управлявате
            незадължителното външно съдържание.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Последна техническа актуализация: 23.11.2026 г.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-5 py-12 sm:px-8 sm:py-16">
        <section aria-labelledby="choice-heading">
          <h2
            id="choice-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Как работи Вашият избор
          </h2>
          <div className="mt-4 space-y-4 text-base leading-7 text-gray-700">
            <p>
              Необходимите технологии поддържат основните функции на сайта и не
              могат да бъдат изключени от нашия панел. YouTube и Google Maps са
              в категория „Външна медия“ и не се свързват с браузъра Ви, преди
              да ги разрешите.
            </p>
            <p>
              Можете да приемете, да откажете или да промените избора си по
              всяко време чрез „Настройки за бисквитки“ в долната част на сайта. При
              оттегляне на разрешението страницата се презарежда, за да премахне
              вече активните външни плеъри.
            </p>
          </div>
        </section>

        <section aria-labelledby="storage-heading">
          <h2
            id="storage-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Бисквитки и съхранение в браузъра
          </h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-[#035057] text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Име</th>
                  <th className="px-4 py-3 font-semibold">Тип</th>
                  <th className="px-4 py-3 font-semibold">Категория</th>
                  <th className="px-4 py-3 font-semibold">Цел</th>
                  <th className="px-4 py-3 font-semibold">Срок</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {storageItems.map((item) => (
                  <tr key={item.name} className="align-top">
                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{item.type}</td>
                    <td className="px-4 py-4 text-gray-700">{item.category}</td>
                    <td className="px-4 py-4 text-gray-700">{item.purpose}</td>
                    <td className="px-4 py-4 text-gray-700">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="external-heading">
          <h2
            id="external-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Външни доставчици
          </h2>
          <div className="mt-5 space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900">YouTube</h3>
              <p className="mt-2 leading-7 text-gray-700">
                Използва се за видеа в страниците и публикациите. Плеърът,
                миниатюрите и YouTube API не се заявяват преди
                разрешение. Когато е възможно, видеата се зареждат през
                youtube-nocookie.com. След разрешение Google може да получи IP
                адрес, данни за браузъра и информация за взаимодействието с
                видеото.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Google Maps</h3>
              <p className="mt-2 leading-7 text-gray-700">
                Използва се за интерактивната карта в страницата за контакт.
                Картата не се заявява преди разрешение. След зареждане Google
                може да получи IP адрес, данни за браузъра и действията в
                картата.
              </p>
            </div>
            <p className="text-sm leading-6 text-gray-600">
              Google може да обработва информация извън Европейското
              икономическо пространство съгласно собствените си условия и
              политика за поверителност.
            </p>
          </div>
        </section>

        <section aria-labelledby="other-heading">
          <h2
            id="other-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Други технически услуги
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-gray-700">
            <li>
              WordPress API на zdraveibolest.admin-panels.com доставя
              съдържанието и приема данни от формите. При мрежова заявка
              сървърът получава стандартни технически данни като IP адрес и
              HTTP заглавки.
            </li>
            <li>
              Шрифтовете и основните изображения се доставят локално от сайта.
              При тях няма заявка към Google Fonts.
            </li>
            <li>
              Facebook и Instagram присъстват само като външни линкове. В сайта
              няма вграден Facebook SDK или Meta Pixel.
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="not-used-heading"
          className="rounded-xl bg-[#f1f8f7] p-5 sm:p-6"
        >
          <h2
            id="not-used-heading"
            className="text-xl font-bold text-[#035057]"
          >
            Аналитични и маркетингови технологии
          </h2>
          <p className="mt-3 leading-7 text-gray-700">
            Тези категории не са активни в момента. Ако бъде добавена нова
            незадължителна технология, системата и тази политика трябва да бъдат
            актуализирани преди активирането ѝ.
          </p>
        </section>

        <section aria-labelledby="rights-heading">
          <h2
            id="rights-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Повече информация
          </h2>
          <p className="mt-4 leading-7 text-gray-700">
            За информация относно обработването на лични данни и Вашите права
            вижте{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-[#04737d] underline underline-offset-4 hover:text-[#035057]"
            >
              Политиката за поверителност
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
