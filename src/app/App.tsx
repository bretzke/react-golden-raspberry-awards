import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./index";
import ListMovies from "./list-movies";
import RootLayout from "@/layout/RootLayout";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/list-movies",
        element: <ListMovies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Erro</p>} />;
}

export default App;

