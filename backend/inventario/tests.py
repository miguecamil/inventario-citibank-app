from django.test import TestCase
from inventario.models import Inventario

class InventarioTest(TestCase):

    def test_tabla_inventario(self):
        self.assertEqual(
            Inventario._meta.db_table,
            'inventario_total'
        )

    def test_campo_serie(self):
        campos = [field.name for field in Inventario._meta.fields]
        self.assertIn('serie', campos)

    def test_campo_estado(self):
        campos = [field.name for field in Inventario._meta.fields]
        self.assertIn('estado', campos)