import { prisma } from "~/db.server";


export const getPostListItems = async () => {
    return prisma.post.findMany({
      select: { title: true, slug: true, markdown: true },
    });
  };