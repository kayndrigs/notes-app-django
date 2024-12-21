from rest_framework import serializers 
from .models import Note # class from models.py

# this will serialize or transform some json data into python data
class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Note
    fields = '__all__'