export function validateUser(userData) {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.name || !userData.name.trim()) {
    errors.push("Name is required");
  }
  if (!userData.username || !userData.username.trim()) {
    errors.push("Usernme is required");
  }
  if (!userData.email || !userData.email.trim()) {
    errors.push("Email is required");
  } else if (!emailRegex.test(userData.email)) {
    errors.push("Please enter a valid email address");
  }
  if (!userData.phone || !userData.phone.trim()) {
    errors.push("Phone number is required");
  }
  if (!userData.company || !userData.company.trim()) {
    errors.push("Company is required");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
  //   console.log("ERRORS -----", errors);
}
export default validateUser;
