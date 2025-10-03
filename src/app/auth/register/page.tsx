'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from 'react-dom';
import { registerUser } from '@/app/auth/actions';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  error: {},
  success: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Registering...' : 'Create an account'}
    </Button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUser, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }
  }, [state.success, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
                {state.error?.name && <p className="text-red-500 text-sm">{state.error.name[0]}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {state.error?.email && <p className="text-red-500 text-sm">{state.error.email[0]}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                {state.error?.password && <p className="text-red-500 text-sm">{state.error.password[0]}</p>}
              </div>
              {state.error?._form && <p className="text-red-500 text-sm">{state.error._form}</p>}
              {state.success && <p className="text-green-500 text-sm">{state.success}</p>}
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
