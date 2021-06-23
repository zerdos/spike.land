import { json } from "@responds";
export async function logs() {
  const list = await LOGS.list();
  const dates = await Promise.all(
    list.keys.map((x) => LOGS.get(x.name, "json")),
  );
  return json(dates);
}
