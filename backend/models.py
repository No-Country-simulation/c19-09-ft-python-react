from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

# create the app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(app)

class Vendedor(db.Model):
  __tablename__ = "vendedores"
  id = db.Column(db.Integer, primary_key=True)
  nombre = db.Column(db.String(100), nullable=False)
  apellido = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(100), unique=True, nullable=False)
  password = db.Column(db.String(100), nullable=False)
  imagen_perfil = db.Column(db.String(200), nullable=True)
  telefono = db.Column(db.String(20), nullable=False)
  direccion = db.Column(db.String(200), nullable=False)
  productos = db.Column(db.String(200), nullable=False)
  imagen_producto = db.Column(db.String(200), nullable=True)
  
def __repr__(self):
        return f'<Vendedor {self.id}>'

# def set_password(self, password):
#         self.password = generate_password_hash(password)

# def check_password(self, password):
#         return check_password_hash(self.password, password)

def serialize(self):
    return {
        'id': self.id,
        'nombre': self.nombre,
        'apellido': self.apellido,
        'email': self.email,
        'imagen_perfil': self.imagen_perfil,
        'telefono': self.telefono,
        'direccion': self.direccion,
        'productos': self.productos,
        'imagen_producto': self.imagen_producto
    }

class Comprador(db.Model):
  __tablename__ = "compradores"
  id = db.Column(db.Integer, primary_key=True)
  nombre = db.Column(db.String(100), nullable=False)
  apellido = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(100), unique=True, nullable=False)
  password = db.Column(db.String(100), nullable=False)
  imagen_perfil = db.Column(db.String(200), nullable=True)
  telefono = db.Column(db.String(20), nullable=False)
  direccion = db.Column(db.String(200), nullable=False)

def __repr__(self):
        return f'<Comprador {self.id}>'

# def set_password(self, password):
#         self.password = generate_password_hash(password)

# def check_password(self, password):
#         return check_password_hash(self.password, password)

def serialize(self):
    return {
        'id': self.id,
        'nombre': self.nombre,
        'apellido': self.apellido,
        'email': self.email,
        'imagen_perfil': self.imagen_perfil,
        'telefono': self.telefono,
        'direccion': self.direccion
    }

class Producto(db.Model):
  __tablename__ = "productos"
  id = db.Column(db.Integer, primary_key=True)
  nombre = db.Column(db.String(200), nullable=False)
  descripcion = db.Column(db.Text, nullable=False)
  precio = db.Column(db.Numeric(10, 2), nullable=False)
  tipo_madera = db.Column(db.String(100), nullable=False)
  dimensiones = db.Column(db.String(100), nullable=True)
  imagen = db.Column(db.String(200), nullable=True)
  vendedor_id = db.Column(db.Integer, db.ForeignKey('vendedores.id'), nullable=False)
  comprador_id = db.Column(db.Integer, db.ForeignKey('compradores.id'), nullable=False)

  def __repr__(self):
        return f'<Vendedor {self.id}>'
  
  def serialize(self):
      return {
          'id': self.id,
          'nombre': self.nombre,
          'descripcion': self.descripcion,
          'precio': self.precio,
          'tipo_madera': self.tipo_madera,
          'dimensiones': self.dimensiones,
          'imagen': self.imagen,
          'vendedor_id': self.vendedor_id,
          'comprador_id': self.comprador_id
      }
