"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiGrid32 } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { PiHandshakeFill } from "react-icons/pi";
import { RiFundsFill } from "react-icons/ri";

const links = [
  { name: "overview", href: "/", icon: CiGrid32 },
  { name: "users", href: "/users", icon: FaUserCircle },
  { name: "businesses", href: "/businesses", icon: MdBusinessCenter },
  { name: "fundability tests", href: "/fundability-test", icon: RiFundsFill },
  { name: "deals", href: "/deals", icon: PiHandshakeFill },
];

export default function NavLinks() {
  const pathName = usePathname();

  return (
    <div className="mt-[30px] h-[350px]">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive =
          link.href === "/" ? pathName === "/" : pathName.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium mt-[6px] text-[16px] hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-green-50 text-green-600": isActive }
            )}
          >
            <span className="w-7 text-[18px]">
              <LinkIcon />
            </span>
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
