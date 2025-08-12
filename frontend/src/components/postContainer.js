import "../styles/index.css";

export default function ResponsiveContainer() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-black">Create a post</h2>
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-black">Add to:</h3>
          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
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
        <div class="mb-6">
          <input
            type="text"
            id="large-input"
            class="block w-full p-4 text-sm text-gray-900 border-gray-300 rounded-lg bg-backgroundGrey"
          ></input>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-black ">
          Add to Your Post
        </h3>
        <div class="mb-6 block w-full bg-backgroundGrey
         px-4 py-8 rounded-lg"></div>
        <h3 className="text-lg font-semibold mb-2 text-black">Create Polls</h3>
        <button class="bg-backgroundGrey text-black font-semibold pt-1 px-2 rounded-lg">
          <i class="fi fi-rr-plus-small"></i>
        </button>
      </div>
      Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a>
    </div>
  );
}
