import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { baseApi } from "@/lib/axios";
import { useEffect, useState } from "react";

interface StudioWinners {
  name: string;
  winCount: number;
}

export default function TopStudiosWithWinnersTable() {
  const [studioWinners, setStudioWinners] = useState<StudioWinners[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await baseApi.get("?projection=studios-with-win-count");

      const topThree = (data.studios as StudioWinners[])
        .sort((studioA, studioB) => studioB.winCount - studioA.winCount)
        .slice(0, 3);

      setStudioWinners(topThree);
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full p-4 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle>Top 3 studios with winners</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-500">
            <TableRow>
              <TableHead className="text-gray-100">Name</TableHead>
              <TableHead className="text-gray-100">Win Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studioWinners.map((studio) => (
              <TableRow key={studio.name}>
                <TableCell>{studio.name}</TableCell>
                <TableCell>{studio.winCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

