import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

export default class Teams {
  private _result: ITeam[] | null;

  public async allteam() {
    this._result = await Team.findAll();
    return this._result;
  }
}
