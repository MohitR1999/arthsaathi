import *  as z from 'zod';

const UserSchema = z.object({
    firstName: z.string().regex(/^[a-zA-Z0-9_.]+$/),
    lastName: z.string().regex(/^[a-zA-Z0-9_.]+$/),
    email: z.email(),
    password: z.string()
});

export { UserSchema };