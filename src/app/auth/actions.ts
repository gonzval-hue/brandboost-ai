'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters."}),
  email: z.string().email({ message: "Please enter a valid email."}),
  password: z.string().min(6, { message: "Password must be at least 6 characters."}),
});

import { auth } from '@/lib/auth';

export async function registerUser(prevState: any, formData: FormData) {
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const userCount = await db.user.count();

    if (userCount > 0) {
      const session = await auth();
      if (session?.user.role !== 'ADMIN') {
        return { error: { _form: 'Unauthorized: Only admins can create new users.' } };
      }
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: { _form: 'Email already in use!' } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userCount === 0 ? 'ADMIN' : 'USER',
      },
    });

    return { success: 'User registered successfully! Redirecting to login...' };
  } catch (error) {
    return { error: { _form: 'Something went wrong.' } };
  }
}
