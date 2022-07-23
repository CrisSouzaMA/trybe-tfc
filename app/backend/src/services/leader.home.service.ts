import ITeam from '../interfaces/ITeam';
import IMatch from '../interfaces/IMatch';
import Team from './team.service';
import Match from '../database/models/match';

export default class Homeleader {
  private service = new Team();
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

  public reset() {
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  public async winner() {
    const matches: IMatch[] = await Match.findAll();
    const allteamscheck = await this.service.allteam();
    return allteamscheck.map((teamMap) => {
      matches.forEach((match) => { this.checkinfo(teamMap, match); });
      const total = { name: teamMap.teamName,
        totalPoints: this.totalPoints,
        totalGames: this.totalGames,
        totalVictories: this.totalVictories,
        totalDraws: this.totalDraws,
        totalLosses: this.totalLosses,
        goalsFavor: this.goalsFavor,
        goalsOwn: this.goalsOwn,
        goalsBalance: this.goalsBalance,
        efficiency: this.efficiency,
      };
      this.reset();
      return total;
    });
  }

  public async classification() {
    const getwinner = await this.winner();
    return getwinner
      .sort((a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn);
  }
}
