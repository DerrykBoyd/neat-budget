export const validatePassword = (password) => {
  if (password.length < 8) return "Password should be at least 8 characters long";
};
