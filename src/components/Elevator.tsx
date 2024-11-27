import React, { useEffect } from "react";
import Button from "./Button";
import useElevator from "../hooks/useElevator";
import "./../styles/Elevator.css";

const Elevator: React.FC = () => {
  const { elevator, addToQueue, moveElevator } = useElevator();
  const floors = [0, 1, 2, 3, 4]; // Lista de andares

  // Inicia o movimento quando a fila muda
  useEffect(() => {
    if (!elevator.moving && !elevator.paused) {
      moveElevator();
    }
  }, [elevator.queue, elevator.moving, elevator.paused, moveElevator]);

  return (
    <div className="alinhar">
      {/* Botões para selecionar os andares */}
      <div className="button-container">
        <div className="alinharbotao">
          {floors.map((floor) => (
            <Button key={floor} floor={floor} onClick={addToQueue} />
          ))}
        </div>
      </div>

      {/* Elevador */}
      <div className="elevator-container">
        <div
          className="elevator"
          style={{
            transform: `translateY(-${elevator.currentFloor * 126 + 4}px)`,
            backgroundImage:
              !elevator.moving || elevator.onTargetFloor
                ? "url('/dooropen.jpg')" // Porta aberta quando parado ou no alvo
                : "url('/doorclose.jpg')", // Porta fechada em movimento ou fora do alvo
          }}
        ></div>
      </div>

      {/* Informações sobre o estado do elevador */}
      <div className="block-floor">
        <p>Andar atual: {elevator.currentFloor}</p>
        <p>Fila de andares: {elevator.queue.join(", ") || "Vazia"}</p>
        {elevator.moving && <p>Elevador em movimento...</p>}
        {elevator.paused && <p>Elevador em pausa por 3 segundos...</p>}
      </div>
    </div>
  );
};

export default Elevator;
