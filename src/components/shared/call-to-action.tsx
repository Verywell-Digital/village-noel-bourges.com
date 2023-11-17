import "@typeform/embed/build/css/widget.css";
import Link from "next/link";
import Title from "../ui/title";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import ButtonIcon from "../ui/button-icon";

interface CallToActionProps {
  title?: string;
  label?: string;
  href?: string;
  className?: string;
}

export default function CallToAction({
  title = "CTA Title",
  label = "CTA Label",
  href = "/",
  className,
}: CallToActionProps) {
  return (
    <section className="w-full lg:w-[25%]">
        <div className={className}>
          <Title className="text-grayBgDark mb-0 w-max" level={3} isHTML>
            {title}
          </Title>
          <Link href={""} className="group">
            <Button variant="ghost" className="w-fit">
              {label}
              <ButtonIcon variant="secondary" />
            </Button>
          </Link>
        </div>
    </section>
  );
}
