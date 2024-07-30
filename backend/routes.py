from flask import Flask, request, jsonify, url_for, Blueprint
from app.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, JWTManager, get_jwt_identity, jwt_required, get_jwt
from app.models import db, Comprador, Vendedor,Moderador,Producto
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
from datetime import datetime, timedelta
import uuid
from flask import jsonify
from datetime import datetime

app = Blueprint('app', __name__)

mail = Mail()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nombre = data['nombre']
    email = data['email']
    password = data['password']
    rol = data['rol']

    if rol not in ['comprador', 'moderador', 'vendedor']:
        return jsonify({'message': 'Rol no válido'}), 400

    comprador = Comprador.query.filter_by(nombre=nombre).first()
    if user:
        return jsonify({'message': 'Username already exists'}), 400

    comprador = Comprador(nombre, email, password, rol)
    db.session.add(comprador)
    db.session.commit()

    if role == 'moderador':
        moderador = Moderador(user_id=user.id)
        db.session.add(moderador)
        db.session.commit()
    elif rol == 'vendedor':
        Vendedor = Vendedor(user_id=user.id)
        db.session.add(comprador)
        db.session.commit()

    return jsonify({'message': 'Usuario creado de forma exitosa'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    nombre = data['nombre']
    password = data['password']

    comprador = Comprador.query.filter_by(nombre=nombre).first()
    if not comprador:
        return jsonify({'message': 'La contraseña es incorrecta'}), 401

    if not comprador.check_password(password):
        return jsonify({'message': 'El nombre de usuario o la constraseña es incorrecta'}), 401

    access_token = create_access_token(identity=nombre)
    return jsonify({'access_token': access_token}), 200

@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    username = get_jwt_identity()
    return jsonify({'message': f'Hola, {nombre}!'}), 200