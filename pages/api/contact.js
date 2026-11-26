const sgMail = require('@sendgrid/mail');

export default async function contact(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'info@harisco.net',
    from: 'noreply@harisco.net',
    subject: 'Harisco 👻: ' + req.body.email,
    text: `${req.body.name}\n\n${req.body.message}`,
  };

  try {
    const resultInfo = await sgMail.send(msg);
    res.status(200).json(resultInfo);
  } catch (error) {
    console.error(error.toString());
    const { code } = error;
    res.status(code).json(error);
  }
}
