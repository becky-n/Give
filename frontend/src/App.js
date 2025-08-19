import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import "./styles/App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";

export async function getPostData({
  limitCount = 10,
  orderByField = "createdAt",
  orderDirection = "desc",
} = {}) {
  const params = new URLSearchParams({
    limitCount,
    orderByField,
    orderDirection,
  });
  const res = await fetch(`/api/posts?${params.toString()}`);
  if (!res.ok) throw new Error((await res.json()).error || "Failed to fetch");
  return res.json();
}


// Layout for "app-styled" routes
function AppLayout({ postData }) {
  return (
    <div className="app">
      <Outlet context={{ postData }} />
    </div>
  );
}

function App() {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    getPostData()
      .then((data) => setPostData(data))
      .catch((error) => console.error("Error fetching post data:", error));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/create-account",
      element: <CreateAccount />,
    },
    {
      element: <AppLayout postData={postData} />,
      children: [
        {
          path: "/home",
          element: <Home postData={postData} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
