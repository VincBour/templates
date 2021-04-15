export const getReplaceRegexp = (variableName: string) => {
    //finds <variableName( (| or %) transformer)> and  [variableName( (| or %) transformer)] in strings
    const regexp = new RegExp(
      `(?:<|\\[)${variableName}\\s*(?:\\s*(?:\\||\\%)\\s*([A-Za-z\?]+)\\s*?)?(?:>|\\])`,
      "g"
    );
  
    return regexp;
  };