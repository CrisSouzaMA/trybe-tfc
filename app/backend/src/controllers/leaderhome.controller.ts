import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Homeleader from '../services/leader.home.service';

export default class Homeleadercontroller {
  private service = new Homeleader();

  public homecontroller = async (_req: Request, res: Response) => {
    const hcontroll = await this.service.classification();
    return res.status(StatusCodes.OK).json(hcontroll);
  };
}
