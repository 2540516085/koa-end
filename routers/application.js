const KoaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const { getApplicationList } = require("../controllers/application");

const application = new KoaRouter();

application.use(bodyParser());

application.post("/list", getApplicationList);

module.exports = application;
