import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Button from "../../shared/button/button";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ii18n } from "../../i18n";
import { config } from "../../utils/api";

const GoogleSheetsExport = ({ data }: any) => {
  const { t } = useTranslation();
  const CLIENT_ID = config.googleSheetsClientId;
  const API_KEY = config.googleSheetsApiKey;
  const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    function start() {
      if (!CLIENT_ID || !API_KEY) {
        toast.warn(
          `${ii18n.t("For exporting to Google Sheets CLIENT_ID and API_KEY must be provided")}`
        );
        return;
      }

      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPE,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(setIsSignedIn);
        });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handleAuthClick = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signIn();
    } else {
      toast.error(
        `${ii18n.t("Error occured during Google Sheets authentication")}`
      );
    }
  };

  const exportToSheets = async () => {
    if (!isSignedIn) {
      toast.error(`${ii18n.t("User is not signed in Google Sheets")}`);
      return;
    }

    const header = [
      t("Name"),
      t("Price"),
      t("Bought"),
      t("Revenue"),
      t("Average rating"),
      t("Review count"),
    ];

    const values = data.map((item: any) => {
      return [
        item.name || item.title,
        item.value || item.price || "",
        item.unit || item.bought || "",
        item.revenue || "",
        item.averageRating || "",
        item.reviewCount || "",
      ];
    });
    values.splice(0, 0, [t("Shop statistic")]);
    values.splice(10, 0, []);
    values.splice(11, 0, [t("Product statistic")]);
    values.splice(12, 0, header);

    const resource = {
      values,
    };

    try {
      const response = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        resource,
      });
      console.log("Data exported successfully:", response);
      toast.success(`${ii18n.t("File successfuly exported to Google Sheets")}`);
    } catch (error) {
      toast.error(
        `${ii18n.t("Error occured during exporting file in Google Sheets")}`
      );
    }
  };

  return (
    <div>
      {!isSignedIn ? (
        <Button
          buttonStyle="arrow-up"
          buttonType="button"
          textContent={t("Authorize")}
          buttonHandler={handleAuthClick}
        />
      ) : (
        <Button
          buttonStyle="arrow-up"
          buttonType="button"
          textContent={t("Export to Google Sheets")}
          buttonHandler={exportToSheets}
        />
      )}
    </div>
  );
};

export default GoogleSheetsExport;
