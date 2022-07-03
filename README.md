### app11
テンプレ

### app12
Edit可能な DataGrid さらにカスタマイズ・Dialog
```
npm install @mui/x-data-grid
npm i --save lodash.clonedeep
```
を追加した。

### app13
MSWを導入。ダミーデータは mocks/handlers に集められた。
```
npm install axios

public/
src/
|-index.js
|-mocks/
| |-browser.js
| |-handler.js

npm install -D msw
npx msw init ./public --save

index.js
====
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}
```
を追加した。

### app14
Django モデルが入れ子の時のシリアライザ ＋ login/ 時のCSRF
curl 例は個別ページへ

#### 参考
https://qiita.com/uturned0/items/973b32be719a52947f3c  
django/djangorestframework で JOIN する 親から子、子から親

### app15
うまくいかなかった

https://qiita.com/sand/items/d4b6f39b5fe6027064b4  
Material-UI レスポンシブデザイン- AppBar & Drawer

### app16
React AppBar & Drawer

#### 参考
https://smartdevpreneur.com/the-definitive-tutorial-to-the-material-ui-drawer-component/  
How to Position an MUI Drawer Under AppBar (Responsive Sizing!)

### app17
React AppBar & Drawer ＋ 画面遷移  
src/ App.js  MenuLayout.js Page1.js  Page2.js

#### 参考
https://qiita.com/tanaShoe/items/76670d28ab2aa8d80b67#%E5%8F%82%E8%80%83-%E3%82%B3%E3%83%BC%E3%83%89%E5%85%A8%E8%B2%8C  
【React】Material-UIのDrawerを使ったページ遷移


### app18
React AppBar & Drawer ＋ 画面遷移 ＋ useContext  
ドロワーのメニューからの遷移と、ブラウザバックの遷移を、識別できたと思う。
- location.key を利用する
- App.js にグローバル変数と setter を用意する
- usePrevious Hook は、useState してる変数にしか効かないのではないか？使えなかった。

#### 参考（こっちのレイアウト使ってるはず）
https://smartdevpreneur.com/the-definitive-tutorial-to-the-material-ui-drawer-component/  
How to Position an MUI Drawer Under AppBar (Responsive Sizing!)

### app19
app14 (Django モデルが入れ子の時のシリアライザ ＋ login/ 時のCSRF) の続き。CSRF を無効化した  
curl 例は個別ページへ

### app20
MUI 連動Select　app12 の使い回し。

### app21
app13　を改修して frontend。axios APICALL 実装。Edit可能な DataGrid さらにカスタマイズ・Dialog。  
app19　を改修して backend。

### app22
frontend＋backend。axios APICALL 実装。app21 をコピーした後、frontend は app18 をコピー。



