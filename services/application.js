const { query } = require("../utils/db");

const getApplication = function () {
  return new Promise((resolve, reject) => {
    query("select * from tool_application_list;", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  getApplication,
};
