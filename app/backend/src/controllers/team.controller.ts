import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Teams from '../services/team.service';

export default class TeamController {
  private _service = new Teams();

  public teams = async (_req: Request, res: Response) => {
    const allteams = await this._service.allteam();
    return res.status(StatusCodes.OK).json(allteams);
  };

  public teamid = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teambyid = await this._service.teambyid(id);
    return res.status(StatusCodes.OK).json(teambyid);
  };
}
