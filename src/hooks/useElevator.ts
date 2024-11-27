import { useState, useEffect } from "react";
import { Queue, MyNode } from "../utils/queue"; // Importa a classe Queue
import { Elevator } from "../types/elevatorTypes";

const useElevator = () => {
  const [elevator, setElevator] = useState<Elevator>({
    currentFloor: 0,
    queue: [],
    direction: null,
    moving: false,
    paused: false,
    onTargetFloor: false,
  });

  // Adiciona um andar à fila
  const addToQueue = (floor: number) => {
    if (elevator.queue.includes(floor)) return; // Evita duplicatas na fila

    const updatedQueue = [...elevator.queue, floor];

    // Ordena a fila pelo andar mais próximo do atual
    updatedQueue.sort(
      (a, b) => Math.abs(a - elevator.currentFloor) - Math.abs(b - elevator.currentFloor)
    );

    setElevator((prev) => ({
      ...prev,
      queue: updatedQueue,
    }));
  };

  // Move o elevador
  const moveElevator = () => {
    if (elevator.queue.length === 0 || elevator.moving || elevator.paused) return;

    const nextFloor = elevator.queue[0]; // Pega o próximo andar
    const direction = nextFloor > elevator.currentFloor ? "up" : "down";

    setElevator((prev) => ({
      ...prev,
      direction,
      moving: true,
      onTargetFloor: false, // Reset ao começar o movimento
    }));
  };

  // Efeito que controla o movimento do elevador
  useEffect(() => {
    if (!elevator.moving || elevator.paused) return;

    const interval = setInterval(() => {
      const nextFloor = elevator.queue[0];

      if (elevator.currentFloor === nextFloor) {
        // Chegou ao andar, entra em pausa
        setElevator((prev) => ({
          ...prev,
          paused: true, // Marca como pausado
          onTargetFloor: true, // Está no andar alvo
        }));

        setTimeout(() => {
          setElevator((prev) => ({
            ...prev,
            queue: prev.queue.slice(1), // Remove o andar visitado
            moving: false, // Para o movimento
            direction: null, // Reseta a direção
            paused: false, // Sai do estado de pausa
            onTargetFloor: false, // Reset após pausa
          }));
        }, 3000); // Pausa de 3 segundos

        clearInterval(interval); // Para o movimento ao alcançar o andar
      } else {
        // Continua o movimento
        setElevator((prev) => ({
          ...prev,
          currentFloor:
            prev.direction === "up" ? prev.currentFloor + 1 : prev.currentFloor - 1,
        }));
      }
    }, 1000); // Move um andar por segundo

    return () => clearInterval(interval);
  }, [elevator]);

  return { elevator, addToQueue, moveElevator };
};

export default useElevator;
