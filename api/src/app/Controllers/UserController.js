const User = require('../Models/User');
const bcrypt  = require('bcryptjs');
const yup = require('yup');


class UserController {

  async store(req, res){

    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({
        error: true,
        message: "Dados inválidos"
      })
    }

    let userExist = await User.findOne({ email: req.body.email });
    if (userExist){
      return res.status(400).json({
        error: true,
        message: "Este usuario já existe!"
      })
    }


    const { name, email, password } = req.body;
    const data = { name, email, password }
    data.password = await bcrypt.hash(data.password, 8);


    await User.create(data, (err) => {
      if(err)
        return res.status(400).json({
          error: true,
          message: "Erro ao cadastrar um usuario no MongoDB"
        })

      return res.status(200).json({
        error: false,
        message: "Usuario cadastrado com sucesso"
      })
    })
  }

  show = function (req, res, next){
    User.find({}, function (err, data){
      if (err){
        return next(err);
      }
      res.json(data);
    });
  }

  getByID = function (req, res, next){
    var _id = req.params._id;
    User.findById(_id, function (err, data){
      if(err){
        return next(err);
      }
      if (!data){
        var err = new Error('Not Found');
        err.status = 404;
        return next(err);
      }
      res.json(data);
    })
  }

  removeByID = function (req, res, next){
    var _id = req.params._id;
    User.findByIdAndRemove(_id, function (err, data){
      if (err){
        return next(err);
      }
      res.json({
        error: false,
        message: "Usuario removido com sucesso", data});
    })
  }
}

module.exports = new UserController();
