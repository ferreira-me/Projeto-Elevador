// src/types/elevatorTypes.ts

export interface Elevator {
    currentFloor: number;
    queue: number[]; // Fila de andares solicitados
    direction: 'up' | 'down' | null; // Direção atual do elevador
    moving: boolean; // Estado de movimento do elevador
  }
  
  export interface ButtonProps {
    floor: number;
    onClick: (floor: number) => void;
  }
  