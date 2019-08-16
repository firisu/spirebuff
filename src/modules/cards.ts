// カードのフルネームを渡して短い名称とアップグレード済みかを見る
export const parseCardName = (fullname: string): [string, number] => {
  const regex = /([^+]+)(?:\+(\d+))?/;
  const match = fullname.match(regex);

  if (match) {
    const [, name, upgrade] = match;
    const upgradeNum = upgrade === undefined ? 0 : Number(upgrade);
    return [name, upgradeNum];
  } else {
    return ["Error Card", 0];
  }
};
