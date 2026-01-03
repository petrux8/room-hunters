import { rooms } from "@/data/rooms";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export default async function RoomPage({ params }) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) return <p>Stanza non trovata</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{room.content.title}</h1>
      {room.content.description.map((p, idx) => (
        <p key={idx} className="mb-2">
          {p}
        </p>
      ))}
      <h2 className="mt-4 font-semibold">Suggerimenti:</h2>
      <ul className="list-disc pl-6">
        {room.content.tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
      <p className="mt-4">Durata: {room.content.duration} minuti</p>
      <p>Numero massimo di giocatori: {room.content.maxPlayers}</p>
    </div>
  );
}
