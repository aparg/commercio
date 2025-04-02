import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Privacy() {
  return (
    <>
      <div className="pb-20"></div>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          PRIVACY POLICY
        </h1>
        <div className="prose max-w-none text-gray-700">
          <p>
            Commercio Inc. (Commercio.ca) respects the privacy of every
            individual who visits our website, sales office or contacts us by
            telephone, e-mail, or FAX. This Privacy Policy outlines the
            information The Commercio Inc may collect and how we may use that
            information. By submitting, filling out or answering questions on
            our website, you acknowledge that you have read, understand and
            agree with our Privacy Policy summarized below. If you wish to read
            our full Privacy Policy, you may obtain it from the administrator at
            this sales office.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            PERSONAL DATA
          </h2>
          <p>
            Commercio Inc. or Commercio.ca will not collect any personally
            identifiable information about you (for example, your name, address,
            telephone number or email address ("personal data") without your
            express permission. The information about you is sent to us only
            when you voluntarily submit via contact forms on our website. If you
            do not want your personal data collected, please do not submit it to
            us. When you do provide us with personal data, we may use that
            information in the following ways, unless stated otherwise: we may
            store and process that information to better understand your needs
            and how we can improve our products and services; we may use that
            information to contact you.
          </p>
          <p>
            By submitting the forms on our website (https://www.Commercio.ca)
            you are opting in to receive updates, follow ups, and marketing
            contents. We may share your info to our referral partners such as
            licensed realtors, builders or brokerages to help you with your
            questions or connect them to you. Commercio Inc. does not in anyway
            get involved in any transaction. You can unsubscribe at any time by
            emailing us at info@commercio.ca.
          </p>
          <p>
            Commercio is a referral company and we may be compensated by
            referral and advertisement partners for referrals we provide them or
            by connecting website visitors to our referral and advertisement
            partners. We may also receive information via phone calls or emails
            form prospecting buyers. By providing us the information voluntarily
            you have consented us to connect you with our referral and
            advertising partners.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Terms & Conditions
          </h2>
          <p>
            The Site and the Services are provided solely as an online search
            engine to present information to the public. Commercio does not
            provide any real estate, brokerage, appraisal, or any other related
            real estate or real property services, and does not hold itself out
            as being registered, licensed, or otherwise authorized to perform
            any such services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Who are Commercio Verified Partners?
          </h2>
          <p>
            When real estate agents or brokerages collaborate with Commercio for
            marketing, advertisement and lead generation purposes, we require
            them to provide proof of their license. In addition, we conduct
            social media and brand checks to confirm that these partners are
            actively engaged in the real estate market and maintain a strong
            presence on social media channels. We make an effort to periodically
            verify our partners' credibility to ensure that they meet the
            highest standards. This includes assessing their level of social
            media activity, number of listings, response time to our queries,
            and their understanding of the market.
          </p>

          <div className="space-y-8 mt-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                INFORMATION WE COLLECT
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
                Customer Registration
              </h3>
              <p>
                In order to register for our Services, Customers must provide
                certain Personal Information to us such as their name, company
                name and email address. We use this information to manage
                Customer accounts and provide the Services.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
                Device Identifiers
              </h3>
              <p>
                When you access the Service by or through a device, we may
                access, collect, monitor and/or remotely store one or more
                'device identifiers'. Device identifiers allow us to uniquely
                identify your device and are used to enhance the Service
                (including sending updates and information from the Service).
              </p>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
                System Logs & Cookies
              </h3>
              <p>
                Cookies are used by us to track content usage and traffic on the
                Website and Services. A cookie is a feature of your web browser
                that consists of a text file that is placed on your hard disk by
                a web server. You can set your browser to notify you when you
                are sent a cookie. This gives you the chance to decide whether
                or not to accept it.
              </p>
            </section>
          </div>
        </div>
      </div>
      <div className="mt-40"></div>
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
          Looking to buy a New Home?
        </h2>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Don't know where to start? Contact Commercio now!
        </p>
      </div>
      <ContactForm />
    </>
  );
}
