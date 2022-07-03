## Django アプリ開始まで
```
python3 -m venv ven
. ven/bin/activate
pip install -r requirments.txt

python manage.py makemigrations apiv1
python manage.py sqlmigrate apiv1 0001
python manage.py migrate
python manage.py runserver

python manage.py createsuperuser --username admin1 --email admin1@example.com
password456
python manage.py createsuperuser --username admin2 --email admin2@example.com
password789
```

## Django shell
```
from django.contrib.auth.models import User
user = User.objects.all()[0]
from apiv1.models import PDFdocument
doc = PDFdocument(display_name='文書1', catefory='カテゴリ01', owner=user)
doc.save()
doc = PDFdocument(display_name='文書2', catefory='カテゴリ02', owner=user)
doc.save()
```

## Django POST 例
```
curl -X POST -d "{}" -H "Content-Type:application/json" -H "indent=4" http://127.0.0.1:8000/api/v1/endpoint1/
```

## Django CORS 対策
```


pip install django-cors-headers

INSTALLED_APPS = [
    ・・・   
    'rest_framework',
    'api',
    'corsheaders', # ここに追加
　　・・・
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # ここに追加
    'django.middleware.security.SecurityMiddleware',
    ・・・
]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000', # ここに追加
]
```

#### CORS 参考
<https://www.stackhawk.com/blog/django-cors-guide/>  
Django CORS Guide: What It Is and How to Enable It

#### CORS トラブル対策

Request header field 「access-control-allow-origin」 is not allowed by Access-Control-Allow-Headers in preflight response.  
↓
```
CORS_ALLOW_HEADERS = [
'accept',
'accept-encoding',
'authorization',
'content-type',
'dnt',
'origin',
'user-agent',
'x-csrftoken',
'x-requested-with',
'Access-Control-Allow-Origin',
]
```


