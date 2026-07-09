const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z\s]+$/;
const usernameRegex = /^[A-Za-z0-9._]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

export function validateUser(userData) {
  const errors = [];

  if (!userData.name || !userData.name.trim()) {
    errors.push("Name is required");
  } else if (!nameRegex.test(userData.name)) {
    errors.push("Name must contains only Letters");
  }
  if (!userData.username || !userData.username.trim()) {
    errors.push("Usernme is required");
  } else if (!usernameRegex.test(userData.username)) {
    errors.push("Spaces not allowed in Username");
  }
  if (!userData.email || !userData.email.trim()) {
    errors.push("Email is required");
  } else if (!emailRegex.test(userData.email)) {
    errors.push("Please enter a valid email address");
  }
  if (!userData.phone || !userData.phone.trim()) {
    errors.push("Phone number is required");
  } else if (!phoneRegex.test(userData.phone)) {
    errors.push("Please enter a valid phone no.");
  }
  if (!userData.company || !userData.company.trim()) {
    errors.push("Company is required");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePatchUser(userData) {
  const errors = [];

  if (userData.name !== undefined) {
    if (!userData.name.trim()) {
      errors.push("Name is required");
    } else if (!nameRegex.test(userData.name)) {
      errors.push("Name must contain only letters");
    }
  }

  if (userData.username !== undefined) {
    if (!userData.username.trim()) {
      errors.push("Username is required");
    } else if (!usernameRegex.test(userData.username)) {
      errors.push("Username cannot contain spaces or special characters");
    }
  }

  if (userData.email !== undefined) {
    if (!userData.email.trim()) {
      errors.push("Email is required");
    } else if (!emailRegex.test(userData.email)) {
      errors.push("Please enter a valid email address");
    }
  }

  if (userData.phone !== undefined) {
    if (!userData.phone.trim()) {
      errors.push("Phone number is required");
    } else if (!phoneRegex.test(userData.phone)) {
      errors.push("Please enter a valid phone number");
    }
  }

  if (userData.company !== undefined) {
    if (!userData.company.trim()) {
      errors.push("Company is required");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
