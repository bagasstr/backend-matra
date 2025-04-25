import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Email gmail
    pass: process.env.EMAIL_PASSWORD, // Password gmail app
  },
})

export function sendEmail(subject) {
  const mailOptions = {
    from: `"Notifikasi" <${process.env.EMAIL}>`,
    to: process.env.TO_EMAIL,
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html lang="id">
         <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Notifikasi Admin</title>
            <style>
               * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
               }
            
               body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  color: #333333;
                  margin: 0;
                  padding: 20px;
                  line-height: 1.6;
               }
            
               .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  padding: 30px;
               }
            
               .header h2 {
                  color: #333333;
                  font-size: 24px;
               }
            
               .content {
                  font-size: 16px;
                  color: #333333;
                  margin-top: 20px;
               }
            
               .button {
                  display: inline-block;
                  background-color: transparent;
                  color:rgb(22, 22, 22);
                  margin-top: 20px;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 4px;
                  border: 2px solid rgb(22, 22, 22);
                  font-weight: bold;
                  transition: background-color 0.3s ease;
               }
            </style>
         </head>
         <body>
            <div class="container">
               <div class="header">
                  <h2>Notifikasi Admin</h2>
               </div>
               <div class="content">
                  <p>${subject}</p>
                  <a href="http://localhost:3000/admin/dashboard"
                  style="
                     display: inline-block; 
                     background-color: transparent; 
                     color: rgb(0, 0, 0); 
                     margin-top: 20px; 
                     padding: 12px 24px; 
                     text-decoration: none; 
                     border-radius: 4px; 
                     border: 2px solid rgb(0, 0, 0); 
                     font-weight: bold; 
                     transition: background-color 0.3s ease;"
                    >Klik Disini</a>
               </div>
            </div>
         </body>
      </html>
   `,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}

export function sendEmailModal(subject, data) {
  const mailOptions = {
    from: `"Notifikasi" <${process.env.EMAIL}>`,
    to: process.env.TO_EMAIL,

    subject: subject,
    html: `
      <!DOCTYPE html>
      <html lang="id">
         <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Notifikasi Admin</title>
            <style>
              
            </style>
         </head>
         <body>
            <div class="container">
               <div class="header">
                  <h1>Notifikasi Penawaran</h1>
               </div>
               <div class="content">
                  <p>${subject}</p>
                  <p>Nama: ${data.name}</p>
                  <p>Institusi: ${data.institution}</p>
                  <p>WhatsApp: ${data.whatsapp}</p>
                  <p>Email: ${data.email}</p>
               </div>
            </div>
         </body>
      </html>
   `,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}
