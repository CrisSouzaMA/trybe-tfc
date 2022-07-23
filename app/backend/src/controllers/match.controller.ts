import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Matchs from '../services/match.service';

export default class MatchController {
  private _service = new Matchs();

  public matchs = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const allmatches = await this._service.matches();

    const matchtrue = allmatches.filter((m) => m.inProgress === true);
    const matchfalse = allmatches.filter((m) => m.inProgress === false);

    if (inProgress && inProgress === 'true') {
      return res.status(StatusCodes.OK).json(matchtrue);
    }
    if (inProgress && inProgress === 'false') {
      return res.status(StatusCodes.OK).json(matchfalse);
    }

    return res.status(StatusCodes.OK).json(allmatches);
  };

  public creatematch = async (req: Request, res: Response) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;
    try {
      console.log('oi antes');
      const newmatch = await this._service
        .creatematch({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress });
      return res.status(StatusCodes.CREATED).json(newmatch);
    } catch (error) {
      const e = error instanceof Error && error.message;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e });
    }
  };

  public updatemacth = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._service.updatematch(id);
    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  };

  public updatematchgoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.updatematchgoals(id, homeTeamGoals, awayTeamGoals);
    return res.status(StatusCodes.OK).json({ message: 'Match ok' });
  };
}
