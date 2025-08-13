'use client'

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight as faChevronSolid, faMagnifyingGlass as faGlassSolid } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

const rotatingTexts = ['Développeur Web', 'Graphiste', 'Administrateur réseau'];

const typingSpeed = 120;
const deletingSpeed = 60;
const pauseBetweenWords = 2000;

export default function Home() {
  const router = useRouter()
  const [input, setInput] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [imageSrc, setImageSrc] = useState('/moiSolo.png');

  useEffect(() => {
    if (!isTyping) return;

    const currentText = rotatingTexts[index % rotatingTexts.length];

    if (deleting) {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
          setDisplayText(currentText.slice(0, charIndex - 1));
        }, deletingSpeed);
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % rotatingTexts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
          setDisplayText(currentText.slice(0, charIndex + 1));
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDeleting(true);
        }, pauseBetweenWords);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, deleting, index, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(false);
  };

  const handleSubmit = () => {
    if (input === 'adminGabUn') {
      router.push('/admin/login');
    } else if (input === 'Pluh' || input === 'pluh') {
      setImageSrc('/pluh.png');
    } else {
      router.push('/about');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center filter blur-xl opacity-80"
        style={{ backgroundImage: "url('/backMage.jpg')" }}
      />

      <div className="relative h-full w-full flex items-center justify-between text-white">
        <div className="h-full aspect-[3/4] relative">
          <img src={imageSrc} alt="Moi" className="object-cover w-full h-full" />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-6 ps-12">
          <h1 className="text-5xl font-bold">GABIN GUERIN</h1>

          <div className="w-2/3 max-w-xl flex items-center bg-white/20 backdrop-blur-md rounded-full overflow-hidden border border-white/30 shadow">
            <div className="px-5 text-white/70">
              <FontAwesomeIcon icon={faGlassSolid} className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none px-2 py-4 text-white text-lg placeholder-white/50"
              placeholder={displayText}
            />
          </div>

          <div className="w-2/3 max-w-xl flex justify-end">
            <button onClick={handleSubmit} className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition flex items-center gap-2">
              VOIR PLUS
              <FontAwesomeIcon icon={faChevronSolid} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
