export const config = {
  frontendEndPoint: "http://localhost:3000",
  apiEndPoint: "http://localhost:3001",
  clientId: "0236616fe6874009a8868ba166bad6ad",
  clientSecret: "e695b0ce7ee84949a67296bb96d8391f",
  redirectURI: "http://localhost:3000/oauth/callback",
  googleClientId:
    "174103314432-7qmnrd8h4mkss63di8nhaajqbmg9re59.apps.googleusercontent.com",
  googleSecret: "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",
};

export interface IRefreshData {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
