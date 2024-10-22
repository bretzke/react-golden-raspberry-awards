import MaxMinWinIntervalForProducersTable from "./components/MaxMinWinIntervalForProducersTable";
import MovieWinnersByYearTable from "./components/MovieWinnersByYearTable";
import MultipleWinnersTable from "./components/MultipleWinnersTable";
import TopStudiosWithWinnersTable from "./components/TopStudiosWithWinnersTable";

export default function Index() {
  return (
    <div className="flex gap-4 m-auto w-full">
      <div className="flex flex-col gap-4 w-1/2">
        <MultipleWinnersTable />
        <MaxMinWinIntervalForProducersTable />
      </div>
      <div className="flex flex-col gap-4 w-1/2">
        <TopStudiosWithWinnersTable />
        <MovieWinnersByYearTable />
      </div>
    </div>
  );
}

