import fs from "fs";
import { log } from "./utils/helpers";

export const checkKey = (key: string): boolean => {
	const keys = JSON.parse(fs.readFileSync("alphabot/data/tack.json", "utf8"));
	const currentMonth = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
	const validKey = keys[currentMonth];

	if (key === validKey) {
		log.success("Key is valid!");
		return true;
	} else {
		log.error("Invalid key");
		return false;
	}
};
