"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Mic2, Disc, Disc3, Armchair, ArrowLeft, Play, Pause, X, Sliders, Guitar, Leaf, Piano, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

// --- DONNÉES DE LA B.O. ---
const tracks = [
  {
    id: "gonna-fly-now",
    title: "Gonna Fly Now",
    scene: "Le Training Montage",
    trigger: "poster_main",
    description: "L'hymne absolu du dépassement de soi. Notez l'introduction à la trompette (solitaire, comme Rocky) qui explose ensuite en funk orchestral quand il est rejoint par la foule.",
    bpm: 96,
    key: "Do Maj",
    icon: Piano,
    src: "/audio/rocky/gonna-fly-now.mp3"
  },
  {
    id: "going-the-distance",
    title: "Going The Distance",
    scene: "Le 15ème Round",
    trigger: "mixer",
    description: "Une variation plus sombre et dramatique du thème principal. Les cloches tubulaires sonnent comme le glas, mais les cordes montent en puissance pour signifier la résilience.",
    bpm: 88,
    key: "La Min",
    icon: Sliders,
    src: "/audio/rocky/going-the-distance.mp3"
  },
  {
    id: "adrian",
    title: "Alone in the Ring",
    scene: "La Romance",
    trigger: "sofa",
    description: "Un piano mélancolique et dépouillé. Bill Conti utilise ici le silence autant que les notes pour illustrer la solitude de deux âmes perdues qui se trouvent.",
    bpm: 65,
    key: "Fa Maj",
    icon: Armchair,
    src: "/audio/rocky/adrian.mp3"
  },
  {
    id: "final-bell",
    title: "The Final Bell",
    scene: "Le Verdict",
    trigger: "vinyl_player",
    description: "Le chaos sonore. La foule hurle, la cloche sonne, et la musique devient une boucle triomphante qui ignore totalement le score des juges.",
    bpm: 110,
    key: "Do Maj",
    icon: Disc3,
    src: "/audio/rocky/final-bell.mp3"
  }
]

// --- UTILITAIRES ---
const HoverLabel = ({ title }: { title: string }) => (
  <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-yellow-600/50 bg-black/90 px-4 py-2 font-mono text-xs font-bold text-yellow-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-50 shadow-[0_0_15px_rgba(202,138,4,0.3)] tracking-wider">
    {title}
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b border-r border-yellow-600/50 bg-black/90"></div>
  </div>
)

const PhotoFrame = ({ className, rotate, onClick, triggerName, placeholderText, imageSrc }: any) => {
    const title = triggerName ? tracks.find(t => t.trigger === triggerName)?.title : '';
    return (
      <motion.div
        className={`relative p-[6px] bg-[#1a1a1a] border-2 border-[#0a0a0a] shadow-xl overflow-visible group ${onClick ? 'cursor-pointer pointer-events-auto perspective-500' : ''} ${className}`}
        style={{ rotate: rotate }}
        whileHover={onClick ? { scale: 1.05, rotate: 0, zIndex: 20 } : {}}
        onClick={onClick}
      >
        {title && <HoverLabel title={title} />}
        <div className="relative h-full w-full bg-[#2a2a2a] overflow-hidden filter contrast-110 shadow-inner border border-white/5">
             {imageSrc ? (
                 <div className="h-full w-full bg-cover bg-center sepia opacity-80" style={{ backgroundImage: `url('${imageSrc}')` }}></div>
             ) : (
                 <>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-500 to-gray-800"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
                        {placeholderText ? (
                            <span className="font-black text-white/60 text-xl italic tracking-tighter text-center leading-none">{placeholderText}</span>
                        ) : (
                            <ImageIcon size={32} className="text-white/30" />
                        )}
                    </div>
                 </>
             )}
        </div>
         <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-10 rounded-sm"></div>
      </motion.div>
    )
}

const formatTime = (time: number) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function MusicStudioPage() {
  const [selectedTrack, setSelectedTrack] = useState<typeof tracks[0] | null>(null)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth) * 2 - 1
    const y = (e.clientY / innerHeight) * 2 - 1
    setMousePosition({ x, y })
  }
  const springConfig = { stiffness: 40, damping: 25 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  useEffect(() => { x.set(mousePosition.x); y.set(mousePosition.y) }, [mousePosition, x, y])

  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [selectedTrack])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const xWall = useTransform(x, [-1, 1], [-8, 8])
  const yWall = useTransform(y, [-1, 1], [-8, 8])
  const xMid = useTransform(x, [-1, 1], [-20, 20])
  const yMid = useTransform(y, [-1, 1], [-20, 20])
  const xFront = useTransform(x, [-1, 1], [-35, 35])
  const yFront = useTransform(y, [-1, 1], [-35, 35])

  const handleTriggerClick = (triggerName: string) => {
    const track = tracks.find(t => t.trigger === triggerName)
    if (track) setSelectedTrack(track)
  }

  return (
    <main 
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#1a0f0a] text-yellow-500 font-sans selection:bg-yellow-500 selection:text-black"
      onMouseMove={handleMouseMove}
    >
      <nav className="fixed left-0 top-0 z-50 p-8 flex flex-col gap-4">
        <Link href="/rocky-1" className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-yellow-600 hover:text-yellow-400 transition-colors">
           <ArrowLeft size={16} /> RETOUR AU DOSSIER
        </Link>
      </nav>
      
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-pulse">
         <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-yellow-400/70 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-yellow-600/20">
            Explorez le studio
         </p>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div style={{ x: xWall, y: yWall }} className="absolute inset-[-100px] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40 mix-blend-soft-light contrast-125"></motion.div>
          <div className="absolute inset-0 bg-gradient-radial from-yellow-900/20 via-[#2a1a10]/90 to-[#0f0805]"></div>
          <motion.div style={{ x: xWall, y: yWall }} className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[120px]"></motion.div>
      </div>

      {/* Z-LAYER 1 : MUR DU FOND */}
      <motion.div style={{ x: xWall, y: yWall }} className="absolute inset-0 z-10 pointer-events-none">
        
        {/* --- GRAND CADRE (Trigger Main) --- */}
        <div className="absolute top-[15%] left-[5%] md:left-[10%] pointer-events-auto">
            <PhotoFrame 
                className="h-56 w-40 z-10" 
                rotate={-3} 
                onClick={() => handleTriggerClick('poster_main')} 
                triggerName="poster_main"
                imageSrc="/images/Rocky-gfn.jpg" // IMAGE AJOUTÉE
            />
        </div>

        <motion.div className="absolute top-[12%] right-[5%] md:right-[10%] pointer-events-auto cursor-default group" whileHover={{ scale: 1.02, rotate: -43 }} style={{ rotate: -45 }}>
           <div className="relative drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]">
              <Guitar size={280} className="text-[#2a0a0a] fill-[#4a1a1a] stroke-[1px] opacity-90" />
              <div className="absolute top-10 left-14 h-32 w-4 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-[2px] mix-blend-overlay rotate-45"></div>
           </div>
        </motion.div>
        
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[28rem] pointer-events-auto group">
           <HoverLabel title={tracks.find(t => t.trigger === 'vinyl_player')?.title || ''} />
           <div className="h-5 w-full bg-[#3d2616] border-b-4 border-[#2a1a10] rounded-sm shadow-xl relative z-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
           <div className="flex items-end absolute bottom-5 w-full px-6 gap-6 justify-between cursor-pointer" onClick={() => handleTriggerClick('vinyl_player')}>
              <motion.div className="relative h-20 w-32 bg-[#1a1a1a] rounded-sm border-t border-gray-700 flex-shrink-0 shadow-lg" whileHover={{ scale: 1.02 }}>
                  <div className="absolute inset-2 rounded-full border border-gray-800 bg-[#0a0a0a] flex items-center justify-center overflow-hidden shadow-inner">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                       <Disc3 size={50} className="text-yellow-800 opacity-80 group-hover:text-yellow-600 transition-colors" />
                    </motion.div>
                  </div>
                  <div className="absolute top-2 right-2 h-12 w-1 bg-gray-500/80 rotate-12 origin-top-right shadow-sm z-10"></div>
              </motion.div>
              <div className="flex items-end -space-x-[3px] relative z-0 pb-[1px]">
                 {[...Array(25)].map((_, i) => (
                    <div key={i} className={`h-${14 + (i%5)*2} w-[9px] bg-gradient-to-r ${i%3===0 ? 'from-[#2a1a10] to-[#3d2616]' : i%3===1 ? 'from-[#4a2a1a] to-[#5d3626]' : 'from-red-900/40 to-red-950/40'} border-l border-white/5 rounded-[1px] shadow-sm transform transition-all duration-200 ease-out hover:-translate-y-3 hover:bg-yellow-900`}></div>
                 ))}
              </div>
           </div>
        </div>
      </motion.div>

      {/* Z-LAYER 2 : MILIEU */}
      <motion.div style={{ x: xMid, y: yMid }} className="absolute inset-0 z-20 pointer-events-none">
        
        {/* --- PETITS CADRES DÉCO --- */}
        <div className="absolute bottom-[22%] left-[8%] z-0 pointer-events-auto">
            {/* Petit cadre Jackson 5 */}
            <PhotoFrame 
                className="h-28 w-28 absolute -bottom-8 -right-20 z-0 border-yellow-900/30 opacity-60" 
                rotate={6} 
                imageSrc="/images/affiche-retro.jpg" // IMAGE AJOUTÉE
            />
            {/* Petit cadre 80s Party */}
            <PhotoFrame 
                className="h-32 w-24 absolute -top-16 -left-10 z-0 border-yellow-900/30 opacity-60" 
                rotate={4}
                imageSrc="/images/affche-retro2.jpg" // IMAGE AJOUTÉE
            />
        </div>

        <motion.div style={{ rotate: useTransform(x, [-1, 1], [-3, 3]) }} className="absolute top-[-80px] right-[30%] pointer-events-auto z-30 group">
           <div className="flex flex-col items-center">
              <div className="h-56 w-[4px] bg-gray-200 shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
              <motion.div whileHover={{ scale: 1.05, y: 5 }} className="relative flex h-32 w-16 flex-col items-center rounded-full border-[6px] border-gray-300 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 shadow-2xl cursor-default">
                  <div className="mt-3 h-16 w-12 rounded-full bg-black/80 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-90 grid place-items-center border-2 border-gray-400/50">
                    <Mic2 className="text-gray-300 drop-shadow-md" size={28} />
                  </div>
              </motion.div>
           </div>
        </motion.div>
        
        <motion.div className="absolute bottom-[20%] left-[5%] lg:left-[8%] pointer-events-auto z-20 -rotate-6 group" whileHover={{ scale: 1.01, rotate: -5 }}>
            <div className="h-32 w-4 bg-black/80 absolute bottom-0 left-8 rotate-6"></div>
            <div className="h-32 w-4 bg-black/80 absolute bottom-0 right-8 -rotate-6"></div>
            <div className="relative h-32 w-72 bg-[#4a2a1a] rounded-lg border-4 border-[#2a1a10] shadow-2xl bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] overflow-hidden flex flex-col cursor-default">
                <div className="h-12 bg-[#1a1a1a] flex items-center justify-around px-4 border-b border-black">
                    <Piano size={20} className="text-yellow-600" />
                    <div className="flex gap-2">
                        <div className="h-4 w-4 rounded-full bg-red-900 border border-red-700 shadow-inner group-hover:bg-red-500 transition-colors"></div>
                        <div className="h-4 w-4 rounded-full bg-blue-900 border border-blue-700 shadow-inner"></div>
                    </div>
                    <span className="font-mono text-[8px] text-yellow-600">ANALOG-76</span>
                </div>
                <div className="flex-1 bg-[#f0f0f0] flex items-end relative shadow-inner">
                    {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex-1 h-full border-r border-gray-300 relative">
                        {(i % 7 !== 2 && i % 7 !== 6) && (
                            <div className="absolute top-0 left-2/3 w-2/3 h-3/5 bg-black z-10 rounded-b-sm border-b border-gray-800"></div>
                        )}
                    </div>
                    ))}
                </div>
            </div>
        </motion.div>

        <motion.div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 group cursor-pointer pointer-events-auto z-10" onClick={() => handleTriggerClick('sofa')} whileHover={{ scale: 1.02 }}>
            <HoverLabel title={tracks.find(t => t.trigger === 'sofa')?.title || ''} />
            <div className="absolute -bottom-4 left-4 right-4 h-10 bg-black/70 blur-2xl rounded-full"></div>
            <div className="relative drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                <Armchair size={280} className="text-[#1a0f0a] absolute top-2 left-0 scale-105 blur-[2px] opacity-80" />
                <Armchair size={280} strokeWidth={1.5} className="text-[#3E2723] fill-[#2a1a10] relative z-10" />
                <div className="absolute bottom-[40px] left-[35px] h-[80px] w-[90px] bg-[#2a1a10]/60 rounded-lg z-20 mix-blend-overlay shadow-inner opacity-50"></div>
                <div className="absolute bottom-[40px] right-[35px] h-[80px] w-[90px] bg-[#2a1a10]/60 rounded-lg z-20 mix-blend-overlay shadow-inner opacity-50"></div>
            </div>
        </motion.div>

        <div className="absolute bottom-[18%] right-[5%] lg:right-[10%] h-80 w-48 pointer-events-auto hidden lg:block group cursor-default">
            <div className="absolute bottom-0 h-28 w-full bg-gradient-to-b from-[#4a2a1a] to-[#2a1a10] rounded-b-2xl border-t-[12px] border-[#3d2616] shadow-2xl z-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
            <div className="absolute bottom-24 left-1/2 z-0 w-full -translate-x-1/2">
                {[...Array(16)].map((_, i) => (
                <Leaf key={i} size={50 + (i%4)*15} className={`absolute text-green-900 fill-green-950/90 origin-bottom drop-shadow-lg brightness-75 transition-transform duration-1000 ease-in-out group-hover:rotate-3`}
                    style={{ left: `${(i-8)*8}px`, bottom: `${(i%5)*10}px`, transform: `rotate(${(i-8)*12 + (Math.random()*15)}deg) scaleX(${i%2===0 ? 1 : -1})`, zIndex: -i }}
                />
                ))}
            </div>
        </div>
      </motion.div>

      {/* Z-LAYER 3 : AVANT-PLAN */}
      <motion.div style={{ x: xFront, y: yFront }} className="absolute inset-0 z-30 pointer-events-none flex items-end justify-center pb-0">
        <motion.div className="relative w-full max-w-2xl cursor-pointer group pointer-events-auto" onClick={() => handleTriggerClick('mixer')}>
           <HoverLabel title={tracks.find(t => t.trigger === 'mixer')?.title || ''} />
           <div className="relative mx-auto h-48 w-full transform perspective-[1200px] rotate-x-[20deg] origin-bottom rounded-t-3xl bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-black border-t-[8px] border-gray-800 shadow-[0_-20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <div className="flex h-full w-full justify-around px-12 py-8 relative z-10">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center justify-end gap-3 relative group/slider">
                        <div className="h-28 w-1.5 rounded-full bg-[#0a0a0a] border border-gray-900 relative overflow-hidden shadow-inner">
                             <div className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-900/80 to-yellow-600/50 h-1/2"></div>
                        </div>
                        <motion.div className="absolute w-6 h-10 bg-gradient-to-b from-gray-500 to-gray-800 rounded-sm border-x-2 border-gray-900 shadow-[0_4px_8px_rgba(0,0,0,0.6)] -left-[9px] flex items-center justify-center"
                            animate={{ bottom: `${20 + (Math.sin(i*0.8)*20 + Math.random()*5)}%` }}
                            transition={{ duration: 4 + i%3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        >
                           <div className="h-[2px] w-full bg-red-600 shadow-[0_0_6px_red]"></div>
                        </motion.div>
                    </div>
                  ))}
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] text-gray-500 tracking-[0.3em] mix-blend-plus-lighter">/// CONTI MASTERING DESK ///</div>
           </div>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-8 right-8 z-0 text-right opacity-30 mix-blend-overlay">
          <h1 className="font-serif text-8xl font-black italic text-yellow-900/80 leading-none">STUDIO<br/>76</h1>
      </div>

      <AnimatePresence>
        {selectedTrack && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelectedTrack(null)}
          >
             <motion.div 
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               className="relative w-full max-w-3xl overflow-hidden rounded-lg border border-yellow-600/30 bg-[#1a1a1a] shadow-2xl"
               onClick={(e) => e.stopPropagation()}
             >
                <div className="flex items-center justify-between bg-gradient-to-r from-yellow-700 to-yellow-600 px-6 py-4 text-black shadow-md">
                   <div className="flex items-center gap-3">
                      <selectedTrack.icon size={24} className="text-yellow-100" />
                      <h2 className="font-serif text-2xl font-bold italic text-yellow-100">{selectedTrack.title}</h2>
                   </div>
                   <button onClick={() => setSelectedTrack(null)} className="rounded-full bg-black/20 p-1 hover:bg-black/40 transition-colors">
                      <X size={20} className="text-yellow-100" />
                   </button>
                </div>

                <div className="grid md:grid-cols-3 bg-[#121212]">
                    <div className="flex items-center justify-center p-8 border-r border-white/5">
                       <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="relative h-40 w-40 rounded-full border-4 border-gray-900 bg-black shadow-[0_0_30px_rgba(202,138,4,0.2)]">
                          <div className="absolute inset-[32%] rounded-full border-2 border-yellow-800/50 bg-gradient-to-tr from-red-900 to-red-700 flex items-center justify-center text-[9px] text-center text-yellow-300 font-mono leading-tight shadow-inner">
                             ORIGINAL<br/>MOTION PICTURE<br/>SCORE
                          </div>
                          <Disc className="absolute inset-0 h-full w-full text-gray-800 opacity-40" strokeWidth={0.5} />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none"></div>
                       </motion.div>
                    </div>

                    <div className="col-span-2 space-y-6 p-8">
                       <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div>
                             <span className="block text-[10px] uppercase tracking-wider text-gray-500">Scène Clé</span>
                             <span className="font-mono text-sm font-bold text-yellow-500">{selectedTrack.scene}</span>
                          </div>
                          <div className="text-right">
                             <span className="block text-[10px] uppercase tracking-wider text-gray-500">Data</span>
                             <span className="font-mono text-sm text-gray-400">{selectedTrack.bpm} BPM <span className="text-yellow-700">/</span> {selectedTrack.key}</span>
                          </div>
                       </div>

                       <div className="prose prose-invert">
                          <p className="font-serif text-lg leading-relaxed text-gray-300">{selectedTrack.description}</p>
                       </div>

                       <div className="mt-8 flex items-center gap-4 rounded-md bg-white/5 p-3 border border-white/5 relative overflow-hidden group">
                          <audio ref={audioRef} src={selectedTrack.src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={handleEnded} />
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          <button onClick={togglePlay} className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-600 text-black hover:bg-yellow-500 transition-all scale-100 hover:scale-105 shadow-lg relative z-10">
                             {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                          </button>
                          
                          <div className="flex-1 relative z-10">
                             <div className="h-1.5 w-full rounded-full bg-gray-800 overflow-hidden">
                                <motion.div className="h-full bg-yellow-500" style={{ width: `${(currentTime / duration) * 100}%` }}></motion.div>
                             </div>
                             <div className="flex justify-between mt-1 font-mono text-[10px] text-gray-500">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}