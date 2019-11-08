from django.db import models

from django.conf import settings
from django.db import models
from django.db.models import Q

# Scoring Page Elements
class EventUser(models.Model):
    # Account data for event scorekeepers
    username = models.CharField(max_length=20)

class Team(models.Model):
    # Team data, will be available for event scorekeeprs to modify
    name = models.CharField(max_length=50)
    number = models.CharField(max_length=5)
    match1 = models.CharField(max_length=4, blank=True, default="/")
    match2 = models.CharField(max_length=4, blank=True, default="/")
    match3 = models.CharField(max_length=4, blank=True, default="/")

    def highest(self):
        score1 = 0
        score2 = 0
        score3 = 0
        if self.match1 != "/":
            score1 = int(self.match1)
        if self.match2 != "/":
            score2 = int(self.match2)
        if self.match3 != "/":
            score3 = int(self.match3)
        return max([score1, score2, score3])

    def __str__ (self):
        return self.name + " " + self.number

class ScoringCriteria(models.Model):
    # The individual tasks in a scoring category, can only be modified by

    task_description = models.TextField()
    score_type = models.CharField(max_length=2) # b = yes/no, i = integer
    max_input = models.SmallIntegerField(blank=True, default=1)
    score_multiplier = models.SmallIntegerField()
    sub_category = models.CharField(max_length=10) # If a criteria is boolean based (yes or no) and shares
                                      # a sub_category with another criteria they cannot both
                                      # be checked yes/true at the same time
    prerequisite = models.BooleanField(default=False)
    default = models.SmallIntegerField(blank=True, default=0)

    def __str__ (self):
        return self.task_description

class ScoringCategory(models.Model):
    # An individual category containing one or more scoring criteria
    category_name = models.CharField(max_length=50)
    category_image = models.ImageField(null=True, blank=True, upload_to='images/')
    category_criteria = models.ManyToManyField(ScoringCriteria, symmetrical=False)

    def __str__ (self):
        return self.category_name

