let houseStocksUrl = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json";

async function main(){
    let data = await fetchHouseStocks();
    // console.log(data[0]);
    // console.log(data[0].representative);
    // console.log(data[0].amount);
    // console.log(data[0].ticker);
    // console.log(data[0].disclosure_date);
    let html ="";
    html += `<h1>Welcome</h1> <h5>This page was made to show transparency of the stocks bought and sold by members of congress</h5>`;
    for(let i = 0; i < 500; i++){
        let member = data[i].representative;
        let company = data[i].asset_description;
        let ticker = data[i].ticker;
        let purchase = data[i].type;
        let rangeInvested = data[i].amount;
        let purchaseDate = data[i].transaction_date;
        let disclosureDate = data[i].disclosure_date;
        let link = data[i].ptr_link;
        document.body.innerHTML =
            html += `<div class="card-group flex-row my-5 col-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-header back">${i+1}. ${member}</h5>
                                    <p class="card-text">Company: ${company}</p>
                                    <p class="card-text">Ticker: ${ticker}</p>
                                    <p>Type of trans: ${purchase}</p>
                                    <p class="card-text">Amount invested: ${rangeInvested}</p>
                                    <p class="card-text">Purchase date: ${purchaseDate}</p>
                                    <p class="card-text">Disclosure date: ${disclosureDate} </p>
                                    <a href="${link}"<p>Disclosure documents</p></a>
                            </div>
                        </div>
                    </div>`
    }
        return html
}

async function fetchHouseStocks(){
    let response = await fetch(houseStocksUrl);
    if (!response.ok) {
        throw Error("Failed to fetch house stocks")
    }

    let data = await response.json();
    return data;
}

main();