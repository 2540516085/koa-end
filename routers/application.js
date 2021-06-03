const KoaRouter = require("koa-router");
const { getApplicationList } = require("../controllers/application");

const application = new KoaRouter();

application.get("/list", getApplicationList);

module.exports = application;
