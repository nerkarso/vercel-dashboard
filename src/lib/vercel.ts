import { Vercel } from '@vercel/sdk';

export function createVercelClient(token: string) {
  return new Vercel({
    bearerToken: token,
  });
}
