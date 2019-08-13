// dd.d% の文字列を返す
export const formatWinrate = (runs: number, victory: number) => {
  if (runs === 0) return "0 %";
  return Math.floor((victory * 1000) / runs) / 10 + " %";
};
