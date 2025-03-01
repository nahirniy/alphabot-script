import { HttpsProxyAgent } from "https-proxy-agent";
import { generateRandomUserAgent, log, randomDelay, loadFileLines } from "./utils/helpers";
import { getNewestRaffles } from "./getNewestRaffles";
import { registerToRaffle } from "./registerToRaffle";
import { getRafflesByTwitter } from "./getRafflesByTwitter";
import { MIN_DELAY_BETWEEN_RAFFLES, MAX_DELAY_BETWEEN_RAFFLES, MIN_DELAY_BETWEEN_TWITTERS, MAX_DELAY_BETWEEN_TWITTERS, LATEST_RAFFLE, CURRENT_PROJECT_RAFFLE } from "./utils/config";

export const runWithProfile = async (profile: any, type: string) => {
    const httpsAgent = new HttpsProxyAgent(profile.proxy);
    const userAgent = generateRandomUserAgent();

    if (type === LATEST_RAFFLE) {

        log.info("Getting newest raffles");
        const allRaffles = await getNewestRaffles(httpsAgent, userAgent);

        for (const raffle of allRaffles) {
            const response = await registerToRaffle(raffle.slug, raffle.name, profile.apiKey, httpsAgent, userAgent);
            await randomDelay(MIN_DELAY_BETWEEN_RAFFLES, MAX_DELAY_BETWEEN_RAFFLES);
        }
    }

    if (type === CURRENT_PROJECT_RAFFLE) {

        const twitters = loadFileLines("./userInformation/twitters.txt");

        for (const twitter of twitters) {

            const raffles = await getRafflesByTwitter(twitter, httpsAgent, userAgent);
            log.info(`Getting ${raffles.length} raffles for ${twitter}`);

            for (const raffle of raffles) {
                const response = await registerToRaffle(raffle.slug, raffle.name, profile.apiKey, httpsAgent, userAgent);
                await randomDelay(MIN_DELAY_BETWEEN_RAFFLES, MAX_DELAY_BETWEEN_RAFFLES);
            }

            await randomDelay(MIN_DELAY_BETWEEN_TWITTERS, MAX_DELAY_BETWEEN_TWITTERS);
        }
    }
}