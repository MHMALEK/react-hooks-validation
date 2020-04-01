import { validationTypes } from '../types';
import {
  onlyNumberValidationPattern,
  emailPattern,
} from './validation-patterns';

const validatorFunctions = {
  [validationTypes.maxLength]: (value, parameter) => {
    let stringifiedValue;
    if (typeof value !== 'string') {
      stringifiedValue = value.toString();
    } else {
      stringifiedValue = value;
    }
    if (stringifiedValue.length > parameter) {
      return false;
    }
    return true;
  },
  [validationTypes.minLength]: (value, parameter) => {
    let stringifiedValue;
    if (typeof value !== 'string') {
      stringifiedValue = value.toString();
    } else {
      stringifiedValue = value;
    }

    if (stringifiedValue.length < parameter) {
      return false;
    }
    return true;
  },
  [validationTypes.onlyNumber]: (value) => {
    if (!onlyNumberValidationPattern.test(value)) {
      return false;
    }
    return true;
  },
  [validationTypes.isRequired]: (value) => {
    if (!value && value === '') {
      return false;
    }
    return true;
  },
  [validationTypes.email]: (value) => {
    if (emailPattern.test(value)) {
      return false;
    }
    return true;
  },
  [validationTypes.customPattern]: (value, pattern) => {
    if (!pattern.test(value)) {
      return false;
    }
    return true;
  },
};

export default validatorFunctions;
