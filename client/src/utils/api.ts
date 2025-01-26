export const config = {
  frontendEndPoint: "https://spirit-shop.vercel.app", // https://spirit-shop.vercel.app/   http://localhost:3000
  apiEndPoint: "https://spirit-shop.onrender.com", // https://spirit-shop.onrender.com/  http://localhost:3001
  clientId: "0236616fe6874009a8868ba166bad6ad",
  clientSecret: "e695b0ce7ee84949a67296bb96d8391f",
  redirectURI: "https://spirit-shop.vercel.app/oauth/callback",
  googleClientId:
    "174103314432-7qmnrd8h4mkss63di8nhaajqbmg9re59.apps.googleusercontent.com",
  googleSecret: "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",
  googleSheetsClientId:
    "1098182760674-ct5quomh9gfo7gkjnu43bpr0bnra8f60.apps.googleusercontent.com",
  googleSheetsApiKey: "AIzaSyCSRDpdmNF7Xu8etYNrOfKFHUXtnsos050",
  spreadsheetId: "1h9qZtR7fpEhVWmFWt3rpnFbI4LV8dHrTZh-SwhUYD8M",
};

export interface IRefreshData {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
