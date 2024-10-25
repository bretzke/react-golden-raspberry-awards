import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MovieProps } from "@/interfaces/Movie";
import { baseApi } from "@/lib/axios";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const linesPerPage = 20;

export default function ListMovies() {
  const [selectedPage, setSelectedPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [usedFilter, setUsedFilter] = useState<boolean>(false);
  const [filteredYear, setFilteredYear] = useState<number | string>("");
  const [isWinner, setIsWinner] = useState<boolean | string>("");

  const lastPage = useMemo(() => {
    return total > 0 ? Math.floor(total / linesPerPage) : 0;
  }, [total]);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await baseApi.get(
        `?page=${selectedPage}&size=${linesPerPage}`
      );

      setTotal(data.totalElements);
      setMovies(data.content);
      setUsedFilter(false);
    };

    if (+filteredYear <= 0 && isWinner === "") {
      getMovies();
    }
  }, [selectedPage, filteredYear, isWinner]);

  async function getMoviesWithFilter() {
    // Precisei "forçar" os campos abaixo a terem alguma informação pois a api não está permitindo filtrar apenas por um
    const url = `?winner=${
      typeof isWinner === "string" ? false : isWinner
    }&year=${+filteredYear > 0 ? filteredYear : 2017}`;

    const { data } = await baseApi.get(url);

    setMovies(data);
    setUsedFilter(true);
  }

  useEffect(() => {
    if (typeof isWinner !== "string") {
      getMoviesWithFilter();
    }
  }, [isWinner]);

  return (
    <Card className="w-full p-4 flex flex-col gap-4 max-h-screen overflow-auto">
      <CardHeader className="p-0">
        <CardTitle>List movies</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-4">
        <Table>
          <TableHeader className="bg-gray-500">
            <TableRow>
              <TableHead className="text-gray-100">Id</TableHead>
              <TableHead className="text-gray-100 p-2 flex-col items-start">
                Year
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    if (+filteredYear > 0) {
                      await getMoviesWithFilter();
                      return;
                    }

                    setSelectedPage(1);
                  }}
                >
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="number"
                      value={filteredYear}
                      className="text-black"
                      onChange={(e) => setFilteredYear(+e.target.value)}
                    />
                    <Button type="submit">
                      <Search />
                    </Button>
                  </div>
                </form>
              </TableHead>
              <TableHead className="text-gray-100">Title</TableHead>
              <TableHead className="text-gray-100">
                Winner?
                <Select
                  onValueChange={(newValue) => {
                    switch (newValue) {
                      case "yes":
                        setIsWinner(true);
                        break;
                      case "no":
                        setIsWinner(false);
                        break;
                      default:
                        setIsWinner("");
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px] text-black">
                    <SelectValue placeholder="Yes/No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="empty">Yes/No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.winner ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {total > 0 && !usedFilter && (
          <div className="w-full flex justify-center items-center gap-1">
            <Button
              className="px-2"
              variant="outline"
              disabled={selectedPage === 1}
              onClick={() => setSelectedPage(1)}
            >
              <ChevronsLeft />
            </Button>
            <Button
              className="px-2"
              variant="outline"
              disabled={selectedPage === 1}
              onClick={() => setSelectedPage((prev) => prev - 1)}
            >
              <ChevronLeft />
            </Button>
            {Array.from({ length: lastPage }).map((_, index) => {
              const label = index + 1;
              return (
                <Button
                  className="px-2"
                  variant="outline"
                  disabled={selectedPage === label}
                  onClick={() => setSelectedPage(label)}
                  key={index}
                >
                  {label}
                </Button>
              );
            })}
            <Button
              className="px-2"
              variant="outline"
              disabled={selectedPage === lastPage}
              onClick={() => setSelectedPage((prev) => prev + 1)}
            >
              <ChevronRight />
            </Button>
            <Button
              className="px-2"
              variant="outline"
              disabled={selectedPage === lastPage}
              onClick={() => setSelectedPage(lastPage)}
            >
              <ChevronsRight />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

