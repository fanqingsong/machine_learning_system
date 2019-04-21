from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.generic.base import TemplateView

urlpatterns = [
    path('',TemplateView.as_view(template_name="index.html")),

    path('admin/', admin.site.urls),

    path('', include('leads.urls')),
    path('', include('accounts.urls')),

]
