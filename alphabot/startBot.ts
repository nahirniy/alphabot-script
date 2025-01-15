import axios from "axios";
import { getNewestRaffles } from "./getNewestRaffles";
import { registerToRaffle } from "./registerToRaffle";
import { profiles } from "./profiles/profiles";
import { generateRandomUserAgent, log, randomDelay } from "./utils/helpers";
import { getRafflesByTwitter } from "./getRafflesByTwitter";
import { TWITTERS } from "./twitters/twitters";
import { MAX_DELAY_BETWEEN_TWITTERS, MIN_DELAY_BETWEEN_RAFFLES, MIN_DELAY_BETWEEN_TWITTERS } from "./utils/config";
import { MAX_DELAY_BETWEEN_RAFFLES } from "./utils/config";
import { HttpsProxyAgent } from "https-proxy-agent";

const LATEST_RAFFLE = "latest";
const CURRENT_PROJECT_RAFFLE = "current";

const runWithProfile = async (profile: any, type: string) => {
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

        const twitters = TWITTERS;

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


const startBot = async (type: string) => {
    for (const profile of profiles) {

        log.start(profile.name);
        await runWithProfile(profile, type);
        log.info("All raffles registered for " + profile.name);

    }
}

// change type to LATEST_RAFFLE or CURRENT_PROJECT_RAFFLE to start bot with different raffle type

// use "latest" - bot will register to the newest raffle
// use "current" - bot will register to the current project raffle that you specified in the twitter files
const type: "latest" | "current" = "latest";
startBot(type);
