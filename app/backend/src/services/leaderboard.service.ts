import Team from '../database/models';
import Match from '../database/models';
import ITeam from '../interfaces/ITeam';
import IMatch from '../interfaces/IMatch';

export default class Leaderboard {
  private name: string;
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalance = 0;
  private efficiency = 0;

  public checkinfo(team: ITeam, match: IMatch) {
    if (team.id === match.homeTeam && !match.inProgress) {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.totalPoints += 3;
        this.totalVictories += 1;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        this.totalLosses += 1;
      }

      if (match.homeTeamGoals === match.awayTeamGoals) {
        this.totalPoints += 1;
        this.totalDraws += 1;
      }

      this.totalGames += 1;
      this.goalsFavor += match.homeTeamGoals;
      this.goalsOwn += match.awayTeamGoals;
      this.goalsBalance = this.goalsFavor - this.goalsOwn;
      this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
    }
  }
}
