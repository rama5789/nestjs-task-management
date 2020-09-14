// parse boolean value
const truthyVals = [1, '1', true, 'true'];
const falsyVals = [0, '0', false, 'false'];
export const parseBoolean = (val: any): boolean => {
  if (val) {
    if (truthyVals.includes(val)) {
      return true;
    } else if (falsyVals.includes(val)) {
      return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
