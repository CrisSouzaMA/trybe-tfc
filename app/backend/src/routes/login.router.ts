import { Application } from 'express';
import validateLogin from '../schemas/login.joi';
import LoginController from '../controllers/login.controller';
import ValidationUser from '../middlewares/validation.user';

export default class LoginRouter {
  public controller = new LoginController();
  public validateUser = new ValidationUser();

  public route = (app: Application) => {
    app.post(
      '/login',
      (req, res, next) => this.validateUser.validation(req, res, next, validateLogin),
      (req, res) => this.controller.login(req, res),
    );
  };
}
