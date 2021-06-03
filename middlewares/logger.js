const fs = require("fs");
const path = require("path");
const log4js = require("log4js");
const config = require("../config");

const logDir = config.logPath;
const ACCESS = "access.log";
const ERROR = "error.log";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

log4js.configure({
  appenders: {
    console: {
      type: "console",
      category: "console",
    },
    accessLogs: {
      type: "file",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      filename: path.resolve(logDir, ACCESS),
      category: "access",
      maxLogSize: 60 * 1024 * 1024, // = 50Mb
      backups: 500, // keep five backup files
      encoding: "utf-8",
    },
    errorLogs: {
      type: "file",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      filename: path.resolve(logDir, ERROR),
      category: "error",
      maxLogSize: 60 * 1024 * 1024,
      backups: 20,
      encoding: "utf-8",
    },
  },
  categories: {
    default: { appenders: ["console"], level: "info" },
    accessLogs: { appenders: ["accessLogs"], level: "info" },
    errorLogs: { appenders: ["errorLogs"], level: "error" },
  },
});

const logger = log4js.getLogger("default");
const accessLogs = log4js.getLogger("accessLogs");
const errorLogs = log4js.getLogger("errorLogs");

const loggerMiddleware = async function (ctx, next) {
  const start = new Date();
  await next();
  const { method, status, url, request, body } = ctx;

  const timer = new Date() - start;
  const logText = `${start} ${method} ${status} ${url} 请求参数: ${JSON.stringify(
    request.body
  )} 响应参数：${JSON.stringify(body)} 耗时: ${timer}`;
  process.env.NODE_ENV === "production"
    ? accessLogs.info(logText)
    : logger.info(logText);
};

module.exports = {
  loggerMiddleware,
  errorLogs,
};
