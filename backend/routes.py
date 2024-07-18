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