const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sendMail = require('./backend/messenger');
const path = require('path');
const formidable = require('formidable');

const app = express();
app.disable("x-powered-by");
app.use(cookieParser());
app.use(bodyParser.json({limit: "1024mb"}));
app.use(bodyParser.urlencoded({limit: "1024mb", extended: true }));
app.use(compression());
app.use(express.static("static"));
app.listen(3535);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

const getFormFields = (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        req.body = { ...fields, ...files };
        next();
    });
}

app.post("/api/send-message", getFormFields, async (req, res) => {
    let params = {
        name: req.body.name || "",
        tel: req.body.tel || "",
        email: req.body.email || "",
        convictName: req.body["convict-name"] || "",
        convictDate: req.body["convict-date"] || "",
        region: req.body.region || "",
        institution: req.body.institution || "",
        article: req.body.article || "",
        damage: req.body.damage || "",
        term: req.body.term || "",
        termEnd: req.body["term-end"] || "",
        file: req.body.file || null
    };

    try {
        const data = await sendMail(params);
        res.json(data);
    } catch (e) {
        res.status(500).json(e.toString());
    }
});


app.get("*", (req, res) => {
    res.status(404).send("Страница не найдена");
});

const getIp = () => {
    let ip = "localhost";
    const { networkInterfaces } = require("os");
    const nets = networkInterfaces();
    nets && Object.keys(nets).map(netName => {
        let net = nets[netName];
        net && net.map(network => {
            if (network.family === "IPv4" && !network.internal) {
                ip = network.address
            }
        });
    });
    return ip;
}

process.env.NODE_ENV === "development" ?
    console.log(`Click for open project http://${getIp()}:${35355}`) :
    console.log(`Server run on port ${35355}`);

