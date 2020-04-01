import React, { useState, useEffect } from "react";
import Validation from "../validation";
import { validationTypes } from "../types";

const Form = ({ children, onFormChange, onValidateStateChange }) => {
  const [fieldsValue, setFieldsValue] = useState({});
  const [requiredFields, setRequiredFields] = useState({});
  const [fieldsErrors, setFieldsErrors] = useState();

  const createFormFields = () => {
    return children.reduce((previousValue, currentValue) => {
      const item = currentValue.props;
      previousValue[item.name] = item.value || "";
      return previousValue;
    }, {});
  };

  const getFeildsWithRequiredValidation = () => {
    return children.reduce((previousValue, currentValue) => {
      const item = currentValue.props;
      if (item.validation && item.validation[validationTypes.isRequired]) {
        previousValue[item.name] = true;
      }
      return previousValue;
    }, {});
  };

  useEffect(() => {
    const fields = createFormFields();
    const requiredFieldsList = getFeildsWithRequiredValidation();
    setFieldsValue(fields);
    setRequiredFields(requiredFieldsList);
  }, []);

  useEffect(() => {
    onFormChange(fieldsValue);
  }, [fieldsValue]);

  useEffect(() => {
    if (Object.keys(requiredFields).length > 0) {
      const errorsForRequiredFieldsAtInit = Object.keys(requiredFields).map(
        field => field
      );
      setFieldsErrors(errorsForRequiredFieldsAtInit);
    }
    return undefined;
  }, [requiredFields]);

  const handleOnChange = (name, value) => {
    const fields = {
      ...fieldsValue,
      [name]: value
    };

    setFieldsValue(fields);
  };

  const handleFieldsErrors = (name, isValid) => {
    if (fieldsErrors) {
      let errors = [];
      if (isValid) {
        errors = fieldsErrors.filter(item => item !== name);
      } else {
        errors = [...fieldsErrors, name];
      }
      setFieldsErrors(errors);
    }
  };

  useEffect(() => {
    if (fieldsErrors) {
      if (fieldsErrors.length === 0) {
        return onValidateStateChange(true);
      }
      return onValidateStateChange(false);
    }
    return undefined;
  }, [fieldsErrors]);

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (child.props.validation) {
          return (
            <Validation
              key={index}
              rules={child.props.validation}
              getValue={(name, value) => handleOnChange(name, value)}
              changeValidationStatus={isValid =>
                handleFieldsErrors(child.props.name, isValid)
              }
            >
              {child}
            </Validation>
          );
        }
        return child;
      })}
    </>
  );
};

export default Form;
