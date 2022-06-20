
#### 参考

https://kamatimaru.hatenablog.com/entry/2020/06/16/122234  
Django REST frameworkでPOSTかつユーザー認証ありのAPIにcurlでリクエストする

```
$ curl -X POST 
-b "sessionid=5p83l969kh2it7mkq67idg9a2rxlrvo9; csrftoken=0ICxnT6mBJjJojbwGswu54KE2Z1krheGfOhtwFb7T1ev1KMjK3IXhDL7j6GCTLrZ" 
-H "X-CSRFToken:0ICxnT6mBJjJojbwGswu54KE2Z1krheGfOhtwFb7T1ev1KMjK3IXhDL7j6GCTLrZ" 
-d "data=dummy" "http://localhost:8000/api/example"
```
ポイント  
CSRFトークンの値をCookieのcsrftokenとリクエストヘッダーのX-CSRFTokenの両方に指定する必要があるようである。  
※ あくまで検証結果で、内部のロジックを確認した訳ではない。  
どちらかしか指定しない場合、認証に失敗する。

