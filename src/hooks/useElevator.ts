// src/hooks/useElevator.ts
import { useState, useEffect } from "react";
import { MyNode, Queue } from "../utils/queue"; // Importa as classes MyNode e Queue

type Elevator = {
  currentFloor: number;
  queue: Queue<number>; // Agora a fila é um objeto Queue
  direction: "up" | "down" | null;
  moving: boolean;
};

const useElevator = () => {
  const [elevator, setElevator] = useState<Elevator>({
    currentFloor: 0,
    queue: new Queue<number>(), // Inicializa a fila vazia
    direction: null,
    moving: false,
  });

  const addToQueue = (floor: number) => {
    // Cria um novo nó para o andar e adiciona à fila
    const newNode = new MyNode(floor);
    elevator.queue.add(newNode); // Usa o método add da fila encadeada
    setElevator({ ...elevator }); // Atualiza o estado
  };

  const moveElevator = () => {
    if (elevator.queue.isEmpty() || elevator.moving) return;

    // Inicia o movimento do elevador
    const nextFloor = elevator.queue.head.value; // Pega o primeiro andar da fila
    let direction: "up" | "down" | null = null;

    if (nextFloor > elevator.currentFloor) {
      direction = "up";
    } else if (nextFloor < elevator.currentFloor) {
      direction = "down";
    }

    setElevator({
      ...elevator,
      direction,
      moving: true,
    });
  };

  useEffect(() => {
    if (!elevator.moving) return;

    const interval = setInterval(() => {
      const nextFloor = elevator.queue.head.value; // Primeiro andar da fila

      if (elevator.currentFloor === nextFloor) {
        // Remove o primeiro andar da fila
        elevator.queue.remove(); // Usa o método remove da fila encadeada

        setElevator((prev) => ({
          ...prev,
          currentFloor: nextFloor,
          moving: false,
          direction: null,
        }));
      } else {
        setElevator((prev) => ({
          ...prev,
          currentFloor: prev.direction === "up" ? prev.currentFloor + 1 : prev.currentFloor - 1,
        }));
      }
    }, 1000); // Atualiza a cada 1 segundo

    return () => clearInterval(interval);
  }, [elevator]);

  return { elevator, addToQueue, moveElevator };
};

export default useElevator;
