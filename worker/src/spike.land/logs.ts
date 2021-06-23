import { json } from "@responds";
export async function logs() {
  const list = await LOGS.list();
  return json(list);
}
