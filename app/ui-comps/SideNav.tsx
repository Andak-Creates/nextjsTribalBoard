"use client";

import clsx from "clsx";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import { FcSettings } from "react-icons/fc";
import { TiMessages } from "react-icons/ti";
import Link from "next/link";
import { CiGrid32 } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { PiHandshakeFill } from "react-icons/pi";
import { RiFundsFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const links = [
  { name: "overview", href: "/", icon: CiGrid32 },
  { name: "users", href: "/users", icon: FaUserCircle },
  { name: "businesses", href: "/businesses", icon: MdBusinessCenter },
  { name: "fundability tests", href: "/fundability-test", icon: RiFundsFill },
  { name: "deals", href: "/deals", icon: PiHandshakeFill },
];

interface SideNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SideNav({
  isOpen,
  setIsOpen,
}: SideNavProps): JSX.Element {
  const pathName = usePathname();
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div
        className={`h-full  lg:w-[264px] md:hidden  bg-white px-5 pt-5 fixed top-[0%] lg:flex flex-col text-[#526077] md:px2 border-[1px] z-10 ${
          isOpen
            ? "block w-full mt-[80px] items-center justify-center z-0 "
            : "hidden"
        } md:block`}
      >
        {/* Search Bar */}
        <div className="relative w-full   flex lg:hidden justify-center items-center lg:mb-5">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
            placeholder="search"
          />

          <MagnifyingGlassIcon className="absolute left-[5%]  top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        <div className=" gap-5 hidden md:flex">
          <Image
            src="/images/burgerIcon.png"
            alt="Logo"
            width={32}
            height={32}
          />

          <Image
            src="/images/triberrImage.png"
            alt="Logo"
            width={78}
            height={48}
          />
        </div>

        {/* Navigation Links */}
        <div className="mt-[10px] lg:mt-[30px] h-[350px]">
          {links.map((link) => {
            const LinkIcon = link.icon;
            const isActive =
              link.href === "/"
                ? pathName === "/"
                : pathName.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium mt-[6px] text-[16px] hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "bg-green-50 text-green-600": isActive,
                    "w-full justify-start text-left": isOpen,
                  }
                )}
                onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center ">
                  <span className="w-7 text-[18px]">
                    <LinkIcon />
                  </span>
                  <p>{link.name}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto h-[10%] flex flex-col justify-end">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-16 font-medium hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <FcSettings />
            Settings
          </button>

          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-16 font-medium hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <TiMessages />
            Support
          </button>

          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-16 font-medium hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <CiLogout />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
