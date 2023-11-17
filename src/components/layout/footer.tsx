import Link from "next/link";
import Copyright from "../copyright";

import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import Title from "../ui/title";
import React from "react";
import { cn } from "@/lib/utils";

// const data = [
//   {
//     parent: 'Visiteurs',
//     children: [
//       {
//         text: 'Annuaire des exposants',
//         url: '/annuaire-des-exposants',
//         newTab: false,
//       },
//       {
//         text: 'Les partenaires du salon',
//         url: '/les-partenaires-du-salon',
//         newTab: false,
//       },
//       // ... d'autres liens
//     ],
//     position: 'leftMenu',
//   },
//   {
//     parent: 'Edition',
//     children: [
//       {
//         text: '2023',
//         url: '/',
//         newTab: false,
//       },
//       {
//         text: '2024',
//         url: '/',
//         newTab: false,
//       },
//       {
//         text: '2025',
//         url: '/',
//         newTab: false,
//       },
//       // ... d'autres liens
//     ],
//     position: 'rightMenu',
//   },
// ];

function Footer({ ...props }) {
  const navigationData = Object.values(props);
  return (
    <footer className="mt-20 bg-[#e8e8e8]">
      <div className="relative flex flex-col items-center overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap py-10 text-left">
            <div className="flex w-full flex-col space-y-5 sm:w-2/4 sm:border-r-2 sm:border-border">
              <div className="w-full">
                <Link aria-label="Footer logo" href="/">
                  {/* <div title="logo-coulisses"> */}
                  <div className="flex h-20 w-full">
                    <Image
                      className="h-full w-fit rounded-none object-cover object-center"
                      alt={
                        props.logo.logoImg.data?.attributes.logoText ??
                        "logo footer image"
                      }
                      width="143"
                      height="76"
                      id="img1"
                      src={props.logo.logoImg.data?.attributes.url}
                    />
                  </div>
                  {/* </div> */}
                </Link>
              </div>
              <div className="w-full max-w-lg">
                <div className="flex flex-wrap justify-between">
                  {props?.columns?.map((d: any, i: any) => (
                    <div key={i} className="p-1">
                      <Title className="mb-0" level={3}>
                        {d.title}
                      </Title>
                      <p className="whitespace-pre-line text-sm font-normal">
                        {d.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="inline-flex py-1">
                {props?.socialNetworks?.map((d: any, i: any) => {
                  let Icon: any;
                  switch (d.icon) {
                    case "facebook":
                      Icon = FaFacebookF;
                      break;
                    case "instagram":
                      Icon = FaInstagram;
                      break;
                    case "linkedin":
                      Icon = FaLinkedinIn;
                      break;
                    // ajoutez plus de cas si nécessaire
                    default:
                      break;
                  }
                  return (
                    <Link
                      key={i}
                      aria-label={d.icon}
                      className="mx-1 w-fit rounded-full p-2 ring-1 ring-accent"
                      href={d.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Icon && <Icon />}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="w-full max-w-md sm:w-2/4 sm:pl-7">
              <div className="flex flex-wrap justify-between">
                {navigationData?.map((item: any, i: any) => (
                  <div key={i}>
                    {item?.children?.length > 1 && (
                      <div key={i} className="p-1">
                        <Title className="mb-0" level={3}>
                          {item.parent}
                        </Title>
                        <ul className="">
                          {item?.children?.map((link: any) => (
                            <ListItem
                              key={link.id}
                              title={link.text}
                              href={link.url || "#"}
                            />
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex py-7 pt-0 sm:pt-7">
            <div className="flex w-full flex-col justify-between text-base font-normal sm:flex-row">
              <span className="text-base font-normal sm:pr-3">
                <Link
                  className="text-base font-normal"
                  href="https://www.verywell.digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.copyright} &copy; {new Date().getFullYear()}
                </Link>
              </span>
              <ul className="flex flex-col sm:flex-row sm:space-x-1">
                {navigationData?.map(
                  (item: any, i: any) =>
                    item?.children?.length < 2 &&
                    item?.children?.map((link: any) => (
                      <li key={i} className="text-base font-normal sm:pr-3">
                        <Link
                          className="text-base font-normal hover:text-primary"
                          href={link.url || "#"}
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))
                )}
              </ul>
            </div>
          </div>
        </div>
        {/* <div
          aria-hidden="true"
          className="absolute inset-0 h-full w-full bg-[#020314] opacity-80"
        ></div> */}
      </div>
    </footer>
  );
}

export default Footer;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="py-1">
      <Link
        href={ref as any}
        className={cn("hover:text-primary", className)}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
