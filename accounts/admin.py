from django.contrib import admin

from .models import MagicToken, AccessRule


@admin.register(MagicToken)
class MagicTokenAdmin(admin.ModelAdmin):
    list_display = ("token", "created_at", "updated_at")


@admin.register(AccessRule)
class AccessRuleAdmin(admin.ModelAdmin):
    list_display = ("target", "active", "created_at", "updated_at")
