export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  value = value.trim();
  if (rules.required) {
    isValid = value !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.placeholder) {
    isValid = value !== rules.placeholder && isValid;
  }
  if (rules.isEmail) {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.IsNumeric) {
    const pattern = /^d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
