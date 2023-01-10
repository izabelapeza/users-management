const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateUser = (firstName: string, lastName: string, email: string) => {
  let errorsList: string[] = [];

  if (!firstName || !lastName || !email) {
    errorsList.push("Required data missing");
  }
  if (email && !emailValidation.test(email)) {
    errorsList.push("Invalid email");
  }
  if (firstName.length > 35) {
    errorsList.push("The maximum first name length is 35");
  }
  if (lastName.length > 35) {
    errorsList.push("The maximum last name length is 35");
  }
  if (email.length > 35) {
    errorsList.push("The maximum email length is 60");
  }

  return errorsList;
};

export default validateUser;
