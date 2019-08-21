const fs = require("fs");
const path = require("path");

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

// ベース events.json を読み込む
const eventsJsonPath = path.join(process.cwd(), "src", "data", "events.json");
const eventsJson = JSON.parse(
  fs.readFileSync(eventsJsonPath, { encoding: "utf-8" }).toString()
);

// データから除外するイベント
const excludeKeys = [
  "Dead Adventurer" // 回数が変化するので統計に出しようがない
];

//  ゲームアーカイブから logMetric*() を検索し、イベント名とプレイヤーチョイスを抽出する
const walkDir = dir => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullpath = path.join(dir, file);
    const stat = fs.statSync(fullpath);
    if (stat && stat.isDirectory()) {
      walkDir(fullpath);
    } else {
      const java = fs.readFileSync(fullpath, { encoding: "utf-8" }).toString();
      const regex = new RegExp(
        'logMetric([^(]+)?\\("([^"]+)"(?:, "([^"]+)")?',
        "g"
      );

      let result;
      while ((result = regex.exec(java)) !== null) {
        const [, suffix, key, choice] = result;

        // 無視するイベント
        if (excludeKeys.includes(key)) {
          continue;
        }

        if (suffix === "Ignored") {
          addEventChoice(key, "Ignored");
        } else {
          if (choice) {
            addEventChoice(key, choice);
          }
        }
      }
    }
  });
};

const addEventChoice = (key, choice) => {
  if (eventsJson[key] === undefined) {
    eventsJson[key] = { choices: [] };
  }

  if (!eventsJson[key].choices.includes(choice)) {
    eventsJson[key].choices.push(choice);
  }
};

// 抽出する
const eventJavaDir = path.join(root, "com", "megacrit", "cardcrawl", "events");
walkDir(eventJavaDir);

// 保存する
const eventsString = JSON.stringify(eventsJson, null, 2);
fs.writeFileSync(eventsJsonPath, eventsString);
