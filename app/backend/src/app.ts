import * as express from 'express';
import LoginRouter from './routes/login.router';
import TeamRouter from './routes/team.router';
import MatchRouter from './routes/match.router';

class App {
  public app: express.Express;
  private loginrouter = new LoginRouter();
  private teamrouter = new TeamRouter();
  private matchrouter = new MatchRouter();

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.loginrouter.route(this.app);
    this.teamrouter.route(this.app);
    this.matchrouter.route(this.app);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Escutando na porta${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
