import { verifyToken } from '../utils/jwtUtils.js'

export const authenticate = async (req, res, next) => {
  const tokenReq = req.cookies?.authToken || req.headers?.authorization

  if (!tokenReq) {
    return res.status(401).json({ message: 'Akses Ditolak' })
  }

  try {
    const decoded = verifyToken(tokenReq)
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Token tidak valid' })
    }
    req.user = {
      id: parseInt(decoded.id, 10),
    } // Tambahkan informasi user ke request object
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' })
  }
}
