import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./components/Post";
import "./styles/App.css";
import ResponsiveContainer from "./components/postContainer";
import GroupTab from "./components/GroupTab";

// async function getPostData () {
//       try {
//         const res = await fetch('http://localhost:5001/postData');
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return await res.json();  //
//       } catch (err) {
//         console.error('Failed to load poll:', err);
//         return err.message; // Return error message for debugging
//       }
//     };

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

// npm install react-router-dom

function App() {
const [user, setUser] =useState(null);

 useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);


  const [postData, setPostData] = useState(null);

  useEffect(() => {
    getPostData()
      .then((data) => setPostData(data))
      .catch((error) => console.error("Error fetching post data:", error));
  }, []);

  // if (loading) return <p>Loading...</p>;

  // return (
  //   <div className="App flex">
  //     {/* left column */}
  //     <GroupTab />

  //     {/* middle column */}
  //     <div className="flex-1 p-4">

  //       <main>
  //         <PollBox initialOptions={options} />
  //       </main>
  //     </div>
  //   </div>
  // );

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
           <Route path="/login" element={<Login onLogin={setUser} />} />
        </Routes>
      </header>
      <ResponsiveContainer currentUser={user} />

      <div className="App flex">
        {/* left column */}
        <GroupTab />
        <div>
          {/* middle column */}
          {/* <Post
          user={postData.user}
          group={postData.group}
          post={postData.post}
          pollOptions={postData.pollOptions}
        /> */}
          {postData &&
            postData.map((p) => (
              <Post
                key={p.id}
                user={{
                  name: p.authorDisplayName,
                  profilePic: p.authorPhotoURL,
                  id: p.authorId,
                }}
                group={p.group ?? null}
                post={p}
                pollOptions={p.polls ?? []}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default App;
