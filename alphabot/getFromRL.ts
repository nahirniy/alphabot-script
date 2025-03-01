import { RL } from "./utils/config";

export const getFromRL = (): Promise<{ key: string; type: string }> => {
    return new Promise((resolve) => {
        let key: string;
        let type: string;

        RL.question("Enter your key: ", (enteredKey: string) => {
            key = enteredKey;

            RL.question(
                "Enter type of raffle. For latest raffle enter 'latest'. For current project with twitter accounts enter 'current': ",
                (enteredType: string) => {
                    type = enteredType;
                    RL.close();
                }
            );
        });

        RL.on("close", () => {
            resolve({ key, type });
        });
    });
};
