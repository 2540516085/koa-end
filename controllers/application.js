const { getApplication } = require("../services/application");

const getApplicationList = async function (ctx) {
  try {
    const rows = await getApplication();
    ctx.result = Object.assign({ rows: rows });
  } catch (err) {}
};

module.exports = {
  getApplicationList,
};
