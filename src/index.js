const express = require("express");

const { ServerConfig, logger } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`successfully started the server on PORT : ${ServerConfig.PORT}`);
  // logger.info("successfully started the server", {});
});
