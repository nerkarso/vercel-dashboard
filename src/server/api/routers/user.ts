import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

const accountSchema = z.object({ id: z.string(), name: z.string(), token: z.string() });
type Account = z.infer<typeof accountSchema>;

export const userRouter = createTRPCRouter({
  vercelAccount: {
    getAll: publicProcedure.query(async () => {
      try {
        const user = await currentUser();
        return user?.privateMetadata?.accounts ?? [];
      } catch (error) {
        console.error(error);
        return [];
      }
    }),
    create: publicProcedure.input(accountSchema).mutation(async ({ input }) => {
      try {
        const user = await currentUser();
        const client = await clerkClient();
        const accounts = (user?.privateMetadata?.accounts as Account[]) ?? [];
        accounts.push(input);
        if (user?.id) {
          await client.users.updateUserMetadata(user.id, {
            privateMetadata: { accounts },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }),
    update: publicProcedure.input(accountSchema).mutation(async ({ input }) => {
      try {
        const user = await currentUser();
        const client = await clerkClient();
        const accounts = (user?.privateMetadata?.accounts as Account[]) ?? [];
        const index = accounts.findIndex((account) => account.id === input.id);
        if (index !== -1) {
          accounts[index] = input;
        }
        if (user?.id) {
          await client.users.updateUserMetadata(user.id, {
            privateMetadata: { accounts },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }),
    delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
      try {
        const user = await currentUser();
        const client = await clerkClient();
        const accounts = (user?.privateMetadata?.accounts as Account[]) ?? [];
        let accountActive = user?.privateMetadata?.accountActive;
        // Check if account is active
        if (accountActive === input) {
          accountActive = null;
        }
        const index = accounts.findIndex((account) => account.id === input);
        if (index !== -1) {
          accounts.splice(index, 1);
        }
        if (user?.id) {
          await client.users.updateUserMetadata(user.id, {
            privateMetadata: { accounts, accountActive },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }),
    switch: publicProcedure.input(z.string()).mutation(async ({ input }) => {
      try {
        const user = await currentUser();
        const client = await clerkClient();
        if (user?.id) {
          await client.users.updateUserMetadata(user.id, {
            privateMetadata: { accountActive: input },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }),
  },
});
