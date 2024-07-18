from rest_framework import serializers
from .models import Artist, Event, Venue, EventVenue

class EventInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'date', 'time')  # Include 'date' and 'time' here

class EventVenueSerializer(serializers.ModelSerializer):
    event = EventInfoSerializer(read_only=True)  # Now includes date and time inside
    
    class Meta:
        model = EventVenue
        fields = ('id', 'event')  

class VenueSerializer(serializers.ModelSerializer):
    event_venues = EventVenueSerializer(many=True, read_only=True)
    
    class Meta:
        model = Venue
        fields = (
            'id', 'name', 'address', 'parking', 'parking_specifics', 
            'contact_email', 'contact_phone', 'capacity', 
            'accessible_seating', 'image_url', 'event_venues'
        )

class EventSerializer(serializers.ModelSerializer):
    event_venues = EventVenueSerializer(many=True, read_only=True)
    artist = serializers.HyperlinkedRelatedField(
        view_name='artist-detail',
        read_only=True
    )
    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(),
        source='artist'
    )
    
    class Meta:
        model = Event
        fields = (
            'id', 'artist', 'artist_id', 'name', 'date', 'time', 
            'description', 'ticket_price', 'is_popular', 'image_url', 
            'event_venues'
        )

class ArtistSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    
    class Meta:
        model = Artist
        fields = (
            'id', 'name', 'genre', 'members', 'years_active', 
            'band_description', 'image_url', 'events'
        )

