import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Awayleader from '../services/leader.away.service';

export default class Awayleadercontroller {
  private service = new Awayleader();

  public awaycontroller = async (_req: Request, res: Response) => {
    const awaycontroll = await this.service.classificationaway();
    return res.status(StatusCodes.OK).json(awaycontroll);
  };
}
