import { Application } from 'express';
import validateLogin from '../schemas/login.joi';
import LoginController from '../controllers/login.controller';
import ValidationUser from '../middlewares/validation.user';
import ValidationToken from '../middlewares/validation.token';

export default class LoginRouter {
  public controller = new LoginController();
  public validateUser = new ValidationUser();
  public validationToken = new ValidationToken();

  public route = (app: Application) => {
    app.post(
      '/login',
      (req, res, next) => this.validateUser.validation(req, res, next, validateLogin),
      (req, res) => this.controller.login(req, res),
    );

    app.get(
      '/login/validate',
      (req, res, next) => this.validationToken.validationtoken(req, res, next),
      (req, res) => this.controller.logintoken(req, res),
    );
  };
}

// mudar instancias para private
