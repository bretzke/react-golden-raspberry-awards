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

interface MultipleWinners {
  year: number;
  winnerCount: number;
}

export default function MultipleWinnersTable() {
  const [winners, setWinners] = useState<MultipleWinners[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await baseApi.get(
        "?projection=years-with-multiple-winners"
      );

      setWinners(data.years as MultipleWinners[]);
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full p-4 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle>List years with multiple winners</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-500">
            <TableRow>
              <TableHead className="text-gray-100">Year</TableHead>
              <TableHead className="text-gray-100">Win Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {winners.map((winner) => (
              <TableRow key={winner.year}>
                <TableCell>{winner.year}</TableCell>
                <TableCell>{winner.winnerCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

