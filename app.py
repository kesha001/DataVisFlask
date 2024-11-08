from flask import render_template, request
import config
from models import Person

app = config.connex_app

@app.route("/")
def home():
    # people = Person.query.all()
    page = request.args.get('page', 1, type=int)
    people = Person.query.paginate(page=page, per_page=config.PEOPLE_PER_PAGE, error_out=False)
    return render_template("home.html", people=people.items)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)