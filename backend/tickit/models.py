from django.db import models

# Create your models here.
class Venue(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField(max_length=400)
    parking = models.BooleanField(default=False)
    parking_specifics = models.TextField(max_length=500)
    contact_email = models.CharField(max_length=200)
    contact_phone = models.CharField(max_length=200)
    capacity = models.IntegerField()
    accessible_seating = models.BooleanField(default=False)
    image_url = models.URLField(max_length=500)

    def __str__(self):
        return self.name
    
class Event(models.Model):
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=200,default= 'no name')
    date = models.DateField(default= 'no date')
    time = models.TimeField(default= 'no time')
    description = models.TextField(max_length=700,default= 'no description')
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2) 
    image_url = models.URLField(max_length=500, null=True)

    def __str__(self):
        return self.name
    
class Artist(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='artists')
    name = models.CharField(max_length=200,default= 'no name')
    genre = models.CharField(max_length=100,default= 'no genre')
    members = models.CharField(max_length=500,default = 'no members')
    years_active = models.CharField(max_length=50,default= 'no years')
    band_description = models.TextField(max_length=700,default= 'no description')
    image_url = models.URLField(max_length=500, null=True)

    def __str__(self):
        return self.name