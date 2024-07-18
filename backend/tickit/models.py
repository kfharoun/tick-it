from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=200)
    genre = models.CharField(max_length=100)
    members = models.CharField(max_length=500)
    years_active = models.CharField(max_length=50)
    band_description = models.TextField(max_length=700)
    image_url = models.URLField(max_length=500, null=True)

    class Meta: 
        db_table = 'artists'

    def __str__(self):
        return self.name
    
class Event(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=200, default='no name')
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    description = models.TextField(max_length=700, default='no description')
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_popular = models.BooleanField(default=False)
    image_url = models.URLField(max_length=500, null=True)

    class Meta: 
        db_table = 'events'

    def __str__(self):
        return self.name

class Venue(models.Model):
    name = models.CharField(max_length=200, default='no name')
    address = models.TextField(max_length=400, default='no address')
    parking = models.BooleanField(default=False)
    parking_specifics = models.TextField(max_length=500, default='no parking')
    contact_email = models.CharField(max_length=200, default='no email')
    contact_phone = models.CharField(max_length=200, default='no phone')
    capacity = models.IntegerField(default=0)
    accessible_seating = models.BooleanField(default=False)
    image_url = models.URLField(max_length=600, default='no image')

    class Meta: 
        db_table = 'venues'

    def __str__(self):
        return self.name

class EventVenue(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_venues')
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='event_venues')
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)

    class Meta: 
        db_table = 'event_venues'
    def __str__(self):
        return f"{self.event.name} at {self.venue.name}"