const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/productos");
const errorHandler = require("./middlewares/errorHandler");

//Middlewares
app.use(express.json());
app.use("/productos", router);
app.use(errorHandler);

//Servidor escuchando
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
