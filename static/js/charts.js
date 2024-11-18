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
        this.form = el.querySelector("form");
        this.uploadButton = el.querySelector("button[data-action='upload']");
        this.chartContainer = el.querySelector("div[id=chart]")
        this.uploadButton.addEventListener(
          "click",
          this.handleUploadClick.bind(this)
        );
      }

    handleUploadClick(event) {
        event.preventDefault();
        sendData(this.form, this.showUploaded)
    }  

    showUploaded(rawData) {
        const graphData = JSON.parse(rawData);
        // Plotly.newPlot('chart', graphData.data);
        // console.log(this.form.JSON)
        // console.log(el.JSON)
        // console.log(this.chartContainer.JSON)
        Plotly.newPlot(document.getElementById("chart"), graphData.data);

        // Plotly.newPlot(this.chartContainer, graphData.data);

        
    }

}

function main() {
    new Charts();
}

main();