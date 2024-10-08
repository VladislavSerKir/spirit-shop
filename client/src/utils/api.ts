export const config = {
  apiEndPoint: "http://localhost:3001",
};

export interface IRefreshData {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
