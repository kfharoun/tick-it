from rest_framework import serializers
from .models import Artist, Event, Venue, EventVenue

class EventInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'date', 'time') 

class EventVenueSerializer(serializers.ModelSerializer):
    event = EventInfoSerializer(read_only=True)
    
    class Meta:
        model = EventVenue
        fields = ('id', 'event', 'venue') 
    
    # Friend helped with this (i didnt help but it's cool to have for the future)
    def create(self, validated_data):
        # Implement creation logic if necessary
        return EventVenue.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        # Implement update logic
        instance.venue = validated_data.get('venue', instance.venue)
        instance.save()
        return instance

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