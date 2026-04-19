export const calcEMI = (P, r, m) => {
  if (P <= 0 || m <= 0) return 0;
  const i = r / 12 / 100;
  return i === 0 ? P / m : (P * i * Math.pow(1 + i, m)) / (Math.pow(1 + i, m) - 1);
};
