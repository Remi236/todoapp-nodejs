const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = 3000;
const todoRouter = require("./route/todoRoute");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(cors());

// render => template engine
app.get('/',(req,res) => res.json({message: 'Go to /api-docs to see the documentation'}));

app.use('/todos',todoRouter);

// response on server
app.listen(port,() => {
  console.log(`Server listening on port: ${port}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));