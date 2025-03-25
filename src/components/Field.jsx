import React, { useRef, useEffect } from "react";
import { teamA, teamB } from "../game/matchTeams";
import { gsap } from "gsap";

function Field() {

    /*
        Demo de animaciones dentro de la cancha
    */

    // Referencia a los elementos del DOM
    const playerARefs = useRef([]);
    const playerBRefs = useRef([]);
    const ballRef = useRef(null);

    // Función para obtener la posición de un elemento
    const getPosition = (element) => ({
        x: gsap.getProperty(element, "left"),
        y: gsap.getProperty(element, "top"),
    });

    const handlePlayerAction = () => {

        // Seleccionamos al jugador que va a interactuar con la pelota
        const player = teamA.players[9]; // Tomamos un jugador de equipo A
        const playerElement = playerARefs.current[9]; // Referencia al jugador
        const ballElement = ballRef.current; // Referencia a la pelota
        
        // Obtiene la posición de la pelota
        const ballPosition = getPosition(ballRef.current);

        // El jugador se mueve hacia la pelota
        gsap.to(playerElement, {
            duration: 1,
            left: `${ballPosition.x}%`,
            top: `${ballPosition.y}%`,
            ease: "power2.inOut",
            onComplete: () => {
                
                // Define las coordenadas del arco
                const goalPosition = { x: 100, y: 50 };

                // Dispara la pelota hacia el arco
                gsap.to(ballElement, {
                    duration: 1,
                    left: `${goalPosition.x}%`,
                    top: `${goalPosition.y}%`,
                    ease: "power2.out",
                    onComplete: () => {
                        console.log("¡Gol!");
                    }
                });
            }
        });
    };

    useEffect(() => {

        // Posiciona la pelota en el centro de la cancha
        gsap.set(ballRef.current, { left: "50%", top: "50%" });
      
        // Posiciona los jugadores del Equipo A
        teamA.players.forEach((player, index) => {
            gsap.set(playerARefs.current[index], { 
                left: `${player.x}%`, 
                top: `${player.y}%` 
            });
        });
      
        // Posiciona los jugadores del Equipo B
        teamB.players.forEach((player, index) => {
            gsap.set(playerBRefs.current[index], { 
                left: `${player.x}%`, 
                top: `${player.y}%` 
            });
        });
      
        handlePlayerAction();
      }, []);

    return (
        <>
            <div className="soccer-field">

                <div className="soccer-field-players">

                    <div className="soccer-field-ball" ref={ballRef}></div>

                    {teamA.players.map((player, index) => (
                        <div key={player.id} 
                        className="soccer-field-player player-local"
                        ref={(el) => (playerARefs.current[index] = el)} 
                        ></div>
                    ))}

                    {teamB.players.map((player, index) => (
                        <div key={player.id} 
                        className="soccer-field-player player-visitor"
                        ref={(el) => (playerBRefs.current[index] = el)} 
                        ></div>
                    ))}

                </div>
                
                <div className="soccer-field-limits">
                    <div className="goal left"></div>
                    <div className="goal right"></div>
                    <div className="center-circle"></div>
                    <div className="penalty-area left"></div>
                    <div className="penalty-area right"></div>
                    <div className="goal-box left"></div>
                    <div className="goal-box right"></div>
                    <div className="mid-line"></div>
                    <div className="corner top-left"></div>
                    <div className="corner top-right"></div>
                    <div className="corner bottom-left"></div>
                    <div className="corner bottom-right"></div>
                </div>
            </div>
        </>
    );
};

export default Field;
