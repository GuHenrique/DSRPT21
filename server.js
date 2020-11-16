const app = require('./src/configs/express')

require("./src/configs/mongodb");

const { Hermodr } = require("./src/shared/sources/hermodr-cmd-express");

app.listen(3333)
Hermodr.log("server.js", `${process.argv[2]} server is listening on port 3333`)
