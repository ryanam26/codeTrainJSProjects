        // Starting p5 here    
        function setup() {

            noCanvas();
            const video = createCapture(VIDEO);
            video.size(320, 240)
            video.position(529, 300);

            // Adding event listener to button to send lat and lon
          let lat, lon;
          const button = document.getElementById('submit');
          button.addEventListener('click', async event => {
            const input = document.getElementById('inp').value;
            //convert video to base64
            video.loadPixels();
            const image64 = video.canvas.toDataURL();
            const data = { lat, lon, input, image64 };
            const options = {   
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            };
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(json);
          });

          //Checking if Geolocation is available in browser then adding to p tag
          if ('geolocation' in navigator) {
            console.log('geolocation available');
            navigator.geolocation.getCurrentPosition(async position => {
              lat = position.coords.latitude;
              lon = position.coords.longitude;
              document.getElementById('latitude').textContent = lat;
              document.getElementById('longitude').textContent = lon;
            });
          } else {
            console.log('geolocation not available');
          }

        };