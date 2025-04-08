import { BiSolidMemoryCard } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";

export default function DocumentPreview() {
  return (
    <div className="m-auto mt-[20px]">
      <div className="flex gap-5 items-center m-1">
        <span className="flex items-center">
          <IoDocumentText /> Jpg
        </span>
        <span className="flex items-center">
          <BiSolidMemoryCard /> 3455kb
        </span>
      </div>
      <div className="h-[400px] bg-black w-[400px]  flex items-center justify-center">
        <h1 className="text-white text-[60px] rotate-[-60deg]">document</h1>
      </div>
    </div>
  );
}
