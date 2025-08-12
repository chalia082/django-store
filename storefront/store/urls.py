from django.urls import path
from .import views

from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register('products', views.ProductViewSet, basename='products')
router.register('collections', views.CollectionViewSet)
router.register('cart', views.CartViewSet)
router.register('customers', views.CustomerViewSet)
router.register('orders', views.OrderViewSet, basename='orders')

products_router = routers.NestedDefaultRouter(router, 'products', lookup='product')
products_router.register('reviews', views.ReviewViewSet, basename='product-reviews')

cart_router = routers.NestedDefaultRouter(router, 'cart', lookup='cart')
cart_router.register('items', views.CartItemViewSet, basename='cart-items')

urlpatterns = router.urls + products_router.urls + cart_router.urls


# urlpatterns = [
#   # path('products/', views.product_list),
#   # path('products/<int:id>/', views.product_detail),
#   # path('collections/', views.collection_list),
#   # path('products/', views.ProductList.as_view()),
#   # path('collections/', views.CollectionList.as_view()),
#   # path('products/<int:pk>/', views.ProductDetail.as_view()),
#   # path('collections/<int:pk>/', views.CollectionDetails.as_view())
# ]