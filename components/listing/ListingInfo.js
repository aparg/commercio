import Link from "next/link";
import dynamic from "next/dynamic";
import ProjectLocation from "@/components/listing/ProjectLocation";
import Neighbourhood from "@/components/listing/Neighbourhood";
import nFormatter from "@/helpers/nFormatter";
import ListingInteractions from "./ListingInteractions";
// Dynamically import WalkScore with no SSR
const WalkScore = dynamic(() => import("./WalkScore"), {
  ssr: false,
});

export default function ListingInfo({ house_detail, city }) {
  return (
    <div>
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm">{house_detail.project_type}</span>
            {house_detail.is_featured && (
              <span className=" bg-blue-500 px-1.5 py-0.5 rounded-[3px] text-[9px] font-medium text-white flex items-center gap-0.5 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 22 22"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-[3rem] text-[red] font-black leading-[3rem]">
            {house_detail.project_name}
          </h1>

          <h3 className="font-normal">
            Developed by{" "}
            <Link href={`/developers/${house_detail.developer.slug}`}>
              <span className="font-semibold">
                {house_detail.developer.name}
              </span>
            </Link>
          </h3>

          <div className="text-2xl md:text-3xl font-[700]">
            {house_detail.price_starting_from === 0 && `Price Coming Soon`}
            {house_detail.price_starting_from > 0 &&
              `Starting From Low ${nFormatter(
                house_detail.price_starting_from
              )}`}
          </div>
          <div className="text-sm text-black">
            Project Status: {house_detail.status}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-[700] mb-2">
            About {house_detail.project_name}
          </h2>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">Project Location:</span>
            <Link href="/toronto">Toronto</Link>
          </div>

          <div className="flex items-center gap-2">
            {/* <svg
              width="14"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
                fill="#000000"
              ></path>
            </svg> */}
            <span className="text-neutral-800 text-base">
              {house_detail.project_address}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-semibold text-base me-2">Postal code:</span>
            <span>{house_detail.postalcode}</span>
          </div>

          <div className="flex items-center">
            <span className="font-semibold text-base me-2">Completion:</span>
            <span>{house_detail.occupancy}</span>
          </div>

          {/* Interactive Buttons Section */}
          <ListingInteractions house_detail={house_detail} />
        </div>
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            Project Details: {house_detail.project_name} in{" "}
            {house_detail.city.name}
          </h2>
          <div className="text-start text-inside">
            <div
              className="prose max-w-none text-sm md:text-base text-gray-600 leading-10"
              dangerouslySetInnerHTML={{
                __html: house_detail.description,
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 my-20 gap-4">
          <div>
            <h3 className="text-[1.25rem] text-[black] font-[700] mb-2">
              Deposit Structure
            </h3>
            <div
              className="iframe-container leading-9 space-y-5"
              dangerouslySetInnerHTML={{
                __html: house_detail.deposit_structure,
              }}
            ></div>
          </div>
          <div>
            <h3 className="text-[1.25rem] text-[black] font-[700] mb-2">
              Facts and Features
            </h3>
            <div
              className="iframe-container leading-9 space-y-5"
              dangerouslySetInnerHTML={{
                __html: house_detail.facts_about,
              }}
            ></div>
          </div>
        </div>
        {house_detail.project_address && (
          <WalkScore
            projectName={house_detail.project_name}
            address={`${house_detail.project_address}, ${city}, ON`}
          />
        )}
        <ProjectLocation
          projectName={house_detail.project_name}
          address={house_detail.project_address}
          latitude={house_detail.latitute}
          longitude={house_detail.longitude}
        />
        <Neighbourhood
          projectName={house_detail.project_name}
          street_map={house_detail.street_map}
        />
        <div className="py-5">
          <p className="text-xs leading-5 text-gray-500">
            Note: Homebaba is Canada's one of the largest database of new
            construction homes. Our comprehensive database is populated by our
            research and analysis of publicly available data. Homebaba strives
            for accuracy and we make every effort to verify the information. The
            information provided on Homebaba.ca may be outdated or inaccurate.
            Homebaba Inc. is not liable for the use or misuse of the site's
            information.The information displayed on{" "}
            <a href="https://commercio.ca" className="text-primary">
              homebaba.ca
            </a>{" "}
            is for reference only. Please contact a liscenced real estate agent
            or broker to seek advice or receive updated and accurate
            information.
          </p>
        </div>
      </div>
    </div>
  );
}
