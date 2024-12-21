from django.db import models

# Create your models here.
class Note(models.Model):
  noteContent = models.CharField(max_length=300)
  
  def __str__(self): # instance variable
    return self.title # will print then Book is printed