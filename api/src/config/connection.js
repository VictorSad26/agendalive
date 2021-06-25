const mongoose = require('mongoose');

class Connection {
  constructor() {
    this.dataBaseConnectionMongoDB();
  }

  dataBaseConnectionMongoDB(){
    this.mongoDBConnection = mongoose.connect("mongodb://localhost/nodejs", {

    })
      .then(() =>{
        console.log("Conexão estabelecida com o MongoDB com sucesso")
      })
      .catch((error)=>{
        console.log(`Erro ao estabelecer conexão com o mongoDB ${error}`)
      })
  }
}

module.exports = new Connection();
