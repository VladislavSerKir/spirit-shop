export const config = {
  apiEndPoint: "http://localhost:3001",
  clientId: "0236616fe6874009a8868ba166bad6ad",
  clientSecret: "e695b0ce7ee84949a67296bb96d8391f",
  redirectURI: "http://localhost:3000/oauth/callback",
};

export interface IRefreshData {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
