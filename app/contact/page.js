import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { getContactInfo } from "../../services/contacts";
import ContactForm from "../../components/contactForm";
import ContactMap from "../../components/ContactMap";
import Link from "next/link";

// Force dynamic rendering to avoid build timeout
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: "Имате въпроси? Ние сме тук - Здраве и Болест",
    description:
      "Свържете се с нас по телефон, имейл или чрез формата. Отговаряме бързо и с желание да помогнем.",
  };
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="px-6 pt-24 pb-20 sm:pt-24 lg:static lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Свържете се с нас
            </h2>
            {/* <p className="mt-6 text-lg/8 text-gray-600">
              Proin volutpat consequat porttitor cras nullam gravida at. Orci
              molestie a eu arcu. Sed ut tincidunt integer elementum id sem.
              Arcu sed malesuada et magna.
            </p> */}
            <dl className="mt-10 space-y-4 text-base text-gray-600">
              {contactInfo && (
                <>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <BuildingOffice2Icon className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>{contactInfo.address}</dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <PhoneIcon className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <Link
                        href={`tel:${contactInfo.phone_number}`}
                        className="hover:text-gray-900"
                      >
                        {contactInfo.phone_number}
                      </Link>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <EnvelopeIcon className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd className="flex flex-col gap-1">
                      {contactInfo.email.split(/[,;\n]+/).map((email, index) => {
                        const trimmedEmail = email.trim();
                        return trimmedEmail ? (
                          <Link
                            key={index}
                            href={`mailto:${trimmedEmail}`}
                            className="hover:text-gray-900"
                          >
                            {trimmedEmail}
                          </Link>
                        ) : null;
                      })}
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>
        <ContactForm />
      </div>

      {/* Interactive Map */}
      <ContactMap
        address={contactInfo?.address}
        phone={contactInfo?.phone_number}
        emails={
          contactInfo?.email
            ? contactInfo.email.split(/[,;\n]+/).map((e) => e.trim()).filter(Boolean)
            : []
        }
        lat={42.664823240346024}
        lng={23.28418869694393}
      />
    </div>
  );
}
