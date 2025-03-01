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
    
    // Set up body parts filter event
    const bodyPartsFilter = document.getElementById('body-parts-filter');
    
    // Use a simpler approach with just the change event
    bodyPartsFilter.addEventListener('change', function() {
        const selectedBodyPart = this.value;
        console.log(`Body part changed to: ${selectedBodyPart}`);
        
        // Update equipment options based on selected body part
        updateEquipmentForBodyPart(selectedBodyPart);
    });
    
    document.getElementById('equipment-filter').addEventListener('change', filterResults);
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    
    // Initialize equipment options
    updateEquipmentOptions("");
    
    // Initialize with all gyms
    filteredGyms = [...gymData];
    
    // Display initial results
    displayResults(filteredGyms);
    
    console.log('Application initialized with', gymData.length, 'gyms');
    
    // Add a manual trigger for the body parts filter change event
    document.getElementById('body-parts-filter').onchange = function() {
        const selectedBodyPart = this.value;
        console.log(`Manual trigger - Body part changed to: ${selectedBodyPart}`);
        updateEquipmentOptions(selectedBodyPart);
    };
});

// Update equipment options based on selected body part
function updateEquipmentOptions(selectedBodyPart) {
    console.log(`Updating equipment options for body part: ${selectedBodyPart}`);
    
    const equipmentFilter = document.getElementById('equipment-filter');
    if (!equipmentFilter) {
        console.error("Equipment filter element not found!");
        return;
    }
    
    // Clear current options except the first one
    while (equipmentFilter.options.length > 1) {
        equipmentFilter.remove(1);
    }
    
    // If no body part is selected, show all equipment options
    if (!selectedBodyPart) {
        console.log("No body part selected, showing all equipment");
        Object.keys(equipmentTypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = equipmentTypes[key].name;
            equipmentFilter.appendChild(option);
        });
        return;
    }
    
    // Debug: Check what equipment types are available
    console.log(`Available equipment types: ${Object.keys(equipmentTypes).length}`);
    
    // Filter equipment that targets the selected body part
    const relevantEquipment = Object.keys(equipmentTypes).filter(key => {
        // Check if this equipment targets the selected body part
        if (equipmentTypes[key].trainingFocus &&
            equipmentTypes[key].trainingFocus.includes(selectedBodyPart)) {
            console.log(`Equipment ${equipmentTypes[key].name} matches body part ${selectedBodyPart}`);
            return true;
        }
        return false;
    });
    
    console.log(`Found ${relevantEquipment.length} equipment items for ${selectedBodyPart}`);
    
    // Add filtered equipment options
    relevantEquipment.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = equipmentTypes[key].name;
        equipmentFilter.appendChild(option);
    });
    
    // If no equipment found for this body part, show a message
    if (relevantEquipment.length === 0) {
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "No specific equipment for this body part";
        option.disabled = true;
        equipmentFilter.appendChild(option);
    }
}

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

// Filter results based on region, body parts, and equipment
function filterResults() {
    const bodyPartsFilter = document.getElementById('body-parts-filter').value;
    const equipmentFilter = document.getElementById('equipment-filter').value;
    
    // Start with all gyms
    let results = [...gymData];
    
    // Apply region filter if selected
    if (selectedRegion) {
        results = results.filter(gym => gym.region === selectedRegion);
        console.log(`Filtering by region: ${selectedRegion}, found ${results.length} gyms`);
    }
    
    // Apply body parts filter if selected
    if (bodyPartsFilter) {
        results = results.filter(gym => gym.trainingFocus.includes(bodyPartsFilter));
        console.log(`Filtering by body part: ${bodyPartsFilter}, found ${results.length} gyms`);
    }
    
    // Apply equipment filter if selected
    if (equipmentFilter) {
        results = results.filter(gym => gym.equipment.includes(equipmentFilter));
        console.log(`Filtering by equipment: ${equipmentFilter}, found ${results.length} gyms`);
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
        
        // Create body parts tags
        const bodyPartsTags = gym.trainingFocus.slice(0, 3).map(tf => {
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
                <h4>Parts of Body:</h4>
                ${bodyPartsTags}
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

// Function to update equipment options based on selected body part (called from HTML)
function updateEquipmentForBodyPart(selectedBodyPart) {
    console.log(`Direct HTML call - Body part changed to: ${selectedBodyPart}`);
    
    const equipmentFilter = document.getElementById('equipment-filter');
    
    // Clear current options except the first one
    while (equipmentFilter.options.length > 1) {
        equipmentFilter.remove(1);
    }
    
    // If no body part is selected, show all equipment options
    if (!selectedBodyPart) {
        console.log("No body part selected, showing all equipment");
        Object.keys(equipmentTypes).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = equipmentTypes[key].name;
            equipmentFilter.appendChild(option);
        });
        return;
    }
    
    // Filter equipment that targets the selected body part
    const relevantEquipment = Object.keys(equipmentTypes).filter(key => {
        // Check if this equipment targets the selected body part
        if (equipmentTypes[key].trainingFocus &&
            equipmentTypes[key].trainingFocus.includes(selectedBodyPart)) {
            console.log(`Equipment ${equipmentTypes[key].name} matches body part ${selectedBodyPart}`);
            return true;
        }
        return false;
    });
    
    console.log(`Found ${relevantEquipment.length} equipment items for ${selectedBodyPart}`);
    
    // Add filtered equipment options
    relevantEquipment.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = equipmentTypes[key].name;
        equipmentFilter.appendChild(option);
    });
    
    // If no equipment found for this body part, show a message
    if (relevantEquipment.length === 0) {
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "No specific equipment for this body part";
        option.disabled = true;
        equipmentFilter.appendChild(option);
    }
    
    // Apply filters
    filterResults();
}

// Make the function available globally
window.updateEquipmentForBodyPart = updateEquipmentForBodyPart;