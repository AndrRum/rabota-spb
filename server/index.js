const express = require("express");
const app = express();
const {vKAuthFirstStep, vkLoginComplete} = require('./server');
const cors = require("cors")

app.set("port", process.env.PORT || 5000);
const port = app.get("port");
app.set("secret", "secret_passcode")

app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/', (req, res) => {
    res.send('YES YES YES it my first server!')
});

app.get('/login/vk', (req, res) => {
    vKAuthFirstStep(res)
});

app.get('/login/vk/complete', async (req, res) => {
    await vkLoginComplete(res)
});


app.listen(port, () => {
    console.log(`Hi! Server Started at http://localhost:${port}`);
});