"use client";

import { useState } from "react";
import SearchResult from "./SearchResult";
import Playlist from "./Playlist";
import RecentlyPlayed from "./RecentlyPlayed";

export default function DisplayHandler() {
  const [searchActive, setSearchActive] = useState(true);

  return (
    <div className="my-16">
      {searchActive ? (
        <SearchResult />
      ) : (
        <div>
          <RecentlyPlayed />
          <Playlist />
        </div>
      )}
    </div>
  );
}
