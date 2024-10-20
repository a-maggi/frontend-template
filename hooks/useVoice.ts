import { useState, useEffect, useRef } from "react";

export default function useVoice() {
  const voice = useRef<typeof window.SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "es-ES";
      recognition.onresult = (event: any) => {
        setText(event.results[event.results.length - 1][0].transcript);
        setIsListening(false);
        recognition.stop();
      };
      voice.current = recognition;
      setVoiceSupported(true);
    }
  }, []);

  const listen = () => {
    setIsListening(!isListening);
    if (voice.current === null) return;
    if (isListening) {
      voice.current.stop();
    } else {
      voice.current.start();
    }
  };

  return { listen, isListening, text, voiceSupported: voiceSupported };
}
