const path = require("path");

module.exports = {
  port: 8000,
  logPath: path.resolve(__dirname, "./logs"),
  logAccess: true,
  baseUrl: "/api",
  mysql: {
    host: "",
    port: 3306,
    user: "root",
    password: "",
    database: "",
  },
};
