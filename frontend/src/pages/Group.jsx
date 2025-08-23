import React from "react";
import { Post, GroupTab, UserInfo, NavBar, GroupSearch, CreatePost } from "../";
import ScreenTab from "../components/ScreenTab";
import { groupTabConfig } from "../config/tabConfig";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

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

const Group = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading } = useAuth();
  const [postData, setPostData] = useState([]);
  // Always highlight 'group' tab in group page
  const currentTab = "group";

  useEffect(() => {
    getPostData()
      .then((data) => setPostData(data))
      .catch((error) => console.error("Error fetching post data:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // TODO: route to results page or trigger fetch here
  };

  // Hardcoded list for now; replace with fetched DB data later
  // const posts = [
  //   {...postData},
  //   { ...postData, post: { ...postData.post, id: "p2", question: "Favourite movie snack?" } },
  //   { ...postData, post: { ...postData.post, id: "p3", question: "Dinner plans tonight?" } },
  // ];

  console.log("postData: ", postData);
  // While auth is resolving, don't render anything (avoids flicker)
  if (loading) return null;

  // Redirect unauthenticated users to login
  if (!user) return <Navigate to="/" replace />;

  console.log("postData: ", postData);

  return (
    <div className="font-sans">
      <div className="h-screen flex flex-col overflow-hidden">
        <header className="shrink-0">
          <NavBar />
        </header>

        {/* min-h-0 lets children shrink and scroll correctly */}
        <main className="flex flex-1 min-h-0">
          {/* left column */}
          <aside className="flex w-[27%] flex-col gap-4 sticky top-0 max-h-screen flex-shrink-0">
            <UserInfo />
            <ScreenTab tabConfig={groupTabConfig} onTabChange={() => {}} onCurrentTab={currentTab}/>
            <div className="flex-1 overflow-y-hidden">
              <GroupTab id={id} />
            </div>
          </aside>

          {/* Centre column */}
          <section className="flex-1 min-w-0 flex flex-col gap-4 overflow-y-auto scrollbar-hide px-2">
           {currentTab === "create" ? (
                         <CreatePost/>
                       ) : (
                         postData &&
                         postData.map((p) => (
                           <Post
                             key={p.id}
                             user={{
                               id: p.authorId ?? undefined,
                               name: p.authorDisplayName || "unknown",
                               profilePic: p.authorPhotoURL || undefined,
                             }}
                             group={p.group || undefined}
                             post={p}
                             // pollOptions={p.polls ?? []}
                           />
                         ))
                       )}
          </section>

          {/* right column */}
          <aside className="flex w-[27%] flex-col sticky top-0 max-h-screen flex-shrink-0 scrollbar-groupSearch">
            <GroupSearch />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Group;
