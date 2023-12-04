(function getBanks() {
    const selectElement = document.getElementById("accountType");

    // Fetch data and populate options
    fetch("http://localhost:8000/banks")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.data.forEach(bank => {
                const optionElement = document.createElement("option");
                optionElement.value = bank.bank_id;
                optionElement.textContent = bank.bankName;
                selectElement.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Event listener for option selection
    selectElement.addEventListener("change", function () {
        const selectedBankId = this.value;
        fetch(`http://localhost:8000/accounts/${selectedBankId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(selectedBankData => {
            const accountInfoContainer = document.getElementById("accountInfo");
            accountInfoContainer.innerHTML = ''; // Clear existing content
            selectedBankData.data.forEach(dataItem => {
                const divElement = document.createElement("div");
                divElement.classList.add("accountItem");
                divElement.innerHTML = `
                    <div>Account Name: <p class="name">${dataItem.accountName}</p></div>
                    <div>Account Number: <p class="name">${dataItem.accountNumber}</p></div>
                    <div>Account ID: <p class="name">${dataItem.account_id}</p></div>
                    <div>Bank ID: <p class="name">${dataItem.bank_id}</p></div>
                    <div>Currency ID: <p class="name">${dataItem.currency_id}</p></div>
                `;
                accountInfoContainer.appendChild(divElement);
            });
    
            console.log('Selected Bank Data:', selectedBankData);
        })
        .catch(error => {
            console.error('Error fetching additional data:', error);
        });
    });
})();
