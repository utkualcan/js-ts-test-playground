import { UserSchema } from '../index';

describe('UserSchema', () => {
  it('valid user passes', () => {
    const result = UserSchema.safeParse({ name: 'Ada', email: 'ada@example.com', age: 30 });
    expect(result.success).toBe(true);
  });

  it('invalid email fails', () => {
    const result = UserSchema.safeParse({ name: 'Ada', email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('empty name fails', () => {
    const result = UserSchema.safeParse({ name: '', email: 'ada@example.com' });
    expect(result.success).toBe(false);
  });
});
