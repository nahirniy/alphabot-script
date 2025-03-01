import { CURRENT_PROJECT_RAFFLE } from "./utils/config";
import { LATEST_RAFFLE } from "./utils/config";
import { log } from "./utils/helpers";

export const getRaffleType = (type: string) => {
	if (type === LATEST_RAFFLE || type === CURRENT_PROJECT_RAFFLE) {
		return type;
	} else {
		log.error("Invalid type");
		return "";
	}
};
