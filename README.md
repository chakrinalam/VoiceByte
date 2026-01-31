# 🏥 VoiceByte – AI-Powered Multilingual Hospital Intake Assistant

## 📌 Project Overview
**VoiceByte** is an AI-powered multilingual hospital intake system designed to bridge communication gaps for patients who face language barriers, illiteracy, or stress when visiting hospitals. The system uses **voice recognition**, **natural language processing**, and **AI-powered routing** to automate patient intake and suggest appropriate medical departments.

> **Mission:** *"By giving every patient a voice, we enable faster, safer, and more inclusive healthcare."*

---

## 🎯 Problem Statement
- **Language Barriers:** Patients visiting hospitals in unfamiliar cities struggle to communicate symptoms in local languages.
- **Manual Forms:** Traditional paper forms are time-consuming, error-prone, and challenging for illiterate patients.
- **Miscommunication:** Errors in initial intake lead to wrong department routing and delayed treatment.
- **Emergency Handling:** Critical time lost in manual data collection during emergencies.

---

## ✨ Key Features

### 🗣️ **Multilingual Voice Interaction**
- Supports **5 Indian languages**: English, Hindi, Telugu, Kannada, Malayalam
- Patients can speak naturally in their preferred language
- Real-time voice-to-text transcription

### 🧠 **AI-Powered Symptom Analysis**
- Extracts symptoms, duration, and severity from patient speech
- Maps symptoms to appropriate medical departments
- Suggests urgency level (HIGH/MEDIUM/LOW)

### 🏥 **Intelligent Hospital Routing**
- Automatically suggests the most relevant medical department
- Displays available doctors with their schedules
- Generates structured digital intake reports

### 📄 **Digital Intake Automation**
- Replaces paper forms with voice-driven digital intake
- Generates printable/PDF hospital receipts
- Provides JSON output for hospital system integration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML/CSS/JavaScript** | Frontend interface and interaction |
| **Web Speech API** | Voice recognition and text-to-speech |
| **Local Storage** | Patient data management |
| **CSS Animations** | Smooth UI/UX transitions |
| **Responsive Design** | Works on desktop, tablet, and mobile |

---

## 📁 Project Structure

```
voicebyte-hospital-intake/
├── index.html          # Main application interface
├── style.css           # Styling and animations
├── script.js           # Main application logic
├── voice-recognition.js # Voice recognition module
├── data.js             # Mock hospital data and translations
└── README.md           # This file
```

---

## 🚀 How to Use

### 1. **Launch the Application**
- Open `index.html` in any modern browser (Chrome recommended)
- No installation or server required

### 2. **Patient Intake Process**
```
1. Language Selection → Choose from 5 Indian languages
2. Voice Interaction → Speak responses to questions
3. Symptom Analysis → AI processes and categorizes symptoms
4. Department Routing → System suggests appropriate department
5. Digital Receipt → Generate and print/download intake report
```

### 3. **For Hospital Staff**
- View structured patient information
- See suggested department and doctors
- Print or save digital receipts
- Access JSON data for system integration

---

## 🎨 User Interface

### **Loading Screen**
- Animated hospital icon with pulse effect
- Overview of key features
- Start button to begin intake

### **Language Selection**
- Visual cards for 5 languages with flags
- Native language names and prompts
- Smooth transitions

### **Voice Assistant Screen**
- Progress bar showing intake steps
- Animated microphone button with listening indicators
- Real-time transcription display
- Assistant avatar with speech bubbles

### **Digital Receipt Screen**
- Professional hospital-style layout
- Patient details and symptom summary
- Urgency level badge (color-coded)
- Suggested department and doctors
- Printable/downloadable format
- JSON output for developers

---

## 🔧 Implementation Details

### **Voice Recognition Module**
- Uses Web Speech API for speech-to-text
- Supports multiple Indian languages
- Real-time interim and final transcripts
- Error handling and fallback options

### **Text-to-Speech**
- Converts assistant questions to speech
- Language-specific voice selection
- Configurable speed and pitch

### **Symptom Mapping Logic**
```javascript
const symptomMapping = {
    'chest pain': 'Cardiology',
    'breathing': 'Emergency Medicine',
    'fever': 'General Medicine',
    'bone': 'Orthopedics',
    'child': 'Pediatrics'
    // ... and more
};
```

### **Urgency Determination**
- **HIGH:** Emergency signs, chest pain, breathing difficulty
- **MEDIUM:** Fever, pain, vomiting
- **LOW:** Routine symptoms, general consultation

---

## 📊 Data Structure

### **Hospital Departments**
- Emergency Medicine, Cardiology, General Medicine, ENT, Orthopedics, Pediatrics, Dermatology
- Each department has doctors with availability schedules

### **Patient Data Object**
```json
{
  "language": "hindi",
  "patient": {
    "name": "रमेश कुमार",
    "age": "45",
    "gender": "पुरुष"
  },
  "complaint": {
    "symptoms": "सीने में दर्द और सांस लेने में तकलीफ",
    "duration": "2 घंटे"
  },
  "triage": {
    "urgency": "HIGH",
    "suggested_department": "Cardiology"
  }
}
```

---

## 🌟 Future Enhancements

### **Planned Features**
1. **Mobile App** – Android/iOS apps for remote intake
2. **Hospital Kiosk** – Voice-enabled kiosks for walk-in patients
3. **Ambulance Integration** – Paramedic data input en route
4. **EHR Integration** – Direct sync with hospital records
5. **More Languages** – Additional regional and international languages
6. **AI Symptom Prioritization** – Emergency case flagging

### **Technical Improvements**
- Backend integration with real hospital databases
- Machine learning for improved symptom recognition
- Offline voice recognition capability
- Multi-user concurrent intake support

---

## 📈 Expected Impact

### **For Patients**
- ✅ Easy communication in native language
- ✅ Reduced stress and anxiety
- ✅ Faster intake in emergencies
- ✅ Better understanding of next steps

### **For Hospitals**
- ✅ Reduced staff workload
- ✅ Fewer intake errors
- ✅ Efficient department routing
- ✅ Digital record keeping
- ✅ Improved patient satisfaction

### **For Healthcare System**
- ✅ Bridging language divides
- ✅ Supporting illiterate patients
- ✅ Standardizing emergency intake
- ✅ Data-driven hospital management

---

## ⚠️ Important Notes

### **Browser Requirements**
- Chrome/Edge recommended for best voice recognition
- Requires microphone permission
- Modern browser with Web Speech API support

### **Limitations**
- Demo uses mock hospital data
- Voice recognition accuracy varies by language/accent
- Currently frontend-only (no backend/database)

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
