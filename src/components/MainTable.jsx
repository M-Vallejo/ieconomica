import { useState } from "react";
import "../App.css";
import { MCM, IEfec, IEfecAnual, PresentValueFormula, getCurrency, FutureValueFormula, AnnualValueFormula, PF, PA, AP, AF } from "../services/functions";

const MainTable = () => {
  const [cols, setCols] = useState([
    // [30000,6000,3000,15000, 10,0,0],
    // [15000,6000,1500,500, 10,0,0],
    // [5000,6000,5000,1000, 5,0,0],
  ]);
  const [config, setConfig] = useState({
    r: "",
    m: "",
  });

  const editCell = (col, row, value) => {
    const tmpCols = [...cols];
    const rows = [...tmpCols[col]];
    rows[row] = value;
    tmpCols[col] = rows;
    setCols(tmpCols);
  };

  const getInput = (col, row) => {
    const name = `row_${row}_col_${col}`;
    const workingCol = cols[col];
    const workingInput = workingCol[row];

    const handleInputChange = (e) => {
      editCell(col, row, e.target.value);
    };

    return (
      <input
        value={col}
        name={name}
        onChange={handleInputChange}
        value={workingInput}
      ></input>
    );
  };

  const addColumn = () => {
    let tmpCols = [...cols];
    tmpCols.push(["", "", "", "", "", "", ""]);
    setCols(tmpCols);
  };

  const removeCol = (col) => {
    let tmpCols = [...cols];
    tmpCols.splice(col, 1);
    setCols(tmpCols);
  };

  const getMCM = ()=> {
    return MCM(cols.map((col) => col[4]));
  }

  const getFormattedFields = (value) => {
    let CI = value[0];
    let A = value[1] - value[2];
    const Iea = IEfecAnual(config.r, config.m);
    const MCM = getMCM();
    let VS = value[3];
    let VU = value[4];

    CI = CI === '' ? 0 : parseFloat(CI);
    A = A === '' ? 0 : parseFloat(A);
    VS = VS === '' ? 0 : parseFloat(VS);
    VU = VU === '' ? 1 : parseFloat(VU);
    return {
      CI,
      A,
      Iea,
      MCM,
      VU,
      VS
    }
  }

  const getPresentValue = (value) => {
    const { CI, A, Iea, MCM, VU, VS } = getFormattedFields(value);
    const result = PresentValueFormula(CI, A, Iea, MCM, VU, VS);

    return result;
  };

  const getAnnualValue = (value) => {
    const { CI, A, Iea, VU, VS } = getFormattedFields(value);
    const result = AnnualValueFormula(CI, A, Iea, VU, VS);

    return result;
  };

  const getFutureValue = (value) => {
    const { CI, A, Iea, MCM, VU, VS } = getFormattedFields(value);
    const result = FutureValueFormula(CI, A, Iea, MCM, VU, VS);

    return result;
  };

  return (
    <div>
      <h3>Calcular alternativas</h3>
      <div>
        <table>
          <tbody>
          <tr>
            <td>Interes nominal (r) (decimal)</td>
            <td>
              <input
                value={config.r}
                onChange={(e) => {
                  setConfig({ ...config, r: e.target.value });
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Período composición (m)</td>
            <td>
              <input
                value={config.m}
                onChange={(e) => {
                  setConfig({ ...config, m: e.target.value });
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <b>Interes efectio (i)</b>
            </td>
            <td>{IEfec(config.r, config.m)}</td>
          </tr>
          <tr>
            <td>
              <b>Interes efectio anual (ia)</b>
            </td>
            <td>{IEfecAnual(config.r, config.m)}</td>
          </tr>
          <tr>
            <td>
              <b>MCM</b>
            </td>
            <td>{getMCM()}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <br />
      <button onClick={addColumn}>Agregar columna</button>
      <table>
        <thead>
          <tr>
            <th></th>
            {cols.map((value, i) => (
              <th key={i}>
                <button
                  onClick={() => {
                    removeCol(i);
                  }}
                >
                  Eliminar columna
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alternativas</td>
            {cols.map((value, i) => (
              <td key={i}>Alternativa {i + 1}</td>
            ))}
          </tr>
          <tr>
            <td>Costo inicial</td>
            {cols.map((value, i) => (
              <td key={i}>{getInput(i, 0)}</td>
            ))}
          </tr>
          <tr>
            <td>Igresos anuales</td>
            {cols.map((value, i) => (
              <td key={i}>{getInput(i, 1)}</td>
            ))}
          </tr>
          <tr>
            <td>Gastos anuales</td>
            {cols.map((value, i) => (
              <td key={i}>{getInput(i, 2)}</td>
            ))}
          </tr>
          <tr>
            <td>Valor de salvamento</td>
            {cols.map((value, i) => (
              <td key={i}>{getInput(i, 3)}</td>
            ))}
          </tr>
          <tr>
            <td>Vida Útil anual</td>
            {cols.map((value, i) => (
              <td key={i}>{getInput(i, 4)}</td>
            ))}
          </tr>
          <tr>
            <td>
              <b>MCM</b>
            </td>
            <td style={{ textAlign: "center" }} colSpan={cols.length}>
              {getMCM()}
            </td>
          </tr>
          <tr>
            <td><b>Valor presente</b></td>
            {cols.map((value, i) => (
              <td key={i}>{getCurrency(getPresentValue(value))}</td>
            ))}
          </tr>
          <tr>
            <td><b>Valor anual</b></td>
            {cols.map((value, i) => (
              <td key={i}>{getCurrency(getAnnualValue(value))}</td>
            ))}
          </tr>
          <tr>
            <td><b>Valor futuro</b></td>
            {cols.map((value, i) => (
              <td key={i}>{getCurrency(getFutureValue(value))}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <br/>
      <div>
        {cols.map((col, i)=> 
          {
            const fields = getFormattedFields(col);
            return (
              <>
                <b>Alternativa {i+1}</b>
                <div>
                  <span>VP = </span>
                  <span>{getCurrency(-fields.CI)}</span>
                  <span>+ ({getCurrency(PA(fields.A, fields.Iea, fields.MCM))}) </span>
                  {(Array.apply(0, Array((fields.MCM/fields.VU)-1)).map(() => 1)).map((x, i) => 
                    <span key={i}>+ ({getCurrency(PF(-fields.CI + fields.VS, fields.Iea, (fields.VU*(i+1))))}) </span>
                  )}
                  <span> +({getCurrency(PF(fields.VS, fields.Iea, fields.MCM))})</span>
                  <span> = <b>{getCurrency(getPresentValue(col))}</b></span>
                </div>
                
                <div>
                  <span>VA = </span>
                  <span>{getCurrency(AP(-fields.CI, fields.Iea, fields.VU))}</span>
                  <span> + ({fields.A})</span>
                  <span>+ ({getCurrency(AF(fields.VS, fields.Iea, fields.VU))})</span>
                  <span> = <b>{getCurrency(getAnnualValue(col))}</b></span>
                </div>
                <br/>
              </>
            )
          }
        )}
      </div>
    </div>
  );
};

export default MainTable;
