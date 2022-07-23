import { Application } from 'express';
import Homeleadercontroller from '../controllers/leaderhome.controller';
import Awayleadercontroller from '../controllers/leaderaway.controller';

export default class Leaderrouter {
  private controller = new Homeleadercontroller();
  private awaycontrollers = new Awayleadercontroller();

  public route = (app: Application) => {
    app.get(
      '/leaderboard/home',
      (req, res) => this.controller.homecontroller(req, res),
    );

    app.get(
      '/leaderboard/away',
      (req, res) => this.awaycontrollers.awaycontroller(req, res),
    );
  };
}
