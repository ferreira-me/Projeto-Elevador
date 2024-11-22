// src/components/Elevator.tsx
import React, { useEffect } from "react";
import Button from "./Button";
import useElevator from "../hooks/useElevator";
import "./../styles/Elevator.css";

const Elevator: React.FC = () => {
  const { elevator, addToQueue, moveElevator } = useElevator();
  const floors = [0, 1, 2, 3, 4]; // Andares do prédio

  useEffect(() => {
    // Inicia o movimento do elevador sempre que há um novo pedido na fila
    moveElevator();
  }, [elevator.queue.length, elevator.moving]);

  return (
    <div className="elevator-container">
      <div
        className="elevator"
        style={{
          transform: `translateY(-${elevator.currentFloor * 100}px)`,
        }}
      ></div>

      <div className="button-container">
        {floors.map((floor) => (
          <Button key={floor} floor={floor} onClick={addToQueue} />
        ))}
      </div>

      <p>Andar atual: {elevator.currentFloor}</p>
      <p>Fila de andares: {elevator.queue.head ? elevator.queue.head.value : "Vazia"}</p>
      {elevator.moving && <p>Elevador em movimento...</p>}
    </div>
  );
};

export default Elevator;
