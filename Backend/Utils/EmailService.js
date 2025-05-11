const nodemailer = require('nodemailer');

const createTransporter = (email, mailkey) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "jangiddummy6375@gmail.com",
      pass: "evhb rvjo ysqi ooss"
    }
  });
};

const sendOtpEmail = async (email, otp, name, senderEmail, mailkey) => {
    try {
      const transporter = createTransporter(senderEmail, mailkey);
  
      const mailOptions = {
        from: "jangiddummy6375@gmail.com",
        to: email,
        subject: 'Your OTP Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hello ${name},</h2>
            <p>Your verification code is:</p>
            <h1 style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email: ', error);
      return false;
    }
  };

  
  // const sendBookingApprovalEmail = async ({
  //   userEmail,
  //   userName,
  //   hotelName = "Hotel Paradise", // Placeholder if not available
  //   city = "N/A",
  //   state = "N/A",
  //   bookingDate = new Date().toDateString(),
  //   senderEmail,
  //   mailkey
  // }) => {
  //   try {
  //     const transporter = createTransporter(senderEmail, mailkey);
  
  //     const mailOptions = {
  //       from: senderEmail,
  //       to: userEmail,
  //       subject: 'Your Hotel Booking Has Been Approved!',
  //       html: `
  //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
  //           <h2 style="color: #2c3e50;">Hi ${userName},</h2>
  //           <p style="font-size: 16px; color: #34495e;">
  //             Great news! Your hotel booking has been <strong style="color: green;">approved</strong>.
  //           </p>
  //           <div style="margin-top: 20px; background-color: #ecf0f1; padding: 15px; border-radius: 6px;">
  //             <h3 style="color: #2980b9;">Booking Details</h3>
  //             <p><strong>Hotel:</strong> ${hotelName}</p>
  //             <p><strong>Location:</strong> ${city}, ${state}</p>
  //             <p><strong>Booking Date:</strong> ${new Date(bookingDate).toDateString()}</p>
  //           </div>
  //           <p style="margin-top: 20px; font-size: 15px; color: #2c3e50;">
  //             Please ensure to carry a valid ID proof and your confirmation email when you check in.
  //           </p>
  //           <p style="margin-top: 20px; font-size: 14px; color: #7f8c8d;">
  //             Thank you for choosing us!<br/>The Hotel Booking Team
  //           </p>
  //         </div>
  //       `
  //     };
  
  //     const info = await transporter.sendMail(mailOptions);
  //     console.log('Approval email sent: ', info.messageId);
  //     return true;
  //   } catch (error) {
  //     console.error('Error sending approval email: ', error);
  //     return false;
  //   }
  // };


  const sendBookingApprovalEmail = async ({
    userEmail,
    userName,
    hotelName = "Hotel Paradise",
    city = "N/A",
    state = "N/A",
    bookingDate = new Date(),
    senderEmail,
    mailkey
  }) => {
    try {
      const transporter = createTransporter(senderEmail, mailkey);
  
      const mailOptions = {
        from: senderEmail,
        to: userEmail,
        subject: '🎉 Your Hotel Booking Has Been Approved!',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background: #f4f6f8; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50;">Hello ${userName},</h2>
            <p style="font-size: 16px; color: #34495e;">We're happy to let you know that your hotel booking has been <strong style="color: green;">approved</strong>! 🎉</p>
  
            <div style="margin-top: 20px; background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 5px solid #2980b9;">
              <h3 style="color: #2980b9; margin-bottom: 10px;">📋 Booking Details</h3>
              <p><strong>🏨 Hotel:</strong> ${hotelName}</p>
              <p><strong>📍 Location:</strong> ${city}, ${state}</p>
              <p><strong>📅 Booking Date:</strong> ${new Date(bookingDate).toDateString()}</p>
            </div>
  
            <p style="margin-top: 20px; font-size: 15px; color: #2c3e50;">
              Please bring a valid ID and this email as confirmation at the time of check-in.
            </p>
  
            <p style="margin-top: 20px; font-size: 14px; color: #7f8c8d;">
              Thank you for booking with us!<br/>— The Hotel Booking Team
            </p>
          </div>
        `
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Approval email sent: ', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending approval email: ', error);
      return false;
    }
  };
  
  

  module.exports = {sendOtpEmail,sendBookingApprovalEmail}