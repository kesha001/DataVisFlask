from flask import render_template, request, url_for
import config
from models import Person
from chart_utils import create_chart

app = config.connex_app

@app.route("/")
def home():
    # people = Person.query.all()
    page = request.args.get('page', 1, type=int)
    people = Person.query.paginate(page=page, per_page=config.PEOPLE_PER_PAGE, error_out=False)

    next_url = url_for('home', page=people.next_num) if people.has_next else None
    prev_url = url_for('home', page=people.prev_num) if people.has_prev else None

    return render_template("home.html", people=people.items,
                           next_url=next_url,
                           prev_url=prev_url
                        )


@app.route("/charts")
def charts():

    graphJSON, columns = create_chart()
    return render_template('charts.html', graphJSON=graphJSON, columns=columns)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)