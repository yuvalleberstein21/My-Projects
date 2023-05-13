

getCoins();

const arrayLocalStorage = []
$(function () {
    $("#homeBtn").on("click", getCoins);

    const localMemory = localStorage.getItem("savedCoins");
    arrayLocalStorage.push(localMemory)
    console.log("savedCoins :", arrayLocalStorage)
})

//get the ajax url and give him the function "getJsonFromServer" to get only 100 coins.
async function getCoins() {
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.style.display = "none";
    let imageURL = 'Images/background.jpeg'
    $(".para").css('background-image', 'url(' + imageURL + ')')

    $(".cards-container").empty();

    $(".cards-container").html(`
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-light" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    `);

    try {
        const cryptRequest = await getApiFromServer("https://api.coingecko.com/api/v3/coins");
        $(".cards-container").empty();
        displayAllCoins(cryptRequest);
    } catch (error) {
        console.log(error)
    }
}

// ajax request.
function getApiFromServer(jsonUrl) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: jsonUrl,
            success: jsonRequest => resolve(jsonRequest),
            error: err => reject(err)
        });
    });
}

// The tamplate of the cards. 
function displayCoinsOnCard(coin, index) {
    $('.cards-container').append(`
    <div class="col-md-3">
    <div class="card m-2">
    <div class="iconsToggleImage">
    <div class="col-sm-6" id="coinToggle">
    <div class="custom-control custom-switch mySwitch">
        <input type="checkbox" class="custom-control-input toggleCheckbox" onclick="toggleCheckbox(id)" id="${coin.symbol}" width="100">
        <label class="custom-control-label" for="${coin.symbol}"></label>
    </div>
    <div class="col-sm-6">
    <img class="coinLogo" src="${coin.image.small}"/>
    </div>
    </div>
    </div>
      <div class="card-block">
        <h4 class="card-title">${coin.symbol}</h4>
        <p class="card-text">${coin.name}</p>
        <button onclick="getMoreInfo(id, ${index})" class="btn btn-outline-warning moreInfoBtn" id="${coin.id}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${index}" aria-expanded="false" aria-controls="collapseExample${index}">
        More Info
      </button>
      <div class="collapse" id="collapseExample${index}">
      <div class="card card-body moreInfo" id="moreInfo${index}">
      </div>
      </div>
    </div>
    </div>`)
}

// function to get only 100 coins from the server and display them on cards.
function displayAllCoins(cryptRequest) {
    localStorage.removeItem("allCoins");
    for (let i = 0; i < cryptRequest.length; i++) {
        saveCoinsToLocalStorage(cryptRequest[i]);
        displayCoinsOnCard(cryptRequest[i], i);
    }
}

// button more info to display more data of the coin.

async function getMoreInfo(id, index) {
    $(`#moreInfo${index}`).html(`
       <div class="d-flex justify-content-center">
       <div class="spinner-border text-warning" role="status">
        <span class="sr-only"></span>
      </div>
      </div>`)
    try {
        const moreInfoRequest = await getApiFromServer(`https://api.coingecko.com/api/v3/coins/${id}`);
        $(`#moreInfo${index}`).empty();
        displayMoreInfo(moreInfoRequest, index);
    }
    catch (error) {
        console.log(error);
    }
}


//display the more info data on modal.
function displayMoreInfo(infoRequest, index) {
    const currentCoinPrice = infoRequest.market_data.current_price;
    let moreInfo = `<img class="coinPic" src="${infoRequest.image.small}"><br>
         USD: $${currentCoinPrice.usd}<br>
         EUR: &euro;${currentCoinPrice.eur}<br>
         ILS: ${currentCoinPrice.ils}&#8362;<br>`;
    $(`#moreInfo${index}`).html(moreInfo);
}


let checkboxArray = [];
function toggleCheckbox(coin) {
    // if the switch button is checked add to array
    if ($(`#${coin}`).is(":checked")) { // if the switch button is checked - add it to the array
        checkboxArray.push(coin);
    } else {
        // if the switch button is unchecked remove from the array
        const existingIndex = checkboxArray.indexOf(coin);
        if (existingIndex > -1) {
            checkboxArray.splice(existingIndex, 1);
        }
    }
    //Save the coins on local storage..   
    localStorage.setItem("savedCoins", checkboxArray);



    if (checkboxArray.length > 5) {
        const numOfCoins = checkboxArray.length;
        const difference = numOfCoins - 5;
        $("#modalText").html(""); // delete previous content
        $("#modalText").html(`You chose ${numOfCoins} coins, please remove ${difference}`);

        const chosenCoins = checkboxArray.map(coin => `<button onclick="removeCoins(value)" class="btn btn-warning removeCoinBtn" type="button" value=${coin}>${coin}`)
        $(".chosenCoins").html("").append(`<div>
           ${chosenCoins.join("  ")}
          </div> `)
        myModal.style.display = "block"; // display the modal 
    }
}

const myModal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close")[0];

// When the user clicks on (x), close the modal
closeModal.onclick = function () {
    myModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == myModal) {
        myModal.style.display = "none";
    }
}

$(".saveModalButton").on('click', function () {
    if (checkboxArray.length > 5) {
        const numOfCoins = checkboxArray.length;
        const difference = numOfCoins - 5;
        $("#modalText").html(""); // delete previous content
        $("#modalText").html(`You still have ${numOfCoins} coins, please remove ${difference}`);
    }
    else {
        localStorage.setItem("savedCoins", checkboxArray);
        myModal.style.display = "none";
    }
})

// Remove coins from modal 
function removeCoins(coinValue) {
    const exitingIndex = checkboxArray.indexOf(coinValue);
    if (exitingIndex > -1) {
        checkboxArray.splice(exitingIndex, 1);
        $(`#${coinValue}`).prop("checked", false);
    }
    localStorage.removeItem("sevedCoins");
    $(`.removeCoinBtn[value|='${coinValue}']`).fadeOut('slow');
}


function saveCoinsToLocalStorage(coinObj) {
    let allCoins = [];
    let allCoinsJsonString = localStorage.getItem("allCoins");
    if (allCoinsJsonString != null) {
        allCoins = JSON.parse(allCoinsJsonString);
    }
    allCoins.push(coinObj);
    allCoinsJsonString = JSON.stringify(allCoins);
    localStorage.setItem("allCoins", allCoinsJsonString);
}


function searchCoin(value) {
    //clear the search input field 
    $("#searchInput").val("");
    //get coins objects array from local storage
    let allCoinsJsonString = localStorage.getItem("allCoins");
    if (allCoinsJsonString != null) {
        allCoins = JSON.parse(allCoinsJsonString);
        $(".cards-container").empty();
        displayAllCoins(allCoins)
    }

    //validate the value entered is not an empty string
    if (value == "" || value.trim().length < 1 || value.length < 3) {
        throw new Error("Please enter at least 3 characters");
    }
    //clear previous content
    $(".cards-container").empty();

    // create a flag for the searched input
    let isFound = false;

    for (let i = 0; i < allCoins.length; i++) {
        const coin = allCoins[i];

        if (coin.name.includes(value.toUpperCase()) || coin.name.includes(value.toLowerCase()) || coin.symbol.includes(value.toUpperCase()) || coin.symbol.includes(value.toLowerCase())) {
            displayCoinsOnCard(coin, i);
            isFound = true;
        }
    }
    // if not match was found - meaning the flag is false - show an error message
    if (!isFound) {
        displayAllCoins(allCoins)
        throw new Error("Sorry, coin not found");


    }
}

// on click on the search button, call the searchCoin function

$("#searchBtn").on("click", function () {
    const searchInput = $("#searchInput").val();
    try {
        searchCoin(searchInput);
    }
    catch (err) {
        alert(err);
    }
});

// about page 

$('#about').on('click', function () {
    let imageURL = 'Images/aboutimage.webp'
    $(".cards-container").empty()
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.style.display = "none";
    $(".para").css('background-image', 'url(' + imageURL + ')')
    $(".cards-container").append(`
        <div class="aboutMe">
        <h3 class="aboutMeHead">ABOUT ME</h3>
        <div class="myImage">
        <img src="Images/myimage.jpeg" id="myPic">
        </div>
        <p class="aboutMePar">
           My name is Yuval Leberstein i'm 23 years old from Migdal Ha Emek, I am studying fullstack development. I served in the Israeli army as a sniper for 3 years. I always knew i wanted challenging career and to learn new stuff, Thats why i started learning fullstack development.
        </p>
    </div>
        <div class="aboutProject col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 class="aboutProHead">ABOUT THE PROJECT</h3>
            <p class="aboutProPar">
                 The object of this project is to display real live information about crypto coins, by using a crypto API. Some of the features in this website are:
                <ul>
                    <li>Displaying all coins from api.</li>
                    <li>Displaying extra information on each coin on collapse.</li>
                    <li>Searching for specific coins and displaying them.</li>
                    <li>Choosing up to 5 coins and displaying a live report regarding currency rate (specifically USD).</li>
                </ul>
                The technologies I used:
                <ul>
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>Java Script</li>
                    <li>Bootstrap</li>
                    <li>FontsAwesome</li>
                    <li>jQuery</li>
                </ul>
                Thank you for visiting my website!<br>
                    Contact me: &nbsp;
                    <a href="https://github.com/yuvalleberstein21"><i class="fa-brands fa-github"></i></a>&nbsp;
                    <a href="https://www.linkedin.com/in/yuval-leberstein-177ba8232/"><i class="fa-brands fa-linkedin linkdin"></i></a>
                    <i class="fa-solid fa-phone"><span class="tooltiptext">050-952-5201</span></i>      
            </p>
        </div>`);
})


// Live reports page .. // 

$('#liveReports').on('click', function () {
    $('.cards-container').empty();

    let imageURL = 'Images/background.jpeg'
    $(".para").css('background-image', 'url(' + imageURL + ')')



    let ArrayCheckBox = checkboxArray.length;
    let arrayCheckBoxCoins = checkboxArray;


    let ArrayCoins = [];
    if (ArrayCheckBox > 0 && ArrayCheckBox <= 5) {
        const chartContainer = document.getElementById("chartContainer");
        document.getElementById("chartContainer").innerHTML = (`
        <div class="d-flex justify-content-center">
        <div class="spinner-border text-warning" role="status">
         <span class="sr-only"></span>
       </div>
       </div>`)
        chartContainer.style.display = "block";


        arrayCheckBoxCoins.map(coin => {
            ArrayCoins.push(coin.toUpperCase());


            let api = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${ArrayCoins}&tsyms=USD`;

            $.ajax({
                url: api,
                success: function (data) {

                    const result = data;

                    const resultValues = Object.values(result);
                    console.log(resultValues[0])

                    const coinsNames = Object.keys(result);

                    chartContainerFunc(resultValues, coinsNames);

                }
            });

            function chartContainerFunc(resultValues, coinsNames) {


                var chart = new CanvasJS.Chart('chartContainer', {
                    animationEnabled: true,
                    title: {
                        text: 'My Coins',
                    },
                    axisX: {
                        valueFormatString: 'DD MMM,YY',
                    },
                    axisY: {
                        title: 'prices',
                        suffix: '$',
                    },
                    legend: {
                        cursor: 'pointer',
                        fontSize: 16,
                        itemclick: toggleDataSeries,
                    },
                    toolTip: {
                        shared: true,
                    },
                    data: [
                        {
                            name: `${ArrayCoins[0]}`,
                            type: 'spline',
                            yValueFormatString: '#0.## $',
                            showInLegend: true,
                            xValueFormatString: "MMM YYYY",
                            yValueFormatString: "#,##0 $",
                            dataPoints: []
                        },
                        {
                            name: `${ArrayCoins[1]}`,
                            type: 'spline',
                            yValueFormatString: '#0.## $',
                            showInLegend: true,
                            xValueFormatString: "MMM YYYY",
                            yValueFormatString: "#,##0 $",
                            dataPoints: []
                        },
                        {
                            name: `${ArrayCoins[2]}`,
                            type: 'spline',
                            yValueFormatString: '#0.## $',
                            showInLegend: true,
                            xValueFormatString: "MMM YYYY",
                            yValueFormatString: "#,##0 U$",
                            dataPoints: []
                        },
                        {
                            name: `${ArrayCoins[3]}`,
                            type: 'spline',
                            yValueFormatString: '#0.## $',
                            showInLegend: true,
                            xValueFormatString: "MMM YYYY",
                            yValueFormatString: "#,##0 $",
                            dataPoints: []
                        },
                        {
                            name: `${ArrayCoins[4]}`,
                            type: 'spline',
                            yValueFormatString: '#0.## $',
                            showInLegend: true,
                            xValueFormatString: "MMM YYYY",
                            yValueFormatString: "#,##0 $",
                            dataPoints: []
                        },
                    ]
                })

                chart.render()
                addToGraph()

                function toggleDataSeries(e) {
                    if (
                        typeof e.dataSeries.visible === 'undefined' ||
                        e.dataSeries.visible
                    ) {
                        e.dataSeries.visible = false
                    } else {
                        e.dataSeries.visible = true
                    }
                    chart.render()
                }

                function addToGraph() {

                    let Y = resultValues[0].USD

                    let Day = 11

                    setInterval(function () {

                        let object = {
                            x: new Date(),
                            y: Y,
                        }


                        chart.data[0].dataPoints.push(object)
                        chart.data[1].dataPoints.push(object)
                        chart.data[2].dataPoints.push(object)
                        chart.data[3].dataPoints.push(object)
                        chart.data[4].dataPoints.push(object)
                        chart.render()
                        Y += 100
                        Day++
                    }, 2000)
                }
            }

        });
    }
    else {
        $('.cards-container').html('<h1 class="alertH1">Choose 5 coins or less to view Live Reporsts<h1>');
    }
});






















