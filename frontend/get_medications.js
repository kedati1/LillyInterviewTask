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
                let name = row.insertCell(0);
                name.innerHTML = item.name;

                let price = row.insertCell(1);
                let price_container = document.createElement('span')
                let currency_symbol = document.createElement('span')
                let medicine_value = document.createElement('span')

                currency_symbol.classList.add('currency_symbol')
                currency_symbol.innerHTML = "£"

                medicine_value.classList.add('medicine_value')
                medicine_value.innerHTML = parseFloat(item.price).toFixed(2);

                price_container.appendChild(currency_symbol)
                price_container.appendChild(medicine_value)
                price.appendChild(price_container)

                let buttonCell = row.insertCell(2)
                let delete_button = document.createElement('button')
                let update_button = document.createElement('button')
                delete_button.textContent = 'Delete Medication'
                delete_button.onclick = () => {
                    delete_medication(item.name, row)
                }
                buttonCell.appendChild(delete_button)
                update_button.textContent = 'Change Price'
                update_button.onclick = () => {
                }
                buttonCell.appendChild(update_button)
            }
        )
    }
};

// Deletes the row from the html table and calls the delete function from the backend.
function delete_medication(name, row) {
    if (name == null || name.len < 1) {
        return
    }
    const xml = new XMLHttpRequest();
    xml.open('DELETE', 'http://localhost:8000/delete', true);
    xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xml.onload = () => {
        if (xml.status === 200) {
            // Process the response data here
            const response = JSON.parse(xml.responseText);
            row.remove()
        } else {
            const response = JSON.parse(xml.response);
            alert(response.detail[0].msg);
        }
    };
    xml.send(`name=` + name);
}

// allows for the price of the medicine to be updated
function update_price(name, new_price) {
    if (new_price >= 0) {
        const xml = new XMLHttpRequest();
        xml.open('POST', 'http://localhost:8000/update', true);
        xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    } else {
        alert("The new price must be set to 0 or above." + new_price + " is not a valid value!")
    }
}
