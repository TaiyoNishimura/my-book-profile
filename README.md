# インセプションデッキ
## インセプションデッキの目的
インセプションデッキは本来、

> プロジェクトを核心まで煮詰めて抽出した共通理解を、開発チームだけじゃなく、より広範囲なプロジェクト関係者全員（いわゆるプロジェクトコミュニティ）へ手軽に伝えるためのツール
> 
> ー「アジャイルサムライ」 47p

である。

このプロジェクトは個人開発であるため、以下の目的でインセプションデッキを作成する
- 将来の自分とコーディングエージェントに、プロジェクトの背景、目的、スコープを伝え、
  必要に応じて見直すため
- このプロジェクトを続けるべきか、やめるべきかの判断に用いるため
- プロジェクトのリスクを出来るだけ把握するため



## 我々はなぜここにいるのか？

- 自分が読んだ本と当時のコンテキストを元に、外部の人に自分の考えや大切にしていることを知ってもらうため
- コンテキストを踏まえて本を誰かにオススメするため

- ソフトウェア開発のノウハウを学ぶため

---

## 概要

自分が読んだ本を記録し、表紙画像・感想・メモとともにプロフィールページとして公開するサイト。
GitHub Pages でホスティングし、データは JSON ファイルで管理する。

## 技術スタック

| 項目 | 選定 | 理由 |
|------|------|------|
| フレームワーク | **React**（Vite） | 学習需要が高く、コンポーネント設計を学べる |
| スタイリング | **CSS Modules** or **Tailwind CSS** | スコープが明確で管理しやすい |
| データ管理 | **JSON ファイル**（`public/data/books.json`） | DB不要、Git管理できる |
| 表紙画像 | **Google Books API**（ISBN → 画像URL） | 無料、APIキー不要で始められる |
| ホスティング | **GitHub Pages** | 無料、`gh-pages` パッケージで簡単デプロイ |
| ビルドツール | **Vite** | 高速、設定が少ない |

---

## データ設計

### books.json

```json
[
  {
    "id": "1",
    "title": "リーダブルコード",
    "author": "Dustin Boswell",
    "isbn": "9784873115658",
    "readDate": "2024-08-15",
    "rating": 5,
    "tags": ["技術書", "プログラミング"],
    "memo": "変数名の付け方が実務で即役立った。チーム全員に勧めたい一冊。",
    "coverUrl": ""
  }
]
```

**フィールド説明:**

- `id` — 一意のID（連番 or UUID）
- `title` — 書名
- `author` — 著者名
- `isbn` — ISBN（Google Books APIで表紙取得に使用）
- `readDate` — 読了日（年表表示の並び順に使用）
- `rating` — 5段階評価（1〜5）
- `tags` — 分類タグ（複数可）
- `memo` — 感想・メモ（自由記述）
- `coverUrl` — 手動で画像URLを指定したい場合（空なら ISBN から自動取得）

---

## 画面構成（MVP）

### 1. メインページ（`/`）
- ヘッダー：自己紹介（名前、一言）
- 統計エリア：読了冊数、今年の冊数
- 本の一覧：カード形式で表紙＋タイトル＋評価を表示
- フィルター：タグでの絞り込み

### 2. 本の詳細（モーダル or 展開）
- 表紙画像（大）
- 書名・著者・読了日
- 星評価
- 感想メモ

---

## ディレクトリ構成

```
book-profile/
├── public/
│   └── data/
│       └── books.json          ← 本のデータ
├── src/
│   ├── components/
│   │   ├── BookCard.jsx        ← 本のカード（表紙・タイトル・星）
│   │   ├── BookDetail.jsx      ← 詳細モーダル
│   │   ├── BookList.jsx        ← カード一覧＋フィルター
│   │   ├── Header.jsx          ← 自己紹介ヘッダー
│   │   └── Stats.jsx           ← 統計表示
│   ├── hooks/
│   │   └── useBooks.js         ← データ取得・フィルタリングロジック
│   ├── utils/
│   │   └── googleBooks.js      ← ISBN → 表紙URL 変換
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## 開発ステップ（推奨順序）

### Phase 1: 最小版（1〜2日）
1. Vite + React プロジェクト作成
2. `books.json` にサンプルデータ 3〜5冊入れる
3. `BookCard` コンポーネントで表紙＋タイトル表示
4. `BookList` で一覧表示
5. GitHub Pages にデプロイ → **ここで一旦公開！**

### Phase 2: 機能追加（3〜5日）
6. Google Books API で表紙画像を自動取得
7. 星評価の表示
8. 感想メモの表示（詳細モーダル）
9. タグフィルター

### Phase 3: 見た目を磨く（2〜3日）
10. レスポンシブ対応
11. アニメーション追加
12. OGP設定（SNSシェア用）

### Phase 4: 将来の拡張（お好みで）
- 年表形式の表示（タイムライン UI）
- 読書統計グラフ（月ごとの冊数など）
- ISBNバーコードスキャン
- ダークモード

---

## コマンドチートシート

```bash
# プロジェクト作成
npm create vite@latest book-profile -- --template react

# 開発サーバー起動
cd book-profile
npm install
npm run dev

# GitHub Pages デプロイ用パッケージ
npm install --save-dev gh-pages

# package.json に追加するスクリプト
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# デプロイ実行
npm run deploy
```

---

## Google Books API の使い方

```javascript
// ISBN から表紙画像URLを取得（APIキー不要）
const getCoverUrl = async (isbn) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  );
  const data = await res.json();
  if (data.totalItems > 0) {
    return data.items[0].volumeInfo.imageLinks?.thumbnail || '';
  }
  return '';
};
```

---

## 注意点・Tips

- **まず動くものを作る** → 見た目は後から磨ける
- **本を追加するときは `books.json` を編集して git push するだけ**（管理画面は不要）
- **表紙画像が取得できない本もある** → `coverUrl` フィールドで手動指定できるようにしておく
- **GitHub Pages のベースパス** → `vite.config.js` で `base: '/book-profile/'` を設定する
