export const Domains = {
    telegram: process.env.REACT_APP_URL_TELEGRAM,
    vk: process.env.REACT_APP_URL_VK,
    vkSubdomain: process.env.REACT_APP_VK_SUBDOMAIN,
    payment: process.env.REACT_APP_URL_PAYMENT,
    vkAuthUrl: `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=page&redirect_uri=${process.env.REACT_APP_VK_REDIRECT_URI}&scope=wall&response_type=code&v=${process.env.REACT_APP_VK_V}`,
};
