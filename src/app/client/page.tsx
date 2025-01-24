"use client";
import { Cats } from "@prisma/client";
import React, { useActionState, useEffect, useState } from "react";
import { createCatsAction } from "./action";
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
import { Button } from "@/components/ui/button";
function ClientPage() {
  const [cats, setCats] = useState<Cats[]>();
  const [state, action, pending] = useActionState(createCatsAction, {} as any);

  useEffect(() => {
    fetch("/api/cats").then((res) =>
      res.json().then((data) => setCats(data as Cats[]))
    );
  }, [state]);
  return (
    <div>
      <ul>
        {cats &&
          cats.map((cat, idx) => (
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
        <form action={action}>
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
            <Button disabled={pending} type="submit">
              Tambah
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default ClientPage;
