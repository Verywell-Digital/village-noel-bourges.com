"use client";

import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function MobileNavigationMenu({ ...props }) {
  const navigationData = Object.values(props);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Menu className="my-auto h-12 w-12 text-secondary duration-500 hover:rotate-180" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="w-56">
            <Link href="/">
              <Image
                className="h-full w-full object-cover"
                width={193}
                height={95}
                src={props.logo.logoImg.data?.attributes.url}
                alt={"logo image"}
                sizes="(max-width: 768px) 100vw"
                quality={100}
                priority={true}
              />
            </Link>
          </SheetTitle>
          {/* <SheetDescription>
            Lorem
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {navigationData.map((item: any, index: any) => (
            <React.Fragment key={index}>
              {item?.children?.length > 1 ? (
                <div key={`menu-${index}`}>
                  {item.position !== "hideMenu" && (
                    <>
                      <div className="">{item.parent}</div>
                      <div>
                        <ul className="grid min-w-max gap-3 p-4 md:grid-cols-1">
                          {item.children.map((link: any) => (
                            <ListItem
                              key={link.text}
                              title={link.text}
                              href={link.url || "#"}
                            >
                              {/* {link.description} */}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                item.position !== "hideMenu" &&
                item?.children?.map((link: any) =>
                  link.newTab ? (
                    <SheetFooter
                      key={link.text}
                      className="absolute bottom-10 right-10 "
                    >
                      <Link
                        href={link.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant={"secondary"}>
                          {link.text}
                          <ButtonIcon />
                        </Button>
                      </Link>
                    </SheetFooter>
                  ) : (
                    <Link
                      key={link.text}
                      href={link.url}
                      passHref
                      className="hover:text-primary"
                    >
                      <div className="">{link.text}</div>
                    </Link>
                  )
                )
              )}
            </React.Fragment>
          ))}
        </div>
        {/* <SheetFooter>TEST</SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}

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
