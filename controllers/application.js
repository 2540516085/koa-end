const { getApplication } = require("../services/application");

const getApplicationList = async function (ctx) {
  //   console.log(ctx, "afasdfads");

  try {
    const rows = await new Promise((resolve) => {
      getApplication().then((res) => {
        resolve(res);
      });
    });
    ctx.result = rows;
  } catch (err) {}
};

module.exports = {
  getApplicationList,
};
