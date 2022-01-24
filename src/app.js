const express = require('express');
const path = require('path');
const cookie = require('cookie-parser')
const session = require('express-session');
const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set ("views", path.resolve(__dirname, "./views"));

app.listen(app.get("port"), () => console.log("listening on port:  http://localhost:  " + app.get("port")));

app.use (express.static(path.resolve(__dirname, "../public")));
app.use (express.static(path.resolve(__dirname, "../uploads")));

app.use (express.urlencoded ({extended: true}));
app.use (cookie());
app.use (session({
    secret: "secreto", //va cualquier palabra para identificar luego (un alias a la session)
    saveUninitialized: true, // En PG no lo usan | datos preguardados
    resave : false, // En PG no lo usan | CACHE
}))

app.use(require('./middlewares/user'))

app.use(require("./routes/main"))
app.use("/users", require("./routes/user"))