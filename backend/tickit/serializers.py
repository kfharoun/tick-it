from rest_framework import serializers
from .models import Venue, Event, Artist

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    event = serializers.HyperlinkedRelatedField(
        view_name='event_detail',
        read_only=True
    )
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
        source='event'
    )
    class Meta:
        model = Artist
        fields = ('id', 'event','event_id', 'name', 'genre', 'members', 'years_active', 'band_description', 'image_url')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    artist = serializers.HyperlinkedRelatedField(
        view_name='artist_detail',
        read_only=True
    )
    artists = ArtistSerializer(
        many=True,
        read_only=True
    )
    venue = serializers.HyperlinkedRelatedField(
        view_name='venue_detail',
        read_only=True
    )
    venue_id = serializers.PrimaryKeyRelatedField(
        queryset=Venue.objects.all(),
        source='venue'
    )
    class Meta:
        model = Event
        fields = ('id', 'venue','venue_id', 'artist', 'artists', 'name', 'date', 'time', 'description', 'ticket_price', 'image_url')


class VenueSerializer(serializers.HyperlinkedModelSerializer):
    events = EventSerializer(
        many=True,
        read_only=True
    )
    venue_url = serializers.ModelSerializer.serializer_url_field(
        view_name='venue_detail'
    )
    class Meta:
        model = Venue
        fields = ('id', 'events', 'venue_url', 'name', 'address', 'parking', 'parking_specifics', 'contact_email', 'contact_phone', 'capacity', 'accessible_seating', 'image_url' )