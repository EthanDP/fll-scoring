from django.db import models

class EventUser(models.Model):
    # Account data for event scorekeepers
    username = models.CharField(max_length=20)

class MatchResult(models.Model):
    current_points = models.SmallIntegerField()

class Team(models.Model):
    # Team data, will be available for event scorekeeprs to modify
    name = models.CharField(max_length=50)
    number = models.PositiveSmallIntegerField()
    points = models.PositiveSmallIntegerField()
    match_results = models.ManyToManyField(MatchResult, symmetrical=False)

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

    def __str__ (self):
        return self.task_description


class ScoringCategory(models.Model):
    # An individual category containing one or more scoring criteria
    category_name = models.CharField(max_length=50)
    category_image = models.FileField(null=True, blank=True)
    category_criteria = models.ManyToManyField(ScoringCriteria, symmetrical=False)

    def __str__ (self):
        return self.category_name