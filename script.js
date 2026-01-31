// Main Application
document.addEventListener('DOMContentLoaded', function() {
    // State Management
    let currentScreen = 'loading';
    let selectedLanguage = 'english';
    let patientData = {};
    let currentQuestionIndex = 0;
    
    // DOM Elements
    const screens = {
        loading: document.getElementById('loadingScreen'),
        language: document.getElementById('languageScreen'),
        assistant: document.getElementById('assistantScreen'),
        receipt: document.getElementById('receiptScreen')
    };
    
    const elements = {
        startBtn: document.getElementById('startBtn'),
        languageCards: document.querySelectorAll('.language-card'),
        backToHome: document.getElementById('backToHome'),
        backToLanguage: document.getElementById('backToLanguage'),
        currentLanguage: document.getElementById('currentLanguage'),
        assistantQuestion: document.getElementById('assistantQuestion'),
        questionTime: document.getElementById('questionTime'),
        responseDisplay: document.getElementById('responseDisplay'),
        currentResponse: document.getElementById('currentResponse'),
        micButton: document.getElementById('micButton'),
        voiceStatus: document.getElementById('voiceStatus'),
        transcriptBox: document.getElementById('transcriptBox'),
        clearBtn: document.getElementById('clearBtn'),
        nextBtn: document.getElementById('nextBtn'),
        progressBar: document.getElementById('progressBar'),
        // Receipt elements
        receiptName: document.getElementById('receiptName'),
        receiptAge: document.getElementById('receiptAge'),
        receiptGender: document.getElementById('receiptGender'),
        receiptLanguage: document.getElementById('receiptLanguage'),
        symptomsBox: document.getElementById('symptomsBox'),
        receiptDuration: document.getElementById('receiptDuration'),
        urgencyBadge: document.getElementById('urgencyBadge'),
        urgencyDescription: document.getElementById('urgencyDescription'),
        departmentName: document.getElementById('departmentName'),
        departmentDescription: document.getElementById('departmentDescription'),
        doctorsList: document.getElementById('doctorsList'),
        receiptTimestamp: document.getElementById('receiptTimestamp'),
        receiptId: document.getElementById('receiptId'),
        jsonOutput: document.getElementById('jsonOutput'),
        newPatientBtn: document.getElementById('newPatientBtn'),
        printBtn: document.getElementById('printBtn'),
        downloadBtn: document.getElementById('downloadBtn')
    };
    
    // Initialize Voice Recognition
    const voiceRecognition = new VoiceRecognition();
    const textToSpeech = new TextToSpeech();
    
    // Setup Voice Recognition Callbacks
    voiceRecognition.onListeningStart = () => {
        elements.micButton.classList.add('listening');
        elements.voiceStatus.innerHTML = '<i class="fas fa-circle"></i> Listening...';
        playSound('startSound');
    };
    
    voiceRecognition.onListeningEnd = () => {
        elements.micButton.classList.remove('listening');
        elements.voiceStatus.innerHTML = '<i class="fas fa-circle"></i> Ready';
    };
    
    voiceRecognition.onTranscriptUpdate = (final, interim) => {
        let displayText = final;
        if (interim) {
            displayText += `<span style="color: #64748b">${interim}</span>`;
        }
        elements.currentResponse.innerHTML = displayText;
        
        // Update transcript box
        const timestamp = new Date().toLocaleTimeString();
        elements.transcriptBox.innerHTML += `<div><strong>[${timestamp}]</strong> ${final}</div>`;
        elements.transcriptBox.scrollTop = elements.transcriptBox.scrollHeight;
    };
    
    voiceRecognition.onFinalTranscript = (transcript) => {
        processResponse(transcript.trim());
        playSound('endSound');
    };
    
    voiceRecognition.onError = (error) => {
        console.error('Voice recognition error:', error);
        elements.currentResponse.textContent = "Sorry, I didn't catch that. Please try again.";
        playSound('errorSound');
    };
    
    voiceRecognition.onNotSupported = () => {
        elements.voiceStatus.innerHTML = '<i class="fas fa-times-circle"></i> Voice not supported';
        elements.micButton.disabled = true;
        elements.currentResponse.textContent = "Voice input not supported in your browser. Please type your response.";
    };
    
    // Event Listeners
    elements.startBtn.addEventListener('click', () => {
        showScreen('language');
    });
    
    elements.languageCards.forEach(card => {
        card.addEventListener('click', () => {
            elements.languageCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedLanguage = card.dataset.lang;
            elements.currentLanguage.textContent = card.querySelector('h3').textContent;
            
            // Set speech recognition language
            const speechCode = languageSpeechCodes[selectedLanguage] || 'en-US';
            voiceRecognition.setLanguage(speechCode);
            
            setTimeout(() => {
                showScreen('assistant');
                startQuestionFlow();
            }, 500);
        });
    });
    
    elements.backToHome.addEventListener('click', () => {
        showScreen('loading');
    });
    
    elements.backToLanguage.addEventListener('click', () => {
        showScreen('language');
    });
    
    elements.micButton.addEventListener('click', () => {
        if (!voiceRecognition.isListening) {
            voiceRecognition.start();
        } else {
            voiceRecognition.stop();
        }
    });
    
    elements.clearBtn.addEventListener('click', () => {
        elements.currentResponse.textContent = "Waiting for your response...";
        elements.transcriptBox.innerHTML = "";
    });
    
    elements.nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length) {
            askNextQuestion();
        } else {
            generateReceipt();
        }
    });
    
    elements.newPatientBtn.addEventListener('click', () => {
        resetApp();
    });
    
    elements.printBtn.addEventListener('click', () => {
        window.print();
    });
    
    elements.downloadBtn.addEventListener('click', () => {
        downloadReceipt();
    });
    
    // Screen Management
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        screens[screenName].classList.add('active');
        currentScreen = screenName;
        
        // Update progress bar
        if (screenName === 'assistant') {
            updateProgressBar();
        }
    }
    
    function updateProgressBar() {
        const progress = ((currentQuestionIndex) / (questions.length + 1)) * 100;
        elements.progressBar.style.width = `${progress}%`;
        
        // Update step indicators
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index <= currentQuestionIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Question Flow
    function startQuestionFlow() {
        currentQuestionIndex = 0;
        patientData = {};
        askNextQuestion();
    }
    
    function askNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            const questionText = translations[selectedLanguage][question.key];
            
            // Update UI
            elements.assistantQuestion.textContent = questionText;
            elements.questionTime.textContent = new Date().toLocaleTimeString();
            elements.currentResponse.textContent = "Waiting for your response...";
            
            // Speak the question
            textToSpeech.speak(questionText, languageSpeechCodes[selectedLanguage]);
            
            // Enable/disable next button
            elements.nextBtn.disabled = true;
            
            updateProgressBar();
        } else {
            // All questions answered
            elements.assistantQuestion.textContent = translations[selectedLanguage].confirm;
            textToSpeech.speak(translations[selectedLanguage].confirm, languageSpeechCodes[selectedLanguage]);
            elements.nextBtn.disabled = false;
            elements.nextBtn.innerHTML = '<i class="fas fa-check-circle"></i> Confirm & Generate Receipt';
        }
    }
    
    function processResponse(response) {
        const currentQuestion = questions[currentQuestionIndex];
        
        // Store response
        patientData[currentQuestion.field] = response;
        
        // Move to next question
        currentQuestionIndex++;
        
        // Enable next button
        elements.nextBtn.disabled = false;
    }
    
    // Receipt Generation
    function generateReceipt() {
        // Determine urgency and department
        const urgency = determineUrgency();
        const department = determineDepartment();
        
        // Update receipt UI
        elements.receiptName.textContent = patientData.name || '-';
        elements.receiptAge.textContent = patientData.age || '-';
        elements.receiptGender.textContent = patientData.gender || 'Not specified';
        elements.receiptLanguage.textContent = selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1);
        elements.symptomsBox.textContent = patientData.symptoms || 'No symptoms recorded';
        elements.receiptDuration.textContent = patientData.duration || '-';
        
        // Urgency
        elements.urgencyBadge.textContent = urgency.level;
        elements.urgencyBadge.className = 'urgency-badge ' + urgency.level.toLowerCase();
        elements.urgencyDescription.textContent = urgency.description;
        
        // Department
        elements.departmentName.textContent = department.name;
        elements.departmentDescription.textContent = department.description;
        
        // Doctors list
        elements.doctorsList.innerHTML = '';
        department.doctors.forEach(doctor => {
            const doctorElement = document.createElement('div');
            doctorElement.className = 'doctor-item';
            doctorElement.innerHTML = `
                <div>
                    <div class="doctor-name">${doctor.name}</div>
                    <div class="doctor-availability">${doctor.timing}</div>
                </div>
                <div class="availability">${doctor.availability}</div>
            `;
            elements.doctorsList.appendChild(doctorElement);
        });
        
        // Timestamp and ID
        const now = new Date();
        elements.receiptTimestamp.textContent = now.toLocaleString();
        elements.receiptId.textContent = 'HOS-' + now.getTime().toString().slice(-6);
        
        // Generate JSON output
        generateJSONOutput(urgency, department);
        
        // Show receipt screen
        showScreen('receipt');
    }
    
    function determineUrgency() {
        const symptoms = (patientData.symptoms || '').toLowerCase();
        const emergency = (patientData.emergency || '').toLowerCase();
        
        if (emergency.includes('yes') || 
            symptoms.includes('chest pain') ||
            symptoms.includes('breathing') ||
            symptoms.includes('bleeding') ||
            symptoms.includes('unconscious')) {
            return {
                level: 'HIGH',
                description: 'Emergency - Immediate attention required'
            };
        } else if (symptoms.includes('fever') || 
                   symptoms.includes('pain') ||
                   symptoms.includes('vomit')) {
            return {
                level: 'MEDIUM',
                description: 'Urgent - Should be seen today'
            };
        } else {
            return {
                level: 'LOW',
                description: 'Routine - Can wait for appointment'
            };
        }
    }
    
    function determineDepartment() {
        const symptoms = (patientData.symptoms || '').toLowerCase();
        
        // Find matching department based on symptoms
        for (const [keyword, departmentName] of Object.entries(symptomMapping)) {
            if (symptoms.includes(keyword)) {
                const dept = hospitalData.departments.find(d => d.name === departmentName);
                if (dept) return dept;
            }
        }
        
        // Default to General Medicine
        return hospitalData.departments.find(d => d.name === 'General Medicine');
    }
    
    function generateJSONOutput(urgency, department) {
        const jsonData = {
            language: selectedLanguage,
            patient: {
                name: patientData.name,
                age: patientData.age,
                gender: patientData.gender || "Not specified"
            },
            complaint: {
                symptoms: patientData.symptoms,
                duration: patientData.duration
            },
            triage: {
                urgency: urgency.level,
                suggested_department: department.name
            },
            hospital_routing: {
                doctor_suggestions: department.doctors.map(doc => ({
                    name: doc.name,
                    specialty: department.specialty,
                    availability: doc.availability
                }))
            },
            timestamp: new Date().toISOString()
        };
        
        elements.jsonOutput.textContent = JSON.stringify(jsonData, null, 2);
    }
    
    function downloadReceipt() {
        const receiptContent = document.querySelector('.receipt-container').outerHTML;
        const styleContent = document.querySelector('style').textContent;
        
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Hospital Intake Receipt</title>
                <style>${styleContent}</style>
                <style>
                    @media print {
                        body * { visibility: hidden; }
                        .receipt-container, .receipt-container * { visibility: visible; }
                        .receipt-container { position: absolute; left: 0; top: 0; }
                    }
                </style>
            </head>
            <body>
                ${receiptContent}
            </body>
            </html>
        `;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Hospital_Receipt_${elements.receiptId.textContent}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    function resetApp() {
        currentQuestionIndex = 0;
        patientData = {};
        selectedLanguage = 'english';
        
        // Reset UI
        elements.currentResponse.textContent = "Waiting for your response...";
        elements.transcriptBox.innerHTML = "";
        elements.nextBtn.disabled = true;
        elements.nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Next';
        
        // Reset language selection
        elements.languageCards.forEach(card => card.classList.remove('selected'));
        
        showScreen('language');
    }
    
    function playSound(soundId) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    // Initialize
    setTimeout(() => {
        showScreen('loading');
    }, 100);
});