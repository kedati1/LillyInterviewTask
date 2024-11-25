function create_medication(name, price) {
    // Validation to ensure that it's valid
    if (!name || name.len < 1 || price == null || price <= 0) {
        return
    }
    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', 'http://localhost:8000/create', true);
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)

    xhttpr.onload = () => {
        if (xhttpr.status === 200) {
            //Force Reload the page to regenerate the table with the new field.
            window.location.reload()
        } else {
            const response = JSON.parse(xhttpr.response);
            // Extracts only the msg portion of this response:
            //{"detail":[{"type":"float_parsing","loc":["body","price"],"msg":"Input should be a valid number, unable to parse string as a number","input":"foo"}]}
            alert(response.detail[0].msg);
        }
    };
    xhttpr.send(formData);
}
