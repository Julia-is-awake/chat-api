require("dotenv").config();
const app = require("../src/api");

// app.use((req, res, next) => {
//     next();
// })

const port = process.env.API_PORT || 5000;

var cors = require("cors");

app.use(cors());

app.listen(port);

console.log("Starting in port " + port);
console.log("http://localhost:" + port);
