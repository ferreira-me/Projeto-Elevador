import React from "react";


interface ButtonProps {
  floor: number;
  onClick: (floor: number) => void;
}

const Button: React.FC<ButtonProps> = ({ floor, onClick }) => {
  return (
  
      <button className="button" onClick={() => onClick(floor)}>
        Andar {floor}
      </button>

  );
};

export default Button;
