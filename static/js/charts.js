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
        this.chartContainer = el.getAttribute("chart")
        this.uploadButton.addEventListener(
          "click",
          this.handleUploadClick.bind(this)
        );
      }

    handleUploadClick(event) {
        event.preventDefault();
        sendData(this.form)
    }  

    showUploaded(rawData) {
        const data = JSON.parse(rawData);
        
    }

}

function main() {
    new Charts();
}

main();