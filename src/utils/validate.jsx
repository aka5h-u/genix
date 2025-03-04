export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Invalid Password";

  return null;
};

export const validateName = (name) => {
  const isNameValid = /^[\\p{L} .'-]+$/u.test(name);
  if (!isNameValid) return "Enter valid name";
  return null;
};
