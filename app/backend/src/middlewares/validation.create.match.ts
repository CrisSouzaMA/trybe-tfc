import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Team from '../services/team.service';

export default class ValidationMatch {
  private service = new Team();

  public validation = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const checkhometeam = await this.service.teambyid(homeTeam);
    const checkawayteam = await this.service.teambyid(awayTeam);
    if (!checkawayteam || !checkhometeam) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no team with such id!' });
    }
    next();
  };
}
