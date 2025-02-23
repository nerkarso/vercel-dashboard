import { PROJECTS_LIMIT } from '@/config/constants';
import { createVercelClient } from '@/lib/vercel';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ search: z.string().optional(), limit: z.number().default(PROJECTS_LIMIT) }))
    .query(async ({ input }) => {
      try {
        const user = await currentUser();
        const accounts = (user?.privateMetadata?.accounts as any[]) ?? [];
        const accountActive = user?.privateMetadata?.accountActive ?? null;
        const existingAccount = accounts?.find((acc) => acc?.id === accountActive);
        if (!existingAccount) {
          return { projects: [], pagination: null };
        }
        const vercel = createVercelClient(existingAccount.token);
        const res = await vercel.projects.getProjects({
          search: input.search,
          limit: String(input.limit),
        });
        return res;
      } catch (error) {
        console.error(error);
      }
    }),
});
