import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

export default class Teams {
  private _result: ITeam[] | null;
  private _resultId: ITeam | null;

  public async allteam() {
    this._result = await Team.findAll();
    return this._result;
  }

  public async teambyid(id: string) {
    this._resultId = await Team.findByPk(id);
    return this._resultId;
  }
}
