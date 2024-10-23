import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

interface MovieWinners {
  id: number;
  year: number;
  title: string;
}

export default function MovieWinnersByYearTable() {
  const [movieWinners, setMovieWinners] = useState<MovieWinners[]>([]);
  const [filteredYear, setFilteredYear] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await baseApi.get("?page=0&size=9999&winner=true");

      setMovieWinners(data.content);
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full p-4 flex flex-col gap-4 max-h-80 overflow-y-auto">
      <CardHeader className="p-0">
        <Input
          type="number"
          placeholder="Search by year"
          onChange={(e) => setFilteredYear(+e.target.value)}
        />
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-4">
        <CardTitle>List movie winners by year</CardTitle>
        <Table>
          <TableHeader className="bg-gray-500">
            <TableRow>
              <TableHead className="text-gray-100">Id</TableHead>
              <TableHead className="text-gray-100">Year</TableHead>
              <TableHead className="text-gray-100">Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movieWinners
              .filter((movie) =>
                movie.year.toString().includes(filteredYear.toString())
              )
              .map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.id}</TableCell>
                  <TableCell>{movie.year}</TableCell>
                  <TableCell>{movie.title}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

