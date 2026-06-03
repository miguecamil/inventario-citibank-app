from django.test import TestCase
from productos.models import Productos

class ProductosTest(TestCase):

    def test_tabla_productos(self):
        self.assertEqual(
            Productos._meta.db_table,
            'productos'
        )

    def test_campo_marca(self):
        campos = [field.name for field in Productos._meta.fields]
        self.assertIn('marca', campos)

    def test_campo_modelo(self):
        campos = [field.name for field in Productos._meta.fields]
        self.assertIn('modelo', campos)