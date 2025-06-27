from django.db import models
from django.utils.text import slugify

# Create your models here.


class Product(models.Model):

    CATEGORY = (
        ('Electronics', 'ELECTRONICS'),
        ('Groceries', 'GROCERIES'),
        ('Clothings', 'CLOTHINGS'),
    )

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to="img", blank=True, null=True)
    category = models.CharField(
        max_length=20, choices=CATEGORY, blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):

        if not self.slug:
            base_slug = slugify(self.name)
            unique_slug = base_slug
            counter = 1

            # Keep generating new slug if it already exists
            while Product.objects.filter(slug=unique_slug).exists():
                unique_slug = f'{base_slug}-{counter}'
                counter += 1

            self.slug = unique_slug

        super().save(*args, **kwargs)
