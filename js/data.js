// Mock data for gym centers and their equipment
const gymData = [
    {
        id: 1,
        name: "Peak Fitness",
        address: "88 Queensway, Admiralty, Hong Kong Island",
        region: "Hong Kong Island",
        lat: 22.2783,
        lng: 114.1647,
        rating: 4.7,
        phone: "(852) 2555-1234",
        website: "https://peakfitnesshk.com",
        hours: "Mon-Fri: 6am-11pm, Sat-Sun: 8am-9pm",
        equipment: [
            "treadmill",
            "elliptical",
            "stationary-bike",
            "rowing-machine",
            "free-weights",
            "weight-machines",
            "squat-rack",
            "bench-press",
            "cable-machine",
            "smith-machine"
        ],
        trainingFocus: [
            "cardio",
            "strength",
            "flexibility",
            "core",
            "upper-body",
            "lower-body"
        ],
        description: "Peak Fitness offers state-of-the-art equipment for all your fitness needs. Our facility includes a wide range of cardio machines, free weights, and specialized training areas.",
        images: [
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        reviews: [
            {
                user: "John D.",
                rating: 5,
                comment: "Great gym with all the equipment I need for my workouts. Clean and well-maintained."
            },
            {
                user: "Sarah M.",
                rating: 4,
                comment: "Love the variety of equipment. Sometimes gets crowded during peak hours."
            }
        ]
    },
    {
        id: 2,
        name: "Central Strength Club",
        address: "23 Des Voeux Road, Central, Hong Kong Island",
        region: "Hong Kong Island",
        lat: 22.2825,
        lng: 114.1571,
        rating: 4.5,
        phone: "(852) 2555-5678",
        website: "https://centralstrengthclub.com",
        hours: "24/7",
        equipment: [
            "treadmill",
            "elliptical",
            "stationary-bike",
            "free-weights",
            "weight-machines",
            "squat-rack",
            "bench-press",
            "smith-machine"
        ],
        trainingFocus: [
            "cardio",
            "strength",
            "core",
            "upper-body",
            "lower-body"
        ],
        description: "Central Strength Club is a 24/7 gym focused on strength training and bodybuilding. We offer premium equipment and a motivating atmosphere for serious fitness enthusiasts.",
        images: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        reviews: [
            {
                user: "Mike T.",
                rating: 5,
                comment: "Best gym for serious lifters. Great equipment and atmosphere."
            },
            {
                user: "Lisa R.",
                rating: 4,
                comment: "Excellent facility with a good selection of free weights and machines."
            }
        ]
    },
    {
        id: 3,
        name: "Causeway Bay Fitness",
        address: "15 Hysan Avenue, Causeway Bay, Hong Kong Island",
        region: "Hong Kong Island",
        lat: 22.2800,
        lng: 114.1829,
        rating: 4.2,
        phone: "(852) 2555-9012",
        website: "https://cwbayfitness.com",
        hours: "Mon-Fri: 6am-10pm, Sat-Sun: 8am-8pm",
        equipment: [
            "treadmill",
            "elliptical",
            "stationary-bike",
            "rowing-machine",
            "stair-climber",
            "cross-trainer"
        ],
        trainingFocus: [
            "cardio",
            "flexibility",
            "lower-body"
        ],
        description: "Causeway Bay Fitness specializes in cardiovascular fitness with the latest cardio equipment. Our gym is perfect for those focusing on endurance and heart health.",
        images: [
            "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        reviews: [
            {
                user: "Emma W.",
                rating: 4,
                comment: "Great selection of cardio equipment. Always clean and well-maintained."
            },
            {
                user: "David K.",
                rating: 5,
                comment: "Perfect gym for cardio workouts. Love the variety of machines."
            }
        ]
    },
    {
        id: 4,
        name: "TST Iron Gym",
        address: "42 Nathan Road, Tsim Sha Tsui, Kowloon",
        region: "Kowloon",
        lat: 22.2988,
        lng: 114.1722,
        rating: 4.8,
        phone: "(852) 2555-3456",
        website: "https://tstirongym.com",
        hours: "Mon-Fri: 5am-12am, Sat-Sun: 6am-10pm",
        equipment: [
            "free-weights",
            "weight-machines",
            "squat-rack",
            "bench-press",
            "cable-machine",
            "smith-machine",
            "deadlift-platform",
            "olympic-lifting-area"
        ],
        trainingFocus: [
            "strength",
            "core",
            "upper-body",
            "lower-body"
        ],
        description: "TST Iron Gym is dedicated to strength training with premium free weights and specialized equipment. Our gym caters to powerlifters, bodybuilders, and strength enthusiasts.",
        images: [
            "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        reviews: [
            {
                user: "Chris P.",
                rating: 5,
                comment: "Best gym for serious lifting. Great atmosphere and equipment."
            },
            {
                user: "Jessica M.",
                rating: 5,
                comment: "Amazing gym for strength training. Love the deadlift platforms and squat racks."
            }
        ]
    },
    {
        id: 5,
        name: "Mong Kok Fitness Center",
        address: "123 Argyle Street, Mong Kok, Kowloon",
        region: "Kowloon",
        lat: 22.3186,
        lng: 114.1694,
        rating: 4.4,
        phone: "(852) 2555-7890",
        website: "https://mkfitnesscenter.com",
        hours: "Mon-Fri: 6am-11pm, Sat-Sun: 7am-9pm",
        equipment: [
            "treadmill",
            "elliptical",
            "stationary-bike",
            "free-weights",
            "weight-machines",
            "yoga-studio",
            "pilates-equipment",
            "stretching-area"
        ],
        trainingFocus: [
            "cardio",
            "flexibility",
            "core",
            "upper-body",
            "lower-body"
        ],
        description: "Mong Kok Fitness Center offers a balanced approach to fitness with both cardio and strength equipment, plus dedicated areas for flexibility and core training.",
        images: [
            "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        reviews: [
            {
                user: "Rachel T.",
                rating: 4,
                comment: "Great gym with a good mix of equipment. Love the yoga studio."
            },
            {
                user: "Mark S.",
                rating: 5,
                comment: "Excellent facility with everything you need for a complete workout."
            }
        ]
    },
    {
        id: 6,
        name: "Sha Tin Elite Gym",
        address: "18 Sha Tin Centre Street, Sha Tin, New Territories",
        region: "New Territories",
        lat: 22.3814,
        lng: 114.1889,
        rating: 4.9,
        phone: "(852) 2555-2345",
        website: "https://shatinelitegym.com",
        hours: "Mon-Fri: 5am-11pm, Sat-Sun: 6am-10pm",
        equipment: [
            "treadmill",
            "elliptical",
            "stationary-bike",
            "rowing-machine",
            "free-weights",
            "weight-machines",
            "squat-rack",
            "bench-press",
            "cable-machine",
            "smith-machine",
            "functional-training-area",
            "boxing-area"
        ],
        trainingFocus: [
            "cardio",
            "strength",
            "flexibility",
            "core",
            "upper-body",
            "lower-body"
        ],
        description: "Sha Tin Elite Gym is a premium fitness facility offering comprehensive equipment for all training styles. We feature specialized areas for functional training and combat sports.",
        images: [
            "https://images.unsplash.com/photo-1571388208497-71bedc66e932?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        reviews: [
            {
                user: "Alex K.",
                rating: 5,
                comment: "Top-notch gym with everything you could ask for. Professional staff and clean facilities."
            },
            {
                user: "Sophia L.",
                rating: 5,
                comment: "Best gym I've ever been to. Amazing equipment and atmosphere."
            }
        ]
    },
    {
        id: 7,
        name: "Tuen Mun Fitness Hub",
        address: "88 Tuen Mun Road, Tuen Mun, New Territories",
        region: "New Territories",
        lat: 22.3953,
        lng: 113.9725,
        rating: 4.3,
        phone: "(852) 2555-8765",
        website: "https://tmfitnesshub.com",
        hours: "Mon-Fri: 6am-10pm, Sat-Sun: 8am-9pm",
        equipment: [
            "treadmill",
            "elliptical",
            "stationary-bike",
            "free-weights",
            "weight-machines",
            "squat-rack",
            "bench-press",
            "functional-training-area"
        ],
        trainingFocus: [
            "cardio",
            "strength",
            "core",
            "upper-body",
            "lower-body"
        ],
        description: "Tuen Mun Fitness Hub provides a comprehensive fitness experience with a wide range of equipment and training options for all fitness levels.",
        images: [
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        reviews: [
            {
                user: "Thomas L.",
                rating: 4,
                comment: "Great local gym with all the essentials. Friendly staff and good atmosphere."
            },
            {
                user: "Helen W.",
                rating: 5,
                comment: "Excellent facility with modern equipment. Never too crowded."
            }
        ]
    },
    {
        id: 8,
        name: "Tai Po Wellness Center",
        address: "56 Tai Po Market Street, Tai Po, New Territories",
        region: "New Territories",
        lat: 22.4501,
        lng: 114.1694,
        rating: 4.6,
        phone: "(852) 2555-4321",
        website: "https://tpwellnesscenter.com",
        hours: "Mon-Fri: 7am-10pm, Sat-Sun: 8am-8pm",
        equipment: [
            "treadmill",
            "elliptical",
            "stationary-bike",
            "rowing-machine",
            "free-weights",
            "weight-machines",
            "yoga-studio",
            "stretching-area"
        ],
        trainingFocus: [
            "cardio",
            "strength",
            "flexibility",
            "core"
        ],
        description: "Tai Po Wellness Center focuses on holistic fitness with a balance of cardio, strength, and wellness facilities including yoga and meditation spaces.",
        images: [
            "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        reviews: [
            {
                user: "Grace C.",
                rating: 5,
                comment: "Love the peaceful atmosphere and variety of equipment. The yoga classes are excellent."
            },
            {
                user: "Peter T.",
                rating: 4,
                comment: "Great place for a balanced workout. Clean facilities and helpful staff."
            }
        ]
    }
];

// Equipment types with descriptions
const equipmentTypes = {
    "treadmill": {
        name: "Treadmill",
        description: "Running or walking machine for cardio workouts",
        trainingFocus: ["cardio", "lower-body"]
    },
    "elliptical": {
        name: "Elliptical",
        description: "Low-impact cardio machine that simulates walking, running, or stair climbing",
        trainingFocus: ["cardio", "lower-body"]
    },
    "stationary-bike": {
        name: "Stationary Bike",
        description: "Indoor cycling machine for cardio workouts",
        trainingFocus: ["cardio", "lower-body"]
    },
    "rowing-machine": {
        name: "Rowing Machine",
        description: "Full-body cardio machine that simulates rowing",
        trainingFocus: ["cardio", "upper-body", "core", "lower-body"]
    },
    "stair-climber": {
        name: "Stair Climber",
        description: "Cardio machine that simulates climbing stairs",
        trainingFocus: ["cardio", "lower-body"]
    },
    "cross-trainer": {
        name: "Cross Trainer",
        description: "Full-body cardio machine combining features of elliptical, stair climber, and bike",
        trainingFocus: ["cardio", "upper-body", "lower-body"]
    },
    "free-weights": {
        name: "Free Weights",
        description: "Dumbbells, barbells, and weight plates for strength training",
        trainingFocus: ["strength", "upper-body", "lower-body", "core"]
    },
    "weight-machines": {
        name: "Weight Machines",
        description: "Guided resistance machines for targeted strength training",
        trainingFocus: ["strength", "upper-body", "lower-body"]
    },
    "squat-rack": {
        name: "Squat Rack",
        description: "Equipment for performing barbell squats and other compound exercises",
        trainingFocus: ["strength", "lower-body", "core"]
    },
    "bench-press": {
        name: "Bench Press",
        description: "Equipment for performing chest and upper body pressing exercises",
        trainingFocus: ["strength", "upper-body"]
    },
    "cable-machine": {
        name: "Cable Machine",
        description: "Versatile machine using cables and pulleys for various exercises",
        trainingFocus: ["strength", "upper-body", "lower-body", "core"]
    },
    "smith-machine": {
        name: "Smith Machine",
        description: "Barbell fixed within steel rails for guided lifting",
        trainingFocus: ["strength", "upper-body", "lower-body"]
    },
    "deadlift-platform": {
        name: "Deadlift Platform",
        description: "Specialized platform for performing deadlifts",
        trainingFocus: ["strength", "lower-body", "core", "upper-body"]
    },
    "olympic-lifting-area": {
        name: "Olympic Lifting Area",
        description: "Dedicated space for Olympic weightlifting movements",
        trainingFocus: ["strength", "lower-body", "upper-body", "core"]
    },
    "yoga-studio": {
        name: "Yoga Studio",
        description: "Dedicated space for yoga practice",
        trainingFocus: ["flexibility", "core"]
    },
    "pilates-equipment": {
        name: "Pilates Equipment",
        description: "Specialized equipment for Pilates exercises",
        trainingFocus: ["flexibility", "core"]
    },
    "stretching-area": {
        name: "Stretching Area",
        description: "Dedicated space for stretching and mobility work",
        trainingFocus: ["flexibility"]
    },
    "functional-training-area": {
        name: "Functional Training Area",
        description: "Space for functional movement exercises with equipment like kettlebells, medicine balls, and TRX",
        trainingFocus: ["strength", "cardio", "core", "flexibility"]
    },
    "boxing-area": {
        name: "Boxing Area",
        description: "Space with punching bags and boxing equipment",
        trainingFocus: ["cardio", "upper-body", "core"]
    }
};

// Training focus categories
const trainingFocusCategories = {
    "cardio": {
        name: "Cardio",
        description: "Cardiovascular exercises to improve heart health and endurance"
    },
    "strength": {
        name: "Strength Training",
        description: "Resistance exercises to build muscle and increase strength"
    },
    "flexibility": {
        name: "Flexibility",
        description: "Exercises to improve range of motion and prevent injury"
    },
    "core": {
        name: "Core",
        description: "Exercises targeting the abdominal and back muscles"
    },
    "upper-body": {
        name: "Upper Body",
        description: "Exercises focusing on chest, back, shoulders, and arms"
    },
    "lower-body": {
        name: "Lower Body",
        description: "Exercises focusing on legs, glutes, and hips"
    }
};