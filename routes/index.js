import Router from 'express'
import {PORT} from "../config/config.js";
const router = Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(`Hello world, серверт отвечает вам на GET запрос на странице http://localhost:${PORT}/`)
});

export default router
