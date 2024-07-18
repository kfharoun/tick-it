from django.contrib import admin
from .models import Artist, Event, Venue, EventVenue

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'genre', 'years_active')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'artist', 'date', 'time', 'ticket_price', 'is_popular')

@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'capacity')

@admin.register(EventVenue)
class EventVenueAdmin(admin.ModelAdmin):
    list_display = ('event', 'venue', 'date', 'time')
    list_filter = ('event', 'venue')
