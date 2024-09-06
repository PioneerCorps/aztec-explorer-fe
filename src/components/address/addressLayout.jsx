import { AddressSummary } from "./addressSummary";
import { AddressTransactionList } from "./addressTransactionList";
import { PrivateTransactionList } from "./privateTransactionList";
import { WriteContract } from "./writeContract";
import { ReadContract } from "./readContract";
import { ContractCode } from "./contractCode";

import { SearchBar } from "../landing/searchBar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Address = () => {
  // Tab options
  const tabs = ["public", "private", "contract", "read", "write"];
  const location = useLocation();
  const navigate = useNavigate();

  // State to manage the currently selected tab
  const [tab, setTab] = useState("public");

  useEffect(() => {
    // Extract the hash from the URL and remove the leading '#'
    const currentHash = location.hash.replace("#", "");

    if (!currentHash) {
      // If there is no hash, navigate to the default 'public' tab
      navigate("#public", { replace: true });
      setTab("public");
    } else if (tabs.includes(currentHash)) {
      // If the hash corresponds to a valid tab, update the tab state
      setTab(currentHash);
    } else {
      // If the hash doesn't match any tab, default to 'public'
      navigate("#public", { replace: true });
      setTab("public");
    }
  }, [location, navigate, tabs]);

  const renderTabs = () => {
    return (
      <div className="flex gap-3 py-4">
        {tabs.map((tabName) => (
          <div
            key={tabName}
            className={`button-orange py-2 ${tab === tabName ? "active" : ""}`}
            onClick={() => navigate(`#${tabName}`)}
          >
            {tabName}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (tab) {
      case "public":
        return <AddressTransactionList />;
      case "private":
        return <PrivateTransactionList />;
      case "contract":
        return <ContractCode />;
      case "read":
        return <ReadContract />;
      case "write":
        return <WriteContract />;
      default:
        return null;
    }
  };

  return (
    <div className="px-[82px] py-[73px]">
      <div className="primary-box">
        <div className="flex items-center">
          <div className="flex-col gap-2 w-full pb-6">
            <div className="headerExa !text-4xl">Address</div>
            <div className="text-pastelPink font-extralight underline">
              0xb6872F0C58B6Cf67EfBbEFcE230cC75B006F1A09
            </div>
          </div>
          <SearchBar />
        </div>
        <AddressSummary />
        {renderTabs()}
        {renderContent()}
      </div>
    </div>
  );
};
