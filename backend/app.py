from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///proyecto.db"
app.config["SECRET_KEY"] = "secret_key"

db = SQLAlchemy(app)
inicio_sesion = LoginManager()
inicio_sesion.init_app(app)
inicio_sesion.login_view = "inicio_sesion"

class Rol(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    ro

class Usuario(UserMixin, db.Model):
    __tablename__ = "usuarios"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    rol_id = db.Column(db.Integer, db.ForeignKey("roles.id"), nullable=False)
    rol = db.relationship("Rol", backref="usuarios")

    def establecer_pass(self, password):
        self.password = generate_password_hash(password)

    def verificar_pass(self, password):
        return check_password_hash(self.password, password)

@inicio_sesion.user_loader
def cargar_usuario(usuario_id):
    return Usuario.query.get(int(usuario_id))

from routes import *