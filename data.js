// Mock Hospital Data
const hospitalData = {
    departments: [
        {
            id: 1,
            name: "Emergency Medicine",
            specialty: "Emergency Care",
            doctors: [
                { name: "Dr. Rajesh Kumar", availability: "24/7", timing: "Always Available" },
                { name: "Dr. Priya Sharma", availability: "24/7", timing: "Always Available" }
            ],
            urgency: "HIGH"
        },
        {
            id: 2,
            name: "Cardiology",
            specialty: "Heart Care",
            doctors: [
                { name: "Dr. Amit Patel", availability: "Mon-Fri", timing: "9:00 AM - 5:00 PM" },
                { name: "Dr. Sunita Reddy", availability: "Tue-Sat", timing: "10:00 AM - 6:00 PM" }
            ],
            urgency: "HIGH"
        },
        {
            id: 3,
            name: "General Medicine",
            specialty: "Primary Healthcare",
            doctors: [
                { name: "Dr. Anil Kumar", availability: "Mon-Sat", timing: "8:00 AM - 4:00 PM" },
                { name: "Dr. Meera Singh", availability: "Mon-Fri", timing: "10:00 AM - 6:00 PM" }
            ],
            urgency: "MEDIUM"
        },
        {
            id: 4,
            name: "ENT",
            specialty: "Ear, Nose & Throat",
            doctors: [
                { name: "Dr. Ravi Verma", availability: "Tue-Sat", timing: "11:00 AM - 7:00 PM" },
                { name: "Dr. Kavita Nair", availability: "Mon-Fri", timing: "9:00 AM - 5:00 PM" }
            ],
            urgency: "MEDIUM"
        },
        {
            id: 5,
            name: "Orthopedics",
            specialty: "Bone & Joint Care",
            doctors: [
                { name: "Dr. Vikram Singh", availability: "Mon-Sat", timing: "9:00 AM - 5:00 PM" },
                { name: "Dr. Anjali Mehta", availability: "Wed-Sun", timing: "10:00 AM - 6:00 PM" }
            ],
            urgency: "MEDIUM"
        },
        {
            id: 6,
            name: "Pediatrics",
            specialty: "Child Healthcare",
            doctors: [
                { name: "Dr. Suresh Iyer", availability: "Mon-Sat", timing: "9:00 AM - 4:00 PM" },
                { name: "Dr. Pooja Gupta", availability: "Tue-Sat", timing: "10:00 AM - 6:00 PM" }
            ],
            urgency: "MEDIUM"
        },
        {
            id: 7,
            name: "Dermatology",
            specialty: "Skin Care",
            doctors: [
                { name: "Dr. Neha Kapoor", availability: "Mon-Fri", timing: "11:00 AM - 7:00 PM" }
            ],
            urgency: "LOW"
        }
    ]
};

// Language Translations
const translations = {
    english: {
        welcome: "Hello! I'm your hospital intake assistant. Please tell me your full name.",
        name: "What is your full name?",
        age: "How old are you?",
        gender: "What is your gender? (Optional)",
        symptoms: "Please describe your symptoms or problem.",
        duration: "How long have you had these symptoms?",
        emergency: "Do you have any emergency signs? (Chest pain, breathing difficulty, heavy bleeding, unconsciousness) - Yes or No?",
        confirm: "Please confirm your details",
        low: "LOW",
        medium: "MEDIUM",
        high: "HIGH"
    },
    hindi: {
        welcome: "नमस्ते! मैं आपकी अस्पताल प्रवेश सहायक हूं। कृपया अपना पूरा नाम बताएं।",
        name: "आपका पूरा नाम क्या है?",
        age: "आपकी उम्र क्या है?",
        gender: "आपका लिंग क्या है? (वैकल्पिक)",
        symptoms: "कृपया अपने लक्षणों या समस्या का वर्णन करें।",
        duration: "आपको ये लक्षण कब से हैं?",
        emergency: "क्या आपको कोई आपातकालीन संकेत हैं? (सीने में दर्द, सांस लेने में तकलीफ, भारी रक्तस्राव, बेहोशी) - हां या नहीं?",
        confirm: "कृपया अपने विवरण की पुष्टि करें",
        low: "कम",
        medium: "मध्यम",
        high: "उच्च"
    },
    telugu: {
        welcome: "నమస్కారం! నేను మీ హాస్పిటల్ ఇంటేక్ అసిస్టెంట్. దయచేసి మీ పూర్తి పేరు చెప్పండి.",
        name: "మీ పూర్తి పేరు ఏమిటి?",
        age: "మీ వయస్సు ఎంత?",
        gender: "మీ లింగం ఏమిటి? (ఐచ్ఛికం)",
        symptoms: "దయచేసి మీ లక్షణాలు లేదా సమస్యను వివరించండి.",
        duration: "మీకు ఈ లక్షణాలు ఎప్పటి నుండి ఉన్నాయి?",
        emergency: "మీకు ఎటువంటి అత్యవసర సంకేతాలు ఉన్నాయా? (ఛాతీ నొప్పి, శ్వాస కష్టం, తీవ్ర రక్తస్రావం, ప్రజ్ఞారాహిత్యం) - అవును లేదా కాదు?",
        confirm: "దయచేసి మీ వివరాలను నిర్ధారించండి",
        low: "తక్కువ",
        medium: "మధ్యస్థ",
        high: "అధిక"
    },
    kannada: {
        welcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಆಸ್ಪತ್ರೆ ಪ್ರವೇಶ ಸಹಾಯಕ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ಹೇಳಿ.",
        name: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ಏನು?",
        age: "ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು?",
        gender: "ನಿಮ್ಮ ಲಿಂಗ ಏನು? (ಐಚ್ಛಿಕ)",
        symptoms: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳು ಅಥವಾ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ.",
        duration: "ನಿಮಗೆ ಈ ರೋಗಲಕ್ಷಣಗಳು ಎಂದಿನಿಂದ ಇವೆ?",
        emergency: "ನೀವು ಯಾವುದೇ ತುರ್ತು ಚಿಹ್ನೆಗಳನ್ನು ಹೊಂದಿದ್ದೀರಾ? (ಎದೆ ನೋವು, ಉಸಿರಾಟದ ತೊಂದರೆ, ತೀವ್ರ ರಕ್ತಸ್ರಾವ, ಅರಿವಿಲ್ಲದೆ) - ಹೌದು ಅಥವಾ ಇಲ್ಲ?",
        confirm: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ದೃಢೀಕರಿಸಿ",
        low: "ಕಡಿಮೆ",
        medium: "ಮಧ್ಯಮ",
        high: "ಅಧಿಕ"
    },
    malayalam: {
        welcome: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ആശുപത്രി ഇൻടേക്ക് അസിസ്റ്റന്റാണ്. ദയവായി നിങ്ങളുടെ പൂർണ്ണ നാമം പറയുക.",
        name: "നിങ്ങളുടെ പൂർണ്ണ നാമം എന്താണ്?",
        age: "നിങ്ങളുടെ വയസ്സ് എത്രയാണ്?",
        gender: "നിങ്ങളുടെ ലിംഗഭേദം എന്താണ്? (ഓപ്ഷണൽ)",
        symptoms: "ദയവായി നിങ്ങളുടെ ലക്ഷണങ്ങളോ പ്രശ്നമോ വിവരിക്കുക.",
        duration: "നിങ്ങൾക്ക് ഈ ലക്ഷണങ്ങൾ എപ്പോഴാണ് ആരംഭിച്ചത്?",
        emergency: "നിങ്ങൾക്ക് എന്തെങ്കിലും അടിയന്തര ലക്ഷണങ്ങൾ ഉണ്ടോ? (നെഞ്ചുവേദന, ശ്വാസകോശ തകരാർ, കനത്ത രക്തസ്രാവം, അറിവില്ലായ്മ) - അതെ അല്ലെങ്കിൽ ഇല്ല?",
        confirm: "ദയവായി നിങ്ങളുടെ വിശദാംശങ്ങൾ സ്ഥിരീകരിക്കുക",
        low: "കുറഞ്ഞ",
        medium: "മിഡിയം",
        high: "ഉയർന്ന"
    }
};

// Question Flow
const questions = [
    { key: 'name', field: 'name' },
    { key: 'age', field: 'age' },
    { key: 'gender', field: 'gender', optional: true },
    { key: 'symptoms', field: 'symptoms' },
    { key: 'duration', field: 'duration' },
    { key: 'emergency', field: 'emergency' }
];

// Symptom to Department Mapping
const symptomMapping = {
    'chest pain': 'Cardiology',
    'heart': 'Cardiology',
    'breathing': 'Emergency Medicine',
    'unconscious': 'Emergency Medicine',
    'bleeding': 'Emergency Medicine',
    'fever': 'General Medicine',
    'headache': 'General Medicine',
    'cold': 'General Medicine',
    'cough': 'General Medicine',
    'ear': 'ENT',
    'nose': 'ENT',
    'throat': 'ENT',
    'bone': 'Orthopedics',
    'joint': 'Orthopedics',
    'fracture': 'Orthopedics',
    'child': 'Pediatrics',
    'baby': 'Pediatrics',
    'skin': 'Dermatology',
    'rash': 'Dermatology',
    'allergy': 'Dermatology'
};