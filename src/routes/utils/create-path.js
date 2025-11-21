export const createPath = (path) => {
  const parametersRegex = /:([a-zA-Z]+)/g;
  const paramsRegex = "(?<$1>[a-z0-9\-_]+)";
  const queryParamsRegex = "(?<query>\\?(.*))?";

  const pathWithParams = path.replaceAll(parametersRegex, paramsRegex);
  const pathParamsRegex = new RegExp(`^${pathWithParams}${queryParamsRegex}$`);

  return pathParamsRegex;
}