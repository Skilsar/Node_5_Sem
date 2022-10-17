let json = document.getElementById('json_demo');
fetch('http://localhost:5000/7.json')
    .then(response => response.json())
    .then(response => {
        json.innerText = JSON.stringify(response);
    });

let xml = document.getElementById('xml_demo');
fetch('http://localhost:5000/7.xml')
    .then(response => response.text())
    .then(response => {
        xml.innerText = response;
    });

let copy = document.getElementById('footer');
copy.innerHTML = "&copy; Хлыстов Глеб, ПОИТ-6, 2022"