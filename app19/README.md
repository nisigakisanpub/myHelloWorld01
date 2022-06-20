
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

#### CSRF を無効化した

apps.py
```
class DisableCSRF(MiddlewareMixin):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
```

settings.py
```
MIDDLEWARE_CLASSES = (
    "apiv1.apps.disable.DisableCSRF",
)
```

#### python manage.py

```
python manage.py makemigrations apiv1
python manage.py sqlmigrate apiv1 0001
python manage.py migrate
python manage.py runserver

python manage.py createsuperuser --username admin1 --email admin1@example.com
password456
python manage.py createsuperuser --username admin2 --email admin2@example.com
password789
```

#### curl 作成と取得

```
// Commentを作る
curl -X POST -H "Content-Type: application/json" -d '{"content":"コメント１", "stars":1}' localhost:8000/api/v1/endpoint1/
// Commentを作る
curl -X POST -H "Content-Type: application/json" -d '{"content":"コメント２", "stars":2}' localhost:8000/api/v1/endpoint1/
// Bookを作る
curl -X POST -H "Content-Type: application/json" -d '{"title":"book１", "price":1234, "author":1,"comments":[1,2]}' localhost:8000/api/v1/endpoint2/
// Commentを取得する
curl -X POST -H "Content-Type: application/json" -d '{}' localhost:8000/api/v1/endpoint3/1
curl -X POST -H "Content-Type: application/json" -d '{}' localhost:8000/api/v1/endpoint3/2
// Bookを取得する
curl -X POST -H "Content-Type: application/json" -d '{}' localhost:8000/api/v1/endpoint4/2
```

#### ジャンゴシェル

```
from apiv1.models import Book, Comment
```

#### ログイン・ログアウト

```
curl -v -d "username"="admin1" -d "password"="password456" localhost:8000/api-auth/login/
```
↓  
```
nisigaki@DYNA-T75:~/17develop/app19$ curl -v -d "username"="admin1" -d "password"="password456" localhost:8000/api-auth/login/
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 8000 (#0)
> POST /api-auth/login/ HTTP/1.1
> Host: localhost:8000
> User-Agent: curl/7.58.0
> Accept: */*
> Content-Length: 36
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 36 out of 36 bytes
< HTTP/1.1 302 Found
< Date: Mon, 20 Jun 2022 15:17:33 GMT
< Server: WSGIServer/0.2 CPython/3.10.4
< Content-Type: text/html; charset=utf-8
< Location: /
< Expires: Mon, 20 Jun 2022 15:17:33 GMT
< Cache-Control: max-age=0, no-cache, no-store, must-revalidate, private
< Vary: Cookie
< X-Frame-Options: DENY
< Content-Length: 0
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Set-Cookie:  csrftoken=FqmpF2EgEKRQyX0HS2qqyGaihSwBWgHvCK8fdt2lR6RDsnPGbsE4UaLNA2snn45p; expires=Mon, 19 Jun 2023 15:17:33 GMT; Max-Age=31449600; Path=/; SameSite=Lax
< Set-Cookie:  sessionid=.eJxVjMEOwiAQRP-FsyEupQt49O43kAUWqRpISnsy_rtt0oOeJpn3Zt7C07oUv3ae_ZTERYA4_XaB4pPrDtKD6r3J2OoyT0Huijxol7eW-HU93L-DQr1sazugO5tRDwk5R0vIxiLEbC1kBFCgtAuZDQKp4EZlNAS1BRPmkFIUny_CRzeD:1o3J9h:4o-UYVO5MpXWkrS5LQzqMtprF_XDm2a-RQkcp9sycCM; expires=Mon, 04 Jul 2022 15:17:33 GMT; HttpOnly; Max-Age=1209600; Path=/; SameSite=Lax
< 
* Connection #0 to host localhost left intact
nisigaki@DYNA-T75:~/17develop/app19$ 
```
↑  
`Set-Cookie:sessionid=`と`Set-Cookie:csrftoken=` が返ってきた。  
この時、コンソールには
```
[21/Jun/2022 00:14:34] "POST /api-auth/login/ HTTP/1.1" 302 0
```

#### sessionid と csrftoken を使って POST
```
curl -X POST -b "sessionid=.eJxVjMEOwiAQRP-FsyEupQt49O43kAUWqRpISnsy_rtt0oOeJpn3Zt7C07oUv3ae_ZTERYA4_XaB4pPrDtKD6r3J2OoyT0Huijxol7eW-HU93L-DQr1sazugO5tRDwk5R0vIxiLEbC1kBFCgtAuZDQKp4EZlNAS1BRPmkFIUny_CRzeD:1o3J9h:4o-UYVO5MpXWkrS5LQzqMtprF_XDm2a-RQkcp9sycCM" -H "X-CSRFToken:FqmpF2EgEKRQyX0HS2qqyGaihSwBWgHvCK8fdt2lR6RDsnPGbsE4UaLNA2snn45p" -d '{}' localhost:8000/api/v1/endpoint4/2
```
↓  
レスポンスは、
```
{
"id":2,"title":"book１","price":1234,
"author":{"id":1,"username":"admin1","email":"admin1@example.com"},
"comments":[{"id":1,"content":"コメント１","stars":1,"book":2},{"id":2,"content":"コメント２","stars":2,"book":2}]
}
```
コンソールには、
```
current_user:admin1
2
{'id': 2, 'title': 'book１', 'price': 1234, 'author': OrderedDict([('id', 1), ('username', 'admin1'), ('email', 'admin1@example.com')]), 'comments': [OrderedDict([('id', 1), ('content', 'コメント１'), ('stars', 1), ('book', 2)]), OrderedDict([('id', 2), ('content', 'コメント２'), ('stars', 2), ('book', 2)])]}
[21/Jun/2022 00:21:52] "POST /api/v1/endpoint4/2 HTTP/1.1" 200 231
```

#### -d "username"="admin1" -d "password"="password456" とは？
```
curl -v -d "username"="admin1" -d "password"="password456" localhost:8000/api/v1/endpoint4/2
```
↓  
```
<QueryDict: {'username': ['admin1'], 'password': ['password456']}>
```
ナニコレ？


