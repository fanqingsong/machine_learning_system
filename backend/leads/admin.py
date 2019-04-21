from django.contrib import admin

from .models import Lead

class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')

# Register your models here.
admin.site.register(Lead, LeadAdmin)