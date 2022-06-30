let houseStocksUrl = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json";


function liveSearch() {

    let cards = document.querySelectorAll('.cards');
    let search_query = document.getElementById("searchbox").value;
    for (var i = 0; i < cards.length; i++) {
      if(cards[i].innerText.toLowerCase()
        .includes(search_query.toLowerCase())) {
          cards[i].classList.remove("is-hidden");
      } else {
        cards[i].classList.add("is-hidden");
      }
    }
  }

async function main(){
    let data = await fetchHouseStocks();
    let html ="";
    html += `<div class="mx-auto"><h1 class="text-center">Welcome</h1> <h5 class="text-center">This page was made to show transparency of the stocks bought and sold by members of congress</h5>
    <label class="text-center" for="searchbox">Search</label>
    <input class="w-50 d-flex justify-content-center" type="search" id="searchbox" oninput="liveSearch()"></div>`;
    html += `<div class="d-flex justify-content-center flex-wrap container">`
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
            html += `<div class="cards card-group my-5 mx-2 w-25">
                        <div class="card cards">
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
    html += `</div>`
    
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