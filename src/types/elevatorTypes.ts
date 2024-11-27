// src/types/elevatorTypes.ts

export interface Elevator {
  currentFloor: number;
  queue: number[];
  direction: "up" | "down" | null;
  moving: boolean;
  paused: boolean;
  onTargetFloor: boolean;
}

export interface ButtonProps {
  floor: number;
  onClick: (floor: number) => void;
}