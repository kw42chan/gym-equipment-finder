// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('gym-submission-form');
    
    // Add submit event listener
    form.addEventListener('submit', handleFormSubmit);
});

// Handle form submission
function handleFormSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    // Validate the form
    if (!validateForm()) {
        return;
    }
    
    // Collect form data
    const formData = collectFormData();
    
    // In a real application, you would send this data to a server
    // For this demo, we'll simulate a successful submission
    
    // Show loading state
    showLoadingState();
    
    // Simulate server request with a timeout
    setTimeout(() => {
        // Hide loading state
        hideLoadingState();
        
        // Show success message
        showSuccessMessage();
        
        // Log the data (for demonstration purposes)
        console.log('Form Data:', formData);
        
        // Reset the form
        event.target.reset();
    }, 2000);
}

// Validate the form
function validateForm() {
    // Get required fields
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    // Check each required field
    requiredFields.forEach(field => {
        // Remove any existing error messages
        removeErrorMessage(field);
        
        // Check if the field is empty
        if (!field.value.trim()) {
            showErrorMessage(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Check if at least one equipment is selected
    const equipmentChecked = document.querySelectorAll('input[name="equipment"]:checked');
    if (equipmentChecked.length === 0) {
        const equipmentSection = document.querySelector('.checkbox-grid');
        showSectionErrorMessage(equipmentSection, 'Please select at least one equipment type');
        isValid = false;
    }
    
    // Check if at least one training focus is selected
    const trainingChecked = document.querySelectorAll('input[name="training-focus"]:checked');
    if (trainingChecked.length === 0) {
        const trainingSection = document.querySelectorAll('.checkbox-grid')[1];
        showSectionErrorMessage(trainingSection, 'Please select at least one training focus');
        isValid = false;
    }
    
    return isValid;
}

// Show error message for a field
function showErrorMessage(field, message) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    
    // Add error class to the field
    field.classList.add('error');
    field.style.borderColor = 'red';
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

// Show error message for a section
function showSectionErrorMessage(section, message) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    
    // Insert error message after the section
    section.parentNode.insertBefore(errorElement, section.nextSibling);
}

// Remove error message for a field
function removeErrorMessage(field) {
    // Remove error class from the field
    field.classList.remove('error');
    field.style.borderColor = '';
    
    // Find and remove any existing error message
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Collect form data
function collectFormData() {
    // Create an object to store the form data
    const formData = {
        basicInfo: {
            name: document.getElementById('gym-name').value,
            address: document.getElementById('gym-address').value,
            phone: document.getElementById('gym-phone').value,
            website: document.getElementById('gym-website').value,
            hours: document.getElementById('gym-hours').value,
            description: document.getElementById('gym-description').value
        },
        equipment: [],
        otherEquipment: document.getElementById('other-equipment').value,
        trainingFocus: [],
        otherTraining: document.getElementById('other-training').value,
        contactInfo: {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value
        },
        additionalNotes: document.getElementById('additional-notes').value,
        submissionDate: new Date().toISOString()
    };
    
    // Collect selected equipment
    document.querySelectorAll('input[name="equipment"]:checked').forEach(checkbox => {
        formData.equipment.push(checkbox.value);
    });
    
    // Collect selected training focus
    document.querySelectorAll('input[name="training-focus"]:checked').forEach(checkbox => {
        formData.trainingFocus.push(checkbox.value);
    });
    
    return formData;
}

// Show loading state
function showLoadingState() {
    // Disable the submit button
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    // Add loading class to the form
    document.getElementById('gym-submission-form').classList.add('loading');
}

// Hide loading state
function hideLoadingState() {
    // Enable the submit button
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Gym Information';
    
    // Remove loading class from the form
    document.getElementById('gym-submission-form').classList.remove('loading');
}

// Show success message
function showSuccessMessage() {
    // Create success message container
    const successContainer = document.createElement('div');
    successContainer.className = 'success-message';
    successContainer.style.backgroundColor = '#4CAF50';
    successContainer.style.color = 'white';
    successContainer.style.padding = '20px';
    successContainer.style.borderRadius = '4px';
    successContainer.style.marginBottom = '30px';
    successContainer.style.textAlign = 'center';
    
    // Create success message
    const successMessage = document.createElement('h3');
    successMessage.textContent = 'Thank you for submitting your gym information!';
    successContainer.appendChild(successMessage);
    
    // Create success description
    const successDescription = document.createElement('p');
    successDescription.textContent = 'Your submission has been received. We will review your information and add your gym to our database shortly.';
    successContainer.appendChild(successDescription);
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'btn-secondary';
    closeButton.style.marginTop = '15px';
    closeButton.addEventListener('click', () => {
        successContainer.remove();
    });
    successContainer.appendChild(closeButton);
    
    // Insert success message before the form
    const formContainer = document.querySelector('.form-container');
    formContainer.insertBefore(successContainer, document.getElementById('gym-submission-form'));
    
    // Scroll to the top of the form container
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Create Google Form integration instructions
function createGoogleFormInstructions() {
    // This function would typically be used to provide instructions for setting up a Google Form
    // For this demo, we'll just log the instructions to the console
    
    console.log(`
    Google Form Integration Instructions:
    
    1. Create a new Google Form at https://forms.google.com/
    2. Add the following questions to your form:
       - Gym Name (Short answer)
       - Full Address (Short answer)
       - Phone Number (Short answer)
       - Website (Short answer)
       - Operating Hours (Short answer)
       - Gym Description (Paragraph)
       - Equipment (Multiple choice checkboxes)
       - Other Equipment (Paragraph)
       - Training Focus (Multiple choice checkboxes)
       - Other Training Focus (Paragraph)
       - Contact Person's Name (Short answer)
       - Contact Email (Short answer)
       - Contact Phone (Short answer)
       - Additional Notes (Paragraph)
    3. Configure the form to collect email addresses
    4. Set up a Google Sheet to collect responses
    5. Update the Google Form link in the form.html page
    6. Optionally, set up a Google Apps Script to process form submissions and send notifications
    `);
}

// Call the Google Form instructions function when the page loads
// This is just for demonstration purposes
createGoogleFormInstructions();