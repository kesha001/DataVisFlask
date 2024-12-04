import pandas as pd
import plotly.express as px
import json
import plotly.utils
from flask import abort, make_response, request, jsonify
import csv


def get_default_data():
    students = [
            ['Akash', 34, 'Sydney', 'Australia'],
            ['Rithika', 30, 'Coimbatore', 'India'],
            ['Priya', 31, 'Coimbatore', 'India'],
            ['Sandy', 32, 'Tokyo', 'Japan'],
            ['Praneeth', 16, 'New York', 'US'],
            ['Praveen', 17, 'Toronto', 'Canada']
        ]
    df = pd.DataFrame(students, columns=['Name', 'Age', 'City', 'Country'])

    return df

def update_chart(body):
    print(body)
    try:
        x_column = body['x_column']
        y_column = body['y_column']

        graph, column_list = create_chart(x_ax=x_column, y_ax=y_column)
        print(type(graph))
        return graph

    except Exception as e:
        abort(500, description=f"Failed to process update: {str(e)}")



def create_chart(data=None, fig_type='bar', x_ax='Name', y_ax='Age'):
    if not data:
        df = get_default_data()
    else:
        df = pd.DataFrame(data)

    if fig_type == 'bar':
        fig = px.bar(df, x=x_ax, y=y_ax, color='City', barmode='group') 

    # print(df.head())
    
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    print(fig['layout', 'xaxis', 'title', 'text'])
    print(fig['layout', 'yaxis', 'title', 'text'])

    # print(graphJSON)
    
    return graphJSON, [x_ax, y_ax]


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
        graph, column_list = create_chart(data=csv_data)
        # return jsonify({"message": "File processed successfully", "data": csv_data[:5]}), 200
        print(type(graph))
        return graph

    except Exception as e:
        abort(500, description=f"Failed to process the CSV file: {str(e)}")