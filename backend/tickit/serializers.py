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
    event_venues = EventVenueSerializer(many=True)
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

    def update(self, instance, validated_data):
        # handling nested updates - thanks monty! 
        event_venues_data = validated_data.pop('event_venues', [])
        for event_venue_data in event_venues_data:
            event_venue_id = event_venue_data.get('id', None)
            if event_venue_id:
                ev_venue = EventVenue.objects.get(id=event_venue_id)
                for key, value in event_venue_data.items():
                    setattr(ev_venue, key, value)
                ev_venue.save()
        return super().update(instance, validated_data)

class ArtistSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    
    class Meta:
        model = Artist
        fields = (
            'id', 'name', 'genre', 'members', 'years_active', 
            'band_description', 'image_url', 'events'
        )