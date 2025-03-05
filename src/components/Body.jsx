import Login from "./Login";
import Browse from "./Browse";
import MovieDetails from "./MovieDetails";

import { RouterProvider } from "react-router-dom";

import { createBrowserRouter } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/browse/:movieId",
      element: <MovieDetails />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
