from rest_framework import generics
from .models import Artist, Event, Venue, EventVenue
from .serializers import ArtistSerializer, EventSerializer, VenueSerializer, EventVenueSerializer

# Artist Views
class ListArtists(generics.ListCreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class ArtistDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

# Event Views
class ListEvents(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# Venue Views
class ListVenues(generics.ListCreateAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class VenueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

# EventVenue Views
class ListEventVenues(generics.ListCreateAPIView):
    queryset = EventVenue.objects.all()
    serializer_class = EventVenueSerializer

class EventVenueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventVenue.objects.all()
    serializer_class = EventVenueSerializer