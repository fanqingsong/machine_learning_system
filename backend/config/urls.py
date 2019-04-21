from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.generic.base import TemplateView

urlpatterns = [
    # SPA entry page 
    path('',TemplateView.as_view(template_name="index.html")),

    # administrator page
    path('admin/', admin.site.urls),

    # lead user management api
    path('', include('leads.urls')),

    # for login logout function api
    path('', include('accounts.urls')),
]
