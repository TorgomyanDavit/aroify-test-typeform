const button = document.querySelector(".button")
var modal = document.getElementById("successModal");

function generateRandomId() {
    var randomId = Math.floor(Math.random() * 1000000).toString();
    document.getElementById("accountNumber").value = randomId;
}

generateRandomId();


function submitForm() {
    // Custom logic to handle the form submission
    try {
        var accountNumber = document.getElementById("accountNumber").value;
        var accountName = document.getElementById("accountName").value;
        var bankName = document.querySelector('input[name="bankName"]:checked').value;
        var currency = document.querySelector('input[name="currency"]:checked').value;
        var formData = {
            accountNumber: accountNumber,
            accountName: accountName,
            bankName: bankName,
            currency: currency
        };
        
        fetch("http://localhost:8000/accounts/create", {
            method: 'POST',
            body: {accountNumber,accountName,bankName,currency},  
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)            
        })
        .then(data => {
            console.log(data);
            modal.style.display = "block";
            setTimeout(function () { modal.style.display = "none" }, 5000);
    
            document.querySelector('input[name="bankName"]:checked').checked = false;
            document.querySelector('input[name="currency"]:checked').checked = false;
        })
    } catch(err) {
        alert("Please select all field")
    }

}

button.addEventListener("click", submitForm);