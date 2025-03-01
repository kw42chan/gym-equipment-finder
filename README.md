# GymFinder - Gym Equipment Search App

GymFinder is a web application that helps users find gym centers based on their equipment needs, location, and training focus. The app also includes a form for gym centers to submit their equipment details.

## Project Overview

GymFinder serves as a centralized platform for fitness enthusiasts to search for gyms with specific equipment. Users can filter results by:

- **Gym Location**: Find gym centers based on geographic area or proximity
- **Equipment Type**: Look for specific equipment (e.g., treadmills, free weights, elliptical machines)
- **Training Focus**: Search by training categories (e.g., strength training for arms, cardio for legs, core exercises)

The application also includes a form for gym centers to submit their details, which can be integrated with Google Forms for easier data collection and management.

## Features

### User-Facing Features

- **Search and Filter**:
  - Location-based search with geolocation support
  - Equipment and training focus filters
  - Interactive map view with markers
  - List view of gym centers with detailed information

- **Gym Center Profiles**:
  - Display available equipment
  - Show training focus categories
  - Contact information and operating hours
  - Ratings and reviews

### Admin/Manager Features

- **Equipment Submission Form**:
  - Web form for gym centers to submit their details
  - Google Form integration option
  - Validation and error handling

## Project Structure

```
gym-equipment-finder/
├── index.html              # Main application page
├── form.html               # Gym submission form page
├── css/
│   ├── styles.css          # Main styles
│   └── form-styles.css     # Form-specific styles
├── js/
│   ├── app.js              # Main application logic
│   ├── data.js             # Mock data for gym centers
│   └── form.js             # Form handling logic
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone or download the repository
2. Open `index.html` in a web browser to view the application
3. To enable Google Maps functionality:
   - Replace `YOUR_API_KEY` in the index.html file with a valid Google Maps API key
   - Get an API key from the [Google Cloud Console](https://console.cloud.google.com/)

## Google Form Integration

To integrate with Google Forms for gym submissions:

1. Create a new Google Form at [forms.google.com](https://forms.google.com/)
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
5. Update the Google Form link in the `form.html` page
6. Optionally, set up a Google Apps Script to process form submissions and send notifications

## Technical Details

### Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Maps Integration**: Google Maps API
- **Form Handling**: JavaScript form validation and submission
- **Data Storage**: Mock data (in a real implementation, this would be a database)

### Implementation Notes

- The application uses a responsive design that works on desktop and mobile devices
- The map functionality uses the Google Maps JavaScript API
- Form validation is implemented with client-side JavaScript
- The project includes mock data for demonstration purposes

## Future Improvements

- **Backend Integration**: Develop a backend API to store and retrieve gym data
- **User Accounts**: Allow users to create accounts, save favorite gyms, and write reviews
- **Advanced Search**: Implement more advanced search options like distance radius and equipment quantity
- **Real-time Availability**: Show real-time equipment availability and gym occupancy
- **Mobile App**: Develop native mobile applications for iOS and Android
- **Admin Dashboard**: Create an admin dashboard for managing gym listings and user reviews

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Font Awesome](https://fontawesome.com/)
- Map functionality powered by [Google Maps API](https://developers.google.com/maps)