"use client";

import { use, useState, useEffect } from "react";
import { useRooms } from "@/contexts/RoomsContext";
import { useRouter } from "next/navigation";

export default function RoomPage({ params }) {
  const { slug } = use(params);
  const { rooms, loading, error } = useRooms();
  const [room, setRoom] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !error) {
      const foundRoom = rooms.find((r) => r.slug === slug && r.active);
      if (!foundRoom) {
        router.replace("/rooms");
      } else {
        setRoom(foundRoom);
      }
    }
  }, [rooms, loading, error, slug, router]);

  if (loading || !room) return <p>Caricamento stanza...</p>; //TODO: Component per loading
  if (error) return <p>Errore: {error.message}</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{room.title}</h1>

      {room.content.description.map((p, idx) => (
        <p key={idx} className="mb-2">
          {p}
        </p>
      ))}

      {room.content.tips?.length > 0 && (
        <>
          <h2 className="mt-4 font-semibold">Suggerimenti:</h2>
          <ul className="list-disc pl-6">
            {room.content.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-4">Durata: {room.duration} minuti</p>
      <p>Numero massimo di giocatori: {room.maxPlayers}</p>
    </>
  );
}
