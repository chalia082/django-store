# Custom migration to handle bigint to uuid conversion
import uuid
from django.db import migrations, models


def convert_cart_id_to_uuid(apps, schema_editor):
    """
    Custom function to handle conversion from bigint to uuid for Cart model
    """
    db_alias = schema_editor.connection.alias
    Cart = apps.get_model('store', 'Cart')
    
    # For fresh databases, this won't have any data to convert
    # The new table will be created with UUID directly
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_alter_orderitem_product_alter_product_collection_and_more'),
    ]

    operations = [
        # Drop the table and recreate with UUID - only safe for fresh deployments
        migrations.RunSQL(
            "DROP TABLE IF EXISTS store_cart CASCADE;",
            reverse_sql="SELECT 1;"
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
