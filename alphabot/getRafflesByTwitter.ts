import axios from "axios";

const getRaffles = async (twitter: string, pageSize: number) => {
    const apiClient = axios.create({ baseURL: "https://www.alphabot.app" });

    try {
        const params = new URLSearchParams();
        params.set('search', twitter);
        params.set('sort', 'newest');
        params.set('scope', 'all');
        params.set('pageSize', "30");
        params.set('project', '');
        params.set('includeProject', 'true');

        const response = await apiClient.get('/api/projects?' + params.toString());
        console.log(response.data.length);
        return response.data;
    } catch (error) {
        console.error("Error fetching last raffles:", error);
    }
}

export const getRafflesByTwitter = async (twitter: string) => {
    const raffles = await getRaffles(twitter, 30);
    return raffles;
}
