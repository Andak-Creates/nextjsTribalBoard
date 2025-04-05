import Image from "next/image";
import NavLinks from "./navLinks";
import { CiLogout } from "react-icons/ci";
import { FcSettings } from "react-icons/fc";
import { TiMessages } from "react-icons/ti";

export default function SideNav() {
  return (
    <div className=" h-full w-[264px] bg-white px-5 py-5 fixed top-0 flex flex-col text-[#526077] md:px2 border-r-[1px]">
      <div className="flex gap-5">
        <Image src="/images/burgerIcon.png" alt="Logo" width={32} height={32} />

        <Image
          src="/images/triberrImage.png"
          alt="Logo"
          width={78}
          height={48}
        />
      </div>

      <NavLinks />
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
  );
}
