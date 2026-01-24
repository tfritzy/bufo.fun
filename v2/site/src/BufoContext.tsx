import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Bufo } from "./types";
import { fetchBufoData } from "./api";

interface BufoContextType {
  bufos: Bufo[];
  allTags: string[];
  loading: boolean;
  error: string | null;
}

const BufoContext = createContext<BufoContextType | null>(null);

export function BufoProvider({ children }: { children: ReactNode }) {
  const [bufos, setBufos] = useState<Bufo[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBufoData()
      .then(({ bufos, allTags }) => {
        setBufos(bufos);
        setAllTags(allTags);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <BufoContext.Provider value={{ bufos, allTags, loading, error }}>
      {children}
    </BufoContext.Provider>
  );
}

export function useBufos(): BufoContextType {
  const context = useContext(BufoContext);
  if (!context) {
    throw new Error("useBufos must be used within a BufoProvider");
  }
  return context;
}
