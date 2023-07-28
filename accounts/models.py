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


class AccessByType:
    persons: list["AccessRule"]
    groups: list["AccessRule"]
    tokens: list["AccessRule"]
    public: list["AccessRule"]


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
    def access_by_type(self) -> AccessByType:
        rules = AccessByType()
        rules.persons = self.access_rules.filter(active=True, user__isnull=False)
        rules.groups = self.access_rules.filter(active=True, group__isnull=False)
        rules.tokens = self.access_rules.filter(active=True, token__isnull=False)
        rules.public = self.access_rules.filter(active=True, public=True)
        return rules

    def share(
        self,
        level: ACCESS_LEVELS,
        persons: list[int] = [],
        groups: list[int] = [],
        tokens: list[int] = [],
        public: bool | None = None,
    ) -> AccessByType:
        created = AccessByType()
        if persons:
            created.persons = []
            for person in persons:
                created.persons.append(self.access_rules.create(user_id=person, level=level))

        if groups:
            created.groups = []
            for group in groups:
                created.groups.append(self.access_rules.create(group_id=group, level=level))

        if tokens:
            created.tokens = []
            for token in tokens:
                created.tokens.append(self.access_rules.create(token_id=token, level=level))

        if public:
            created.public = [self.access_rules.create(public=True, level=level)]

        return created

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
