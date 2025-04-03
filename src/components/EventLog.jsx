import React, { useEffect, useRef } from "react";
import useMatchStore from "../game/matchStore";
import { gsap } from "gsap";

const EventLog = () => {
  
  const { matchId, events } = useMatchStore();

  const eventListRef = useRef(null);
  const lastEventRef = useRef(null);
  const prevEventsLengthRef = useRef(0);

  useEffect(() => {

    // Si no hay eventos, no hacer nada
    if (!events.length) return;

    // Reiniciar el contador de eventos al comenzar un nuevo partido
    if (prevEventsLengthRef.current > events.length) prevEventsLengthRef.current = 0;

    const lastEvent = lastEventRef.current;

    // Animación del nuevo evento (fade-in y escala)
    if (lastEvent) {
        gsap.from(
          lastEvent,
          { opacity: 0, y: -36, scale: 1.1, duration: 0.5, ease: "power2.out", clearProps: "all" }
        );
      }

    // Animación de los eventos previos (desplazar abajo)
    if (eventListRef.current &&events.length > prevEventsLengthRef.current) {
      const previousEvents = eventListRef.current.querySelectorAll(
        ".match-events-event:not(:first-child)"
      );

      if (previousEvents.length > 0) {
        gsap.from(
          previousEvents,
          { y: -36, duration: 0.5, ease: "power2.out", clearProps: "transform" }
        );
      }
    }

    prevEventsLengthRef.current = events.length;
  }, [events]);

  return (
    <div className="match-events" ref={eventListRef} key={matchId}>
      {events.map((event, index) => (
      <div key={index} className="match-events-event" ref={index === 0 ? lastEventRef : null} >
        <div className="match-events-event-time">{event.time}</div>
          <div className="match-events-event-text">
            <p>{event.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventLog;
