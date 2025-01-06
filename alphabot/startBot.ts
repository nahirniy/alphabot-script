import axios from "axios";
import { getNewestRaffles } from "./getNewestRaffles";
import { registerToRaffle } from "./registerToRaffle";

const run = async () => {
    const allRaffles = await getNewestRaffles();

    // for (const raffle of allRaffles) {
    //     const response = await registerToRaffle(raffle.slug, raffle.name);
    // }

    const response = await registerToRaffle(allRaffles[0].slug, allRaffles[0].name);
    console.log(response);
}

run();
