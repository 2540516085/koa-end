const Koa = require("koa");
const cors = require("koa-cors");
const helmet = require("koa-helmet");
const bodyParser = require("koa-bodyparser");
const router = require("./routers");

const { loggerMiddleware } = require("./middlewares/logger");
const { responseHandle, errorHandler } = require("./middlewares/response");

const app = new Koa();

app.use(loggerMiddleware);

app.use(errorHandler);
// Helmet
app.use(helmet());
app.use(cors());
app.use(bodyParser());

app.use(responseHandle);

app.use(router.routes(), router.allowedMethods());

module.exports = app;
