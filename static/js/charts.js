import { sendForm } from "./request.js";

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
        console.log("hello from charts")
        sendForm(this.form, "POST", "/api/charts/upload", this.showUploaded); // change showUploaded to smth useful
        // this.form.reset();
        // window.location.reload()
    }  

    showUploaded(rawData) {
        const data = JSON.parse(rawData);
        
    }

}