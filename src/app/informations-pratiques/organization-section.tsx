import Title from "@/components/ui/title";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import {
  IoLocationSharp,
  IoCallSharp,
  IoMailSharp,
  IoGlobeSharp,
  IoCall,
  IoMailOutline,
} from "react-icons/io5";
import Map from "./map";

export default function OrganizationSection({ organization }) {
  const DynamicMap = dynamic(() => import("./map"), { ssr: false });

  return (
    <>
      <div className="flex w-full flex-wrap pb-16 lg:pb-20 xl:pb-24">
        <Title className="font-semibold uppercase" level={2} isHTML>
          {organization.mainAddress.title}
        </Title>
        <div className="flex w-full flex-wrap items-center lg:w-1/2 lg:pr-6">
          <div className="w-full sm:w-1/2 sm:pr-3.5">
            <IconWithText
              icon={IoLocationSharp}
              text={organization.mainAddress.description}
            />
            <IconWithText
              icon={IoLocationSharp}
              text={organization.annexAddress.description}
            />
          </div>
          <div className="w-full sm:w-1/2 sm:pl-3.5">
            <IconWithText icon={IoCall} text={organization.phone} />
            <IconWithText icon={IoMailOutline} text={organization.mail} />
            <IconWithText icon={IoGlobeSharp} text={organization.web} />
          </div>
          <div className="inline-flex">
            {organization?.socialNetworks?.map((d: any, i: any) => {
              let Icon;
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
                  className="mx-1 w-fit rounded-full p-2 ring-1 ring-primary"
                  href={d.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Icon && <Icon className="text-primary" />}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="z-0 w-full lg:w-1/2">
          <Title className="py-2 normal-case text-primary" level={4}>
            {organization.mapTitle}
          </Title>
          <DynamicMap
            position={[organization.mapLat, organization.mapLng]}
            popup={organization.mapPopup}
          />
        </div>
      </div>
    </>
  );
}

function IconWithText({ icon: Icon, text }) {
  return (
    <div className="inline-flex pb-7">
      <div className="icon-with-circle h-min">
        <Icon />
      </div>
      <div
        className="pl-4 text-base"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
