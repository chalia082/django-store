import os
from .common import *

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = ['deep-storefront-prod-f1142162d85c.herokuapp.com']