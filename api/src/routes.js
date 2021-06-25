const { Router } = require('express');
const UserController = require('./app/Controllers/UserController');


const routes = new Router();

/**
 * @swagger
 * /user:
 *  post:
 *    description: Cadastrando Usuario no banco de dados
 *    responses:
 *      '200':
 *        description: Não houve erro.
 */

routes.post("/user", UserController.store);

/**
 * @swagger
 * /user:
 *  get:
 *    description: Listando todos os Usuarios cadastrados
 *    responses:
 *      '200':
 *        description: Não houve erro.
 */
routes.get('/user', UserController.show);

/**
 * @swagger
 * /user/id:
 *  get:
 *    description: Listando Usuario por ID
 *    responses:
 *      '200':
 *        description: Não houve erro.
 */
routes.get("/:_id", UserController.getByID);

/**
 * @swagger
 * /user/id:
 *  delete:
 *    description: Removendo Usuario por ID
 *    responses:
 *      '200':
 *        description: Não houve erro.
 */
routes.delete("/:_id", UserController.removeByID);

module.exports = routes;
