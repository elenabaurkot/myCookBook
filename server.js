const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(apiRoutes);
app.use(htmlRoutes);

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
