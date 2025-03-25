import { gsap } from "gsap";

// Movimiento de un jugador hacia una posición específica
export function movePlayer(playerElement, x, y, duration = 1) {
    return new Promise((resolve) => {
        gsap.to(playerElement, {
            duration,
            left: `${x}%`,
            top: `${y}%`,
            ease: "power2.inOut",
            onComplete: resolve,
        });
    });
}

// Movimiento de la pelota hacia una posición específica
export function moveBall(ballElement, x, y, duration = 0.8) {
    return new Promise((resolve) => {
        gsap.to(ballElement, {
            duration,
            left: `${x}%`,
            top: `${y}%`,
            ease: "power2.out",
            onComplete: resolve,
        });
    });
}

// Pase de un jugador a otro
export async function passBall(fromPlayer, toPlayer, ballElement) {
    const { x, y } = getPosition(toPlayer);
    await moveBall(ballElement, x, y);
}

// Disparo al arco
export async function shootBall(ballElement, goalSide) {
    const goalPosition = goalSide === "left" ? { x: 5, y: 50 } : { x: 95, y: 50 };
    await moveBall(ballElement, goalPosition.x, goalPosition.y);
}

// Obtener posición actual de un elemento
export function getPosition(element) {
    return {
        x: parseFloat(element.style.left),
        y: parseFloat(element.style.top),
    };
}
