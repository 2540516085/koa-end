const path = require("path");

module.exports = {
  port: 8000,
  logPath: path.resolve(__dirname, "./logs"),
  logAccess: true,
  baseUrl: "/api",
  mysql: {
    host: "192.168.87.215",
    port: 3306,
    user: "root",
    password: "example",
    database: "desktop",
  },
};
