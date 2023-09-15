let number = 0;
let data = []; // Añadir variable para almacenar los datos recuperados de ajax.json
const button = document.getElementById('btn');
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");
let request; // Mover la declaración de 'request' al ámbito global

function getData() {
  if (data.length === 0) {
    request = new XMLHttpRequest(); // Asignar 'request' en el ámbito global
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        data = JSON.parse(request.responseText);
        changeVideo(); // Llamar a changeVideo después de obtener los datos por primera vez
      }
    };
    request.open("GET", "http://localhost:3000/ajax.json"); // Cambiar la URL al servidor local
    request.send();
  } else {
    changeVideo(); // Llamar a changeVideo si ya se han cargado los datos
  }
}

function changeVideo() {
  titleArea.innerHTML = data[number].title;
  contentArea.innerHTML = data[number].content;
  videoArea.setAttribute("src", data[number].url);
  number = (number + 1) % data.length; // Avanzar al siguiente video circularmente
}

window.onload = getData;
