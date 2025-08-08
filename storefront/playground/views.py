from django.shortcuts import render
from store.models import Collection, Product

def say_hello(request):
  
  collection = Collection(pk=11)
  collection.title = 'Games'
  collection.featured_product = None
  collection.save()
  
  return render(request, 'hello.html', {'name': 'Deepanshu'})
