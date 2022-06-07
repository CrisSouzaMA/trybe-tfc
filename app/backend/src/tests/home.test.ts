import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import Match from '../database/models/match';
import Team from '../database/models/team';

// import Homeleader from './mocks/homeleader';
import AllTeamsMock from './mocks/teams';
import AllMatchesMock from './mocks/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('04 - Lista times da casa', () => {

  let chaiHttpResponse: Response;

   before(async () => {
      sinon
       .stub(Team, 'findAll')
       .resolves(AllTeamsMock as Team[]);
      sinon
       .stub(Match, 'findAll')
       .resolves(AllMatchesMock as unknown as Match[]);
   });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('quando o time da casa vence', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home')
       
     expect(chaiHttpResponse.status).to.be.equal(200);
   });
})

describe('05 - Lista times convidados', () => {

  let chaiHttpResponse: Response;

   before(async () => {
      sinon
       .stub(Team, 'findAll')
       .resolves(AllTeamsMock as Team[]);
      sinon
       .stub(Match, 'findAll')
       .resolves(AllMatchesMock as unknown as Match[]);
   });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('quando o time convidado vence', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away')
       
     expect(chaiHttpResponse.status).to.be.equal(200);
   });
})
