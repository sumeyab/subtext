"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, MapPin, X, Camera, Building, Info, Cloud } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// --- COMPOSANTS DRAPEAUX SVG (Pour remplacer les émojis qui ne marchent pas sur Windows) ---
const SwedishFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" className="w-5 h-auto rounded-[2px] shadow-sm border border-white/50">
    <rect width="16" height="10" fill="#006aa7"/>
    <rect width="2" height="10" x="5" fill="#fecc00"/>
    <rect width="16" height="2" y="4" fill="#fecc00"/>
  </svg>
);
const CroatianFlag = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" className="w-5 h-auto rounded-[2px] shadow-sm border border-white/50">
     <rect width="16" height="3.33" y="0" fill="#ff0000"/>
     <rect width="16" height="3.33" y="3.33" fill="#ffffff"/>
     <rect width="16" height="3.33" y="6.66" fill="#0000ff"/>
     <rect width="3" height="3" x="6.5" y="3.5" fill="white" stroke="red" strokeWidth="0.5"/>
   </svg>
)

// --- DONNÉES GÉOGRAPHIQUES ---
const locations = [
  {
    id: "visby",
    name: "Visby",
    country: "Suède",
    FlagComponent: SwedishFlag,
    coords: { top: "25%", left: "52%" },
    flagColor: "bg-blue-500",
    description: "C'est l'inspiration principale pour l'architecture médiévale de Koriko. La ville est entourée de remparts et possède ces toits rouges et murs blancs caractéristiques.",
    details: [
      "Toits en tuiles rouges orangées",
      "Rues pavées étroites",
      "Murs d'enceinte fortifiés",
      "Végétation grimpante sur les façades"
    ],
    imagePlaceholder: "bg-orange-100" 
  },
  {
    id: "stockholm",
    name: "Stockholm",
    country: "Suède",
    FlagComponent: SwedishFlag,
    coords: { top: "22%", left: "58%" },
    flagColor: "bg-blue-500",
    description: "Le quartier de Gamla Stan (la vieille ville) a servi de modèle pour la densité urbaine, le port animé et surtout la tour de l'horloge visible dans le film.",
    details: [
      "La Tour de l'Horloge (Hôtel de ville)",
      "L'architecture portuaire",
      "Les ponts reliant les îles",
      "Ambiance maritime nordique"
    ],
    imagePlaceholder: "bg-blue-100"
  },
  {
    id: "dubrovnik",
    name: "Dubrovnik",
    country: "Croatie",
    FlagComponent: CroatianFlag,
    coords: { top: "65%", left: "60%" },
    flagColor: "bg-red-600",
    description: "Bien que l'ambiance soit très nordique, la luminosité, la couleur de la mer Adriatique et l'enchevêtrement des toits de Koriko rappellent cette ville fortifiée méditerranéenne.",
    details: [
      "Contraste Mer Bleue / Toits Rouges",
      "Ville fortifiée surplombant l'eau",
      "Luminosité méditerranéenne",
      "Architecture dense"
    ],
    imagePlaceholder: "bg-red-100"
  }
]

export default function AtlasPage() {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null)

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#A5D8E4] font-sans text-[#2D2436] selection:bg-red-300">
      
      {/* Navigation */}
      <nav className="fixed left-0 top-0 z-50 p-8">
        <Link href="/kiki" className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-white hover:text-red-500 transition-colors drop-shadow-md">
           <ArrowLeft size={16} /> RETOUR AU DOSSIER
        </Link>
      </nav>

      {/* TITRE FLOTTANT */}
      <div className="absolute top-8 right-8 z-10 text-right pointer-events-none">
          <h1 className="font-serif text-5xl md:text-7xl font-black italic text-white drop-shadow-lg text-outline">L'ATLAS</h1>
          <p className="font-mono text-xs font-bold text-white/80 uppercase tracking-widest mt-2">Le Monde Imaginaire de Koriko</p>
      </div>

      {/* --- CARTE ABSTRAITE --- */}
      <div className="absolute inset-0 flex items-center justify-center transform scale-150 md:scale-110 origin-center mt-20 md:mt-0">
          
          <div className="relative w-[800px] h-[800px]">
              
              {/* FOND CARTE SVG */}
              <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full drop-shadow-2xl">
                  <path d="M 300 200 Q 400 100 500 150 T 600 250 T 550 400 T 650 600 T 500 700 T 300 600 T 200 400 T 300 200 Z" fill="#E8F3D6" stroke="#CDE6B4" strokeWidth="4" />
                  <path d="M 200 250 Q 250 200 280 280 T 220 320 Z" fill="#E8F3D6" stroke="#CDE6B4" strokeWidth="4" /> 
                  <path d="M 350 250 Q 450 300 580 280" fill="none" stroke="#A4C996" strokeWidth="3" strokeDasharray="10,10" opacity="0.6" />
                  <path d="M 320 500 Q 450 450 620 550" fill="none" stroke="#A4C996" strokeWidth="3" strokeDasharray="10,10" opacity="0.6" />
              </svg>

              {/* PINS INTERACTIFS */}
              {locations.map((loc) => (
                  <motion.button
                    key={loc.id}
                    className="absolute group z-20 flex flex-col items-center justify-center"
                    style={{ top: loc.coords.top, left: loc.coords.left }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLocation(loc)}
                  >
                      <div className="relative flex items-center">
                          <div className="relative flex flex-col items-center z-10">
                              <motion.div 
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${selectedLocation?.id === loc.id ? 'bg-red-500 text-white' : 'bg-white text-violet-500'}`}
                              >
                                  <MapPin size={16} fill="currentColor" />
                              </motion.div>
                              <div className="w-1 h-4 bg-black/20"></div>
                              <div className="w-4 h-1 bg-black/20 rounded-full blur-[2px]"></div>
                          </div>

                          <div className="absolute left-8 drop-shadow-md group-hover:-translate-y-1 transition-transform cursor-pointer">
                              <loc.FlagComponent />
                          </div>
                          
                          <div className="absolute -top-10 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 text-violet-900 pointer-events-none">
                              {loc.name}
                          </div>
                      </div>
                  </motion.button>
              ))}

              {/* --- ATMOSPHÈRE & DÉCORATIONS ANIMÉES (FLUIDES) --- */}
              
              {/* Nuages SVG (Mouvements lents et doux) */}
              <motion.div animate={{ x: [-50, 50, -50] }} transition={{ duration: 80, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[30%] left-[10%] text-white/60">
                  <Cloud size={64} fill="white" />
              </motion.div>
              <motion.div animate={{ x: [50, -50, 50] }} transition={{ duration: 65, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[60%] right-[20%] text-white/60">
                  <Cloud size={48} fill="white" />
              </motion.div>

              {/* BALAIS VOLANTS 🧹 (Trajectoires courbes et fluides) */}
              <motion.div 
                animate={{ x: [0, 150, 0], y: [0, -40, 0], rotate: [5, 25, 5] }} 
                transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute top-[40%] left-[15%] text-3xl opacity-70 drop-shadow-sm"
              >
                  🧹
              </motion.div>
              <motion.div 
                animate={{ x: [0, -120, 0], y: [0, 60, 0], rotate: [-5, -20, -5] }} 
                transition={{ duration: 45, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
                className="absolute top-[20%] right-[25%] text-2xl opacity-70 drop-shadow-sm"
              >
                  🧹
              </motion.div>
              <motion.div 
                animate={{ x: [-80, 80, -80], y: [30, -30, 30], rotate: [0, 15, 0] }} 
                transition={{ duration: 60, repeat: Infinity, ease: "easeInOut", delay: 5 }} 
                className="absolute bottom-[25%] left-[35%] text-xl opacity-60 drop-shadow-sm"
              >
                  🧹
              </motion.div>

              {/* COLIS FLOTTANTS 📦 (Livraisons en cours, mouvements doux) */}
              <motion.div 
                animate={{ y: [0, 80, 0], x: [0, 30, 0], rotate: [-10, 10, -10] }} 
                transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute top-[15%] left-[60%] text-2xl opacity-80 drop-shadow-sm"
              >
                  📦
              </motion.div>
              <motion.div 
                animate={{ y: [0, -60, 0], x: [0, -40, 0], rotate: [5, -15, 5] }} 
                transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 3 }} 
                className="absolute bottom-[35%] right-[40%] text-xl opacity-80 drop-shadow-sm"
              >
                  📦
              </motion.div>

          </div>
      </div>

      {/* --- STICKER JIJI ANIMÉ (Bas Gauche) --- */}
      <motion.div 
        className="absolute bottom-4 left-4 z-30 w-32 md:w-48 pointer-events-none"
        animate={{ 
            y: [0, -10, 0],
            rotate: [-3, 3, -3]
        }}
        transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity
        }}
      >
          <Image 
            src="/images/jiji-sticker.png" 
            alt="Sticker Jiji"
            width={200}
            height={200}
            className="drop-shadow-xl"
          />
      </motion.div>

      {/* --- SIDEBAR D'INFORMATIONS --- */}
      <AnimatePresence>
        {selectedLocation && (
            <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-white shadow-2xl z-40 p-8 overflow-y-auto"
            >
                <button 
                    onClick={() => setSelectedLocation(null)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="mt-12 space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${selectedLocation.flagColor}`}>
                                {selectedLocation.country}
                            </span>
                            <div className="drop-shadow-sm">
                                <selectedLocation.FlagComponent />
                            </div>
                        </div>
                        <h2 className="font-serif text-4xl font-black text-violet-900 mb-4">{selectedLocation.name}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {selectedLocation.description}
                        </p>
                    </div>

                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 relative group shadow-inner">
                        <Image 
    src={`/images/${selectedLocation.id}.jpg`} 
    alt={selectedLocation.name}
    fill
    className="object-cover"
/>
                    </div>

                    <div className="bg-[#FFF5F5] p-6 rounded-xl border border-red-100">
                        <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-red-500 mb-4">
                            <Building size={20} />
                            Éléments Architecturaux
                        </h3>
                        <ul className="space-y-3">
                            {selectedLocation.details.map((detail, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0"></span>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg flex gap-3 text-blue-800 text-sm">
                        <Info size={20} className="flex-shrink-0 mt-0.5" />
                        <p>
                            Note : Koriko est un collage "idéal". Miyazaki a mélangé la structure de la Suède avec les couleurs chaudes de la Méditerranée pour créer une ville unique.
                        </p>
                    </div>

                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}