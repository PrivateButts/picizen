from django.db import models
from django.contrib.auth.models import User, Group
from django.utils.crypto import get_random_string

from picizen.helpers import BaseModel


class MagicToken(BaseModel):
    token = models.CharField(max_length=50, unique=True, default=get_random_string)


class ACCESS_LEVELS(models.IntegerChoices):
    NONE = 0
    READ = 1
    WRITE = 2
    OWNER = 3


class AccessRule(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, blank=True, null=True)
    token = models.ForeignKey(MagicToken, on_delete=models.CASCADE, blank=True, null=True)
    public = models.BooleanField(default=False)

    level = models.IntegerField(choices=ACCESS_LEVELS.choices, default=ACCESS_LEVELS.NONE)
    active = models.BooleanField(default=True)

    @property
    def target(self) -> str | User | Group | MagicToken | None:
        if self.public:
            return "public"
        elif self.user:
            return self.user
        elif self.group:
            return self.group
        elif self.token:
            return self.token
        else:
            return None


class ShareableMixin(models.Model):
    access_rules = models.ManyToManyField(AccessRule, blank=True)

    class Meta:
        abstract = True

    @property
    def is_public(self):
        return self.access_rules.filter(active=True, public=True).exists()

    @property
    def access_dict(self) -> dict:
        persons = self.access_rules.filter(active=True, user__isnull=False)
        groups = self.access_rules.filter(active=True, group__isnull=False)
        tokens = self.access_rules.filter(active=True, token__isnull=False)
        public = self.access_rules.filter(active=True, public=True)
        return {
            "persons": persons,
            "groups": groups,
            "tokens": tokens,
            "public": public,
        }

    def user_has_access(self, user: User) -> bool:
        if self.access_rules.filter(active=True, public=True).exists():
            return True
        if self.access_rules.filter(active=True, user=user).exists():
            return True
        if self.access_rules.filter(active=True, group__in=user.groups.all()).exists():
            return True
        return False

    def token_has_access(self, token: MagicToken) -> bool:
        if self.access_rules.filter(active=True, public=True).exists():
            return True
        if self.access_rules.filter(active=True, token=token).exists():
            return True
        return False
