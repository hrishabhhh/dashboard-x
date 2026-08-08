export function resetPasswordTemplate(name) {
  return `
     <p>Hello ${name},</p>
    <p> Your Dashboard-X password has been successfully reset.</p>
    <p> If you made this change, you can safely ignore this email.</p>
    <p> If you did not reset your password, please contact support immediately.</p>
    <hr>
    <p>Dashboard-X Team ❤️</p>
    `;
}

export default resetPasswordTemplate;
