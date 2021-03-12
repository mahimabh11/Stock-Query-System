from flask import Flask
from flask_cors import CORS, cross_origin
import requests
from flask import request,jsonify
from datetime import date
from dateutil.relativedelta import relativedelta, MO
import calendar
import json 

application = Flask(__name__)
cors = CORS(application)
TIINGO="f18511783e1cce638f841728d49fc80cd0749058"
#newsapi = NewsApiClient(api_key='0f834ceaf0c5464087ad8d450e67daf9')

@application.route('/')
@cross_origin()
def index():
    return application.send_static_file('index.html')

@application.route("/find", methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def find():
    ticker = request.args.get('ticker')
    co_requestResponse = requests.get("https://api.tiingo.com/tiingo/daily/" + ticker +"?"+"token=" + TIINGO)
    company_outlook = co_requestResponse.json()
    res=company_outlook
    tempkey='detail'
    if tempkey in res:
        print("here")
        if res[tempkey]=='Not found.':
            print("heretoo")
            return({})
    #res=dict()
    #res['description']=company_outlook['description']
    #res['startDate']=company_outlook['startDate']
    #res['name']=company_outlook['name']
    #res['ticker']=company_outlook['ticker']
    #res['exchangeCode']=company_outlook['exchangeCode']
    #return(jsonify(res))
    #print(company_outlook)
    return (company_outlook)

@application.route("/stockSummary", methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def stockSummary():
    headers = {
    'Content-Type': 'application/json'
    }
    ticker = request.args.get('ticker')
    ss_requestResponse =requests.get("https://api.tiingo.com/iex/"+ticker+"?token="+TIINGO, headers=headers)
    summary = ss_requestResponse.json()
    summary=summary[0]
    #print(summary)
    summ=dict()
    summ['ticker']=summary['ticker']
    summ['timestamp']=summary['timestamp'][:10]
    summ['prevClose']=summary['prevClose']
    summ['open']=summary['open']
    summ['high']=summary['high']
    summ['low']=summary['low']
    summ['last']=summary['last']
    temp1=summary['last']
    temp2=summary['prevClose']
    summ['change']=round(summ['last']-summ['prevClose'],2)
    tempval=summ['change']/summ['prevClose']
    summ['percent']=round(tempval*100,2)
    summ['volume']=summary['volume']
    #print("here",json.dumps(summ))
    return(json.dumps(summ))


@application.route("/HighCharts", methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def GetHighCharts():
    headers = {
    'Content-Type': 'application/json'
    }
    ticker = request.args.get('ticker')
    TODAY = date.today()
    start=TODAY+relativedelta(months=-6)
    start=start.strftime('%y-%m-%d')
    #start=str(start)
    #print(start)
    hc_requestResponse =requests.get("https://api.tiingo.com/iex/"+ticker+"/prices?startDate=20"+start+"&resampleFreq=12hour&columns=open,high,low,close,volume&token="+TIINGO, headers=headers)
    #print("https://api.tiingo.com/iex/aapl/prices?startDate="+start+"&resampleFreq=12hour&columns=open,high,low,close,volume&token="+TIINGO)
    temp=hc_requestResponse.json()
    #print(json.dumps(temp))
    return(json.dumps(temp))

@application.route("/GetNews", methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def GetNews():
    headers = {
    'Content-Type': 'application/json'
    }
    ticker = request.args.get('ticker')
    n_requestResponse =requests.get("https://newsapi.org/v2/everything?apiKey=0f834ceaf0c5464087ad8d450e67daf9&q="+ticker, headers=headers)
    val=n_requestResponse.json()
    #val=val['articles']
    #print(val)
    #print(json.dumps(val))
    return(json.dumps(val))

if __name__ == "__main__":
    application.run()
  