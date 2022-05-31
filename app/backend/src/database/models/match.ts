import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';
// import Team from './team';

class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public awayTeam!: number;
  public homeTeamGoals!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Match.init({
  teamName: STRING,
  id: INTEGER,
  homeTeam: INTEGER,
  awayTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

// Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
// Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

// Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeam' });
// Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
