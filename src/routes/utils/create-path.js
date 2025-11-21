export const createPath = (path) => {
  const parametersRegex = /:([a-zA-Z]+)/g;
  const paramsRegex = "(?<$1>[a-z0-9\-_]+)";
  const pathWithParams = path.replaceAll(parametersRegex, paramsRegex);
  const pathParamsRegex = new RegExp(`^${pathWithParams}$`);

  return pathParamsRegex;
}