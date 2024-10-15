from flask import render_template
import connexion
# from people import read_one

app = connexion.App(__name__, specification_dir="./")
app.add_api("swagger.yaml")

@app.route("/")
def home():
    return render_template("home.html")

# @app.route("/people/<lname>", methods=["GET"])
# def read_one_person(lname):
#     read_one(lname)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)