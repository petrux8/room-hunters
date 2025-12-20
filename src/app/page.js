"use client"; // solo se usi hook lato client

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing-page">
      <section>
        <h1>Benvenuti nella nostra Escape Room</h1>
        <p>Vivi un’esperienza unica con amici e familiari!</p>
        <Link href="/login">
          <button>Accedi / Prenota</button>
        </Link>
      </section>

      <section>
        <h2>Le nostre stanze</h2>
        <div>
          <Link href="/room/test">
            <div className="room-card">Room Test</div>
          </Link>
          <Link href="/room/test">
            <div className="room-card">Room Test</div>
          </Link>
          <Link href="/room/test">
            <div className="room-card">Room Test</div>
          </Link>
          <Link href="/room/test">
            <div className="room-card">Room Test</div>
          </Link>
        </div>
      </section>

      <section>
        <h2>Prenota ora la tua esperienza!</h2>
        <Link href="/login">
          <button>Prenota</button>
        </Link>
      </section>
    </main>
  );
}
