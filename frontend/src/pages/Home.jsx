import React, { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import LeftSidebar from "../components/LeftSideBar";
import PostsList from "../components/PostsList";
import { SuggestedBox, GroupSearch, CreatePost } from "../";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { usePosts } from "../hooks/UsePosts";
import { homeTabConfig } from "../config/tabConfig";

export default function HomeScreen() {
  const { user } = useAuth();
  const { posts, loading } = usePosts();
  const [currentTab, setCurrentTab] = useState("home");

  // if (!user) return <Navigate to="/" replace />;

  const showCreate = currentTab === "create";

  return (
    <AppLayout
      left={
        <LeftSidebar
          screenTabProps={{
            tabConfig: homeTabConfig,
            onTabChange: setCurrentTab,
            onCurrentTab: currentTab,
          }}
          extra={<SuggestedBox />}
        />
      }
      center={
        showCreate ? <CreatePost /> : loading ? null : <PostsList posts={posts} />
      }
      right={<GroupSearch />}
    />
  );
}