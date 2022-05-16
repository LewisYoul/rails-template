import * as React from 'react'                         
import L from 'leaflet'                
                                                        
function Map() {
  React.useEffect(() => {
    const newMap = L.map('map').setView([51.505, -0.09], 13);
    const accessToken = 'pk.eyJ1IjoibGV3aXN5b3VsIiwiYSI6ImNqYzM3a3lndjBhOXQyd24zZnVleGh3c2kifQ.qVH2-BA02t3p62tG72-DZA';

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      tileSize: 512,
      id: 'mapbox/streets-v11',
      zoomOffset: -1,
      accessToken: accessToken
    }).addTo(newMap);
  }, [])  
                            
  return (
      <div className="w-full flex flex-col justify-end">
        <div className="h-full w-full flex-1" id="map">
        </div>
        <div id="listContainer" className="overflow-auto h-72 max-h-72">
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
          <h1>erfsefs</h1>
        </div>
      </div>
  )                   
}                                                       
                                        
// // Use it if you don't plan to use "remount"                
// document.addEventListener('DOMContentLoaded', () => {     
//   ReactDOM.render(<Map />, document.getElementById('Map'))                  
// })                                                    
                                                        
export default Map