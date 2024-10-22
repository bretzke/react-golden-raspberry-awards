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

interface ProducerWinners {
  followingWin: number;
  interval: number;
  previousWin: number;
  producer: string;
}

export default function MaxMinWinIntervalForProducersTable() {
  const [minWinners, setMinWinners] = useState<ProducerWinners[]>([]);
  const [maxWinners, setMaxWinners] = useState<ProducerWinners[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await baseApi.get(
        "?projection=max-min-win-interval-for-producers"
      );

      setMinWinners(data.min);
      setMaxWinners(data.max);
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full p-4 flex flex-col gap-4">
      <CardHeader className="p-0">
        <CardTitle>
          Producers with longest and shortest interval between wins
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-4">
        <div>
          <h3 className="text-lg">Maximum</h3>
          <Table>
            <TableHeader className="bg-gray-500">
              <TableRow>
                <TableHead className="text-gray-100">Producer</TableHead>
                <TableHead className="text-gray-100">Interval</TableHead>
                <TableHead className="text-gray-100">Previous Year</TableHead>
                <TableHead className="text-gray-100">Following Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maxWinners.map((winner) => (
                <TableRow key={winner.producer}>
                  <TableCell>{winner.producer}</TableCell>
                  <TableCell>{winner.interval}</TableCell>
                  <TableCell>{winner.previousWin}</TableCell>
                  <TableCell>{winner.followingWin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg">Minimum</h3>
          <Table>
            <TableHeader className="bg-gray-500">
              <TableRow>
                <TableHead className="text-gray-100">Producer</TableHead>
                <TableHead className="text-gray-100">Interval</TableHead>
                <TableHead className="text-gray-100">Previous Year</TableHead>
                <TableHead className="text-gray-100">Following Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {minWinners.map((winner) => (
                <TableRow key={winner.producer}>
                  <TableCell>{winner.producer}</TableCell>
                  <TableCell>{winner.interval}</TableCell>
                  <TableCell>{winner.previousWin}</TableCell>
                  <TableCell>{winner.followingWin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

