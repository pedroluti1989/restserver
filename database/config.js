const mongoose = require('mongoose')

const dbConnection = async () =>{

    try{
      await mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: false,
      });

      console.log('Base de datos en linea');
    }catch(error){

        console.log(error)

    }
}

module.exports = {
    dbConnection
}