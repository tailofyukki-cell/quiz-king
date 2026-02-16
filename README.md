# クイズ王 - 4択クイズアプリ

ブラウザで遊べる一般教養クイズアプリです。

## 🌐 プレイする

**公開URL**: https://tailofyukki-cell.github.io/quiz-king/

## 🎯 特徴

- **3つの難易度**: Easy/Normal/Hardから選択可能
- **問題数選択**: 10/20/30問から選択可能
- **ゲームショー風デザイン**: スポットライト効果とネオングロー
- **詳しい解説付き**: 各問題に豆知識を掲載
- **ランクシステム**: 正答率に応じてランク判定

## 📚 問題データ

現在30問を収録（Easy/Normal/Hard各10問）

### カテゴリ
- 地理
- 科学
- 歴史
- 一般常識
- スポーツ
- 文学・芸術

## 🎮 遊び方

1. トップ画面で難易度と問題数を選択
2. 「START QUIZ」ボタンをクリック
3. 4つの選択肢から正解を選んでクリック
4. 解説を読んで「NEXT QUESTION」で次の問題へ
5. 全問終了後、結果とランクが表示されます

## 🏆 ランクシステム

- **S**: 90%以上
- **A**: 80%以上
- **B**: 70%以上
- **C**: 60%以上
- **D**: 60%未満

## 🛠️ 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: カスタムプロパティ、アニメーション
- **Vanilla JavaScript**: フレームワーク不使用

## 📝 問題データの追加方法

`questions.json`ファイルに以下の形式で問題を追加できます：

```json
{
  "id": 31,
  "difficulty": "Normal",
  "category": "科学",
  "question": "問題文",
  "choices": ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
  "answerIndex": 1,
  "explanation": "解説文"
}
```

### フィールド説明
- `id`: 問題の一意なID（数値）
- `difficulty`: 難易度（"Easy", "Normal", "Hard"）
- `category`: カテゴリ名
- `question`: 問題文
- `choices`: 4つの選択肢の配列
- `answerIndex`: 正解のインデックス（0-3）
- `explanation`: 解説文

## 📄 ライセンス

MIT License

## 🔗 リポジトリ

https://github.com/tailofyukki-cell/quiz-king
