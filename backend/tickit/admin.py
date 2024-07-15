from django.contrib import admin
from .models import Venue, Artist, Event
# Register your models here.
admin.site.register(Venue)
admin.site.register(Artist)
admin.site.register(Event)
