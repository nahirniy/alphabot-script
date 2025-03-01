import { profiles } from "./profiles/profiles";
import { checkKey } from "./checkKey";
import { runWithProfile } from "./runWithPorfile";
import { log } from "./utils/helpers";
import { getRaffleType } from "./getRaffleType";
import { getFromRL } from "./getFromRL";

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

    for (const profile of profiles) {
        log.start(profile.name);
        await runWithProfile(profile, type, amountOfLatestRaffles);
        log.info("All raffles registered for " + profile.name);
    }
}

startBot();