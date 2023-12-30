// import './App.css'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/home/Home";
import MaifriendList from "./pages/maifriendList/MaifriendList";
import ChatInterface from "./pages/chatInterface/ChatInterface";

// Layout
import RouteLayout from "./layouts/RouteLayout";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
      <Route path="maifriend-list" element={<MaifriendList />} />
      <Route path="/maifriend-list/chat-interface/" element={<ChatInterface />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
