import { useState, useEffect } from "react";

interface Data {
  [key: string]: string; // A mapping of ID to content
}

export function useGetDetails(data: Data, placeholder: string) {
  const [detail, setDetail] = useState<string>(placeholder);

  // Check if there's any data in sessionStorage on initial load
  useEffect(() => {
    const storedDetail = sessionStorage.getItem("clickedDetail");
    if (storedDetail) {
      setDetail(storedDetail);
    }
  }, []);

  const HandleClick = (id: string) => {
    const content = data[id] || "No data available for this element.";
    setDetail(content);

    // Store the clicked element's data in sessionStorage
    sessionStorage.setItem("clickedDetail", content);
  };

  return {
    detail,
    HandleClick,
  };
}
