export const extractQueryParams = (query) => {
  return query.slice(1).split("&").reduce((queryParameter, splitedQuery) => {
    const [key, value] = splitedQuery.split("=");
    queryParameter[key] = value
    return queryParameter;
  }, {})
}