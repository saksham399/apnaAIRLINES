fetch('/v1/flights/')
    .then(response => response.json())
    .then(data => {
        const flights = data.data.flights;
        const container = document.getElementById('flights');
        flights.forEach(flight => {
            const card = document.createElement('div');
            card.classList.add('card','mb-2','shadow-sm');
            card.innerHTML = `
                <div class="card-body">
                    <table class="table table-borderless table-hover">
                        <tr>
                            <td><h3 class="card-title">${flight.flightNumber}</h3></td>
                            <td><h4 class="card-text">Departure</h4></td>
                            <td><h4 class="card-text">Arrival</h4></td>
                        </tr>
                        <tr>
                            <td><h4 class="card-text"><b>${flight.origin}</b> to <b>${flight.destination}</b></h4></td>
                            <td class="card-text"><h5>${new Date(flight.departure).toString()}</h5></td>
                            <td class="card-text"><h5>${new Date(flight.arrival).toString()}</h5></td>
                        </tr>
                    </table>
                    <div class="text-center">
                        <a href="/flight.html?id=${flight._id}" class="btn btn-primary w-100">View More Details</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        })
    })

const applybtn = document.getElementById('applyFilter');
if (applybtn) {
    applybtn.addEventListener('click', () => {
        const origin = document.getElementById('originFilter').value;
        const destination = document.getElementById('destinationFilter').value;
        const departureDate = document.getElementById('departureDateFilter').value ? new Date(document.getElementById('departureDateFilter').value).toISOString() : '';
        const arrivalDate = document.getElementById('arrivalDateFilter').value ? new Date(document.getElementById('arrivalDateFilter').value).toISOString() : '';
        const flparams = new URLSearchParams();
        if (origin) flparams.append('origin', origin);
        if (destination) flparams.append('destination', destination);
        if (departureDate) flparams.append('departure', departureDate);
        if (arrivalDate) flparams.append('arrival', arrivalDate);
        console.log(`/v1/flights/?${flparams.toString()}`);
        fetch(`/v1/flights/?${flparams.toString()}`)
            .then(response => response.json())
            .then(data => {
                const flights = data.data.flights;
                const container = document.getElementById('flights');
                container.innerHTML = 'No flights found'; 
                flights.forEach(flight => {
                    const card = document.createElement('div');
                    card.classList.add('card','mb-2','shadow-sm');
                    card.innerHTML = `
                        <div class="card-body">
                            <table class="table table-borderless table-hover">
                                <tr>
                                    <td><h3 class="card-title">${flight.flightNumber}</h3></td>
                                    <td><h4 class="card-text">Departure</h4></td>
                                    <td><h4 class="card-text">Arrival</h4></td>
                                </tr>
                                <tr>
                                    <td><h4 class="card-text"><b>${flight.origin}</b> to <b>${flight.destination}</b></h4></td>
                                    <td class="card-text"><h5>${new Date(flight.departure).toString()}</h5></td>
                                    <td class="card-text"><h5>${new Date(flight.arrival).toString()}</h5></td>
                                </tr>
                            </table>
                            <div class="text-center">
                                <a href="/flight.html?id=${flight._id}" class="btn btn-primary w-100">View More Details</a>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });    
            });
    })
}

const createFlightButton = document.getElementById('createFlightButton');
if (createFlightButton) {
    createFlightButton.addEventListener('click', () => {
        console.log('Create Flight Button Clicked');
        const flightNumber = document.getElementById('flightNumber').value;
        const aircraft = document.getElementById('aircraft').value;
        const airline = document.getElementById('airline').value;
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        const departure = new Date(document.getElementById('departureDate').value).toISOString();
        const arrival = new Date(document.getElementById('arrivalDate').value).toISOString();
        const capacity = parseInt(document.getElementById('capacity').value, 10);
        const occupation = parseInt(document.getElementById('occupation').value, 10);
        fetch('/v1/flights/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                flightNumber,
                aircraft,
                airline,
                origin,
                destination,
                departure,
                arrival,
                capacity,
                occupation
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === 'success') {
                alert('Flight created successfully!');
                window.location.href = `/flight.html?id=${data.data.flight._id}`;
            } else {
                alert('Error creating flight: ' + data.message);
                window.location.href = '/';
            }
        })
    })
}