import prisma from "@/lib/db";
import { HttpError } from "@/utils/httpError";

const getUserById = async (id: string) => {
  try {

    console.log("getUserById", id);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
			include: {
				accounts: {
					include: {
						role: true,
					},
				},
			},
    });

    if (!user) {
      throw HttpError.notFound("User not found");
    }

    return user;
  } catch (error) {
    throw HttpError.fromError(error, "Failed to get user");
  }
};

const userService = {
  getUserById,
};

export default userService;
