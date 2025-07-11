const flightID = new URLSearchParams(window.location.search).get('id');

if (flightID) {
    fetch(`/v1/flights/${flightID}`)
        .then(response => response.json())
        .then(data => {
            const flight = data.data.flight;
            document.getElementById('flightNumber').textContent = flight.flightNumber;
            document.getElementById('aircraft').textContent = flight.aircraft;
            document.getElementById('airline').textContent = flight.airline;
            document.getElementById('origin').textContent = flight.origin;
            document.getElementById('destination').textContent = flight.destination;
            document.getElementById('departure').textContent = new Date(flight.departure).toString();
            document.getElementById('arrival').textContent = new Date(flight.arrival).toString();
            document.getElementById('capacity').textContent = flight.capacity;
            document.getElementById('occupation').textContent = flight.occupation;
            document.getElementById('availableSeats').textContent = flight.capacity - flight.occupation;
            
            document.getElementById('fninput').value = flight.flightNumber;
            document.getElementById('aircraftinput').value = flight.aircraft;
            document.getElementById('airlineinput').value = flight.airline;
            document.getElementById('origininput').value = flight.origin;
            document.getElementById('destinationinput').value = flight.destination;
            document.getElementById('departureinput').value = new Date(flight.departure).toISOString().slice(0, 16);
            document.getElementById('arrivalinput').value = new Date(flight.arrival).toISOString().slice(0, 16);
            document.getElementById('capacityinput').value = flight.capacity;
            document.getElementById('occupationinput').value = flight.occupation;
        })
        .catch(error => {
            console.error('Error fetching flight details:', error);
        });
} else {
    document.getElementById('flightDetails').innerHTML = '<p class="text-danger">No flight ID provided.</p>';
}

const updateFlightButton = document.getElementById('updateFlight');
if (updateFlightButton) {
    updateFlightButton.addEventListener('click', () => {
        const flightNumber = document.getElementById('fninput').value;
        const aircraft = document.getElementById('aircraftinput').value;
        const airline = document.getElementById('airlineinput').value;
        const origin = document.getElementById('origininput').value;
        const destination = document.getElementById('destinationinput').value;
        const departure = new Date(document.getElementById('departureinput').value).toISOString();
        const arrival = new Date(document.getElementById('arrivalinput').value).toISOString();
        const capacity = parseInt(document.getElementById('capacityinput').value, 10);
        const occupation = parseInt(document.getElementById('occupationinput').value, 10);
        const flightData = {
            flightNumber,
            aircraft,
            airline,
            origin,
            destination,
            departure,
            arrival,
            capacity,
            occupation
        };
        fetch(`/v1/flights/${flightID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    alert('Flight updated successfully!');
                    window.location.href = `/flight.html?id=${data.data.flight._id}`;
                } else {
                    alert('Error updating flight: ' + data.message);
                }
            })
        })
    }

const deleteFlightButton = document.getElementById('deleteFlight');
if (deleteFlightButton) {
    deleteFlightButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this flight?')) {
            fetch(`/v1/flights/${flightID}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 'success') {
                        alert('Flight deleted successfully!');
                        window.location.href = '/index.html';
                    } else {
                        alert('Error deleting flight: ' + data.message);
                    }
                })
        }
    });
}