import { FaCalendarDays, FaLocationDot, FaTicket } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export default function Information({ ...props }) {
  return (
    <div
      className={cn(
        "mb-4 w-full rounded-2xl text-left",
        props.position === "center" ? "w-full bg-card" : "bg-white"
      )}
    >
      <div className="pl-4 pr-4">
        <div className="flex items-start justify-items-start border-b border-solid border-primary border-opacity-50 pb-4 pt-4 text-primary">
          <div className="mr-2.5 h-fit w-fit rounded-full border border-primary p-2">
            <FaCalendarDays />
          </div>
          <ul dangerouslySetInnerHTML={{ __html: props.information?.date || "" }} />
        </div>
        <div className="flex items-start justify-items-start border-b border-solid border-primary border-opacity-50 pb-4 pt-4 text-primary">
          <div className="mr-2.5 h-fit w-fit rounded-full border border-primary p-2">
            <FaLocationDot />
          </div>
          <div dangerouslySetInnerHTML={{ __html: props.information?.address || "" }} />
        </div>
        <div className="flex items-center justify-items-center pb-4 pt-4 text-primary">
          <div className="mr-2.5 h-fit w-fit rounded-full border border-primary p-2">
            <FaTicket />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: !isNaN(props.information?.price) ? String(props.information?.price) + "€" : props.information?.price || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
