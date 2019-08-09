from django.db import models

class EventUser(models.Model):
    # Account data for event scorekeepers
    username = models.CharField(max_length=20)

class Team(models.Model):
    # Team data, will be available for event scorekeeprs to modify
    name = models.CharField(max_length=50)
    number = models.PositiveSmallIntegerField()
    points = models.PositiveSmallIntegerField()

class ScoringCriteria(models.Model):
    # The individual tasks in a scoring category, can only be modified by 
    point_value = models.SmallIntegerField()
    sub_category = models.CharField(max_length=10) # If a criteria is boolean based (yes or no) and shares
                                      # a sub_category with another criteria they cannot both
                                      # be checked yes/true at the same time


class ScoringCategory(models.Model):
    # An individual category containing one or more scoring criteria
    category_name = models.CharField(max_length=50)
    category_image = models.FileField()
    category_criteria = models.ManyToManyField(ScoringCriteria, symmetrical=False)