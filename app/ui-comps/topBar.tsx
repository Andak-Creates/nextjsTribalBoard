import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { IoCloseSharp, IoMoon, IoNotifications } from "react-icons/io5";

interface TopBarProps {
  toggleNav: () => void;
  isOpen: boolean;
}

export default function TopBar({ isOpen, toggleNav }: TopBarProps) {
  return (
    <div className="fixed w-full lg:w-[80%] top-0 left-0 bg-white flex  ml-0   lg:ml-64  py-5 px-7 items-center  justify-between">
      {/* Search Bar section */}
      <div className="hidden lg:block">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
          placeholder="search"
        />

        <MagnifyingGlassIcon className="absolute left-[35px]  top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>

      {/* Triber Logo */}
      <div className="block lg:hidden">
        <Image
          src="/images/triberrImage.png"
          alt="logo"
          width={80}
          height={80}
        />
      </div>

      {/* Avartar and theme section */}
      <div className="flex text-[25px] items-center gap-5 text-[--greyText]">
        <IoMoon />
        <div className="hidden md:block">
          <IoNotifications />
        </div>
        <Image
          src="/images/tribalAvatar.jpeg"
          alt="avatar"
          height={25}
          width={35}
          className="rounded-[50%] hidden md:block"
        />

        {isOpen === true ? (
          <button
            onClick={toggleNav}
            className="block lg:hidden cursor-pointer text-[30px]"
          >
            <IoCloseSharp />
          </button>
        ) : (
          <button
            onClick={toggleNav}
            className="block lg:hidden cursor-pointer"
          >
            <Image
              src="/images/burgerIcon.png"
              alt="Logo"
              width={32}
              height={32}
            />
          </button>
        )}
      </div>
    </div>
  );
}
