function create_medication(name, price) {
    if (name == null || name.len < 1 || price == null || price < 0) {
        return
    }
    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', 'http://localhost:8000/create', true);
    const form = document.getElementById("create_medication");
    const body= new FormData(form)
    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            const response = JSON.parse(xhttpr.response);
            // Process the response data here
            const table = document.getElementById("medicine_contents");
            let row = table.insertRow();
            let name_cell = row.insertCell(0);
            name_cell.innerHTML = name;
            let price_cell = row.insertCell(1);
            price_cell.innerHTML = price;
        } else {
            // Handle error
        }
    };
    xhttpr.send(body);
}
