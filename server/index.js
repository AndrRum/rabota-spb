const express = require("express");
const app = express();
const {vkLoginComplete} = require('./server');
const cors = require("cors")

app.set("port", process.env.PORT || 5000);
const port = app.get("port");
app.set("secret", "secret_passcode")

app.use('*', cors());

app.get('/getToken', async (req, res) => {
    const code = req.query['code'] || '';
    try {
        const result =  await vkLoginComplete(code);
        return await res.send(JSON.stringify(result))
    } catch (e) {
        res.send(e)
    }
});


app.listen(port, () => {
    console.log(`Hi! Server Started at http://localhost:${port}`);
});