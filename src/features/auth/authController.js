import { loginService } from './authService.js'

export const loginController = async (req, res) => {
  const { username, password } = req.body
  try {
    const { user, token } = await loginService(username, password)
    return res
      .cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
      })
      .status(200)
      .json()
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

export const logoutController = async (req, res) => {
  try {
    // Hapus cookie authToken
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: true, // Pastikan menggunakan HTTPS
      sameSite: 'strict',
    })

    // Kirim respons berhasil
    res.status(200).json({ message: 'Logout Berhasil' })
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat logout' })
  }
}
