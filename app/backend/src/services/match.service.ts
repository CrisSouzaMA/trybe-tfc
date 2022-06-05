import IMatch from '../interfaces/IMatch';
import Match from '../database/models/match';
import Team from '../database/models/team';

export default class Matchs {
  private _result: IMatch[] | null;
  private _matchcreate: IMatch | null;

  public async matches() {
    this._result = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._result;
  }

  public async creatematch(matchy: IMatch) {
    this._matchcreate = await Match.create(matchy);
    return this._matchcreate;
  }
}
