import { bibleBackendUrl } from "./getAxios";

const refreshAccessToken = async (url: string, token: any) => {
  try {
    const { data } = await bibleBackendUrl.get(url, {
      headers: {
        Authorization: `Refresh ${token.refreshToken}`
      }
    });
    if (data?.status) {
      return {
        ...token,
        accessToken: data.data.accessToken,
        expiresAt: new Date(Date.now() + (1 * 60 * 60 * 1000))
      };
    }
  } catch (error) {
    console.error("Something went wrong on refreshToken!");
  }
};

export default async function getAccessToken(token: any) {
  const apiUrl = token.role === "admin" ? "/admin/refresh-token" : "/user/refresh-token";
  return await refreshAccessToken(apiUrl, token);
}
