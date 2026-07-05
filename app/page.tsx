"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  function startAdventure() {
    const finalName = name.trim() || "ACE";
    router.push(`/game?name=${encodeURIComponent(finalName)}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-purple-500/30 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-5xl font-extrabold text-center text-white">
          Anime Forge
        </h1>

        <p className="mt-3 text-center text-gray-300">
          Create your perfect anime character.
        </p>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Enter your character name..."
          className="mt-8 w-full rounded-xl border border-purple-500/40 bg-black/30 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-400"
        />

        <button
          onClick={startAdventure}
          className="mt-6 w-full rounded-xl bg-purple-600 py-3 text-lg font-semibold text-white transition hover:bg-purple-500"
        >
          Start Adventure
        </button>
      </div>
    </main>
  );
}