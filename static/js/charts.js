import { sendData, sendForm } from "./request.js";

export class Charts {
    constructor() {
        this.activateUploadForm();
    }

    activateUploadForm() {
        const chartForm = document.querySelector(".chart-upload-card");
        new UploadChartForm(chartForm);
    }
   
}


class UploadChartForm {
    constructor(el) {
        this.form = el.querySelector(".upload-form");
        this.uploadButton = this.form.querySelector('button[data-action="upload"]');
        this.chartContainer = el.querySelector(".chart")
        this.chartList = el.querySelector(".chart-list")
        this.uploadButton.addEventListener(
          "click",
          this.handleUploadClick.bind(this)
        );

        this.showUploaded = this.showUploaded.bind(this);
      }

    handleUploadClick(event) {
        event.preventDefault();
        // sendData(this.form, this.addChartToList)
        sendData(this.form, this.showUploaded)
    }  

    showUploaded(rawData) { 
        const graphData = JSON.parse(rawData);
        
        console.log(graphData)
        

        Plotly.newPlot(this.chartContainer, graphData.data);

        
    }

    addChartToList(rawData) { 
        const graphData = JSON.parse(rawData);
        
        const newChartCard = document.querySelector(".chart").cloneNode(true);
        // const newChartCard = document.getElementById("chart").cloneNode(true);
        const chartList = document.querySelector(".chart-list")

        Plotly.newPlot(newChartCard, graphData.data);

        chartList.insertBefore(newChartCard, chartList.children[0]);

        
    }

}

function main() {
    new Charts();
}

main();