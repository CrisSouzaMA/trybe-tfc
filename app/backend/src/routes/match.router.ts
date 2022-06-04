import { Application } from 'express';
import MatchController from '../controllers/match.controller';

export default class MatchRouter {
  private controller = new MatchController();

  public route = (app: Application): void => {
    app.get(
      '/matches',
      (req, res) => this.controller.matchs(req, res),
    );
  };
}
