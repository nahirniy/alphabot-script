import axios from "axios";
import { log } from "./utils/helpers";

export const registerToRaffle = async (raffleSlug: string, raffleName: string, apiKey: string, httpsAgent: any, userAgent: string) => {
	const apiClient = axios.create({ baseURL: "https://api.alphabot.app/v1" });

	let data: any;

	try {
		const response = await apiClient.post(
			`/register`,
			{ slug: raffleSlug },
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"User-Agent": userAgent,
				},
				httpsAgent: httpsAgent,
			}
		);

		data = response.data;
	} catch (error: any) {
		const errorMessage =
			Array.isArray(error?.response?.data?.errors) && error.response.data.errors.length > 0
				? error.response.data.errors[0]?.message
				: "Unknown error";
				
		log.error(`Error registering to ${raffleName} raffle: ${errorMessage}`);
		return;
	}

	if (data.success) {
		log.success(`Successfully registered to ${raffleName} raffle`);
	} else {
		try {
			const errorMessage = Array.isArray(data?.errors) && data.errors.length > 0 ? data.errors[0]?.message : "Unknown error";

			if (errorMessage.includes("registration")) {
				log.info(`You are already registered to ${raffleName} raffle`);
			} else if (errorMessage.includes("You already entered")) {
				log.success(`You are already registered to ${raffleName} raffle`);
			} else {
				log.error(errorMessage + ` for ${raffleName} raffle`);
			}
		} catch (error) {
			log.error(`Unknown error for ${raffleName} raffle`);
		}
	}

	return data;
};
