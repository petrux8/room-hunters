import { roomsContents } from "./rooms.content";

export const fallbackRooms = [
  {
    slug: "room-1",
    contentKey: "room-1",
  },
  {
    slug: "room-2",
    contentKey: "room-2",
  },
  {
    slug: "room-3",
    contentKey: "room-3",
  },
  {
    slug: "room-4",
    contentKey: "room-4",
  },
];

export function composeRoom(roomFromDb) {
  const content = roomsContents[roomFromDb.contentKey];

  if (!content) {
    throw new Error(
      `Contenuto mancante per contentKey: ${roomFromDb.contentKey}`
    );
  }

  return {
    roomId: roomFromDb.roomId ?? null, // Firestore
    slug: roomFromDb.slug,
    title: content.title,
    content,
    maxPlayers: roomFromDb.maxPlayers ?? null,
    duration: roomFromDb.duration ?? null,
    active: roomFromDb.active ?? true,
  };
}
