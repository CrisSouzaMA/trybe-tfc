import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Matchs from '../services/match.service';

export default class MatchController {
  private _service = new Matchs();

  public matchs = async (_req: Request, res: Response) => {
    const allmatches = await this._service.matches();
    return res.status(StatusCodes.OK).json(allmatches);
  };
}
