//non-concurrent
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function openTab(tabName) {
    let i, tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).className += " active";
    // function to clear the ticker field
}
    function doClear() {
        document.getElementById("newForm").reset();
        document.getElementById("clear").focus();
        removeAllChildNodes(document.getElementById("details"));
    }
    var ticker;
    // function to handle work on submit
    function doSubmit() {
        document.getElementById("search").focus();
        removeAllChildNodes(document.getElementById("details"));
        ticker = document.getElementById("ticker").value;
        // Company outlook
        var co_req = new XMLHttpRequest();
        var co_url = '/find?ticker=' + ticker;
        co_req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                result = JSON.parse(this.responseText);
                if (Object.keys(result).length === 0) {
                    var errormsg = document.createElement("h4");
                    errormsg.setAttribute("id", "err");
                    errormsg.innerHTML = "Error : No record has been found, please enter a valid symbol.";
                    document.getElementById("details").appendChild(errormsg);
                    return;
                }
                var form2 = document.createElement("form");
                form2.setAttribute("id", "secondForm");

                var div = document.createElement("div")
                div.setAttribute("id", "div1");
                div.setAttribute("class", "tabs_container");

                var button1 = document.createElement('button');
                button1.setAttribute("type", "button");
                button1.setAttribute("class", "tablinks");
                button1.setAttribute("id", "CO");

                var text1 = document.createTextNode("Company Outlook");
                button1.appendChild(text1);

                var button2 = document.createElement('button');
                button2.setAttribute("type", "button");
                button2.setAttribute("class", "tablinks");
                button2.setAttribute("id", "SS");
                var text2 = document.createTextNode("Stock Summary");
                button2.appendChild(text2);

                var button3 = document.createElement('button');
                button3.setAttribute("type", "button");
                button3.setAttribute("class", "tablinks");
                button3.setAttribute("id", "HC");
                var text3 = document.createTextNode("Charts");
                button3.appendChild(text3);

                var button4 = document.createElement('button');
                button4.setAttribute("type", "button");
                button4.setAttribute("class", "tablinks");
                button4.setAttribute("id", "news");
                var text4 = document.createTextNode("Latest News");
                button4.appendChild(text4);

                //adding buttons to div
                //.appendChild(div);
                div.appendChild(button1);
                div.appendChild(button2);
                div.appendChild(button3);
                div.appendChild(button4);

                var tdiv = document.createElement("div");
                tdiv.setAttribute("id", "tabdiv");
                form2.appendChild(tdiv);

                var myTab = document.createElement("table");
                myTab.setAttribute("id", "table1");

                var mylist = ["name", "ticker", "exchangeCode", "startDate", "description"];
                var mynamelist = ["Company Name", "Stock Ticker Symbol", "Stock Exchange Code", "Company Start Date", "Description"];

                for (m = 0; m < mylist.length; m++) {
                    let a1 = document.createElement("TR");
                    let aa = document.createElement("TH");
                    aa.setAttribute("class", "a");
                    aa.innerHTML = mynamelist[m];
                    let ab = document.createElement("TD");
                    ab.setAttribute("class", "b");
                    ab.innerHTML = result[mylist[m]];
                    a1.appendChild(aa)
                    a1.appendChild(ab);
                    myTab.appendChild(a1);
                }


                tdiv.appendChild(myTab);

                document.getElementById("details").appendChild(div);
                document.getElementById("details").appendChild(form2);
                openTab("CO");
                document.getElementById('CO').onclick = function () {
                    GetCompanyOutlook();
                    openTab("CO");
                };
                document.getElementById('SS').onclick = function () {
                    GetStockSummary();
                    openTab("SS");
                };
                document.getElementById('HC').onclick = function () {
                    GetHighCharts();
                    openTab("HC");
                };
                document.getElementById('news').onclick = function () {
                    GetNews();
                    openTab("news");
                };


            }

        }

        co_req.open('GET', co_url, true);
        try {
            co_req.send();
        }
        catch (err) {
            console.log(err);
            console.log("here");
            // let msg="Error : No record has been found, please enter a valid symbol.";
            // document.getElementById("details").innerHTML=msg;
        }

    }
    function GetCompanyOutlook() {
        removeAllChildNodes(document.getElementById("tabdiv"));
        var myTab = document.createElement("table");
        myTab.setAttribute("id", "table1");

        var mylist = ["name", "ticker", "exchangeCode", "startDate", "description"];
        var mynamelist = ["Company Name", "Stock Ticker Symbol", "Stock Exchange Code", "Company Start Date", "Description"];

        for (m = 0; m < mylist.length; m++) {
            let a1 = document.createElement("TR");
            let aa = document.createElement("TH");
            aa.setAttribute("class", "a");
            aa.innerHTML = mynamelist[m];
            let ab = document.createElement("TD");
            ab.setAttribute("class", "b");
            ab.innerHTML = result[mylist[m]];
            a1.appendChild(aa)
            a1.appendChild(ab);
            myTab.appendChild(a1);
        }

        document.getElementById("tabdiv").appendChild(myTab);
    }
    function GetStockSummary() {
        document.getElementById("SS").setAttribute("class", "tablinks");
        document.getElementById("CO").setAttribute("class", "");
        document.getElementById("HC").setAttribute("class", "");
        document.getElementById("news").setAttribute("class", "");
        var ss_url = '/stockSummary?ticker=' + ticker;
        removeAllChildNodes(document.getElementById("tabdiv"));
        var ss_req = new XMLHttpRequest();
        //console.log('got here');
        ss_req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                result2 = JSON.parse(this.responseText);

                var myTab2 = document.createElement("table");
                myTab2.setAttribute("id", "table2");
                document.getElementById("tabdiv").appendChild(myTab2);
                var mylist2 = ["ticker", "timestamp", "prevClose", "open", "high", "low", "last"];
                var mynamelist2 = ["Stock Ticker Symbol", "Trading Day", "Previous Closing Price", "Opening Price", "High Price", "Low Price", "Last Price"];

                for (m = 0; m < mylist2.length; m++) {
                    let a1 = document.createElement("TR");
                    let aa = document.createElement("TH");
                    aa.setAttribute("class", "a");
                    aa.innerHTML = mynamelist2[m];
                    let ab = document.createElement("TD");
                    ab.setAttribute("class", "b");
                    ab.innerHTML = result2[mylist2[m]];
                    a1.appendChild(aa)
                    a1.appendChild(ab);
                    myTab2.appendChild(a1);
                }
                //for change
                let c1 = document.createElement("TR");
                let ca = document.createElement("TH");
                ca.setAttribute("class", "a");
                let cb = document.createElement("TD");
                cb.setAttribute("class", "b");
                //for change percent
                let cp1 = document.createElement("TR");
                let cpa = document.createElement("TH");
                cpa.setAttribute("class", "a");
                let cpb = document.createElement("TD");
                cpb.setAttribute("class", "b");
                ca.innerHTML = "Change";
                cpa.innerHTML = "Change Percent";
                if (result2['change'] > 0) {
                    cb.innerHTML = result2['change'] + "     <img src='https://csci571.com/hw/hw6/images/GreenArrowUp.jpg'>";
                    cpb.innerHTML = result2['percent'] + "%    <img src='https://csci571.com/hw/hw6/images/GreenArrowUp.jpg'>";
                } else if (result2['change'] < 0) {
                    cb.innerHTML = result2['change'] + "     <img src='https://csci571.com/hw/hw6/images/RedArrowDown.jpg'>";
                    cpb.innerHTML = result2['percent'] + "%    <img src='https://csci571.com/hw/hw6/images/RedArrowDown.jpg'>";
                } else {
                    cb.innerHTML = result2['change'];
                    cpb.innerHTML = result2['percent'] + "%";
                }
                //appending change and change percent to the table
                c1.appendChild(ca);
                c1.appendChild(cb);
                myTab2.appendChild(c1);
                cp1.appendChild(cpa);
                cp1.appendChild(cpb);
                myTab2.appendChild(cp1);

                let new1 = document.createElement("TR");
                let newa = document.createElement("TH");
                newa.setAttribute("class", "a");
                newa.innerHTML = "Number of Shares Traded";
                let newb = document.createElement("TD");
                newb.setAttribute("class", "b");
                newb.innerHTML = result2['volume'];
                new1.appendChild(newa);
                new1.appendChild(newb);
                myTab2.appendChild(new1);

            }
        }
        ss_req.open('GET', ss_url, true);
        try {
            ss_req.send();
        }
        catch (err) {
            console.log(err);
        }

    }

    function GetHighCharts() {
        var charts_url = '/HighCharts?ticker=' + ticker;
        removeAllChildNodes(document.getElementById("tabdiv"));
        document.getElementById("tabdiv").setAttribute("class", ".tabdiv1");
        var charts_req = new XMLHttpRequest();
        charts_req.onreadystatechange = function () {
            if (charts_req.readyState == 4 && charts_req.status == 200) {
                var response3 = JSON.parse(this.responseText);
                //alert(response3);
                // if (response3.length === 0) {
                //    return;
                // }
                var dates = [];
                var prices = [];
                var volumes = [];
                for (j = 0; j < response3.length; j++) {
                    let curritem = response3[j];
                    let curr_date = curritem['date'].split("-");
                    let day = curr_date[2].substring(0, 2);
                    let tempdate = Date.UTC(curr_date[0], curr_date[1] - 1, day);
                    //console.log(tempdate);
                    dates.push(tempdate);
                    //console.log("date");
                    prices.push(curritem['close']);
                    volumes.push(curritem['volume']);
                }
                var datePriceList = [];
                var dateVolumeList = [];
                var i;
                for (i = 0; i < dates.length; i++) {
                    //console.log(dates[i]);
                    datePriceList.push([dates[i], prices[i]]);
                    dateVolumeList.push([dates[i], volumes[i]]);
                    //console.log(datePriceList[i][0], datePriceList[i][1]);

                }
                var today_date = function () {
                    today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1; //As January is 0.
                    var yyyy = today.getFullYear();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;
                    return (yyyy + "-" + mm + "-" + dd);
                };
                let todaydate = today_date();
                //console.log(datePriceList.length);
                //console.log(dateVolumeList.length);
                let hdiv = document.createElement("div");
                hdiv.setAttribute("id", "hcdiv");
                document.getElementById("tabdiv").appendChild(hdiv);
                //Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json', function (data) {
                // create the chart
                Highcharts.stockChart('hcdiv', {

                    title: {
                        text: "Stock Price  " + ticker.toUpperCase() + "  " + todaydate
                    },

                    subtitle: {
                        useHTML: true,
                        text: '<a href="https://api.tiingo.com/" target="_blank" style="color:purple; text-decoration: underline;">Source: Tiingo</a>'
                    },
                    plotOptions: {
                        series: {
                            pointWidth: 2,
                            pointPlacement: 'on'
                        },
                        area: {
                            getExtremesFromAll: true,
                        },
                        column: {
                            getExtremesFromAll: true,
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        hideDelay: 1500,
                        style: {
                            pointerEvents: 'auto'
                        }
                    },
                    xAxis: {
                        gapGridLineWidth: 0

                    },
                    yAxis: [{
                        title: {
                            text: "Stock Price"
                        },
                        opposite: false,
                    }, {
                        title: {
                            text: "Volume",
                        },
                        opposite: true,
                    }],
                    rangeSelector:
                    {
                        buttons: [{
                            type: 'day',
                            count: 7,
                            text: '7d'
                        }, {
                            type: 'day',
                            count: 15,
                            text: '15d'
                        }, {
                            type: 'month',
                            count: 1,
                            text: '1m'
                        },
                        {
                            type: 'month',
                            count: 3,
                            text: '3m'
                        },
                        {
                            type: 'month',
                            count: 6,
                            text: '6m'
                        }],
                        selected: 4,
                        inputEnabled: false
                    },

                    series: [{
                        name: ticker.toUpperCase(),
                        type: 'area',
                        data: datePriceList,
                        yAxis: 0,
                        gapSize: 5,
                        tooltip: {
                            valueDecimals: 2
                        },
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        threshold: null
                    },
                    {
                        name: ticker.toUpperCase() + ' Volume',
                        type: 'column',
                        data: dateVolumeList,
                        gapSize: 5,
                        yAxis: 1,
                        tooltip: {
                            valueDecimals: 0
                        },
                        threshold: null
                    }
                    ]
                }

                );



            }
        }
        charts_req.open('GET', charts_url, true);
        try {
            charts_req.send();
        }
        catch (err) {
            console.log(err);
        }
    }

    function GetNews() {
        var news_url = '/GetNews?ticker=' + ticker;
        removeAllChildNodes(document.getElementById("tabdiv"));
        document.getElementById("tabdiv").removeAttribute("class");
        var news_req = new XMLHttpRequest();
        news_req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //alert(t['articles']);
                jsonObj2 = JSON.parse(this.responseText);
                console.log('got here');
                var articles = jsonObj2['articles'];
                let count = 0;
                for (i = 0; i < articles.length; i++) {
                    curr = articles[i];
                    if (count == 5) {
                        break;
                    }
                    currtitle = curr['title'];
                    currurl = curr['url'];
                    currimg = curr['urlToImage'];
                    currpub = curr['publishedAt'];
                    console.log(currtitle);
                    //if(currtitle == null || currurl==null || currimg==null || currpub==null ||currtitle == "" || currurl=="" || currimg=="" || currpub=="")
                    if (!currtitle || !currurl || !currimg || !currpub) {
                        continue;
                    }
                    else {
                        count = count + 1;
                        //document.getElementById("tabdiv").innerHTML="hey!"+count;
                        let d = document.createElement("div");
                        d.setAttribute("class", "newsdiv");
                        document.getElementById("tabdiv").appendChild(d);
                        let image = document.createElement('img');
                        image.setAttribute("class", 'newsimage');
                        image.src = currimg;

                        d.appendChild(image);

                        let trio = document.createElement("div");
                        trio.setAttribute("class", "contain");
                        d.appendChild(trio);

                        let title_ele = document.createElement('B');
                        title_ele.style.fontSize = "small";
                        title_ele.innerHTML = currtitle;

                        trio.appendChild(title_ele);

                        let pub = document.createElement('P');
                        let parts = currpub.split('-');
                        let dd = parts[2];
                        dd = dd.substring(0, 2);
                        console.log(parts[0], parts[1], parts[2]);
                        let pubd = parts[1] + "/" + dd + "/" + parts[0];
                        pub.style.fontSize = "small";
                        pub.innerHTML = "Published Date: " + pubd;
                        trio.appendChild(pub);

                        let link = document.createElement('A');
                        link.href = currurl;
                        link.style.fontSize = "small";
                        link.target = "_blank";
                        link.text = "See Original Post";

                        trio.appendChild(link);

                        let space = document.createElement("div");
                        space.setAttribute("class", "newsgap");
                        document.getElementById("tabdiv").appendChild(space);

                    }
                }

            }
        }
        news_req.open('GET', news_url, true);
        try {
            news_req.send();
        }
        catch (err) {
            console.log(err);
        }

    }
