const xhttpr = new XMLHttpRequest();
xhttpr.open('GET', 'http://localhost:8000/all_valid_medications', true);
xhttpr.send();

xhttpr.onload = () => {
    if (xhttpr.status === 200) {
        const response = JSON.parse(xhttpr.response);
        // Process the response data here
        const table = document.getElementById("medicine_contents");
        response.medicines.forEach(item => {
            let row = table.insertRow();
            let date = row.insertCell(0);
            date.innerHTML = item.name;
            let name = row.insertCell(1);
            name.innerHTML = item.price;
        })
    } else {
        // Handle error
    }
};