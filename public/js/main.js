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
                        <a href="/v1/flights/${flight._id}" class="btn btn-primary w-100">View More Details</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        })
    })