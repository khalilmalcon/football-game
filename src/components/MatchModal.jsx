import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useMatch } from "../context/MatchContext";
import { useMatchEngine } from "../game/matchEngine";

const MatchModal = () => {

  const { modal, setModal, matchStats, running, paused } = useMatch();
  const { startMatch } = useMatchEngine(); // Obtener la función para reanudar
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (modal.visible) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      gsap.to(overlayRef.current, {
        opacity: 1,
        backdropFilter: "blur(5px)",
        duration: 0.5,
      });
    }
  }, [modal.visible]);

  const closeModal = () => {
    setIsClosing(true);

    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 0.4,
      onComplete: () => {
        setModal({ visible: false, content: null });
        setIsClosing(false);

        // Reanudar el partido si el modal es del entretiempo o final
        if (modal.content === "entretiempo" || modal.content === "formacion") {
          startMatch();
        }
      },
    });

  };

  if (!modal.visible && !isClosing) return null; // No renderiza nada si el modal no está activo

   // Determina el texto del botón continuar
   const buttonText = paused
   ? "Reanudar Partido"
   : modal.content === "formacion"
   ? "Iniciar Partido"
   : "Continuar";

  return (
    <div className="match-modal" ref={overlayRef} onClick={closeModal}>
      <div
        className="match-modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {modal.content === "formacion" && (
          <>
            <h2 className="match-modal-title">El partido va a comenzar</h2>
          </>
        )}

        {(modal.content === "entretiempo" ||
          modal.content === "finalizado") && (
          <>
            <h2 className="match-modal-title">
              {modal.content === "entretiempo"
                ? "Final 1er Tiempo"
                : "Final del Partido"}
            </h2>
            <table className="stats-table">
              <tbody>
                <tr>
                  <td className="stats-table-value">{matchStats.goals.teamA}</td>
                  <td className="stats-table-stat">Goles</td>
                  <td className="stats-table-value">{matchStats.goals.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.shots.teamA}</td>
                  <td className="stats-table-stat">Remates</td>
                  <td className="stats-table-value">{matchStats.shots.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.shotsOnTarget.teamA}</td>
                  <td className="stats-table-stat">Al arco</td>
                  <td className="stats-table-value">{matchStats.shotsOnTarget.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.corners.teamA}</td>
                  <td className="stats-table-stat">Tiros de esquina</td>
                  <td className="stats-table-value">{matchStats.corners.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.offsides.teamA}</td>
                  <td className="stats-table-stat">Fueras de juego</td>
                  <td className="stats-table-value">{matchStats.offsides.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.passes.teamA}</td>
                  <td className="stats-table-stat">Pases</td>
                  <td className="stats-table-value">{matchStats.passes.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.completedPasses.teamA}</td>
                  <td className="stats-table-stat">Completados</td>
                  <td className="stats-table-value">{matchStats.completedPasses.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.fouls.teamA}</td>
                  <td className="stats-table-stat">Faltas</td>
                  <td className="stats-table-value">{matchStats.fouls.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.yellowCards.teamA}</td>
                  <td className="stats-table-stat">Tarjetas Amarillas</td>
                  <td className="stats-table-value">{matchStats.yellowCards.teamB}</td>
                </tr>
                <tr>
                  <td className="stats-table-value">{matchStats.redCards.teamA}</td>
                  <td className="stats-table-stat">Tarjetas Rojas</td>
                  <td className="stats-table-value">{matchStats.redCards.teamB}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        <button onClick={closeModal}>{buttonText}</button>
      </div>
    </div>
  );

}

export default MatchModal;
