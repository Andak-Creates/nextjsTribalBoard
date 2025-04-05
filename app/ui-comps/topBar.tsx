import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { IoMoon, IoNotifications } from "react-icons/io5";

export default function TopBar() {
  return (
    <div className="relative flex flex-1 ml-64 py-5 px-7  justify-between">
      <div>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-80 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
          placeholder="search"
        />

        <MagnifyingGlassIcon className="absolute left-[35px]  top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>

      <div className="flex text-[25px] items-center gap-5 text-[--greyText]">
        <IoMoon />
        <IoNotifications />
        <Image
          src="/images/tribalAvatar.jpeg"
          alt="avatar"
          height={25}
          width={35}
          className="rounded-[50%]"
        />
      </div>
    </div>
  );
}
