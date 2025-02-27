import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCats, getCats } from "@/service/cats";

export default async function Home() {
  const cats = await getCats();
  return (
    <div>
      <ul>
        {cats.map((cat, idx) => (
          <li key={idx} className="list-disc">
            {cat.name} - {cat.breed} - {cat.spayed ? "true" : "false"}
          </li>
        ))}
      </ul>
      <Card className="max-w-[24rem] mt-1">
        <CardHeader>
          <CardTitle>Kucing</CardTitle>
          <CardDescription>Tambah Kucing</CardDescription>
        </CardHeader>
        <form
          action={async (formData) => {
            "use server";
            await createCats(formData);
          }}
        >
          <CardContent className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label>Nama</Label>
              <Input name="name" placeholder="Almighty Yanto" />
            </div>
            <div className="space-y-1.5">
              <Label>Breed</Label>
              <Input name="breed" placeholder="PSH (Plaju Shorthair)" />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Checkbox name="spayed" />
              <Label>Spayed</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Tambah</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
