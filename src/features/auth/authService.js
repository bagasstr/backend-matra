import { generateToken } from "../../utils/jwtUtils.js";

import prisma from "../../config/database.js";

export const loginService = async (username, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username, password: password },
    });
    if (!user) {
      throw new Error("kredensial tidak valid");
    }
    const token = generateToken({ id: user.id, username });
    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};
