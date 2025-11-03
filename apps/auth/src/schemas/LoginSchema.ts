import *  as z from 'zod';

const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

export { LoginSchema };