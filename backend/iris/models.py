from django.db import models

class Iris(models.Model):
    sepal_len = models.FloatField()
    sepal_width = models.FloatField()
    petal_len = models.FloatField()
    petal_width = models.FloatField()
    category = models.CharField(max_length=500, blank=True)

    def __unicode__(self):
        return self.category
