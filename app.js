require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products');

//middleware
app.use(express.json());

//routes

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1> <a href ="/api/v1/products">Product Route</a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port @${port}`));
  } catch (error) {
    console.log(error, 'err');
  }
};

start();
