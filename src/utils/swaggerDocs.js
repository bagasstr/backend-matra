import swaggerJSDoc from 'swagger-jsdoc'
import fs from 'fs'
import path from 'path'

const options = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'API Documentation Matrakosala',
         version: '1.0.0',
         description: 'API Documentation Matrakosala',
         contact: {
            name: 'API Support',
            email: 'matrakosala@gmail.com',
            url: 'https://example.com',
         },
         license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
         },
      },
      servers: [
         {
            url: 'http://localhost:5000',
            description: 'Development server',
         },
         {
            url: 'https://api.matrakosala.com',
            description: 'Production server',
         },
      ],
   },
   apis: ['src/features/artikel/artikel.route.js'],
}

const swaggerUiOptions = {
   customSiteTitle: 'API Documentation',
   // customCssUrl: '/swagger.css',
   customCss: '.swagger-ui .topbar { display: none }',
   swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      deepLinking: true,
      tryItOutEnabled: false,
      // syntaxHighlight: {
      //    activate: true,
      //    theme: 'monokai',
      // },
      defaultCodeLanguage: 'javascript',
   },
}

const swaggerDocs = swaggerJSDoc(options)
fs.writeFileSync(
   path.resolve('./swagger.json'),
   JSON.stringify(swaggerDocs, null, 2),
   'utf-8'
)
export default { swaggerDocs, swaggerUiOptions }
