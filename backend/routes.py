<<<<<<< HEAD
from app import app, db, gestor_de_inicio_de_sesion
from flask import render_template, request, redirect, url_for
from flask_login import login_user, logout_user, login_required

@app.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method == "POST":
        email = request.form["correo_electronico"]
        password = request.form["contraseña"]
        rol_id = request.form["rol"]
        rol = Rol.query.filter_by(nombre=nombre_rol).first()
        if not rol:
            rol = Rol(nombre=rol_id)
            db.session.add(rol)
            db.session.commit()
        usuario = Usuario(email=email, rol_id=rol.id)
        usuario.establecer_pass(password)
        db.session.add(usuario)
        db.session.commit()
        return redirect(url_for("inicio_sesion"))
    return render_template("registro.html")

@app.route("/inicio_sesion", methods=["GET", "POST"])
def inicio_sesion():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        usuario = Usuario.query.filter_by(email=correo_electronico).first()
        if usuario and usuario.verificar_pass(password):
            login_user(usuario)
            return redirect(url_for("index"))
    return render_template("inicio_sesion.html")

@app.route("/cerrar_sesion")
@login_required
def cerrar_sesion():
    logout_user()
    return redirect(url_for("inicio_sesion"))

@app.route("/")
@login_required
def index():
    return "Bienvenido, {}!".format(current_user.email)

if __name__ == "__main__":
    app.run(debug=True)
=======
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
>>>>>>> 60d62a088c51dd1a68917f0a344f7df51d3112d4
