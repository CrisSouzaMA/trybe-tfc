import IToken from './IToken';

interface IUser extends IToken {
  role: string,
  email: string,
}

export default IUser;
