import IMatch from '../interfaces/IMatch';
import Match from '../database/models/match';
import Team from '../database/models/team';

type TMatch = {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean
};

export default class Matchs {
  private _result: IMatch[] | null;
  private _matchcreate: object | null;
  private _updatematchbyid: object | null;
  private _updatematchgoals: object | null;

  public async matches() {
    this._result = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._result;
  }

  public async creatematch(matchy: TMatch) {
    const { inProgress } = matchy;
    if (inProgress === false) {
      throw new Error('Não pode ser cadastrado com inProgress igual a false');
    }

    this._matchcreate = await Match
      .create(matchy);
    return this._matchcreate;
  }

  public async updatematch(id: string) {
    this._updatematchbyid = await Match.findOne({ where: { id } });
    if (this._updatematchbyid) {
      await Match.update(
        { inProgress: false },
        { where: { id } },
      );
      return true;
    }

    return false;
  }

  public async updatematchgoals(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    this._updatematchgoals = await Match.findOne({ where: { id } });
    if (this._updatematchgoals) {
      await Match.update(
        {
          homeTeamGoals,
          awayTeamGoals,
        },
        { where: { id } },
      );
      return true;
    }

    return false;
  }
}
