import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Login from '../services/login.service';
import { createToken } from '../jwt';

export default class LoginController {
  private service = new Login();

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.login(email, password);
      const token = createToken(user);
      return res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      const e = error instanceof Error && error.message;
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: e });
    }
  };
}
