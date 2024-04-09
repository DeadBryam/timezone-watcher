/**
 * The function `classNames` takes an array of strings, filters out any null or undefined values, and
 * joins the remaining strings with a space separator.
 * @param {(string | null | undefined)[]} classes - The `classes` parameter in the `classNames`
 * function is a rest parameter that allows you to pass any number of string, null, or undefined values
 * as arguments. The function then filters out any null or undefined values from the array and joins
 * the remaining string values with a space separator to create a single
 * @returns A string is being returned.
 */
const classNames = (...classes: (string | null | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export { classNames };
