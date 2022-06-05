import { Application } from 'express';
import MatchController from '../controllers/match.controller';
import ValidationToken from '../middlewares/validation.token';

export default class MatchRouter {
  private controller = new MatchController();
  public validationToken = new ValidationToken();

  public route = (app: Application): void => {
    app.patch(
      '/matches/:id/finish',
      (req, res, next) => this.validationToken.validationtoken(req, res, next),
      (req, res) => this.controller.updatemacth(req, res),
    );

    app.get(
      '/matches',
      (req, res) => this.controller.matchs(req, res),
    );

    app.post(
      '/matches',
      (req, res, next) => this.validationToken.validationtoken(req, res, next),
      (req, res) => this.controller.creatematch(req, res),
    );
  };
}
