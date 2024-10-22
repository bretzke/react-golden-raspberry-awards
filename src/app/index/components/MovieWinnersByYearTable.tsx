import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MovieWinnersByYearTable() {
  return (
    <Card className="w-full p-4 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle>List movie winners by year</CardTitle>
      </CardHeader>
      <CardContent className="p-0">Tabela</CardContent>
    </Card>
  );
}

