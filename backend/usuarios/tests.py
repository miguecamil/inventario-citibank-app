from django.test import TestCase
from usuarios.models import Usuarios

class UsuariosTest(TestCase):

    def test_tabla_usuarios(self):
        self.assertEqual(
            Usuarios._meta.db_table,
            'usuarios'
        )

    def test_campo_id_user(self):
        campos = [field.name for field in Usuarios._meta.fields]
        self.assertIn('id_user', campos)

    def test_campo_full_name(self):
        campos = [field.name for field in Usuarios._meta.fields]
        self.assertIn('full_name', campos)