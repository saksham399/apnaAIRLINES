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
        })
        .catch(error => {
            console.error('Error fetching flight details:', error);
            document.getElementById('flightDetails').innerHTML = '<p class="text-danger">Error loading flight details.</p>';
        });
} else {
    document.getElementById('flightDetails').innerHTML = '<p class="text-danger">No flight ID provided.</p>';
}