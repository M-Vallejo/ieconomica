import { useState } from "react";
import { AF, AP, FA, FP, getCurrency, PA, PF } from "../services/functions";

const Factor = ({label, text, formula}) => {

  const [state, setState] = useState({
    v: '',
    i: '',
    n: ''
  });

  const handleFormChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const getValue = () => {
    const v = state.v === '' ? 0 : parseFloat(state.v);
    const i = state.i === '' ? 0 : parseFloat(state.i);
    const n = state.n === '' ? 0 : parseFloat(state.n);

    const result = formula(v, i, n);
    return isNaN(result) ? 0 : result;
  }

  return (
    <div>
    <label><b>{label}</b></label>
      <input name="v" value={state.v} placeholder={text} onChange={handleFormChange}/>
      <input name="i" value={state.i} placeholder="Int. efe. anual (decimal)" onChange={handleFormChange}/>
      <input name="n" value={state.n} placeholder="Período" onChange={handleFormChange}/>
      <b>={getCurrency(getValue())}</b>
    </div>
  );
}

function Factors() {
  return (
    <div>
      <h4>Valor presente</h4>
      <Factor label="PA: " text="Anualidad" formula={PA}/>
      <Factor label="PF: " text="Futuro" formula={PF}/>

      <h4>Valor anual</h4>
      <Factor label="AP: " text="Presente" formula={AP}/>
      <Factor label="AF: " text="Futuro" formula={AF}/>

      <h4>Valor futuro</h4>
      <Factor label="FA: " text="Anualidad" formula={FA}/>
      <Factor label="FP: " text="Presente" formula={FP}/>
    </div>
  )
}

export default Factors
