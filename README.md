# Getting Started
This app uses React, with API's from ```https://positionstack.com/``` and ```https://www.weather.gov/documentation/services-web-api#/``` An API key is needed for positionstack, however I am using their free plan and have no monetary or soft limit restrictions and therefore have included it in the application. If the API key does not work, feel free to get a new one from ```https://positionstack.com/```. Localstorage is used to favorite locations, and the same location can be favorited more than once. 

## Things to consider
The more specific the address searched, the more accurate the result will be.

The project is hosted at ```http://weatherappcadre.surge.sh/```


## Notable bugs
The positionstack API sometimes returns empty arrays on valid addresses - a refresh and retry usually fixes that.

If it errors out on a valid address or postal code, it could be that the weather service doesn't have data for the specific location. 

Sometimes the app takes a few refreshes to work properly.

This app only works on HTTP, as the free API provided by positionstack is not hosted on HTTPS. This will cause issues when using the positionstack API and hosting on a HTTPS page. This is why I chose to host it on surge, as HTTP and HTTPS options are available to me.