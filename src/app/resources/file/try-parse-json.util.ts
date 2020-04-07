export function tryParseJSON(v: string) {
  let json: any;

  try {
    json = JSON.parse(v);
  } catch (_) {
    json = undefined;
  }

  return json;
}
