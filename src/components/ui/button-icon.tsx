import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonIconVariants = cva(
  "h-8 w-8 rounded-full p-2.5 transition-transform duration-200 ease-out group-hover:translate-x-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-secondary ring-1 ring-primary",
        secondary: "bg-secondary text-primary ring-1 ring-secondary",
        accent: "bg-accent-foreground text-accent ring-1 ring-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ButtonIconProps extends VariantProps<typeof buttonIconVariants> {}

function ButtonIcon({ variant }: ButtonIconProps) {
  return (
    <div className="relative flex w-fit rounded-full ring-1 ring-inset ring-accent ml-2">
      <ArrowRight className={cn(buttonIconVariants({ variant }))} />
    </div>
  );
}

export default ButtonIcon;
