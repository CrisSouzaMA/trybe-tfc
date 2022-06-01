import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

export default class ValidationUser {
  public validation = (req: Request, res: Response, next: NextFunction, schema: Schema) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
  };
}
