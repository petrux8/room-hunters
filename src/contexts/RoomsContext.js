"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // il tuo init Firebase
import { collection, getDocs } from "firebase/firestore";
import { composeRoom } from "@/data/rooms"; // il tuo composeRoom già definito

const RoomsContext = createContext({
  rooms: [],
  loading: true,
  error: null,
});

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rooms"));
        const roomsData = snapshot.docs.map(doc => composeRoom({
          roomId: doc.id,
          ...doc.data(),
        }));
        setRooms(roomsData);
      } catch (err) {
        console.error("Errore caricamento stanze:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, loading, error }}>
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
