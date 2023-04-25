export const Domains = {
    telegram: "https://t.me/SPBrabota_78",
    vk: "https://vk.com/spbrabota",
    subDomainVk: "spbrabota",
    price: "https://vk.com/@spbrabota-razmestit-vakansiu",
    authUrl: `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=page&redirect_uri=${process.env.REACT_APP_VK_REDIRECT_URI}&scope=wall&response_type=code&v=${process.env.REACT_APP_VK_V}`
}