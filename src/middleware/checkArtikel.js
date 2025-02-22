// import prisma from "../config/database.js";
// import slugify from "slugify";

// export const checkArticleId = async (req, res, next) => {
//   try {
//     const { title } = req.body;
//     const slug = slugify(title, {
//       lower: true,
//       strict: true,
//       trim: true,
//     });
//     // Mengecek apakah artikel dengan slug yang sama sudah ada
//     const artikel = await prisma.artikel.findUnique({
//       where: { slug },
//     });

//     if (artikel) {
//       return res.status(400).json({ message: "Artikel sudah ada" });
//     }
//     next();
//   } catch (error) {
//     // Menangani error parsing atau database
//     return res.status(400).json({
//       message: error.message,
//       error: error.message,
//     });
//   }
// };
