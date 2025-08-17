import React, { useEffect, useState, useRef } from "react";
import "../styles/index.css";
import imageIcon from "../assets/imageIcon.svg";

// Create a post via backend
export async function createPostViaApi({
  currentUser,
  content,
  mediaUrls = [],
  tags = [],
}) {
  const body = {
    content,
    mediaUrls,
    tags,
    authorId: currentUser?.uid ?? null,
    authorDisplayName: currentUser?.displayName ?? null,
    authorPhotoURL: currentUser?.photoURL ?? null,
  };

  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Failed to create");
  return res.json();
}

// Get posts via backend
export async function getPostsViaApi({
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

export default function ResponsiveContainer({ currentUser }) {
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function onPickFiles(e) {
    const picked = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...picked]);

    // make object URLs for preview
    const newPreviews = picked.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }

  function removePreview(idx) {
    // revoke object URL and remove
    URL.revokeObjectURL(previews[idx]);
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  /** Upload files to the backend, return array of URLs */
  async function uploadFilesGetUrls(files) {
    if (!files.length) return [];
    const form = new FormData();
    files.forEach((f) => form.append("files", f));
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
    const data = await res.json();
    return Array.isArray(data.urls) ? data.urls : [];
  }

  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

  async function refreshPosts() {
    try {
      setLoading(true);
      const latest = await getPostsViaApi({
        limitCount: 10,
        orderByField: "createdAt",
        orderDirection: "desc",
      });
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

      const uploadedUrls = await uploadFilesGetUrls(files);

      await createPostViaApi({
        currentUser,
        content: text.trim(),
        mediaUrls: uploadedUrls,
        tags: tags.split(",").map((tag) => tag.trim()),
      });
      setText("");
      setTags("");
      setFiles([]);
      previews.forEach(URL.revokeObjectURL);
      setPreviews([]);

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
        <h2 className="text-xl font-semibold mb-2 text-black text-left ml-4 pb-5">
          Create a post
        </h2>

        <div className="ml-10">
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

          <h3 className="text-lg font-semibold mb-2 text-black text-left">
            Add Text
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="block w-full p-4  rounded-lg bg-backgroundGrey">
                <textarea
                  id="medium-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={
                    currentUser ? "What's on your mind?" : "Sign in to post..."
                  }
                  disabled={!currentUser || submitting}
                  rows={3}
                  className=" text-sm w-full text-gray-900 focus:outline-none  bg-backgroundGrey disabled:opacity-60 "
                />
                <h3 className="text-lg font-semibold mt-4 mb-2 text-black text-left">
                  Add Tags
                </h3>
                <input
                  type="text"
                  id="small-input"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add tags (comma-separated)"
                  disabled={!currentUser || submitting}
                  className="w-full text-sm text-gray-900 rounded-md
                             px-3 py-2 focus:outline-none 
                             placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* to fix */}
            <div className="text-xs text-gray-500 mb-4">{text.length}/280</div>

            <h3 className="text-lg font-semibold mb-2 text-black text-left ">
              Add to Your Post
            </h3>

            <div className="relative mb-6 w-full min-h-56 bg-backgroundGrey px-4 py-8 rounded-lg">
              {/* Previews grid */}
              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-3 pr-14">
                  {previews.map((src, idx) => (
                    <div
                      key={src}
                      className="relative group rounded-md overflow-hidden border border-gray-200"
                    >
                      <img
                        src={src}
                        alt={`preview-${idx}`}
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePreview(idx)}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition
                       bg-white/90 text-gray-700 rounded px-1 text-xs border"
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={onPickFiles}
              />

              {/* Add-image button (bottom-right) */}
              <button
                type="button"
                onClick={openFilePicker}
                className="absolute bottom-2 right-2 flex items-center justify-center 
               rounded-md shadow-sm p-3  hover:bg-gray-50"
                aria-label="Add images"
                title="Add images"
              >
                <img src={imageIcon} alt="" className="h-6 w-6" />
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2 text-black text-left ">
              Create Polls
            </h3>
            <div className="w-full text-left">
              <button
                type="button"
                className="bg-backgroundGrey text-gray-500 text-lg font-semibold pb-1 pt-0.5 px-2.5 rounded-lg"
              >
                <p>+</p>
              </button>
            </div>

            {/* {error && <p className="text-red-600 mt-4">{error}</p>} */}

            <div className="mt-4">
              <button
                type="submit"
                disabled={!currentUser || submitting || !text.trim()}
                className="rounded-md bg-darkGrey text-black px-16 font-semibold py-2 disabled:opacity-60"
              >
                {submitting ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
