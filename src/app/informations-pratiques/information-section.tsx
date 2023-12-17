import { ContactForm } from "@/components/form/contact-form";
import { IoCalendarOutline, IoTicketOutline } from "react-icons/io5";

export default function InformationSection({ domain, mainSection }) {
  return (
    <div className="flex flex-wrap pb-16 pt-5 lg:pb-20 xl:pb-24">
      <div className="w-full space-y-6 lg:w-1/2 lg:pr-6">
        <div className="flex flex-col space-y-4">
          <div className="inline-flex">
            <div className="icon-with-circle h-min">
              <IoCalendarOutline />
            </div>
            <div className="w-[calc(100%-32px)] pl-4">
              <p className="flex pb-4 text-2xl font-bold text-primary">
                {mainSection.schedules.title}
              </p>
              <div
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html: mainSection.schedules.description,
                }}
              ></div>
            </div>
          </div>
          <div className="inline-flex">
            <div className="icon-with-circle h-min">
              <IoTicketOutline />
            </div>
            <div className="w-[calc(100%-32px)] pl-4">
              <div className="font-semibold text-primary">
                {mainSection.price.title}
              </div>
              <div
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html: mainSection.price.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-9 w-full rounded-2xl bg-card p-7 lg:mt-0 lg:w-1/2 lg:p-9">
        <ContactForm
          hideFields={{ sector: true }}
          title="Nous contacter"
          siteOrigin={domain}
          emailDestinationAddress={mainSection?.emailDestinationAddress}
          emailSubject={mainSection?.emailSubject}
        />
      </div>
    </div>
  );
}
