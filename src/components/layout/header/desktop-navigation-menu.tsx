import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import { usePathname } from "next/navigation";

export function DesktopNavigationMenu({ ...props }) {
  const navigationData = Object.values(props);
  const leftNavigationData = navigationData.filter(
    (item: any) => item.position === "leftMenu"
  );
  const rightNavigationData = navigationData.filter(
    (item: any) => item.position === "rightMenu"
  );
  return (
    <div className="container flex justify-between py-2">
      <div className="flex justify-start">
        <div className="flex items-center justify-center">
          <span className="text-sm font-thin text-secondary opacity-80">
            Vous êtes...
          </span>
          <span className="h-7 border border-b-0 border-l-0 border-t-0 border-slate-200 px-2 align-middle"></span>
        </div>
        <MenuSection navigationData={leftNavigationData} />
      </div>
      <div className="flex justify-end">
        <MenuSection navigationData={rightNavigationData} />
      </div>
    </div>
  );
}

const MenuSection = ({ navigationData }: any) => {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      {navigationData.map((item: any, index: any) => (
        <React.Fragment key={index}>
          {item.children.length > 1 ? (
            <NavigationMenu key={`menu-${index}`}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`${navigationMenuTriggerStyle()} mx-1 text-secondary ${
                      item.children.some((child: any) => pathname === child.url)
                        ? "!bg-black/10"
                        : "bg-transparent"
                    }`}
                  >
                    {item.parent}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-b-2xl bg-primary text-secondary">
                    <ul className="grid min-w-max gap-3 p-4 md:grid-cols-1">
                      {item.children.map((link: any) => (
                        <React.Fragment key={link.text}>
                          <ListItem
                            title={link.text}
                            href={link.url || "#"}
                          >
                            {/* {link.description} */}
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                  {/* <NavigationMenuViewport className="!border-none !bg-primary ring-2" /> */}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            item.position !== "hideMenu" &&
            item.children.map((link: any) => (
              <React.Fragment key={link.text}>
                {link.newTab ? (
                  <a
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant={"secondary"}>
                      {link.text}
                      <ButtonIcon />
                    </Button>
                  </a>
                ) : (
                  <Link key={link.text} href={link.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} mx-1 text-secondary ${
                        pathname === link.url ? "bg-black/10" : "bg-transparent"
                      }`}
                    >
                      {link.text}
                    </NavigationMenuLink>
                  </Link>
                )}
              </React.Fragment>
            ))
          )}
          {item.children.every((link: any) => link.newTab !== true) &&
            index !== navigationData.length - 1 && (
              <span className="h-7 border border-b-0 border-l-0 border-t-0 border-slate-200 align-middle"></span>
            )}
        </React.Fragment>
      ))}
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={ref as any}
          className={cn(
            "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-black/10 hover:text-accent-foreground focus:bg-black/20 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
