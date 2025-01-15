import axios from "axios";
import { LAST_RAFFLES_AMOUNT } from "./utils/config";

const getRaffles = async (page: number, rafflesAmount: number, httpsAgent: any, userAgent: string) => {
    const apiClient = axios.create({ baseURL: "https://www.alphabot.app", httpsAgent, headers: { 'User-Agent': userAgent } });

    try {
        const params = new URLSearchParams();
        params.set('sort', 'newest');
        params.set('scope', 'all');
        params.set('pageSize', rafflesAmount.toString());
        params.set('pageNum', page.toString());
        params.set('project', '');
        params.set('includeProject', 'true');

        const response = await apiClient.get('/api/projects?' + params.toString());

        return response.data;
    } catch (error) {
        console.error("Error fetching last raffles:", error);
    }
}

export const getNewestRaffles = async (httpsAgent: any, userAgent: string) => {
    const allRaffles = [];
    let page = 0;

    if (LAST_RAFFLES_AMOUNT > 30) {
        const totalPages = Math.ceil(LAST_RAFFLES_AMOUNT / 30);

        for (let i = 0; i < totalPages; i++) {
            const rafflesAmount = i === totalPages - 1 ? LAST_RAFFLES_AMOUNT - (totalPages - 1) * 30 : 30;
            const lastRaffles = await getRaffles(page, rafflesAmount, httpsAgent, userAgent);
            
            allRaffles.push(...lastRaffles);
            page++;
        }
    } else {
        const lastRaffles = await getRaffles(page, LAST_RAFFLES_AMOUNT, httpsAgent, userAgent);

        allRaffles.push(...lastRaffles);
    }

    return allRaffles;
}