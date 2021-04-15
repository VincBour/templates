export const convertFileContentToString = (content: string[] | string | undefined) => {
    if (!content) {
      return "";
    }
    const result = Array.isArray(content) ? content.join("\n") : content;
    return result;
  };