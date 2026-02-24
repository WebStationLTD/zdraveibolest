import Link from "next/link";
import { getMemberInfo } from "../../../services/members";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = await getMemberInfo(slug);

  if (!member || member.length === 0) {
    throw new Error("Member not found");
  }

  return {
    title: member.name || "Член на екипа",
    //description: member.description,
  };
}

export default async function MemberDetails({ params }) {
  const { slug } = await params;

  const member = await getMemberInfo(slug);

  if (!member) {
    return <div>Членът не е намерен.</div>;
  }
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {member.name || "Член на екипа"}
              </h1>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#129160" />
                  <stop offset={1} stopColor="#129160" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-20 px-6 py-24 lg:px-8 xl:grid-cols-3">
        <div className="w-full xl:col-span-1 xl:w-full">
          <Image
            width={250}
            height={375}
            priority
            alt={member.name || "Член на екипа"}
            src={member.profilepicture || "/placeholder.webp"}
            className="rounded-2xl object-cover"
          />
          <h2 className="text-xl font-semibold mb-2 mt-4">
            {member.name || "Член на екипа"}
          </h2>
          <p className="text-gray-600 mb-4">{member.position || ""}</p>
          <div className="text-gray-700">
            {member.phonenumber && (
              <p className="mb-2">
                <strong>Телефон: </strong>
                <Link href={`tel:${member.phonenumber}`}>
                  {member.phonenumber}
                </Link>
              </p>
            )}
            {member.email && (
              <p className="mb-2">
                <strong>Email: </strong>
                <Link href={`mailto:${member.email}`}>{member.email}</Link>
              </p>
            )}

            {member.linkedin && member.linkedin.url && (
              <Link
                href={member.linkedin.url}
                target={member.linkedin.target || "_blank"}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
        <div className="divide-y divide-gray-200 xl:col-span-2 xl:w-full">
          <div
            className="text-gray-700 prose max-w-none leading-relaxed text-justify"
            dangerouslySetInnerHTML={{
              __html: member.description || "",
            }}
          />
        </div>
      </div>
    </>
  );
}
