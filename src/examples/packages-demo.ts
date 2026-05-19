import chalk from 'chalk';
import { nanoid } from 'nanoid';
import * as R from 'ramda';
import { from, map, filter } from 'rxjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import * as yup from 'yup';
import { format, addDays } from 'date-fns';

async function main() {
  console.log(chalk.green.bold('=== Paket Demo ==='));

  console.log(chalk.cyan('nanoid:'), nanoid());

  const doubled = R.pipe(
    R.map((n: number) => n * 2),
    R.filter((n: number) => n > 4)
  )([1, 2, 3, 4, 5]);
  console.log(chalk.cyan('ramda pipeline:'), doubled);

  from([1, 2, 3, 4, 5])
    .pipe(
      filter((n) => n % 2 === 1),
      map((n) => n * 10)
    )
    .subscribe((v) => console.log(chalk.cyan('rxjs:'), v));

  const hash = await bcrypt.hash('secret', 10);
  const ok = await bcrypt.compare('secret', hash);
  console.log(chalk.cyan('bcrypt match:'), ok);

  const token = jwt.sign({ sub: 'user-1' }, 'demo-secret', { expiresIn: '1h' });
  console.log(chalk.cyan('jwt:'), token.slice(0, 40), '...');

  const joiSchema = Joi.object({ name: Joi.string().min(2).required() });
  console.log(chalk.cyan('joi:'), joiSchema.validate({ name: 'Ada' }).error ?? 'OK');

  const yupSchema = yup.object({ age: yup.number().positive().integer().required() });
  console.log(chalk.cyan('yup:'), await yupSchema.isValid({ age: 30 }));

  const tomorrow = addDays(new Date(), 1);
  console.log(chalk.cyan('date-fns:'), format(tomorrow, 'yyyy-MM-dd'));
}

main().catch((err) => {
  console.error(chalk.red('Hata:'), err);
  process.exit(1);
});
