import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import dayjs from 'dayjs';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

type User = z.infer<typeof UserSchema> & { id: string; createdAt: string };

const users: User[] = [];

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'JS/TS test playground çalışıyor 🚀',
    now: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    userCount: users.length,
  });
});

app.get('/users', (_req: Request, res: Response) => {
  res.json(_.sortBy(users, 'createdAt'));
});

app.post('/users', (req: Request, res: Response) => {
  const parsed = UserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }
  const user: User = {
    id: uuidv4(),
    createdAt: dayjs().toISOString(),
    ...parsed.data,
  };
  users.push(user);
  logger.info('User created', { id: user.id });
  return res.status(201).json(user);
});

const PORT = Number(process.env.PORT ?? 3000);

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server listening on http://localhost:${PORT}`);
  });
}

export { app, UserSchema };
