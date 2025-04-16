import HeroSection from "@/components/HeroSection";

import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import ResaleCitiesSection from "@/components/commercial/ResaleCitiesSection";

import PriceDroppedHomes from "@/components/PriceDroppedHomes";

// Metadata configuration
export const metadata = {
  metadataBase: new URL("https://commercio.ca"),
  title: "Commercio - Canada's most Trusted Commercial Properties Platform",
  description:
    "Find your ideal business in the Greater Toronto Area. Browse restaurants, lands and offices for sale or rent across Ontario.",
  authors: [{ name: "Commercio", email: "info@commercio.ca" }],
  openGraph: {
    type: "website",
    title: "Commercio - Canada's most Trusted Commercial Properties Platform",
    description:
      "Find your ideal business in the Greater Toronto Area. Browse restaurants, lands and offices for sale or rent across Ontario.",
    url: "https://commercio.ca",
    siteName: "Commercio",
    images: [{ url: "/aeee.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://commercio.ca/" },
};

// Structured Data for SEO
// const websiteSchema = {
//   "@context": "https://schema.org/",
//   "@type": "WebSite",
//   name: "Homebaba",
//   url: "https://commercio.ca",
//   description: "Homebaba - Canada's Leading New Construction Homes Platform",
//   image: "https://commercio.ca/aeee.jpg",
//   sameAs: [
//     "https://www.facebook.com/thehomebaba/",
//     "https://www.youtube.com/channel/UCz0QC6Avx_Q_oTENvpp6PWg",
//     "https://www.instagram.com/homebabaa/",
//     "https://www.linkedin.com/company/homebaba/about/?viewAsMember=true",
//     "https://twitter.com/homebabaa",
//     "https://www.tiktok.com/@homebabaa",
//   ],
//   potentialAction: {
//     "@type": "SearchAction",
//     target: "https://commercio.ca/search?q={search_term_string}",
//     "query-input": "required name=search_term_string",
//   },
//   contactPoint: {
//     "@type": "ContactPoint",
//     telephone: "+1 647-239-5555",
//     contactType: "customer support",
//   },
//   openingHours: "Mo-Su 09:00-18:00",
//   address: {
//     "@type": "PostalAddress",
//     streetAddress: "8300 Woodbine Ave",
//     addressLocality: "Markham",
//     addressRegion: "ON",
//     addressCountry: "CA",
//   },
// };

export default async function Home() {
  // Server-side data fetching

  return (
    <>
      {/* <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-corporation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationSchema) }}
      /> */}

      <HeroSection />
      {/* <BestExperience /> */}
      {/* <PriceDroppedHomes /> */}
      <ResaleCitiesSection />
      <div className="my-10 md:my-20"></div>

      {/* <CommunityGive /> */}
      {/* <CallToAction /> */}
      <div className="my-10 md:my-32"></div>
      {/* <RecentBlogs blogs={blogsData} /> */}
      <div className="my-10 md:my-32"></div>

      <div className="my-10 md:my-32"></div>

      {/* <Testimonial
        testimonialText="This platform is exactly what new realtors need, a fantastic way to search and explore projects"
        authorName="Josh Camaro"
        authorPosition="Real Estate Professional"
        authorRole=""
        companyLogo="/testmonials/J.png"
      /> */}
      <div className="flex flex-col items-center mb-4 md:mb-5">
        <Image
          src="/contact-bottom-2.png"
          alt="Real Estate Agent"
          width={300}
          height={300}
          className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
          priority
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Looking to buy a New Property?
        </h2>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Don't know where to start? Contact us today!
        </p>
      </div>
      <ContactForm />
      <div className="my-10 md:my-32"></div>

      {/* <CityLinks /> */}
    </>
  );
}
