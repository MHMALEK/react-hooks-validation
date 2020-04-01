import React, { useEffect, useState } from "react";
import validatorFunctions from "../utils/validator-functions";

// interface ValidationProps {
//   children: React.ReactChild;
//   rules: ValidationObject;
//   getValue: (name: string, value: string) => void;
//   changeValidationStatus?: (isValid: boolean) => void;
// }
const Validation = ({ children, rules, getValue, changeValidationStatus }) => {
  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState();
  const requiredValidations = Object.keys(rules);

  useEffect(() => {
    if (changeValidationStatus && errors) {
      if (errors.length === 0) return setIsValid(true);
      return setIsValid(false);
    }
    return undefined;
  }, [errors]);

  useEffect(() => {
    changeValidationStatus(isValid);
  }, [isValid]);

  const setError = rule => {
    if (!errors.includes(rule)) {
      setErrors([...errors, rule]);
    }
  };

  const unsetError = rule => {
    if (errors.includes(rule)) {
      const index = errors.indexOf(rule);
      const newErrors = errors.filter(
        (item, indexOfArr) => index !== indexOfArr
      );
      setErrors(newErrors);
    }
    if (errors.length === 0) {
      changeValidationStatus(isValid);
      setIsValid(true);
    }
  };

  const checkIfTheValueIsValid = (rule, params, value) => {
    return validatorFunctions[rule](value, params);
  };

  const checkValueValidation = value => {
    requiredValidations.map(rule => {
      const params = rules[rule].parameter;
      if (checkIfTheValueIsValid(rule, params, value)) {
        return unsetError(rule);
      }
      return setError(rule);
    });
  };

  const handleOnChangeWithValidation = e => {
    const { value, name } = e.target;
    getValue(name, value);
    checkValueValidation(value);
  };

  const element = React.Children.map(children, child => {
    return React.cloneElement(child, {
      onChange: e => handleOnChangeWithValidation(e)
    });
  });

  return (
    <>
      <div>{element}</div>
      <div>
        {errors &&
          errors.length > 0 &&
          errors.map((error, index) => (
            <div key={index}>{rules[error].errorMessage}</div>
          ))}
      </div>
    </>
  );
};

export default Validation;
