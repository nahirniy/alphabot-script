import readline from "readline";

export const LAST_RAFFLES_AMOUNT_FOR_TWITTERS = 31;

export const MIN_DELAY_BETWEEN_RAFFLES = 1;
export const MAX_DELAY_BETWEEN_RAFFLES = 4;

export const MIN_DELAY_BETWEEN_TWITTERS = 4;
export const MAX_DELAY_BETWEEN_TWITTERS = 8;

export const LATEST_RAFFLE = "latest";
export const CURRENT_PROJECT_RAFFLE = "current";

export const RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
