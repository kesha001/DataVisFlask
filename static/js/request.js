export function getData(endpoint, callback) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        callback(request.response);
      }
    };
    request.open("GET", endpoint);
    request.send();
  }

export function sendForm(form, action, endpoint, callback) {
  const formData = new FormData(form);
  const dataJSON = JSON.stringify(Object.fromEntries(formData));

  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      callback(request.response, form);
    }
  };
  request.open(action, endpoint);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(dataJSON);
}

export async function sendData(form, callback) {
  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:8000/api/charts/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (callback) {
      callback(data); 
    }
  } catch (e) {
    console.error(e);
  }
}
      