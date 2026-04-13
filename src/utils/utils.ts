export const truncateSentence = (sentence: string, maxLength: number) => {
  if (sentence.length > maxLength) {
    return sentence.substring(0, maxLength) + "...";
  }
  return sentence;
};

export const getErrorMessage = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.msg ||
    error?.message ||
    "Internal Server Error: Server Error Not found";
  return message;
};

export const getErrors = (error: any) => {
  const errors = error?.response?.data;
  return errors;
};

export const getRetryErrorMessage = (error: any) => {
  const message =
    error?.response?.data?.message || error?.response?.data?.msg || null;
  return message;
};

export const JSON_OBJ_LOG = (value: any) => {
  console.log(JSON.stringify(value, null, 2));
};
