export function sanitizedUser(userData) {
  const { _id, name, email, isVerified } = userData;
  const sanitizedUser = {
    id: _id,
    name,
    email,
    isVerified,
  };

  return sanitizedUser;
}
