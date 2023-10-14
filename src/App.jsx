import "./App.css";
import DisplayBoardPage from "modules/display_board/pages/display_board.page";
import RouterProvider from "lib/Routing/components/RouterProvider";
import PageNotFound from "modules/PageNotFound";

function App() {
  const routes = [
    {
      path: "/",
      Element: <DisplayBoardPage />,
    },
  ];

  return (
    <div className="app__root">
      <RouterProvider routes={routes} PageNotFoundElement={PageNotFound} />
    </div>
  );
}

export default App;
