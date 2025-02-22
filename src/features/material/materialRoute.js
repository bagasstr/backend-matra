import express from 'express';
import {
   createProductController,
   deleteProductController,
   getProductByController,
   getProductController,
   updateProductController,
} from './materialController.js';
import {
   errorHandlerMulter,
   middlewareUpload,
   removeOldFilesMiddleware,
} from '../../middleware/formidableMiddleware.js';

const router = express.Router();

router.get('/', getProductController);
router.get('/:identifier', getProductByController);
router.post('/', middlewareUpload, errorHandlerMulter, createProductController);
router.put(
   '/:identifier',
   removeOldFilesMiddleware('produkMaterial', ['gambar']),
   middlewareUpload,
   errorHandlerMulter,
   updateProductController
);
router.delete('/:identifier', deleteProductController);

export default router;
