export const concatHelper = (arr: string[] | number[]) => {
  if (arr.length === 0) {
    return "";
  } else if (arr.length === 1) {
    return arr[0];
  }
  const last = arr.pop();
  return `${arr.join(", ")} y ${last}`;
};

export const normalize = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
};
