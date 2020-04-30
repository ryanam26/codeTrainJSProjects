async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('p');
        root.style.textAlign = 'center'
        const input = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img')

        input.textContent = `input: ${item.input}`;
        geo.textContent = `${item.lat}°, ${item.lon}°`
        const dateString = new Date(item.timestamp).toLocaleString();
        console.log(dateString)
        date.textContent = dateString
        image.src = item.image64

        root.append(input, geo, date, image);
        document.body.append(root);
    }
    console.log(data)
}

getData()