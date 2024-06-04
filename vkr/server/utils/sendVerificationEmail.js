const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const generateVerificationLink = (userId) => {
	const verificationToken = jwt.sign({ id: userId }, process.env.SECRET, {
		expiresIn: '1d',
	});
	return `http://localhost:80/api/verify-email?token=${verificationToken}`;
};

async function sendVerificationEmail(id, email) {
	const message = {
		from: process.env.EMAIL_ADDRESS,
		to: email,
		subject: 'Verify Your Email Address',
		text: `Please click on the following link to verify your email address: ${generateVerificationLink(id)}`,
	};
	await transporter.sendMail(message);
}

module.exports = sendVerificationEmail;