import prisma from '../../config/database.js'

export const getUserService = async () => {
  try {
    const user = [
      {
        username: 'matrakosala',
      },
    ]
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}
