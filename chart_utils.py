import pandas as pd
import plotly.express as px
import json
import plotly.utils

def create_chart():
    students = [
        ['Akash', 34, 'Sydney', 'Australia'],
        ['Rithika', 30, 'Coimbatore', 'India'],
        ['Priya', 31, 'Coimbatore', 'India'],
        ['Sandy', 32, 'Tokyo', 'Japan'],
        ['Praneeth', 16, 'New York', 'US'],
        ['Praveen', 17, 'Toronto', 'Canada']
    ]

    df = pd.DataFrame(students, columns=['Name', 'Age', 'City', 'Country'], index=['a', 'b', 'c', 'd', 'e', 'f'])
    
    fig = px.bar(df, x='Name', y='Age', color='City', barmode='group')
    
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    
    return graphJSON