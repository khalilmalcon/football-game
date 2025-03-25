export const eventFlow = {
  // Eventos de inserción forzada
  "inicio": [
    "saque inicial"
  ],
  "saque inicial": [
    "pase"
  ],
  "final primer tiempo": [
    "inicio segundo tiempo"
  ],
  "inicio segundo tiempo": [
    "saque segundo tiempo"
  ],
  "saque segundo tiempo": [
    "pase"
  ],
  "final partido": [
    "inicio"
  ],
  
  // Eventos de flujo
  "pase": [
    "avance", 
    "pase completado", 
    "pérdida de balón", 
    "falta", "tiro a puerta"
  ],
  "pase completado": [
    "avance", 
    "tiro a puerta"
  ],
  "avance": [
    "pérdida de balón", 
    "falta", 
    "pase"
  ],
  "tiro a puerta": [
    "gol", 
    "tiro desviado", 
    "tiro al poste", 
    "parada del portero",
    "corner"
  ],
  "tiro al poste": [
    "rebote", 
    "saque de meta"
  ],
  "gol": [
    "saque de centro"
  ],
  "saque de centro": [
    "pase", 
    "pérdida de balón", 
    "falta"
  ],
  "tiro desviado": [
    "saque de meta", 
    "corner"
  ],
  "saque de meta": [
    "pase", 
    "contraataque", 
    "falta"
  ],
  "corner": [
    "gol", 
    "saque de meta", 
    "pérdida de balón"
  ],
  "pérdida de balón": [
    "pase", 
    "contraataque", 
    "falta"
  ],
  "contraataque": [
    "pase", 
    "tiro a puerta", 
    "pérdida de balón"
  ],
  "rebote": [
    "pase", 
    "tiro a puerta", 
    "pérdida de balón"
  ],
  "falta": [
    "tiro libre directo", 
    "tiro libre indirecto", 
    "tarjeta amarilla", 
    "tarjeta roja"
  ],
  "tiro libre directo": [
    "gol", 
    "tiro desviado", 
    "parada del portero", 
    "rebote"
  ],
  "tiro libre indirecto": [
    "pase", 
    "pérdida de balón", 
    "falta"
  ],
  "tarjeta amarilla": [
    "continuación del juego", 
    "segunda amarilla"
  ],
  "continuación del juego": [
    "pase", 
    "pérdida de balón", 
    "falta"
  ],
  "segunda amarilla": [
    "expulsión"
  ],
  "tarjeta roja": [
    "expulsión"
  ],
  "expulsión": [
    "tiro libre indirecto"
  ],
  "parada del portero": [
    "saque de meta", 
    "rebote", 
    "corner"
  ],
  
  // Eventos desconectados
  "penalti": [
    "gol", 
    "penalti fallado", 
    "penalti atajado"
  ],
  "penalti fallado": [
    "saque de meta", 
    "rebote"
  ],
  "penalti atajado": [
    "rebote", 
    "pérdida de balón"
  ],
  "fuera de juego": [
    "tiro libre indirecto"
  ]
};

export const eventDescriptions = {
  "inicio": (team) => `¡Comienza el partido! ${team} tiene la posesión.`,
  "saque inicial": (team) => `${team} mueve el balón desde el centro del campo.`,
  "final primer tiempo": () => "El árbitro señala el final del primer tiempo.",
  "inicio segundo tiempo": (team) => `Comienza la segunda mitad, ${team} tiene el balón.`,
  "saque segundo tiempo": (team) => `El árbitro pita y ${team} mueve el balón en el segundo tiempo.`,
  "final partido": () => "¡Final del partido! Gran espectáculo futbolístico.",

  "pase": (team) => `Un pase preciso de ${team} en el mediocampo.`,
  "pase completado": (team) => `¡Pase completo de ${team}!`,
  "avance": (team) => `${team} avanza con el balón hacia el área.`,
  "tiro a puerta": (team) => `¡${team} dispara con potencia hacia la portería!`,
  "gol": (team) => `¡GOOOOL de ${team}! ¡Qué definición!`,
  "saque de centro": (team) => `${team} pone el balón en juego tras el gol.`,
  "tiro desviado": (team) => `El disparo de ${team} se va por encima del arco.`,
  "tiro al poste": (team) => `¡El disparo de ${team} pega en el poste y sigue en juego!`,
  "parada del portero": (team) => `¡El arquero de ${team} hace una atajada espectacular!`,
  "saque de meta": (team) => `El arquero de ${team} pondrá el balón en juego desde el área.`,
  "corner": (team) => `La pelota rebota y y es corner a favor de ${team}!`,
  "pérdida de balón": (team) => `¡${team} pierde el balón!`,
  "contraataque": (team) => `¡Rápido contraataque de ${team}!`,
  "rebote": (team) => `El balón queda suelto tras el impacto, ${team} busca recuperarlo.`,
  "falta": (team) => `¡Falta de ${team}! El árbitro pita infracción.`,
  "tiro libre directo": (team) => `${team} tiene una gran oportunidad con este tiro libre directo.`,
  "tiro libre indirecto": (team) => `Tiro libre indirecto para ${team}, deben tocar el balón antes de disparar.`,
  "tarjeta amarilla": (team) => `¡Tarjeta amarilla para un jugador de ${team}!`,
  "segunda amarilla": (team) => `¡Segunda amarilla para ${team}! El jugador es expulsado.`,
  "tarjeta roja": (team) => `¡Tarjeta roja directa para un jugador de ${team}!`,
  "expulsión": (team) => `¡${team} se queda con un jugador menos tras la expulsión!`,
  "continuación del juego": () => `El partido sigue con normalidad.`,

  "penalti": (team) => `¡Penalti para ${team}!`,
  "penalti fallado": (team) => `¡Increíble! El penalti de ${team} se ha ido desviado.`,
  "penalti atajado": (team) => `¡Gran parada del portero de ${team} en el penalti!`,
  "fuera de juego": (team) => `${team} quedó en posición adelantada.`
};
