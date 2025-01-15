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
                    'User-Agent': userAgent,
				},
                httpsAgent: httpsAgent,
			}
		);

		data = response.data;
	} catch (error: any) {
		log.error(`Error registering to ${raffleName} raffle: ${error.response.data.errors[0].message}`);
		return;
	}

	if (data.success) {
		log.success(`Successfully registered to ${raffleName} raffle`);
	} else {
        const errorMessage = data?.data?.resultMd?.replace(/\n\n/g, '') || data?.errors[0]?.message || 'Unknown error';
		log.error(errorMessage+ ` for ${raffleName} raffle`);
	}

	return data;
};
