const PA = (A, i, n) => {
  const val1 = Math.pow(1+i, n);
  const div = (val1-1)/(i*val1);
  const result = A * div;

  return result;
}

const AP = (P, i, n) => {
  const val1 = Math.pow(1+i, n);
  const div = (i*val1)/(val1-1);
  const result = P * div;

  return result;
}

const FA = (A, i, n) => {
  const val1 = Math.pow(1+i, n);
  const div = (val1 - 1) / i;
  const result = A * div;
  
  return result;
}

const AF = (F, i, n) => {
  const val1 = Math.pow(1+i, n);
  const div = i / (val1 - 1);
  const result = F * div;

  return result;
}

const PF = (F, i, n) => {
  const val1 = Math.pow(1+i, n);
  const div = 1/val1;
  const result = F * div;

  return result;
}

const FP = (P, i, n) => {
  const val1 = Math.pow(1+i, n);
  const result = P * val1;

  return result;
}

const mcd = (a, b) => {
  let tmp;
  while (b !== 0) {
    tmp = b;
      b = a % b;
      a = tmp;
  }
  return a;
};

const mcm = (a, b) => {
  return (a * b) / mcd(a, b);
};

const MCM = (arr) => {
  if(!Array.isArray(arr)) {return 0; }
  let result = 1;
  const sortedArr = arr.filter(x=> x !== '').sort();
  for (let n of sortedArr) {
    result = mcm(result, n);
  }
  return result;
}

const IEfec = (r, m) => {
  if(r === '' || m === '') {return 0;}
  return parseFloat((r/m).toFixed(6));
}

const IEfecAnual = (r, m) => {
  const iEfec = IEfec(r, m);
  const result = Math.pow(1+iEfec, m) - 1;

  return isNaN(result) ? 0 : parseFloat(result.toFixed(6));
}

const PresentValueFormula = (CI, A, Iea, MCM, VU, VS ) => {
  const steps = MCM/VU;

  let annuality = 0;
  for (let i = 1; i < steps; i++) {
    const n = VU * i;
    annuality += PF(-CI+VS, Iea, n);
  }
  const result = -CI + PA(A, Iea, MCM) + annuality + PF(VS, Iea, MCM);

  return result;
}

const FutureValueFormula = (CI, A, Iea, MCM, VU, VS ) => {
  const result = 0;
  return result;
}

const AnnualValueFormula = (CI, A, Iea, VU, VS ) => {
  const result = AP(-CI, Iea, VU) + A + AF(VS, Iea, VU);

  return result;
}



const getCurrency = (value) => {
  return new Intl.NumberFormat("es-DO", {style: "currency", currency: "DOP",  minimumFractionDigits: 6,
  maximumFractionDigits: 8}).format(value);
}

export {
  PA, 
  AP, 
  FA, 
  AF, 
  PF, 
  FP, 
  PresentValueFormula, 
  AnnualValueFormula,
  FutureValueFormula,
  MCM, 
  IEfec, 
  IEfecAnual,
  getCurrency
};