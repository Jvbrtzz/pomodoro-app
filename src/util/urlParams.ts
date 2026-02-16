export function getURLParams(query: string): string | null {
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);

  const param = parametros.get(query);

  const urlSemQuery = window.location.pathname + window.location.hash;
  window.history.replaceState({}, document.title, urlSemQuery);

  return param;
}
