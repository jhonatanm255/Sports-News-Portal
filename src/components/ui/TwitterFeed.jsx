import React, { useEffect, useState } from "react";
import TwitterWidget from "./TwitterWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import useMediaQuery from "../../hooks/useMediaQuery";

const TwitterFeed = ({
  accounts = [],
  mobileHeight = 700,
  desktopHeight = 1650,
  singleAccountMode = false,
}) => {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [visibleAccounts, setVisibleAccounts] = useState([]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setVisibleAccounts(accounts);
    }
  }, [accounts]);

  if (!accounts || accounts.length === 0) return null;

  const containerHeight =
    isMobile || singleAccountMode ? mobileHeight : desktopHeight;
  const widgetHeight =
    isMobile || singleAccountMode
      ? mobileHeight - 50
      : Math.floor(desktopHeight / visibleAccounts.length) - 30;

  return (
    <div
      className="twitter-feed mb-6 p-4 bg-white shadow-lg rounded-lg"
      style={{ height: `${containerHeight}px` }}
    >
      <h3 className="font-custom text-lg font-semibold mb-4 flex items-center">
        <FontAwesomeIcon icon={faXTwitter} className="text-2xl mr-2" />
        {singleAccountMode ? `@${visibleAccounts[0]}` : "Top News Sports"}
      </h3>

      <div className="space-y-4">
        {visibleAccounts.map((account, index) => (
          <TwitterWidget
            key={`${account}-${index}`}
            account={account}
            height={widgetHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default TwitterFeed;