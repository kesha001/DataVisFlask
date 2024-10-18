from datetime import datetime
from flask import abort, make_response, request, jsonify
import csv

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

PEOPLE = {
    "Fairy": {
        "fname": "Tooth",
        "lname": "Fairy",
        "timestamp": get_timestamp(),
    },
    "Ruprecht": {
        "fname": "Knecht",
        "lname": "Ruprecht",
        "timestamp": get_timestamp(),
    },
    "Bunny": {
        "fname": "Easter",
        "lname": "Bunny",
        "timestamp": get_timestamp(),
    }
}

def read_all():
    return list(PEOPLE.values())

def create(body):
    person = body
    lname = person.get("lname")
    fname = person.get("fname", "")

    if lname and lname not in PEOPLE:
        PEOPLE[lname] = {
            "lname": lname,
            "fname": fname,
            "timestamp": get_timestamp(),
        }
        return PEOPLE[lname], 201
    else:
        return abort(406, f"Person with last name {lname} already exists")

def read_one(lname):
    if lname in PEOPLE:
        return PEOPLE[lname]
    else:
        abort(404, f"Person with last name {lname} not found")

def update(lname, body):
    person = body
    if lname in PEOPLE:
        PEOPLE[lname]["fname"] = person.get("fname", PEOPLE[lname]["fname"])
        PEOPLE[lname]["timestamp"] = get_timestamp()
        return PEOPLE[lname]
    else:
        abort(404,f"Person with last name {lname} not found")

def delete(lname):
    if lname in PEOPLE:
        del PEOPLE[lname]
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
            except:
                print(f"Could not add {item}")

        return make_response({"message": "People uploaded successfully into DB", "data": csv_data}, 200)

    except Exception as e:
        abort(500, description=f"Failed to process the CSV file: {str(e)}")
