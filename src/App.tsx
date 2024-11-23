// src/App.tsx
import React from "react";
import Elevator from "./components/Elevator";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="elevator-title">Elevador Inteligente</h1>
      <Elevator />
    </div>
  );
};

export default App;
