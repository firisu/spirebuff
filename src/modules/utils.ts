// dd.d% の文字列を返す
export const formatWinrate = (runs: number, victory: number) => {
  return Math.floor((victory * 1000) / runs) / 10 + " %";
};
