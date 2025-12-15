"use client"; // solo se usi hook lato client

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing-page">
      <section className="hero">
        <h1>Benvenuti nella nostra Escape Room</h1>
        <p>Vivi un’esperienza unica con amici e familiari!</p>
        <Link href="/login">
          <button className="btn btn-primary">Accedi / Prenota</button>
        </Link>
      </section>

      <section className="rooms-overview">
        <h2>Le nostre stanze</h2>
        <div className="rooms-list">
          <Link href="/room/1">
            <div className="room-card">La stanza dei misteri</div>
          </Link>
          <Link href="/room/2">
            <div className="room-card">La stanza dei segreti</div>
          </Link>
          <Link href="/room/3">
            <div className="room-card">La stanza del tempo</div>
          </Link>
        </div>
      </section>

      <section className="cta">
        <h2>Prenota ora la tua esperienza!</h2>
        <Link href="/login">
          <button className="btn btn-secondary">Prenota</button>
        </Link>
      </section>
    </main>
  );
}
