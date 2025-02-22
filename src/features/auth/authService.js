import { generateToken } from '../../utils/jwtUtils.js'

import prisma from '../../config/database.js'

const users = [{ id: 1, username: 'matrakosala', password: 'matrakosala' }]
export const loginService = async (username, password) => {
  try {
    const user = users.find(
      (u) => u.username === username && u.password === password
    )
    if (!user) {
      throw new Error('kredensial tidak valid')
    }
    const token = generateToken({ id: user.id, username })
    console.log(token)

    return { user, token }
  } catch (error) {
    throw new Error(error.message)
  }
}
