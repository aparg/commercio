export const metadata = {
  title: "Privacy Policy - Commercio",
  description:
    'We respect your privacy and will not collect any personally identifiable information about you (for example, your name, address, telephone number or email address ("personal data") without your express permission. The information about you is sent to us only when you voluntarily submit via contact forms on our website.',
  authors: [{ name: "Commercio", url: "https://commercio.ca" }],
  openGraph: {
    title: "Privacy Policy - Commercio",
    description:
      'We respect your privacy and will not collect any personally identifiable information about you (for example, your name, address, telephone number or email address ("personal data") without your express permission. The information about you is sent to us only when you voluntarily submit via contact forms on our website.',
    url: "https://commercio.ca/privacy",
    siteName: "Commercio",
    images: [
      {
        url: "https://commercio.ca/contact.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://commercio.ca/privacy",
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}
