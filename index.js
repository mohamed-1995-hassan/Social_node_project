const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routers');

const app = express();

const { MONGODB_URI } = process.env; 

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });

//const connection = "mongodb+srv://nodeproject:520520782000@cluster0.pilwp.mongodb.net/project";

// mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
//     .then(() => console.log("Database Connected Successfully"))
//     .catch(err => console.log(err));


    



  //   const uri =
  //   "mongodb+srv://M_Mustafa:m3523m1998@cluster0.kr8bd.mongodb.net/BloggerDB";
  // mongoose
  //   .connect(uri, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useFindAndModify: false,
  //   })
  //   .then(() => console.log("Database Connected Successfully"))
  //   .catch((err) => console.log(err));









app.use(express.json());

app.use('/', routes);

app.use('*', (req, res, next) => {
  res.status(404).json({ err: 'NOT_FOUND' });
});

app.use((err, req, res, next) => {
  
  console.error(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  res.status(503).end();
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log('App is up and ready on:', PORT);
});



//mongodb+srv://nodeproject:<password>@cluster0.pilwp.mongodb.net/<dbname>?retryWrites=true&w=majority