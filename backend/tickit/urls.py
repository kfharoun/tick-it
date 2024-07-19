from django.urls import path
from .views import ListArtists, ArtistDetail, ListEvents, EventDetail, ListVenues, VenueDetail, ListEventVenues, EventVenueDetail

urlpatterns = [
    path('artists/', ListArtists.as_view(), name='artist-list'),
    path('artists/<int:pk>/', ArtistDetail.as_view(), name='artist-detail'),
    path('events/', ListEvents.as_view(), name='event-list'),
    path('events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('venues/', ListVenues.as_view(), name='venue-list'),
    path('venues/<int:pk>/', VenueDetail.as_view(), name='venue-detail'),
    path('eventvenues/', ListEventVenues.as_view(), name='eventvenue-list'),
    path('eventvenues/<int:pk>/', EventVenueDetail.as_view(), name='eventvenue-detail'),
]