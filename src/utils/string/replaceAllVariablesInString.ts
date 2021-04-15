import { getReplaceRegexp } from ".";

export const replaceAllVariablesInString = (
    target: string,
    value: string,
    replaceValue: string
) => {
    const result = target.replace(getReplaceRegexp(value), replaceValue);
    return result;
};