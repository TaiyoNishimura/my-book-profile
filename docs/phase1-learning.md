# Phase 1 で学んだこと — React + Vite 基礎

## 1. プロジェクト構成を理解する

### Vite が生成するファイルの役割

```
my-book-profile/
├── index.html          ← アプリのエントリーポイント（Viteはここからスタート）
├── vite.config.js      ← Viteの設定
├── package.json        ← 依存パッケージとスクリプト定義
├── public/             ← そのまま配信される静的ファイル（ビルド時にコピーされる）
│   └── data/books.json
└── src/                ← Reactのソースコード（ビルド時にバンドルされる）
    ├── main.jsx        ← Reactアプリの起動コード
    ├── App.jsx         ← ルートコンポーネント
    ├── App.css
    ├── components/     ← 再利用可能なUIパーツ
    └── hooks/          ← カスタムフック（ロジックの切り出し）
```

**ポイント:**
- `public/` に置いたファイルはビルド後もそのままのパスでアクセスできる。JSONデータのように「コードに組み込まず、そのまま配信したいファイル」を置く
- `src/` のファイルはViteがバンドル（結合・最適化）する。import文で依存関係を追跡している

### vite.config.js の `base` 設定

```js
export default defineConfig({
  plugins: [react()],
  base: '/my-book-profile/',  // ← GitHub Pages用
})
```

GitHub Pages は `https://ユーザー名.github.io/リポジトリ名/` という形で配信される。`base` を設定しないと、CSS・JS・画像などのパスが `/assets/...` になり 404 になる。`base` を設定すると `/my-book-profile/assets/...` に変換される。

---

## 2. React コンポーネントの設計パターン

### コンポーネントとは何か

React では UI を「コンポーネント」という単位に分割する。各コンポーネントは**自分の見た目（JSX）と振る舞い（state, イベント）を持つ独立した部品**。

このプロジェクトのコンポーネント構成:

```
App（全体の制御）
├── Header（固定テキスト表示のみ）
├── Stats（propsから統計を計算して表示）
├── BookList（フィルター + 一覧）
│   ├── Tag（フィルターボタン）
│   └── BookCard（本のカード）
│       └── Stars（星評価の表示）
└── BookDetail（モーダル）
    └── Stars（星評価の表示）
```

### props — 親から子へデータを渡す

```jsx
// App.jsx（親）
<Stats books={books} />

// Stats.jsx（子）
export default function Stats({ books }) {
  // ↑ 引数の { books } で受け取る（分割代入）
  const avgRating = (books.reduce((s, b) => s + b.rating, 0) / books.length).toFixed(1);
  // ...
}
```

**ルール:** props は「上から下」への一方通行。子コンポーネントが親のデータを直接書き換えることはできない。

### コールバック関数で「子から親」に通知する

子が親に何かを伝えたい場合は、親が「関数」を props として渡す:

```jsx
// App.jsx（親）— 関数を渡す
<BookList onSelectBook={setSelectedBook} />

// BookList.jsx（子）— 受け取った関数を呼ぶ
<BookCard book={book} onClick={() => onSelectBook(book)} />
```

データの流れ:
1. ユーザーがカードをクリック
2. `BookCard` の `onClick` が発火
3. `BookList` の `onSelectBook(book)` が呼ばれる
4. `App` の `setSelectedBook` が実行され、`selectedBook` state が更新される
5. `App` が再レンダリングされ、`BookDetail` にデータが渡る

### コンポーネントの分類

| 種類 | 特徴 | このプロジェクトの例 |
|------|------|---------------------|
| **表示のみ** | props を受け取って表示するだけ。stateなし | `Header`, `Stars`, `Tag` |
| **state あり** | 自分の状態を管理する | `BookCard`（hover, imgError）, `BookDetail`（imgError） |
| **制御コンポーネント** | 子にデータと関数を配り、全体を制御する | `App` |

---

## 3. React Hooks を理解する

### useState — コンポーネントの「状態」を管理する

```jsx
const [selectedBook, setSelectedBook] = useState(null);
//     ↑ 現在の値      ↑ 値を更新する関数      ↑ 初期値
```

`setSelectedBook(book)` を呼ぶと:
1. `selectedBook` の値が `book` に変わる
2. このstateを使っているコンポーネントが**自動で再レンダリング**される

**BookCard でのホバー管理の例:**

```jsx
const [hovered, setHovered] = useState(false);

<div
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  style={{
    transform: hovered ? "translateY(-3px)" : "none",  // hovered の値で見た目が変わる
  }}
>
```

### useEffect — 「副作用」を実行する

「副作用」= レンダリング以外の処理（データ取得、DOM操作、タイマーなど）。

```jsx
// useBooks.js
useEffect(() => {
  fetch(`${import.meta.env.BASE_URL}data/books.json`)
    .then((res) => res.json())
    .then((data) => {
      setBooks(data);
      setLoading(false);
    });
}, []);
// ↑ 第2引数の [] = 「マウント時（初回表示時）に1回だけ実行」
```

**第2引数（依存配列）のルール:**

| 書き方 | 実行タイミング |
|--------|--------------|
| `[]` | マウント時に1回だけ |
| `[value]` | マウント時 + `value` が変わるたび |
| 省略 | 毎回のレンダリング後（通常避ける） |

### useMemo — 計算結果をキャッシュする

```jsx
const allTags = useMemo(
  () => [...new Set(books.flatMap((b) => b.tags))],
  [books]
);
```

`books` が変わらない限り、タグの一覧を再計算しない。毎レンダリングで重い計算を繰り返すのを防ぐ。

**いつ使うか:** 配列のフィルタリングや集計など、データ量が増えると遅くなりうる計算に使う。単純な値の参照には不要。

### カスタムフック — ロジックをコンポーネントから分離する

```jsx
// hooks/useBooks.js
export function useBooks() {
  const [books, setBooks] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... fetch, useMemo など
  return { books, filtered, allTags, selectedTag, setSelectedTag, loading };
}

// App.jsx — 使う側はシンプルになる
const { books, filtered, allTags, selectedTag, setSelectedTag, loading } = useBooks();
```

**メリット:**
- `App.jsx` がデータ取得の詳細を知らなくてよい
- 同じロジックを別のコンポーネントでも再利用できる
- テストしやすい（UIとロジックが分離）

**命名規則:** カスタムフックは必ず `use` で始める（`useBooks`, `useFilter` など）。React がフックだと認識するために必要。

---

## 4. JSX でよく使う JavaScript パターン

### 配列の `.map()` でリストを描画する

```jsx
{filtered.map((book, i) => (
  <div key={book.id}>
    <BookCard book={book} onClick={() => onSelectBook(book)} />
  </div>
))}
```

**`key` が必要な理由:** React はリストの各要素を `key` で識別する。`key` がないと、要素の追加・削除・並び替え時に正しく更新できない。**id のようなユニークな値**を使うこと（配列のインデックス `i` は非推奨）。

### 三項演算子で条件付き表示

```jsx
{!imgError ? (
  <img src={book.coverUrl} alt={book.title} onError={() => setImgError(true)} />
) : (
  <div>{book.title}</div>  // 画像読み込み失敗時のフォールバック
)}
```

### `&&` で「〜のときだけ表示」

```jsx
{filtered.length === 0 && (
  <p>該当する本がありません</p>
)}
```

`&&` の左が `true` なら右の JSX を表示。`false` なら何も表示しない。

### スプレッド構文と Set で重複除去

```jsx
const allTags = [...new Set(books.flatMap((b) => b.tags))];
```

ステップ分解:
1. `books.flatMap(b => b.tags)` → 全本のタグを1つの配列にする `["技術書", "プログラミング", "技術書", "数学", ...]`
2. `new Set(...)` → 重複を除去（Set は重複を許さないデータ構造）
3. `[...Set]` → Set を配列に戻す `["技術書", "プログラミング", "数学", ...]`

---

## 5. イベント処理のパターン

### クリックイベントの伝播制御

```jsx
// BookDetail.jsx — 背景クリックで閉じる
<div onClick={onClose}>
  {/* モーダル本体 — クリックが背景に伝わらないようにする */}
  <div onClick={(e) => e.stopPropagation()}>
    ...モーダルの中身...
  </div>
</div>
```

`e.stopPropagation()` がないと、モーダル内をクリックしてもイベントが親に伝わり、モーダルが閉じてしまう。

### 画像の読み込みエラーハンドリング

```jsx
const [imgError, setImgError] = useState(false);

<img
  src={book.coverUrl}
  onError={() => setImgError(true)}  // 読み込み失敗時にフラグを立てる
/>
```

外部APIから取得する画像は読み込みに失敗する可能性がある。`onError` でフォールバック表示に切り替えることで、壊れた画像アイコンを避ける。

---

## 6. データの流れの全体像

```
books.json（静的ファイル）
    ↓ fetch（useEffect）
useBooks フック（state管理 + フィルタリング）
    ↓ return
App（全体の制御）
    ├─→ Header（データ不要）
    ├─→ Stats ← books
    ├─→ BookList ← filtered, allTags, selectedTag, setSelectedTag, onSelectBook
    │     ├─→ Tag ← label, active, onClick
    │     └─→ BookCard ← book, onClick
    └─→ BookDetail ← selectedBook, onClose
```

**単方向データフロー:** データは常に上（useBooks）から下（各コンポーネント）に流れる。ユーザーの操作（クリックなど）はコールバック関数を通じて上に伝わり、stateが更新される。state更新により再レンダリングが走り、新しいデータが下に流れる。

---

## 7. 理解度チェック

以下の質問に答えられるか確認してみよう:

1. `public/data/books.json` を `src/data/books.json` に移動したら何が変わる？ fetch のURLはどう変更する必要がある？
2. `useBooks` の `useMemo` を外して普通に計算したら、どんなときに問題になる？
3. `BookCard` の `key` に `book.id` の代わりに配列のインデックス `i` を使うと、フィルタリングのときに何が起きる？
4. `BookDetail` で `e.stopPropagation()` を削除するとどうなる？
5. 新しい本を `books.json` に追加するとき、コード側の変更は必要？なぜ？
