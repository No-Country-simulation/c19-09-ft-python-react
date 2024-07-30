import bcrypt 
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from app.utils import APIException, generate_sitemap
from app.models import db
from app.routes import app
from app.admin import setup_admin
from app.commands import setup_commands
from app.models import Comprador, Vendedor, Moderador, Producto
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_mail import Mail, Message
from app.routes import app
from datetime import timedelta
from flask_cors import CORS
# from models import Pers on



app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] ="sqlite:///project.db"

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

"""
class comprador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(20), nullable=False)

    def __init__(self, nombre, email, password, rol):
        self.nombre = nombre
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")
        self.rol = rol

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class Moderador(User):
    __tablename__ = 'moderators'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", backref="moderator")

class Vendedor(User):
    __tablename__ = 'Vendedor'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", backref="seller")



if __name__ == '__main__':
    app.run(debug=True)
"""
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
load_dotenv()
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False
BASE_URL = os.getenv('BACKEND_URL')

#config mail
app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = '1515c6f1d92b9f'
app.config['MAIL_PASSWORD'] = '0f8c77ee421a5a'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app) 
# Configuración de JWT
app.config['JWT_SECRET_KEY'] = 'secretisimo'  # Cambia esto por una clave secreta segura
jwt = JWTManager(app)
app.url_map.strict_slashes = False
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "SQLAlchemy//")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)