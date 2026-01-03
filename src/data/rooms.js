import { room1Content } from "./rooms/room-1";
import { room2Content } from "./rooms/room-2";
import { room3Content } from "./rooms/room-3";

export const rooms = [
  {
    id: "room-1",
    slug: "room-1",
    name: room1Content.title,
    content: room1Content,
  },
  {
    id: "room-2",
    slug: "room-2",
    name: room2Content.title,
    content: room2Content,
  },
  {
    id: "room-3",
    slug: "room-3",
    name: room3Content.title,
    content: room3Content,
  },
];
