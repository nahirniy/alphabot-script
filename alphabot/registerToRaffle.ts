import axios from "axios";
import { log } from "./utils/helpers";

const ALPHABOT_API_KEY = process.env.ALPHABOT_API_KEY;

export const registerToRaffle = async (raffleSlug: string, raffleName: string) => {
    const apiClient = axios.create({ baseURL: "https://api.alphabot.app/v1/" });
    
    const { data } = await apiClient.post(`/register`, {
        slug: raffleSlug,
        headers: {
            Authorization: `Bearer ${ALPHABOT_API_KEY}`,
        },
    });

    if (data.success) {
        log.success(`Successfully registered to ${raffleName} raffle`);
    } else {
        log.error(data.error[0].message + ` for ${raffleName} raffle`);
    }

    return data;
}