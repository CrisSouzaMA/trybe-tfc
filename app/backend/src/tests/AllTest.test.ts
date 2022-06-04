import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import Usermockado from '../tests/mocks/user'
import AllTeamsMock from '../tests/mocks/teams';
import Teambyidmock from './mocks/team.id';

import User from '../database/models/user';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('01 - Login com sucesso', () => {

  let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(User, 'findOne')
       .resolves({
         ...Usermockado
       } as User);
   });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('quando dados são passados corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'hellokitty@hellokitty.com',
        password: 'secret_admin'
       });
       
     expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse.body.user).to.have.property('id');
     expect(chaiHttpResponse.body.user).to.have.property('username');
     expect(chaiHttpResponse.body.user).to.have.property('role');
     expect(chaiHttpResponse.body.user).to.have.property('email');
     expect(chaiHttpResponse.body).to.have.property('token');
     expect(chaiHttpResponse.body.user).to.not.have.property('password');
   });
})

describe('01 - Login - rota sem sucesso quando', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon
          .stub(User, 'findOne')
          .resolves(null);
      });
 
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('é passado e-mail errado', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({
          email: 'hello@hellokitty.com',
          password: 'secret_admin'
         });

       expect(chaiHttpResponse.status).to.be.equal(401);
     });
  });

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
