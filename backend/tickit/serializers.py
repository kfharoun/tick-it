from rest_framework import serializers
from .models import Venue, Event, Artist

class VenueSerializer(serializers.HyperlinkedModelSerializer):
    event = serializers.HyperlinkedRelatedField(
        view_name='event_detail',
        read_only=True
    )
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
        source='event'
    )
    # venue_name = serializers.HyperlinkedRelatedField(
    #     view_name='venue_detail',
    #     read_only=True
    # )
    class Meta:
        model = Venue
        fields = ('id', 'event', 'event_id', 'name', 'date', 'address', 'parking', 'parking_specifics', 'contact_email', 'contact_phone', 'capacity', 'accessible_seating', 'image_url' )

class EventSerializer(serializers.HyperlinkedModelSerializer):
    venue = serializers.HyperlinkedRelatedField(
        view_name='venue_detail',
        read_only=True
    )
    venues = VenueSerializer(
        many=True,
        read_only=True
    )
    artist = serializers.HyperlinkedRelatedField(
        view_name='artist_detail',
        read_only=True
    )
    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(),
        source='artist'
    )
    class Meta:
        model = Event
        fields = ('id', 'artist','artist_id', 'artist', 'name', 'date', 'time', 'description', 'ticket_price', 'is_popular', 'image_url', 'venue', 'venues')

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    events = EventSerializer(
        many=True,
        read_only=True
    )
    event_url = serializers.ModelSerializer.serializer_url_field(
        view_name='event_detail'
    )
    # name = serializers.PrimaryKeyRelatedField(
    #     queryset=Artist.objects.all(),
    #     source='artist'
    # )
    class Meta:
        model = Artist
        fields = ('id', 'events','event_url', 'name', 'genre', 'members', 'years_active', 'band_description', 'image_url')


