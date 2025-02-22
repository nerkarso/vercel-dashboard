import { PROJECTS_LIMIT } from '@/config/constants';
import { createVercelClient } from '@/lib/vercel';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ search: z.string().optional(), limit: z.number().default(PROJECTS_LIMIT) }))
    .query(async ({ input }) => {
      const vercel = createVercelClient(process.env.VERCEL_API_TOKEN as string);

      try {
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
