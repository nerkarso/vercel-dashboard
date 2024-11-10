'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function auth() {
  const cookieStore = await cookies();
  return cookieStore.has('auth');
}

export async function login() {
  const cookieStore = await cookies();
  cookieStore.set('auth', 'true', {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
  redirect('/');
}
