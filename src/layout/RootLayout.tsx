import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen max-sm:flex-col">
      <aside className="bg-slate-700 text-slate-100 max-w-32 min-w-32 flex grow items-center justify-center max-sm:max-w-none">
        <nav className="flex flex-col gap-4 max-sm:flex-row">
          <Link to="/">Dashboard</Link>
          <Link to="/list-movies">List</Link>
        </nav>
      </aside>
      <section className="p-4 grow flex justify-center">
        <Outlet />
      </section>
    </div>
  );
}

