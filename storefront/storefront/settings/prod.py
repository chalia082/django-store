import os
import dj_database_url
from .common import *

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = ['deep-storefront-prod-7fff68b53dc6.herokuapp.com']

DATABASES = {
    'default': dj_database_url.config()
}

REDISCLOUD_URL = os.environ['REDISCLOUD_URL']

CELERY_BROKER_URL = REDISCLOUD_URL

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": REDISCLOUD_URL,
        "TIMEOUT": 10*60,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

# Static files settings for Heroku
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Whitenoise for serving static files
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Email settings (optional - will be set if Mailgun addon is added)
EMAIL_HOST = os.environ.get('MAILGUN_SMTP_SERVER', '')
EMAIL_HOST_USER = os.environ.get('MAILGUN_SMTP_LOGIN', '')
EMAIL_HOST_PASSWORD = os.environ.get('MAILGUN_SMTP_PASSWORD', '')
EMAIL_PORT = os.environ.get('MAILGUN_SMTP_PORT', 587)