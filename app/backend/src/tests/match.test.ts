import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import AllMatchesMock from './mocks/matches';
import Creatematchmock from './mocks/creatematch';
import Usermockado from './mocks/user';
import Teambyidmock from './mocks/team.id';
import Matchidmock from './mocks/match.id';

import Match from '../database/models/match';
import User from '../database/models/user';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('03 - Match - rota com sucesso quando', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    return sinon
      .stub(Match, 'findAll')
      .resolves(AllMatchesMock as unknown as Match[]);
  });

after(()=>{
  (Match.findAll as sinon.SinonStub).restore();
})

it('retorna lista de jogos', async () => {
  chaiHttpResponse = await chai
     .request(app)
     .get('/matches')

   expect(chaiHttpResponse.status).to.be.equal(200);
 });
});

describe('3.1 - cadastrando novo jogo com sucesso', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, 'create')
      .resolves(Creatematchmock as unknown as Match);
    sinon
      .stub(User, 'findOne')
      .resolves({...Usermockado, password: undefined} as unknown as User);
    sinon
      .stub(Team, 'findByPk')
      .resolves(Teambyidmock as unknown as Team);
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
    (User.findOne as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  });

  it('cadastro ok', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjU0NDQ1NDYzLCJleHAiOjE2NTYxNzM0NjN9.VXyZOjWDTumpESVa8azglcGUXmYPfxCuz6cf2TSp3Ks',
      )
      .send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
      });

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('homeTeam');
    expect(chaiHttpResponse.body).to.have.property('awayTeam');
    expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
    expect(chaiHttpResponse.body).to.have.property('inProgress');
  });
});

describe('3.2 - atualiza jogo', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves({...Usermockado, password: undefined} as unknown as User);
    sinon
      .stub(Match, 'findOne')
      .resolves(Matchidmock as unknown as Match);
    sinon
      .stub(Match, 'update')
      .resolves();
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
    (Match.findOne as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
  });

  it('atualização ok', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjU0NDQ1NDYzLCJleHAiOjE2NTYxNzM0NjN9.VXyZOjWDTumpESVa8azglcGUXmYPfxCuz6cf2TSp3Ks',
      )

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});