import { getCats } from "@/service/cats";

export async function GET() {
  return Response.json(await getCats());
}
