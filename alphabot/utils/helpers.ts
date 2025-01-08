import chalk from "chalk";

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

export function generateRandomUserAgent(): string {
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Opera', 'Edge']
    const os = ['Windows NT 10.0', 'Macintosh; Intel Mac OS X 10_15_7', 'X11; Linux x86_64', 'iPhone; CPU iPhone OS 14_0 like Mac OS X', 'Android 10']

    const browser = getRandomElement(browsers)
    const operatingSystem = getRandomElement(os)

    let userAgent = ''

    switch (browser) {
        case 'Chrome':
            userAgent = `Mozilla/5.0 (${operatingSystem}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 100)}.0.${Math.floor(Math.random() * 10000)}.0 Safari/537.36`
            break
        case 'Firefox':
            userAgent = `Mozilla/5.0 (${operatingSystem}; rv:${Math.floor(Math.random() * 100)}.0) Gecko/20100101 Firefox/${Math.floor(Math.random() * 100)}.0`
            break
        case 'Safari':
            userAgent = `Mozilla/5.0 (${operatingSystem}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${Math.floor(Math.random() * 15)}.0 Safari/605.1.15`
            break
        case 'Opera':
            userAgent = `Mozilla/5.0 (${operatingSystem}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 100)}.0.${Math.floor(Math.random() * 10000)}.0 Safari/537.36 OPR/${Math.floor(Math.random() * 100)}.0.0.0`
            break
        case 'Edge':
            userAgent = `Mozilla/5.0 (${operatingSystem}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 100)}.0.${Math.floor(Math.random() * 10000)}.0 Safari/537.36 Edg/${Math.floor(Math.random() * 100)}.0.0.0`
            break
    }

    return userAgent
}

export const log = {
	start: (walletAddress: string) => console.log(chalk.white(`------------------------------ START WITH ${walletAddress} ------------------------------`)),
	success: (msg: string) => console.log(chalk.green("✅" + msg)),
	error: (msg: string) => console.log(chalk.red("❌" + msg)),
	info: (msg: string) => console.log(chalk.blue("✍️ " + msg)),
	warning: (msg: string) => console.log(chalk.yellow("⚠️ " + msg)),
};