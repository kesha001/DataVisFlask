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
        this.uploadButton.addEventListener(
          "click",
          this.handleUploadClick.bind(this)
        );

        this.showUploaded = this.showUploaded.bind(this);
      }

    handleUploadClick(event) {
        event.preventDefault();
        sendData(this.form, this.showUploaded)
    }  

    showUploaded(rawData) { 
        const graphData = JSON.parse(rawData);
        
        console.log(graphData)
        

        Plotly.newPlot(this.chartContainer, graphData.data);

        
    }

}

function main() {
    new Charts();
}

main();