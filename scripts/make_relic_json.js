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
const relicsJsonPath = path.join(root, "localization", "eng", "relics.json");
try {
  fs.statSync(relicsJsonPath);
} catch (e) {
  throw new Error("relics.json が見つかりませんでした。");
}
const relicsJson = JSON.parse(
  fs.readFileSync(relicsJsonPath, { encoding: "utf-8" }).toString()
);

// カードの *.java ファイルを一つずつ読み込む
const relicJavaRoot = path.join(root, "com", "megacrit", "cardcrawl", "relics");

// Java ファイルからカードのデータを抜き出す
fs.readdirSync(relicJavaRoot).forEach(file => {
  const javaPath = path.join(relicJavaRoot, file);
  const stat = fs.statSync(javaPath);
  if (stat.isDirectory()) {
    return;
  }

  const javaString = fs
    .readFileSync(javaPath, { encoding: "utf-8" })
    .toString();

  const matchId = javaString.match(/ID = "(.+)"/);
  if (!matchId) {
    console.log(file, "からIDが見つかりませんでした");
    return;
  }
  const id = matchId[1];

  const matchTier = javaString.match(/AbstractRelic\.RelicTier\.(.+?)\b/);
  if (!matchTier) {
    console.log(file, "からTierが見つかりませんでした");
    return;
  }
  const relicTier = matchTier[1];

  if (relicsJson[id] === undefined) {
    console.log(id, "のJSONキーが見つかりませんでした");
    return;
  } else {
    relicsJson[id] = {
      tier: relicTier
    };
  }
});

// JSON上にしか存在しないデータは全部消しておく
const filteredJson = _.pickBy(relicsJson, v => v.NAME === undefined);

// 一応キーでソート
const finalJson = {};
Object.keys(filteredJson)
  .sort()
  .forEach(key => {
    finalJson[key] = filteredJson[key];
  });

// 作成したファイルを保存
const targetPath = path.join(process.cwd(), "src", "data", "relics.json");
const targetString = JSON.stringify(finalJson, null, 2);
fs.writeFileSync(targetPath, targetString);
