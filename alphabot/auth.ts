import axios, { AxiosInstance } from "axios";
import { ethers } from "ethers";

const apiClient = axios.create({ baseURL: "https://www.alphabot.app" });

const setSession = async (apiClient: AxiosInstance): Promise<string | undefined> => {
	try {
		const response = await apiClient.get("/api/auth/session", {
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
			},
		});

		const cookies = response.headers["set-cookie"]?.map((cookie) => cookie.split(";")[0]).join("; ");

		return cookies;
	} catch (error) {
		console.error("Error fetching session:", error);
	}
};

const getCSRFToken = async (apiClient: AxiosInstance, cookies: string | undefined) => {
	try {
		const response = await apiClient.get("/api/auth/csrf", {
			headers: {
				Cookie: cookies,
			},
		});

		return response.data.csrfToken;
	} catch (error) {
		console.error("Error fetching CSTF token:", error);
	}
};

const authWithWallet = async (apiClient: AxiosInstance, privateKey: string, csrfToken: string, cookies: string | undefined) => {
	const wallet = new ethers.Wallet(privateKey);

	let nonce = "";
	let newCookies = "";

	try {
		const response = await apiClient.get(`/api/auth/nonce?address=${wallet.address}`, {
			headers: {
				Cookie: cookies,
			},
		});

		nonce = response.data.nonce;
		newCookies = response.headers["set-cookie"]?.map((cookie) => cookie.split(";")[0]).join("; ") || "";
	} catch (error) {
		console.error("Error fetching callback credentials:", error);
	}

	const updatedCookies = cookies + ";" + newCookies;
	const messageToSign = `Sign this message to either enter a raffle that requires holding a specific NFT, edit your profile, or to gain access to premium functionality with Alphabot. (${nonce})`;
	const signature = await wallet.signMessage(messageToSign);

	try {
		const response = await apiClient.post(
			"/api/auth/callback/credentials",
			{
				callBackUrl: "https://www.alphabot.app/",
				redirect: "false",
				address: wallet.address,
				signature: signature,
				blockchain: "ETH",
				walletType: "metamask",
				csrfToken: csrfToken,
				json: "true",
			},
			{
				headers: {
					Cookie: updatedCookies,
				},
			}
		);

		if (response.data.url === "https://www.alphabot.app") {
            const sessionToken = response.headers["set-cookie"]?.find((cookie) => cookie.startsWith("__Secure-next-auth.session-token"));
            const formattedSessionToken = sessionToken?.split(";")[0];

            const updatedCookies = cookies + ";" + formattedSessionToken;
            return updatedCookies;
		}

		return "failed";
	} catch (error) {
		console.error("Error authenticating with wallet:", error);
	}
};

export const authenticate = async (privateKey: string) => {
	const cookies = await setSession(apiClient);
	const csrfToken = await getCSRFToken(apiClient, cookies);
	const updatedCookiesWithSessionToken = await authWithWallet(apiClient, privateKey, csrfToken, cookies);

    return updatedCookiesWithSessionToken || "";
};

