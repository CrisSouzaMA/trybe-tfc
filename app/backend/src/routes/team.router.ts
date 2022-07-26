import { Application } from 'express';
import TeamController from '../controllers/team.controller';

export default class TeamRouter {
  private controller = new TeamController();

  public route = (app: Application): void => {
    app.get(
      '/teams/:id',
      (req, res) => this.controller.teamid(req, res),
    );

    app.get(
      '/teams',
      (req, res) => this.controller.teams(req, res),
    );
  };
}
