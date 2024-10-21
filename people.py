from flask import abort, make_response, request
import csv
from config import db
from models import Person, people_schema, person_schema


def read_all():
    people = Person.query.all()
    return people_schema.dump(people)

def create(body):
    person = body
    lname = person.get("lname")
    existing_person = Person.query.filter(Person.lname == lname).one_or_none()

    if existing_person is None:
        new_person = person_schema.load(person, session=db.session)
        db.session.add(new_person)
        db.session.commit()
        return person_schema.dump(new_person), 201
    else:
        return abort(406, f"Person with last name {lname} already exists")

def read_one(lname):

    person = Person.query.filter(Person.lname == lname).one_or_none()
    if person is not None:
        return person_schema.dump(person)
    else:
        abort(404, f"Person with last name {lname} not found")

def update(lname, body):
    person = body
    existing_person = Person.query.filter(Person.lname == lname).one_or_none()

    if existing_person:
        update_person = person_schema.load(person, session=db.session)
        existing_person.fname = update_person.fname
        db.session.merge(existing_person)
        db.session.commit()
        return person_schema.dump(existing_person), 201
    else:
        abort(404,f"Person with last name {lname} not found")

def delete(lname):
    existing_person = Person.query.filter(Person.lname == lname).one_or_none()

    if existing_person:
        db.session.delete(existing_person)
        db.session.commit()
        return make_response(f"{lname} successfully deleted", 200)
    else:
        abort(404,f"Person with last name {lname} not found")

def upload():
    
    if 'file' not in request.files:
        abort(400, f"No file part in the request")
    
    file = request.files['file']

    if file.filename == '':
        abort(400, f"No file selected")
    
    if not file.filename.endswith('.csv'):
        abort(400, description="Only CSV files are allowed")

    try:
        file_content = file.read().decode('utf-8')
        csv_reader = csv.DictReader(file_content.splitlines())
        csv_data = [row for row in csv_reader]
        print("CSV Data:", csv_data)

        for item in csv_data:
            try:
                create(item)
            except Exception as e:
                print(f"Could not add {item}\n Error: {e}")

        return make_response({"message": "People uploaded successfully into DB", "data": csv_data}, 200)

    except Exception as e:
        abort(500, description=f"Failed to process the CSV file: {str(e)}")
