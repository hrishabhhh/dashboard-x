export function otpEmailTemplate(name, otp) {
  return `
    <h1>Verify your email</h1>
    <p>Hello ${name},</p>
    <p>Your OTP is : <strong style="letter-spacing:5px;color:#2563eb;">${otp}</strong></p>
    <p>Please enter this code to verify your email address it is valid for 5 minutes.</p>
    <hr>
    <p>DashboardX Team ❤️</p>
    `;
}

export default otpEmailTemplate;
