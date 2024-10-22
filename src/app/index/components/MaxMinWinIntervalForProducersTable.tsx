import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MaxMinWinIntervalForProducersTable() {
  return (
    <Card className="w-full p-4 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle>
          Producers with longest and shortest interval between wins
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">Tabela</CardContent>
    </Card>
  );
}

