# Generated by Django 4.0.10 on 2024-01-17 17:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('name', models.CharField(max_length=200)),
                ('username', models.CharField(max_length=200, unique=True)),
                ('email', models.EmailField(max_length=200, unique=True)),
                ('password', models.CharField(max_length=200)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('director', models.CharField(max_length=200)),
                ('genre', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('image', models.URLField()),
                ('trailer', models.URLField()),
                ('language', models.CharField(max_length=200)),
                ('rating', models.FloatField()),
                ('movie_length', models.IntegerField()),
                ('release_date', models.DateTimeField(default=None, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movieCreated', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Theatre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('pincode', models.CharField(max_length=10)),
                ('movie_timing', models.DateTimeField(default=None, null=True)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='theatres', to='movieBooking.movie')),
            ],
        ),
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seat_number', models.CharField(max_length=10)),
                ('is_reserved', models.BooleanField(default=False)),
                ('category', models.CharField(max_length=200)),
                ('price', models.FloatField(default=0.0)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seatMovie', to='movieBooking.movie')),
                ('theatre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seatTheatre', to='movieBooking.theatre')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_cost', models.FloatField(default=0.0)),
                ('booking_time', models.DateTimeField(auto_now_add=True)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookingMovie', to='movieBooking.movie')),
                ('seats', models.ManyToManyField(to='movieBooking.seat')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookingUser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
