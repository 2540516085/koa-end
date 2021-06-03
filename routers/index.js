const fs = require("fs");
const path = require("path");
const KoaRouter = require("koa-router");
const config = require("../config");

const router = new KoaRouter();

router.prefix(config.baseUrl || "");

const files = fs.readdirSync(__dirname).filter((file) => file !== "index.js");

for (const file of files) {
  if (file.toLowerCase().endsWith("js")) {
    const routerItem = require(`./${file}`);
    const routeName = file.replace(/\.js/, "");
    router.use(
      "/" + routeName,
      routerItem.routes(),
      routerItem.allowedMethods()
    );
  }
}

router.get("/", async (ctx) => {
  ctx.body = "hello world";
});

module.exports = router;
