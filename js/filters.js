// Filter dependencies handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('Filters.js loaded');
    
    // Equipment types organized by body part
    const equipmentByBodyPart = {
        'upper-body': [
            'bench-press',
            'cable-machine',
            'free-weights',
            'weight-machines',
            'rowing-machine',
            'smith-machine',
            'olympic-lifting-area',
            'functional-training-area',
            'boxing-area'
        ],
        'lower-body': [
            'treadmill',
            'elliptical',
            'stationary-bike',
            'stair-climber',
            'squat-rack',
            'free-weights',
            'weight-machines',
            'smith-machine',
            'deadlift-platform',
            'olympic-lifting-area',
            'functional-training-area'
        ],
        'core': [
            'free-weights',
            'weight-machines',
            'cable-machine',
            'functional-training-area',
            'yoga-studio',
            'pilates-equipment',
            'stretching-area'
        ],
        'cardio': [
            'treadmill',
            'elliptical',
            'stationary-bike',
            'rowing-machine',
            'stair-climber',
            'cross-trainer',
            'functional-training-area',
            'boxing-area'
        ],
        'flexibility': [
            'yoga-studio',
            'pilates-equipment',
            'stretching-area'
        ],
        'strength': [
            'free-weights',
            'weight-machines',
            'squat-rack',
            'bench-press',
            'cable-machine',
            'smith-machine',
            'deadlift-platform',
            'olympic-lifting-area',
            'functional-training-area'
        ]
    };
    
    // Get the filter elements
    const bodyPartsFilter = document.getElementById('body-parts-filter');
    const equipmentFilter = document.getElementById('equipment-filter');
    
    if (!bodyPartsFilter || !equipmentFilter) {
        console.error('Filter elements not found');
        return;
    }
    
    // Function to update equipment options based on selected body part
    function updateEquipmentOptions(selectedBodyPart) {
        console.log(`Updating equipment options for body part: ${selectedBodyPart}`);
        
        // Clear current options except the first one
        while (equipmentFilter.options.length > 1) {
            equipmentFilter.remove(1);
        }
        
        // If no body part is selected, show all equipment options
        if (!selectedBodyPart) {
            console.log('No body part selected, showing all equipment');
            Object.keys(equipmentTypes).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = equipmentTypes[key].name;
                equipmentFilter.appendChild(option);
            });
            return;
        }
        
        // Get equipment for the selected body part
        const relevantEquipment = equipmentByBodyPart[selectedBodyPart] || [];
        console.log(`Found ${relevantEquipment.length} equipment items for ${selectedBodyPart}`);
        
        // Add filtered equipment options
        relevantEquipment.forEach(key => {
            if (equipmentTypes[key]) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = equipmentTypes[key].name;
                equipmentFilter.appendChild(option);
            }
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
    
    // Add change event listener to body parts filter
    bodyPartsFilter.addEventListener('change', function() {
        const selectedBodyPart = this.value;
        console.log(`Body part changed to: ${selectedBodyPart}`);
        updateEquipmentOptions(selectedBodyPart);
        
        // Apply filters if filterResults function exists
        if (typeof filterResults === 'function') {
            filterResults();
        }
    });
    
    // Initialize equipment options
    updateEquipmentOptions(bodyPartsFilter.value);
    
    console.log('Filter dependencies initialized');
});