const button = document.querySelector(".button")
var modal = document.getElementById("successModal");
const banksContainer = document.querySelector('.main_currency');
function generateRandomId() {
    var randomId = Math.floor(Math.random() * 1000000).toString();
    document.getElementById("accountNumber").value = randomId;
}

generateRandomId();

async function getBanks() {
    const banksContainer = document.querySelector('.main_currency');

    try {
        await fetch("http://vmi1512737.contaboserver.net/banks")
        .then((res) => res.json())
        .then(data => {
            data.data.forEach((bank, index) => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.id = `bank${index + 1}`;
                radio.name = 'bankName';
                radio.value = bank.bankName;
                radio.required = true;

                const label = document.createElement('label');
                label.htmlFor = `bank${index + 1}`;
                label.textContent = bank.bankName;

                banksContainer.appendChild(radio);
                banksContainer.appendChild(label);
            });
        })
    } catch (error) {
        console.log('Error fetching data:', error.message);
    }
}

window.addEventListener('load', getBanks);

function submitForm() {
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
        
        fetch("http://vmi1512737.contaboserver.net/accounts/create", {
            method: 'POST',
            body: {accountNumber,accountName,bankName,currency},  
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)            
        })
        .then(data => {
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