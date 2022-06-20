#### python manage.py
```
python manage.py makemigrations apiv1
python manage.py sqlmigrate apiv1 0001
python manage.py migrate

python manage.py createsuperuser --username admin1 --email admin1@example.com
password456

python manage.py createsuperuser --username admin2 --email admin2@example.com
password789

python manage.py runserver
python manage.py shell
```

#### ジャンゴシェル
```
>>> from django.contrib.auth.models import User
>>> User.objects.all()
<QuerySet [<User: admin1>, <User: admin2>]>
>>> 

>>> from apiv1.models import Book, Comment
>>> Book.objects.all()
<QuerySet []>
>>> Comment.objects.all()
<QuerySet [<Comment: コメント１>]>
>>> Comment.objects.all()[0]
<Comment: コメント１>

>>> Book.objects.all()[0].comment_set.all()
<QuerySet []>
>>> Comment.objects.all()[0].book
>>> 
または
>>> Book.objects.all()[0].comments.all()
<QuerySet []>
>>> Comment.objects.all()[0].book
>>> 
```

#### 作成と取得
```
// Commentを作る
curl -X POST -H "Content-Type: application/json" -d '{"content":"コメント１", "stars":1}' localhost:8000/api/v1/endpoint1/
// Commentを作る
curl -X POST -H "Content-Type: application/json" -d '{"content":"コメント２", "stars":2}' localhost:8000/api/v1/endpoint1/
// Bookを作る
curl -X POST -H "Content-Type: application/json" -d '{"title":"book１", "price":1234, "author":1,"comments":[1,2]}' localhost:8000/api/v1/endpoint2/
// Bookを作る
curl -X POST -H "Content-Type: application/json" -d '{"title":"book２", "price":4321, "author":2,"comments":[1,2]}' localhost:8000/api/v1/endpoint2/
// Commentを取得する
curl -X POST -H "Content-Type: application/json" -d '{}' localhost:8000/api/v1/endpoint3/1
curl -X POST -H "Content-Type: application/json" -d '{}' localhost:8000/api/v1/endpoint3/2
// Bookを取得する
curl -X POST -H "Content-Type: application/json" -d '{}' localhost:8000/api/v1/endpoint4/1
curl -X POST -H "Content-Type: application/json" -d '{}' localhost:8000/api/v1/endpoint4/2
```

### login していないので AnonymousUser
```
curl -X POST -H "Content-Type: application/json" -d '{}' localhost:8000/api/v1/endpoint4/2
↓
current_user:AnonymousUser
1
{'id': 1, 'author': OrderedDict([('id', 1), ('username', 'admin1'), ('email', 'admin1@example.com')]), 'title': 'book１', 'price': 1234}
[19/Jun/2022 14:43:46] "POST /api/v1/endpoint4/1 HTTP/1.1" 200 106
```

### ログイン・ログアウト
```
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin1","password":"pass456"}' localhost:8000/api-auth/login/
curl -X POST -H "Content-Type: application/json" -d '' localhost:8000/api-auth/logout/
↓
[19/Jun/2022 14:44:28] "POST /api/v1/endpoint2/ HTTP/1.1" 200 50
Forbidden (CSRF cookie not set.): /api-auth/login/
[19/Jun/2022 14:47:00] "POST /api-auth/login/ HTTP/1.1" 403 3086
```
