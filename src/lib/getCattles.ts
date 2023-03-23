import { prisma } from "@/lib/prisma";

export const getCattles = async (page: number = 1, pageSize: number = 10) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const cattles = await prisma.cattle.findMany({
    orderBy: [{ updatedAt: "desc" }],
    include: {
      user: {
        select: {
          name: true,
          phone: true,
          avatar: true,
        },
      },
    },
    skip,
    take,
  });
  const totalCount = await prisma.cattle.count();
  return {
    data: cattles,
    totalCount,
    totalPage: Math.ceil(totalCount / pageSize),
    page,
  };
};
