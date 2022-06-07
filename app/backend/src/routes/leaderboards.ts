import { Application } from 'express';
import Homeleadercontroller from '../controllers/leaderboards.controller';

export default class Leaderrouter {
  private controller = new Homeleadercontroller();

  public route = (app: Application) => {
    app.get(
      '/leaderboard/home',
      (req, res) => this.controller.homecontroller(req, res),
    );
  };
}
