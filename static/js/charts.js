import { sendData, sendForm } from "./request.js";

export class Charts {
    constructor() {
        this.activateUploadForm();
    }

    activateUploadForm() {
        const chartForm = document.querySelector(".chart-upload-card");
        new UploadChartForm(chartForm);
        new UpdateChartForm(chartForm);
    }
   
}


class UploadChartForm {
    constructor(el) {
        this.form = el.querySelector(".upload-form");
        this.uploadButton = this.form.querySelector('button[data-action="upload"]');
        this.uploadButtonNew = this.form.querySelector('button[data-action="upload-new"]');
        this.chartContainer = el.querySelector(".chart");
        this.chartList = el.querySelector(".chart-list");
        this.uploadButton.addEventListener(
          "click",
          this.handleUploadClick.bind(this)
        );

        this.uploadButtonNew.addEventListener(
            "click",
            this.handleUploadNewClick.bind(this)
        );

        this.showUploaded = this.showUploaded.bind(this);
      }

    handleUploadClick(event) {
        event.preventDefault();
        // sendData(this.form, this.addChartToList)
        sendData(this.form, this.showUploaded);
    } 
    
    handleUploadNewClick(event) {
        event.preventDefault();
        sendData(this.form, this.addChartToList);
    }  

    showUploaded(rawData) { 
        const graphData = JSON.parse(rawData);
        
        console.log(graphData);
        

        Plotly.newPlot(this.chartContainer, graphData.data);

        
    }

    insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    addChartToList(rawData) { 
        const graphData = JSON.parse(rawData);
        
        const newChartCard = document.querySelector(".chart").cloneNode(true);
        // const newChartCard = document.getElementById("chart").cloneNode(true);
        const chartList = document.querySelector(".chart-list")

        Plotly.newPlot(newChartCard, graphData.data);

        // chartList.insertBefore(newChartCard, chartList.children[0]);

        chartList.insertBefore(newChartCard, chartList.children[0].nextSibling);
    }
}

class UpdateChartForm {
    constructor(el) {
        this.chartContainer = el.querySelector("chart");
        this.chartList = el.querySelector(".chart-list");
        this.chartCard = el.querySelector(".chart-card");
        this.chartSelector = this.chartCard.querySelector("column-selectors-bar-chart");
        this.updateButton = this.chartSelector.querySelector(".update-bar-chart");
        this.selectorX = this.chartSelector.querySelector("bar-chart-columns-x");
        this.selectorY = this.chartSelector.querySelector("bar-chart-columns-y");

        console.log(this.chartList); 

    }
}



function main() {
    new Charts();
}

main();