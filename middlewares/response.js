const { errorLogs } = require("./logger");

const responseHandle = async function (ctx, next) {
  await next();
  if (ctx.result !== undefined) {
    ctx.type = "json";
    ctx.body = {
      code: 200,
      msg: ctx.msg || "",
      data: ctx.result,
    };
  }
};

const errorHandler = async (ctx, next) => {
  return next().catch((err) => {
    if (err.code == null) {
      errorLogs.error(err.stack);
    }
    ctx.body = {
      code: err.code || -1,
      data: null,
      msg: err.message.trim(),
    };
    // 保证返回状态是 200
    ctx.status = 200;
    return Promise.resolve();
  });
};

module.exports = {
  responseHandle,
  errorHandler,
};
