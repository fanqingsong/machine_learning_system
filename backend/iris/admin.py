from django.contrib import admin

from .models import Iris

class IrisAdmin(admin.ModelAdmin):
    list_display = ('category', 'petal_width')

# Register your models here.
admin.site.register(Iris, IrisAdmin)