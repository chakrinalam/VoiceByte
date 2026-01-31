// Voice Recognition Module
class VoiceRecognition {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.finalTranscript = '';
        this.interimTranscript = '';
        this.currentLanguage = 'en-US';
        
        this.init();
    }
    
    init() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.maxAlternatives = 1;
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.finalTranscript = '';
                this.interimTranscript = '';
                this.onListeningStart?.();
            };
            
            this.recognition.onresult = (event) => {
                this.interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    
                    if (event.results[i].isFinal) {
                        this.finalTranscript += transcript;
                    } else {
                        this.interimTranscript += transcript;
                    }
                }
                
                this.onTranscriptUpdate?.(this.finalTranscript, this.interimTranscript);
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.onError?.(event.error);
                this.stop();
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.onListeningEnd?.();
                
                if (this.finalTranscript.trim()) {
                    this.onFinalTranscript?.(this.finalTranscript);
                }
            };
        } else {
            console.warn('Speech recognition not supported');
            this.onNotSupported?.();
        }
    }
    
    setLanguage(languageCode) {
        if (this.recognition) {
            this.currentLanguage = languageCode;
            this.recognition.lang = languageCode;
        }
    }
    
    start() {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start();
                return true;
            } catch (error) {
                console.error('Failed to start recognition:', error);
                return false;
            }
        }
        return false;
    }
    
    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }
    
    // Callbacks
    onListeningStart = null;
    onListeningEnd = null;
    onTranscriptUpdate = null;
    onFinalTranscript = null;
    onError = null;
    onNotSupported = null;
}

// Text-to-Speech Module
class TextToSpeech {
    speak(text, language = 'en-US') {
        if ('speechSynthesis' in window) {
            // Stop any ongoing speech
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Set language based on selection
            const voices = speechSynthesis.getVoices();
            let voice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
            
            if (!voice && language === 'hindi') {
                voice = voices.find(v => v.lang.startsWith('hi'));
            } else if (!voice && language === 'telugu') {
                voice = voices.find(v => v.lang.startsWith('te'));
            } else if (!voice && language === 'kannada') {
                voice = voices.find(v => v.lang.startsWith('kn'));
            } else if (!voice && language === 'malayalam') {
                voice = voices.find(v => v.lang.startsWith('ml'));
            }
            
            if (voice) utterance.voice = voice;
            utterance.lang = language;
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;
            
            speechSynthesis.speak(utterance);
        }
    }
    
    stop() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }
}

// Language to Speech Code Mapping
const languageSpeechCodes = {
    'english': 'en-US',
    'hindi': 'hi-IN',
    'telugu': 'te-IN',
    'kannada': 'kn-IN',
    'malayalam': 'ml-IN'
};