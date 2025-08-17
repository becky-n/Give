import React, { useEffect, useState } from "react";
import "../styles/index.css";

// Create a post via backend
export async function createPostViaApi({ currentUser, content, mediaUrls = [], tags = [] }) {
  const body = {
    content,
    mediaUrls,
    tags,
    authorId: currentUser?.uid ?? null,
    authorDisplayName: currentUser?.displayName ?? null,
    authorPhotoURL: currentUser?.photoURL ?? null,
  };

  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to create');
  return res.json();
}

// Get posts via backend
export async function getPostsViaApi({ limitCount = 10, orderByField = 'createdAt', orderDirection = 'desc' } = {}) {
  const params = new URLSearchParams({ limitCount, orderByField, orderDirection });
  const res = await fetch(`/api/posts?${params.toString()}`);
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch');
  return res.json();
}

export default function ResponsiveContainer({ currentUser }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refreshPosts() {
    try {
      setLoading(true);
      const latest = await getPostsViaApi({ limitCount: 10, orderByField: 'createdAt', orderDirection: 'desc' });
      setPosts(Array.isArray(latest) ? latest : []);
    } catch (err) {
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!currentUser) return setError("Please sign in to post.");
    if (!text.trim()) return setError("Please enter some text.");

    try {
      setSubmitting(true);
      await createPostViaApi({ currentUser, content: text.trim() });
      setText("");
      await refreshPosts();
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-black">Create a post</h2>

        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-lg font-semibold text-black">Add to:</h3>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Group
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.355a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-2 text-black">Add Text</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              id="large-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={currentUser ? "What's on your mind?" : "Sign in to post..."}
              disabled={!currentUser || submitting}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-backgroundGrey disabled:opacity-60"
            />
          </div>

          <div className="text-xs text-gray-500 mb-4">
            {text.length}/280
          </div>

          <h3 className="text-lg font-semibold mb-2 text-black">Add to Your Post</h3>
          <div className="mb-6 w-full bg-backgroundGrey px-4 py-8 rounded-lg" />

          <h3 className="text-lg font-semibold mb-2 text-black">Create Polls</h3>
          <button
            type="button"
            className="bg-backgroundGrey text-black font-semibold pt-1 px-2 rounded-lg"
          >
            <i className="fi fi-rr-plus-small"></i>
          </button>

          {/* {error && <p className="text-red-600 mt-4">{error}</p>} */}

          <div className="mt-4">
            <button
              type="submit"
              disabled={!currentUser || submitting || !text.trim()}
              className="rounded-md bg-blue-600 text-white px-4 py-2 disabled:opacity-60"
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>

      <p className="mt-2 text-sm">
        Uicons by <a className="underline" href="https://www.flaticon.com/uicons">Flaticon</a>
      </p>

      
    </div>
  );
}
