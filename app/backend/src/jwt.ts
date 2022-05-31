import jwt = require('jsonwebtoken');
import fs = require('fs');

const senhasecreta = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
console.log(senhasecreta);

export const createToken = (user: object) => {
  const token = jwt.sign({ data: user }, senhasecreta, {
    expiresIn: '20d',
    algorithm: 'HS256',
  });

  return token;
};

export const decoderToken = (token: string) => {
  try {
    const decoder = jwt.verify(token, senhasecreta);
    return decoder;
  } catch (error) {
    return false;
  }
};

// talvez colocar classe
