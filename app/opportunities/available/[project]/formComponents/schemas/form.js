const form = {
  formId: "accept-form",
  formField: {
    firstName: {
      name: "firstName",
      label: "First Name",
      type: "text",
      errorMsg: "First name is required.",
    },
    lastName: {
      name: "lastName",
      label: "Last Name",
      type: "text",
      errorMsg: "Last name is required.",
    },
    email: {
      name: "email",
      label: "Email Address",
      type: "email",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    termsChecked: {
      name: "termsChecked",
      label: "Accept the terms and conditions",
      type: "checkbox",
      errorMsg: "You have to agree with the terms and conditions .",
    },
  },
};

export default form;
