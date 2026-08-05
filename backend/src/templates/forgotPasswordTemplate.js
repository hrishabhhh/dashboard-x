export function forgotPasswordTemplate(name, otp) {
  return `
    <p>Hey ${name}, We received a request to reset your password.</p>
    <p>OTP to reset Password : <strong style="letter-spacing:5px;color:#2563eb;"> ${otp} </strong></p>
    <p>If you didn't request this,<br>
    ignore this email.</p>
    <hr>
    <p>DashboardX Team ❤️</p>
    `;
}

export default forgotPasswordTemplate;
