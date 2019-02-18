var dropCreateFormInfo = [];

function dropCreateSubmit() {
    let address1 = document.getElementById("address1").value;
    let address2 = document.getElementById("address2").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;

    if (address1 && city && state && zip) {
        dropCreateFormInfo.push(address1);
        dropCreateFormInfo.push(address2);
        dropCreateFormInfo.push(city);
        dropCreateFormInfo.push(state)
        dropCreateFormInfo.push(zip);
    }
    else {
        alert("Please fill out all required fields.");
    }
}
