import { useCallback, useState } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";


function App() {
  const particlesInit = useCallback(main => {
    loadFull(main);
  }, [])


  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const operazioni = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (operazioni.includes(value) && calc === "") ||
      (operazioni.includes(value) && operazioni.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);
    if (!operazioni.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const createNumeri = () => {
    const numeri = [];

    for (let i = 1; i < 10; i++) {
      numeri.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return numeri;
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc == "") {
      return;
    }

    const value = calc.slice(0, -1);

    setCalc(value);
  };

  return (
    <div className="App">
      <Particles options={particlesOptions} init={particlesInit} />
      <div className="calcolatori">
        <div className="display">
          {result ? <span>({result})</span> : ""}&nbsp;
          {calc || "0"}
        </div>

        <div className="operatori">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={deleteLast}>C</button>
        </div>

        <div className="numeri">
          {createNumeri()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
