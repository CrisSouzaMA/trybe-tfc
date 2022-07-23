import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import AllTeamsMock from '../tests/mocks/teams';
import Teambyidmock from './mocks/team.id';

import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('02 - Team - rota com sucesso quando', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    return sinon
      .stub(Team, 'findAll')
      .resolves({ AllTeamsMock } as unknown as Team[]);
  });

after(()=>{
  (Team.findAll as sinon.SinonStub).restore();
})

it('retorna lista de times', async () => {
  chaiHttpResponse = await chai
     .request(app)
     .get('/teams')

   expect(chaiHttpResponse.status).to.be.equal(200);
 });
});

describe('02.1 - Team - id - rota com sucesso quando', () => {
let chaiHttpResponse: Response;

before(async () => {
  return sinon
    .stub(Team, 'findByPk')
    .resolves({ Teambyidmock } as unknown as Team);
});

after(()=>{
(Team.findByPk as sinon.SinonStub).restore();
})

it('retorna time referente ao id', async () => {
chaiHttpResponse = await chai
   .request(app)
   .get('/teams/:id')

 expect(chaiHttpResponse.status).to.be.equal(200);
});
});