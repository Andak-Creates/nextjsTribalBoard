"use client";

import { useEffect, useState } from "react";
import ProgressCircle from "./progressCircle";
import { RiFundsFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import clsx from "clsx";
import { MdBusinessCenter } from "react-icons/md";
import { FaNairaSign } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import DocumentComp from "./documentComp";

export default function FundabilityDisplay() {
  const [userDetails, setUserDetails] = useState<any[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("clickedUserDetails");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setUserDetails(Array.isArray(parsedData) ? parsedData : [parsedData]);
    }
  }, []);

  if (userDetails.length === 0) return <p>Checking for Data</p>;

  return (
    <div>
      {userDetails.map((user: any) => (
        <div key={user.id}>
          <div className="mt-[40px]">
            <h2 className="font-bold flex items-center gap-1 mb-3">
              <span className="text-[--greyText]">
                <RiFundsFill />{" "}
              </span>
              Fundability Score
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <ProgressCircle
                  value={user.fundabilityScore}
                  inside
                  color="#41b27c"
                  size={80}
                  strokeWidth={8}
                />
              </div>

              <div className="flex h-fit ">
                <button className="px-5 py-1 border-[1.2px] border-[--greyText] rounded-[8px]">
                  Update Score
                </button>
              </div>
            </div>
          </div>

          {/* Business OverView */}
          <div className="mt-[30px]">
            <h2 className="font-bold flex items-center gap-1 mb-3 mt[10px]">
              <span className="text-[--greyText]">
                <MdBusinessCenter />{" "}
              </span>
              Business Overview
            </h2>
            {userDetails.map((user: any) => (
              <div
                key={user.id}
                className="border-[1px] border-[--borderColor] grid grid-cols-3 p-4 gap-4 rounded-[8px] mt-[8px]"
              >
                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Business Name
                  </small>
                  <p className="font-bold text-[14px] text-[--primaryGreen]">
                    {user.businessDetails.name}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">Email</small>
                  <p className="font-bold text-[14px]">{user.email}</p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Phone Number
                  </small>
                  <p className="font-bold text-[14px]">{user.phoneNumber}</p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Business Owner
                  </small>
                  <p className="font-bold text-[14px] text-[--primaryGreen]">
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Ownership Type
                  </small>
                  <p className="font-bold text-[14px]">
                    {user.businessDetails.ownershipType}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Location
                  </small>
                  <p className="font-bold text-[14px]">{user.dateJoined}</p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Industry
                  </small>
                  <p className="font-bold text-[14px]">
                    {user.businessDetails.industry}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Address
                  </small>
                  <p className="overflow-hidden w-fit flex  rounded-[3px] font-bold text-[14px]">
                    {user.location}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Established
                  </small>
                  <p className="overflow-hidden w-fit flex  rounded-[3px] font-bold text-[14px]">
                    Thursday {user.dateJoined}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Valuation Report */}
          <div className="mt-[40px] ">
            <h2 className="font-bold flex items-center gap-1 ">
              <span className="text-[--greyText]">
                <RiMoneyDollarCircleFill />{" "}
              </span>
              Financial Details
            </h2>

            <div className="border-[1px] border-[borderColor] rounded-[8px] p-5 mt-[18px]">
              <p className="text-[14px] text-[--primaryGreen]">
                Valuation Summary
              </p>

              <div className="grid grid-cols-3 pb-6 gap-y-6">
                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Average Monthly Salary
                  </small>
                  <p className=" text-[14px] flex items-center gap-1">
                    <FaNairaSign /> {user.businessDetails.proposalAmount}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Last Reported Yearly Sales
                  </small>
                  <p className=" text-[14px] flex items-center gap-1">
                    <FaNairaSign /> {user.businessDetails.proposalAmount}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    EBITDA/Operating Profit Margin Percentage
                  </small>
                  <p className=" text-[14px]">{user.fundabilityScore}%</p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Total Asset Valuation
                  </small>
                  <p className=" text-[14px]">
                    {user.businessDetails.proposalAmount}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Tentative Business Selling Price
                  </small>
                  <p className=" text-[14px]">
                    {user.businessDetails.proposalAmount}
                  </p>
                </div>

                <div>
                  <small className="text-[12px] text-[--greyText]">
                    Reason For Sale
                  </small>
                  <p className=" text-[14px]">Cashing Out</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Section */}
        </div>
      ))}
      <div className="mt-[30px]">
        <h2 className="font-bold flex items-center gap-1 mb-5 ">
          <span className="text-[--greyText]">
            <IoDocumentText />{" "}
          </span>
          Business Overview
        </h2>
        <div className="grid grid-cols-3">
          <DocumentComp />
          <DocumentComp />
        </div>
      </div>
    </div>
  );
}
