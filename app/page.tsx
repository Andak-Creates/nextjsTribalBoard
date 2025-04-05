"use client";
import FetchingComp from "./ui-comps/fetchingComp";
import FundabilityTable from "./ui-comps/fundability-table";

export default function Home() {
  return (
    <div className="">
      <h1 className="px-3 font-bold mb-4">Overview</h1>
      <FetchingComp />
      <FundabilityTable sliceValue={10} />
    </div>
  );
}
