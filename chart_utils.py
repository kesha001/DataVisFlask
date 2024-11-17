import pandas as pd
import plotly.express as px
import json
import plotly.utils
from flask import abort, make_response, request, jsonify
import csv

def create_chart(data=None):
    if not data:
        students = [
            ['Akash', 34, 'Sydney', 'Australia'],
            ['Rithika', 30, 'Coimbatore', 'India'],
            ['Priya', 31, 'Coimbatore', 'India'],
            ['Sandy', 32, 'Tokyo', 'Japan'],
            ['Praneeth', 16, 'New York', 'US'],
            ['Praveen', 17, 'Toronto', 'Canada']
        ]

        df = pd.DataFrame(students, columns=['Name', 'Age', 'City', 'Country'])
    else:
        df = pd.DataFrame(data)

    fig = px.bar(df, x='Name', y='Age', color='City', barmode='group')

    print(df.head())
    
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    
    return graphJSON


def upload_chart():
    
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
        # print(csv_data)
        graph = create_chart(data=csv_data)
        # return jsonify({"message": "File processed successfully", "data": csv_data[:5]}), 200
        return graph

    except Exception as e:
        abort(500, description=f"Failed to process the CSV file: {str(e)}")