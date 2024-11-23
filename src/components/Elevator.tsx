import React, { useEffect } from "react";
import Button from "./Button";
import useElevator from "../hooks/useElevator";
import "./../styles/Elevator.css";

const Elevator: React.FC = () => {
  const { elevator, addToQueue, moveElevator } = useElevator();
  const floors = [0, 1, 2, 3, 4]; // Lista de andares

  useEffect(() => {
    moveElevator(); // Inicia o movimento quando a fila muda
  }, [elevator.queue.length, elevator.moving, moveElevator]);

  return (
    <>
      <div className="alinhar">

        <div className="button-container">
          <div className="alinharbotao">
            {floors.map((floor) => (
              <Button key={floor} floor={floor} onClick={addToQueue} />
            ))}
          </div>
        </div>

        


        <div className="elevator-container">
          <div
            className="elevator"
            style={{
              transform: `translateY(-${elevator.currentFloor * 126 +4}px)`,
            }}
          ></div>
        </div>

        <div className="block-floor">
          <p>Andar atual: {elevator.currentFloor}</p>
          <p>Fila de andares: {elevator.queue.join(", ") || "Vazia"}</p>
          {elevator.moving && <p>Elevador em movimento...</p>}
        </div>


      </div>
    </>
  );
};

export default Elevator;
