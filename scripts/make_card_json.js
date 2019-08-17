const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const root = process.env.STS_ARCHIVE_ROOT;
if (!root) {
  throw new Error(
    "STS_ARCHIVE_ROOT にゲームアーカイブのルートを設定してください。"
  );
}
try {
  fs.statSync(root);
} catch (e) {
  throw new Error("ゲームアーカイブのルートが見つかりませんでした。");
}

// 雛形となる cards.json を読み込む
const cardJsonPath = path.join(root, "localization", "eng", "cards.json");
try {
  fs.statSync(cardJsonPath);
} catch (e) {
  throw new Error("cards.json が見つかりませんでした。");
}
const cardJson = JSON.parse(
  fs.readFileSync(cardJsonPath, { encoding: "utf-8" }).toString()
);

// カードの *.java ファイルを一つずつ読み込む
const cardJavaRoot = path.join(root, "com", "megacrit", "cardcrawl", "cards");

// Java ファイルからカードのデータを抜き出す
fs.readdirSync(cardJavaRoot).forEach(file => {
  const cardJavaDir = path.join(cardJavaRoot, file);
  const stat = fs.statSync(cardJavaDir);
  if (stat && stat.isDirectory()) {
    // 各カラー（あるいはステータス）の中にあるファイルを読み込む
    fs.readdirSync(cardJavaDir).forEach(file => {
      const javaPath = path.join(cardJavaDir, file);
      const javaString = fs
        .readFileSync(javaPath, { encoding: "utf-8" })
        .toString();

      const [, id] = javaString.match(/getCardStrings\("(.+)"\)/);
      const [, cardType] = javaString.match(/AbstractCard\.CardType\.(.+?)\b/);
      const [, cardColor] = javaString.match(
        /AbstractCard\.CardColor\.(.+?)\b/
      );
      const [, cardRarity] = javaString.match(
        /AbstractCard\.CardRarity\.(.+?)\b/
      );
      const [, cardTarget] = javaString.match(
        /AbstractCard\.CardTarget\.(.+?)\b/
      );

      if (cardJson[id] === undefined) {
        console.log(
          id,
          cardType,
          cardColor,
          cardRarity,
          cardTarget,
          "のJSONキーが見つかりませんでした"
        );
        return;
      } else {
        cardJson[id] = {
          type: cardType,
          color: cardColor,
          rarity: cardRarity,
          target: cardTarget
        };
      }
    });
  }
});

// JSON上にしか存在しないデータは全部消しておく
const filteredJson = _.pickBy(cardJson, (v, k) => v.NAME === undefined);

// 一応キーでソート
const finalJson = {};
Object.keys(filteredJson)
  .sort()
  .forEach(key => {
    finalJson[key] = filteredJson[key];
  });

// 作成したファイルを保存
const targetPath = path.join(process.cwd(), "src", "data", "cards.json");
const targetString = JSON.stringify(finalJson, null, 2);
fs.writeFileSync(targetPath, targetString);
