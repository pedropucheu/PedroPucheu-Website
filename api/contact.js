const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, 'project-type': projectType, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Pedro Pucheu Website" <${process.env.GMAIL_USER}>`,
      to: 'pedropucheu@gmail.com',
      replyTo: email,
      subject: `New enquiry from ${name}${projectType ? ' — ' + projectType : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType || 'Not specified'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#111;margin-bottom:1.5rem;">New enquiry from pedropucheu.com</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td style="padding:8px 0;color:#111;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#111;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Project</td><td style="padding:8px 0;color:#111;">${projectType || 'Not specified'}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0;" />
          <p style="color:#111;line-height:1.6;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0;" />
          <p style="color:#999;font-size:12px;">Hit reply to respond directly to ${name}.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};
