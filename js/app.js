// Global variables
let map;
let markers = [];
let filteredGyms = [];
let selectedRegion = ""; // Track the selected region

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('search-btn').addEventListener('click', searchGyms);
    
    // Set up region button event listeners
    const regionButtons = document.querySelectorAll('.region-btn');
    regionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Prevent default button behavior
            event.preventDefault();
            
            // Remove active class from all buttons
            regionButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update selected region
            selectedRegion = this.getAttribute('data-region');
            console.log(`Region changed to: ${selectedRegion}`);
            
            // Apply filters immediately
            filterResults();
        });
    });
    
    document.getElementById('equipment-filter').addEventListener('change', filterResults);
    document.getElementById('training-filter').addEventListener('change', filterResults);
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    
    // Initialize with all gyms
    filteredGyms = [...gymData];
    
    // Display initial results
    displayResults(filteredGyms);
    
    console.log('Application initialized with', gymData.length, 'gyms');
});

// Initialize Google Map
function initMap() {
    // Default center (Hong Kong)
    const defaultCenter = { lat: 22.3193, lng: 114.1694 };
    
    // Create the map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: defaultCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
            {
                featureType: 'poi.business',
                stylers: [{ visibility: 'on' }]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });
    
    // Add markers for all gyms initially
    addMarkers(gymData);
}

// Add markers to the map
function addMarkers(gyms) {
    // Clear existing markers
    clearMarkers();
    
    // Add new markers
    gyms.forEach(gym => {
        const marker = new google.maps.Marker({
            position: { lat: gym.lat, lng: gym.lng },
            map: map,
            title: gym.name,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            },
            animation: google.maps.Animation.DROP
        });
        
        // Add click event to marker
        marker.addListener('click', () => {
            // Center map on marker
            map.setCenter(marker.getPosition());
            
            // Create info window content
            const contentString = `
                <div class="info-window">
                    <h3>${gym.name}</h3>
                    <p>${gym.address}</p>
                    <p><strong>Rating:</strong> ${gym.rating}/5</p>
                    <button onclick="viewGymDetails(${gym.id})">View Details</button>
                </div>
            `;
            
            // Create and open info window
            const infoWindow = new google.maps.InfoWindow({
                content: contentString
            });
            
            infoWindow.open(map, marker);
        });
        
        // Add marker to markers array
        markers.push(marker);
    });
    
    // If no gyms, show message
    if (gyms.length === 0) {
        document.getElementById('results-count').textContent = 'No gyms found matching your criteria';
    } else {
        // Fit map to markers if there are any
        if (markers.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            markers.forEach(marker => bounds.extend(marker.getPosition()));
            map.fitBounds(bounds);
            
            // If only one marker, zoom in more
            if (markers.length === 1) {
                map.setZoom(15);
            }
        }
    }
}

// Clear all markers from the map
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// Search for gyms based on region and filters
function searchGyms() {
    // Log the selected region for debugging
    console.log(`Search clicked with region: ${selectedRegion}`);
    
    // Apply all filters
    filterResults();
}

// Filter results based on region, equipment, and training focus
function filterResults() {
    const equipmentFilter = document.getElementById('equipment-filter').value;
    const trainingFilter = document.getElementById('training-filter').value;
    
    // Start with all gyms
    let results = [...gymData];
    
    // Apply region filter if selected
    if (selectedRegion) {
        results = results.filter(gym => gym.region === selectedRegion);
        console.log(`Filtering by region: ${selectedRegion}, found ${results.length} gyms`);
    }
    
    // Apply equipment filter if selected
    if (equipmentFilter) {
        results = results.filter(gym => gym.equipment.includes(equipmentFilter));
    }
    
    // Apply training focus filter if selected
    if (trainingFilter) {
        results = results.filter(gym => gym.trainingFocus.includes(trainingFilter));
    }
    
    // Update filtered gyms
    filteredGyms = results;
    
    // Display results
    displayResults(filteredGyms);
    
    // Update map markers
    addMarkers(filteredGyms);
}

// Display gym results in the results list
function displayResults(gyms) {
    const resultsContainer = document.getElementById('gym-results');
    const resultsCount = document.getElementById('results-count');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Update results count
    resultsCount.textContent = `${gyms.length} results found`;
    
    // Display each gym
    gyms.forEach(gym => {
        // Create gym card
        const gymCard = document.createElement('div');
        gymCard.className = 'gym-card';
        
        // Create region badge
        const regionBadge = `<span class="region-badge">${gym.region}</span>`;
        
        // Create equipment tags
        const equipmentTags = gym.equipment.slice(0, 3).map(eq => {
            return `<span class="tag">${equipmentTypes[eq].name}</span>`;
        }).join('');
        
        // Create training focus tags
        const trainingTags = gym.trainingFocus.slice(0, 3).map(tf => {
            return `<span class="tag">${trainingFocusCategories[tf].name}</span>`;
        }).join('');
        
        // Set gym card HTML
        gymCard.innerHTML = `
            <div class="gym-card-header">
                <h3>${gym.name}</h3>
                <div class="gym-rating">${gym.rating}/5</div>
            </div>
            <div class="gym-address">${gym.address} ${regionBadge}</div>
            <div class="gym-equipment">
                <h4>Equipment:</h4>
                ${equipmentTags}
                ${gym.equipment.length > 3 ? `<span class="tag">+${gym.equipment.length - 3} more</span>` : ''}
            </div>
            <div class="gym-training">
                <h4>Training Focus:</h4>
                ${trainingTags}
                ${gym.trainingFocus.length > 3 ? `<span class="tag">+${gym.trainingFocus.length - 3} more</span>` : ''}
            </div>
            <div class="gym-actions">
                <button onclick="viewGymDetails(${gym.id})">View Details</button>
                <button onclick="centerMapOnGym(${gym.id})">Show on Map</button>
            </div>
        `;
        
        // Add gym card to results container
        resultsContainer.appendChild(gymCard);
    });
}

// Center map on specific gym
function centerMapOnGym(gymId) {
    const gym = gymData.find(g => g.id === gymId);
    if (gym) {
        map.setCenter({ lat: gym.lat, lng: gym.lng });
        map.setZoom(16);
        
        // Find and animate the marker
        markers.forEach(marker => {
            if (marker.getTitle() === gym.name) {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => {
                    marker.setAnimation(null);
                }, 2100);
            }
        });
    }
}

// View gym details (would typically open a modal or navigate to a details page)
function viewGymDetails(gymId) {
    const gym = gymData.find(g => g.id === gymId);
    if (gym) {
        alert(`Viewing details for ${gym.name}\n\nIn a full implementation, this would open a detailed view with more information, photos, and reviews.`);
        // In a real implementation, this would open a modal or navigate to a details page
    }
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real implementation, this would send the form data to a server
    alert(`Thank you for your message, ${name}!\n\nWe'll get back to you at ${email} as soon as possible.`);
    
    // Reset form
    event.target.reset();
}

// Make functions available globally
window.viewGymDetails = viewGymDetails;
window.centerMapOnGym = centerMapOnGym;