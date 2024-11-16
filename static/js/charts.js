import { sendData, sendForm } from "./request.js";

export class Charts {
    constructor() {
        this.activateUploadForm();
    }

    activateUploadForm() {
        const chartForm = document.querySelector(".chart-upload-card form");
        new UploadChartForm(chartForm);
    }
   
}


class UploadChartForm {
    constructor(el) {
        this.form = el;
        this.uploadButton = el.querySelector("button[data-action='upload']");
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