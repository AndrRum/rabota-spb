const {buildQueryString, callApi} = require('./helper');
require("dotenv").config();

const scopes = ['wall'];

exports.vKAuthFirstStep = (res) => {
    const url = `https://oauth.vk.com/authorize${buildQueryString([
        {client_id: process.env.REACT_APP_VK_CLIENT_ID},
        {redirect_uri: process.env.REACT_APP_VK_REDIRECT_URI},
        {response_type: 'code'},
        {scope: scopes.join('+')},
        {state: '{}'},
    ])}`;
    res.redirect(url);
};

exports.vkLoginComplete = async (req, res) => {
    const code = req.query['code'] || '';
    if (!code) {
        console.warn('Cannot authorize no code')
        return res.send('Cannot authorize no code');
    }
    const data = await getAccessToken(String(code));
    if (!data.access_token) {
        console.warn('Unable to get access token')
        return res.send('Unable to get access token');
    }

   return data.access_token;
};


const getAccessToken = async (code) => {
    const {email, access_token, user_id} = await callApi(
        'post',
        `https://oauth.vk.com/access_token${buildQueryString([
            {code: code},
            {client_id: process.env.REACT_APP_VK_CLIENT_ID},
            {client_secret: process.env.REACT_APP_VK_CLIENT_SECRET},
            {redirect_uri: 'http://localhost:3000'},
        ])}`
    );
    return {
        email,
        access_token,
        user_id,
    };
};