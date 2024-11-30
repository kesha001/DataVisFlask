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

  console.log(dataJSON)

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
  console.log(formData)
  try {
    const response = await fetch("/api/charts", {
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
      