import { checkKey } from "./checkKey";
import { runWithProfile } from "./runWithPorfile";
import { log } from "./utils/helpers";
import { getRaffleType } from "./getRaffleType";
import { getFromRL } from "./getFromRL";
import { LATEST_RAFFLE } from "./utils/config";
import { parseProfilesFromFile } from "./utils/helpers";

const startBot = async () => {
    const { key, type, amountOfLatestRaffles } = await getFromRL();

    const validKey = checkKey(key);
    if (!validKey) {
        return;
    }

    const raffleType = getRaffleType(type);
    if (!raffleType) {
        return;
    }

    if (type === LATEST_RAFFLE && amountOfLatestRaffles < 1) {
        return;
    }

    const profiles = parseProfilesFromFile("userInformation/profiles.txt");

    for (const profile of profiles) {
        log.start(profile.name);
        await runWithProfile(profile, type, amountOfLatestRaffles);
        log.info("All raffles registered for " + profile.name);
    }
}

startBot();