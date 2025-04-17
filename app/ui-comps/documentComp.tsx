import { IoDocumentText } from "react-icons/io5";

export default function DocumentComp() {
  return (
    <div className=" sm:block  md:w-[450px] border border-[--borderColor] rounded-[8px] overflow-hidden">
      <div className="h-[100px]  flex items-end justify-center text-[70px] bg-gray-100">
        <IoDocumentText />
      </div>

      <div className="p-4">
        <p>IP & Trademark License</p>
        <div className="flex justify-between ">
          <small>pdf</small>
          <small>1.2mb</small>
        </div>
      </div>
    </div>
  );
}
