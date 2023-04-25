const {buildQueryString, callApi} = require('./helper');
require("dotenv").config();

exports.vkLoginComplete = async (code) => {
    return await getAccessToken(String(code));
};


const getAccessToken = async (code) => {
    return await callApi(
        'post',
        `https://oauth.vk.com/access_token${buildQueryString([
            {code: code},
            {client_id: process.env.REACT_APP_VK_CLIENT_ID},
            {client_secret: process.env.REACT_APP_VK_CLIENT_SECRET},
            {redirect_uri: 'http://localhost:3000'},
        ])}`
    );
};