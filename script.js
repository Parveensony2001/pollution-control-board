
mapboxgl.accessToken = "pk.eyJ1Ijoic3ViaGFtcHJlZXQiLCJhIjoiY2toY2IwejF1MDdodzJxbWRuZHAweDV6aiJ9.Ys8MP5kVTk5P9V2TDvnuDg";

                        document.addEventListener('DOMContentLoaded', function () {
                          const button_main = document.querySelector(".mapbox-directions-profile");
                          console.log(button_main+"123 button is work");
                          // Create an <input> element
                          const inputair = document.createElement('input');
                          inputair.setAttribute('id', 'lessair');
                          inputair.setAttribute('type', 'radio'); // Corrected 'typ' to 'type'
                          inputair.setAttribute('class', 'lessairtraffic');
                          inputair.setAttribute('value', 'drive-airpolution');

                          // Append the <input> element to the button_main element
                          button_main.appendChild(inputair);

                          const label = document.createElement('label');
                          label.textContent = "pollution Less"

                          button_main.appendChild(label);
                          document.querySelector('.lessairtraffic').addEventListener('click',()=>{

                            //api call for polution ppm deta
                        fetch('https://aqicn.org/air-cache/header/bundle.min.js?_=20230812.100940')
                        .then(response => response.text())
                        .then(data => {

                          const ppmData = parseData(data);
/***
 * 
 * we can use if i access api data then i able to give name X , Y  Z
 */
                          const routes = [
                            { name: 'Route X', ppm: calculateAveragePPM(ppmData, 'Route X') },
                            { name: 'Route Y', ppm: calculateAveragePPM(ppmData, 'Route Y') },
                            { name: 'Route Z', ppm: calculateAveragePPM(ppmData, 'Route Z') },
                          ];

                          // Find the route with the lowest ppm
                          const lowestPPMRoute = findLowestPPMRoute(routes);
                          const highervalueppm = null;
                          function findlong() {
                            let highvalue = -Infinity;

                            for(const route of routes){
                              if(route.ppm > highvalue){
                                highervalue = route.ppm;
                                highervalueppm = highvalue;
                              }
                            }
                          }
                          const LONGPPMRoute = findlong();
                          // If a lower ppm route is found, update the map/navigation system
                          if (lowestPPMRoute) {
                            updateMap(lowestPPMRoute);
                          } else if(!lowestPPMRoute){
                            updateMap(highervalueppm);
                            console.log('No lower ppm route available so this way is best for you');
                          }else{
                            console.log('no way is found you can use daily route.');
                          }
                        })
                        .catch(error => {
                          console.error('Error fetching air quality data:', error);
                        });

                        function parseData(data) {
                        const ppmValues = data.match(/ppm=(\d+)/);
                        return ppmValues ? ppmValues.map(Number) : [];
                        }

                        function calculateAveragePPM(ppmData, routeName) {
                        // Calculate the average ppm for the given route
                        // Example: Sum ppm values and divide by the number of data points
                        const ppmSum = ppmData.reduce((sum, ppm) => sum + ppm, 0);
                        const averagePPM = ppmData.length > 0 ? ppmSum / ppmData.length : 0;
                        console.log(`Average PPM for ${routeName}: ${averagePPM}`);
                        return averagePPM;
                        }

                        // Find the route with the lowest ppm
                        function findLowestPPMRoute(routes) {
                        return routes.reduce((lowestRoute, route) => {
                          return route.ppm < lowestRoute.ppm ? route : lowestRoute;
                        }, routes[0]);
                        }

                        // Update the map or navigation system with the selected route
                        function updateMap(route) {
                        console.log(`Selected route: ${route.name}`);
                          /*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
                           * 
                           * 
                          we can use any type of element update becouse we have less ppm number route and so at a time i only update in text bar is less poluted way 

                          but at time i have not map data so i am not accesse map data and map route if i fatch then i am able to apply if case and interchange route 
                           
                           * 
                           * ********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */
                        }

                          })
                        });

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
});

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([-2.24, 53.48]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });

  map.addControl(directions, "top-left");
}
