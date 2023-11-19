import "@/styles/globals.css";
import "@/styles/swiper.css";
import clsx from "clsx";
import type { Metadata } from "next";
import AnalyticsWrapper from "@/components/analytics";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { ParallaxProvider } from "./(use-client)/react-scroll-parallax";
import { monserrat, open } from "@/styles/fonts";
import Hero from "@/components/layout/hero";
import placeholderLargeDark from "public/images/placeholder-large-dark-h.png";
import { getGqlData } from "@/utils/get-graphql-data";
import { GET_LAYOUT } from "@/lib/gql";
import { FaTwitter } from "react-icons/fa";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGqlData(GET_LAYOUT, "subsiteLayouts");
  const favicon = data[0].favicon;
  const seo = data[0].seo;

  return {
    title: seo?.meta_Title,
    description: seo?.meta_Description,
    openGraph: {
      title: "Festival de Bourges",
      description: "",
      url: "https://site.fr",
      siteName: "Festival de Bourges",
      images: [
        {
          url: "https://site.fr/og.jpg",
          width: 1920,
          height: 1080,
        },
      ],
      locale: "fr",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: "Festival de Bourges",
      card: "summary_large_image",
    },
    icons: {
      shortcut: `${favicon.data.attributes.url}`,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getGqlData(GET_LAYOUT, "subsiteLayouts");

  const siteData = data[0];
  const header = data.map((attributes: any) => attributes.header);
  const headerData = header[0];
  const headerMenu = data.map((attributes: any) => attributes.headerMenu);
  const headerNavigationData = headerMenu[0];
  const hero = data.map((attributes: any) => attributes.hero);
  const heroData = hero[0];
  const footer = data.map((attributes: any) => attributes.footer);
  const footerData = footer[0];
  const footerMenu = data.map((attributes: any) => attributes.footerMenu);
  const footerNavigationData = footerMenu[0];
  return (
    <html
      lang="fr"
      className={clsx("bg-white text-black", monserrat.variable, open.variable)}
    >
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script>
      {/* <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
      ></script> */}
      <body className=" bg-white font-default text-base antialiased md:text-lg">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
        <main className="relative flex flex-col">
          <Header {...headerData} {...headerNavigationData} />
          <div className="flex-1 pt-10 sm:pt-20">
            <section className="py-12 md:py-14 lg:pb-20">
              <Hero {...heroData} />
            </section>
            <div className="overflow-hidden">
              {/* <ApolloWrapper>{children}</ApolloWrapper> */}
              {children}
            </div>
          </div>
          <Footer {...footerData} {...footerNavigationData} />
          {/* <AnalyticsWrapper /> */}
        </main>
      </body>
    </html>
  );
}
