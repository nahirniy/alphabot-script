import axios from "axios";
import { getNewestRaffles } from "./getNewestRaffles";
import { registerToRaffle } from "./registerToRaffle";
import { profiles } from "./profiles/profiles";
import { log } from "./utils/helpers";
import { getRafflesByTwitter } from "./getRafflesByTwitter";
import { TWITTERS } from "./twitters/twitters";

const LATEST_RAFFLE = "latest";
const CURRENT_PROJECT_RAFFLE = "current";

const runWithProfile = async (profile: any, type: string) => {

    log.start(profile.name);

    if (type === LATEST_RAFFLE) {
        log.info("Getting newest raffles");
        const allRaffles = await getNewestRaffles();
        for (const raffle of allRaffles) {
            const response = await registerToRaffle(raffle.slug, raffle.name, profile.apiKey);
        }
    }

    if (type === CURRENT_PROJECT_RAFFLE) {
        
        const twitters = TWITTERS;

        for (const twitter of twitters) {

            const raffles = await getRafflesByTwitter(twitter);
            log.info(`Getting raffles for ${twitter} with ${raffles.length} raffles`);

            for (const raffle of raffles) {
                const response = await registerToRaffle(raffle.slug, raffle.name, profile.apiKey);
            }
        }
    }
}


const startBot = async (type: string) => {
    for (const profile of profiles) {
        await runWithProfile(profile, type);
    }
}

// change type to LATEST_RAFFLE or CURRENT_PROJECT_RAFFLE to start bot with different raffle type

// use "latest" - bot will register to the newest raffle
// use "current" - bot will register to the current project raffle that you specified in the twitter files
const type: "latest" | "current" = "current";
startBot(type);
