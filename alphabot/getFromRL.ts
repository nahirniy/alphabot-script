import { RL, LATEST_RAFFLE } from "./utils/config";

export const getFromRL = (): Promise<{ key: string; type: string; amountOfLatestRaffles: number }> => {
    return new Promise((resolve) => {
        let key: string;
        let type: string;
        let amountOfLatestRaffles: number;

        RL.question("Enter your key: ", (enteredKey: string) => {
            key = enteredKey;

            RL.question(
                "Enter type of raffle. For latest raffle enter 'latest'. For current project with twitter accounts enter 'current': ",
                (enteredType: string) => {
                    type = enteredType;

                    if (type === LATEST_RAFFLE) {
                        RL.question("Enter amount of latest raffles: ", (enteredAmountOfLatestRaffles: string) => {
                            amountOfLatestRaffles = Number(enteredAmountOfLatestRaffles);
                        });
                    }
                    
                    RL.close();
                }
            );
        });

        RL.on("close", () => {
            resolve({ key, type, amountOfLatestRaffles });
        });
    });
};
