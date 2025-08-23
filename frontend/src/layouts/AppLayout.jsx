import React from "react";
import { NavBar } from "../";

export default function AppLayout({ left, center, right }) {
  return (
    <div className="font-sans">
      <div className="h-screen flex flex-col overflow-hidden">
        <header className="shrink-0">
          <NavBar />
        </header>

        <main className="flex flex-1 min-h-0">
          <aside className="flex w-[27%] flex-col gap-4 sticky top-0 max-h-screen overflow-y-auto flex-shrink-0">
            {left}
          </aside>

          <section className="flex-1 min-w-0 flex flex-col gap-4 overflow-y-auto scrollbar-hide px-2">
            {center}
          </section>

          <aside className="flex w-[27%] flex-col sticky top-0 max-h-screen flex-shrink-0 scrollbar-groupSearch">
            {right}
          </aside>
        </main>
      </div>
    </div>
  );
}