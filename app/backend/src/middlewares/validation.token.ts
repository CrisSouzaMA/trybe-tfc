import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { decoderToken } from '../jwt';
import Login from '../services/login.service';

type TInformation = {
  data: {
    id: number;
    username: string;
    role: string,
    email: string,
  }
};

export default class ValidationToken {
  private logintoken = new Login();

  public validationtoken = async (req: Request, res: Response, next: NextFunction) => {
    const checktoken = req.headers.authorization;

    if (!checktoken) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'token não existe' });
    }

    const information = decoderToken(checktoken);

    const { id } = (information as TInformation).data;

    const checkUser = await this.logintoken.logintoken(id);

    if (!checkUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'usuario não existe' });
    }

    req.body.users = checkUser;

    next();
  };
}

// dar console log no inf
// mudar erro
