"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ArrowLeft, Info, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Données avec les NOMS EXACTS
const outfits = [
  {
    id: 1,
    name: "Michael Burry",
    actor: "Christian Bale",
    image: "/bale.JPG",
    style: "Le génie en short",
    desc: "Il refuse les codes vestimentaires comme il refuse les codes bancaires. Pieds nus au bureau, t-shirt métal, coupe de cheveux faite maison.",
    meaning: "Son absence de costume est un acte de rébellion silencieuse. Dans un monde financier où le costume-cravate est l'uniforme de la crédibilité, Burry choisit le confort brut. Cela signale qu'il ne joue pas le jeu social, il joue le jeu des chiffres. Il est pur intellect, débarrassé de toute vanité. C'est paradoxalement le personnage le plus 'habillé' de vérité dans un système déguisé.",
    color: "bg-gray-800",
    iconColor: "text-gray-600"
  },
  {
    id: 2,
    name: "Jared Vennett",
    actor: "Ryan Gosling",
    image: "/gosling.jpg",
    style: "Le cynique 'bling'",
    desc: "Costumes sur mesure, cheveux gominés, bronzage artificiel. Il ressemble à un vendeur de voitures d'occasion de luxe.",
    meaning: "Son style crie l'ambition et la vénalité. Chaque détail de sa tenue est conçu pour projeter une image de succès agressif. Il incarne l'archétype du 'Wolf of Wall Street' mais avec une conscience de soi ironique. Il est l'incarnation de l'avidité décomplexée : il ne cache pas qu'il veut être riche, et son costume brillant est l'armure de cette transparence cynique.",
    color: "bg-yellow-600",
    iconColor: "text-yellow-600"
  },
  {
    id: 3,
    name: "Mark Baum",
    actor: "Steve Carell",
    image: "/carell.JPG",
    style: "Le deuil perpétuel",
    desc: "Costumes mal taillés, ternes, cravates desserrées. Il a l'air de porter le poids du monde (et de sa culpabilité) sur ses épaules.",
    meaning: "Ses vêtements ne sont pas une armure, mais une punition. Il porte le costume comme un fardeau, toujours un peu de travers, signalant son inconfort moral au sein du système. Contrairement à Vennett qui brille, Baum s'efface dans des teintes sombres. Son style est 'anti-charisme' : il ne cherche pas à séduire, il cherche à punir. C'est l'uniforme de celui qui est en deuil de l'honnêteté.",
    color: "bg-blue-900",
    iconColor: "text-blue-800"
  },
  {
    id: 4,
    name: "Ben Rickert",
    actor: "Brad Pitt",
    image: "/pitt-tbs.jpg",
    style: "Le parano bio",
    desc: "Veste de survêtement, lunettes teintées, barbe mal rasée. Il ressemble à un prof de géo à la retraite qui cultive ses légumes.",
    meaning: "Le retour à la terre et le rejet total du matérialisme. Il a quitté la finance pour survivre à l'apocalypse, et son style le prouve. C'est du 'normcore' de survie. Ses vêtements disent : 'Votre argent ne vaudra plus rien, seules mes graines compteront'. Il s'habille pour être invisible aux yeux du système, comme un espion qui a vu le futur et qui a décidé de ne plus participer.",
    color: "bg-green-700",
    iconColor: "text-green-700"
  }
]

// TYPAGE EXPLICITE
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

// TYPAGE EXPLICITE
const hangerVariants: Variants = {
  hidden: { y: -200, opacity: 0, rotate: -10 },
  visible: { 
    y: 0, 
    opacity: 1, 
    rotate: 0,
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 12 
    }
  },
  hover: {
    y: 10,
    rotate: [0, -5, 5, -2, 2, 0],
    transition: {
      rotate: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 2,
        ease: "easeInOut"
      }
    }
  }
}

export default function DressingPage() {
  const [selectedOutfit, setSelectedOutfit] = useState<typeof outfits[0] | null>(null)

  return (
    <main className="relative min-h-screen bg-[#fff0f5] text-[#1a1a1a] selection:bg-pink-300 overflow-hidden font-serif">
      
      {/* Navigation Retour - DOIT pointer vers le dossier parent */}
      <nav className="fixed left-0 right-0 top-0 z-50 p-8 z-[60]">
        <Link href="/the-big-short" className="group flex items-center gap-2 font-serif text-sm font-bold tracking-widest text-pink-900 hover:text-pink-600 transition-colors cursor-pointer">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>RETOUR AU DOSSIER</span>
        </Link>
      </nav>

      {/* Titre Girly avec animation */}
      <header className="pt-32 pb-12 text-center relative z-20">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-serif text-6xl md:text-8xl italic text-pink-400 mix-blend-multiply">
            Le Vestiaire
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-pink-800/60">
            Dis-moi ce que tu portes, je te dirai comment tu crashes l'économie
          </p>
        </motion.div>
      </header>

      {/* L'Armoire (La tringle) */}
      <section className="relative mx-auto max-w-5xl h-[50vh] flex items-start justify-center px-4 z-10">
        
        {/* La barre de penderie */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-0 left-10 right-10 h-2 bg-gray-300 rounded-full shadow-inner z-0 origin-center"
        />

        {/* Les Cintres Dynamiques */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex w-full justify-around pt-2"
        >
          {outfits.map((outfit) => (
            <motion.button
              key={outfit.id}
              variants={hangerVariants}
              whileHover="hover"
              onClick={() => setSelectedOutfit(outfit)}
              className="group flex flex-col items-center gap-2 focus:outline-none cursor-pointer"
            >
              {/* Le Cintre (Tige qui relie à la barre) */}
              <div className="h-16 w-1 bg-gray-400 group-hover:bg-pink-400 transition-colors origin-top"></div>
              
              {/* Le Médaillon avec l'image du Cintre */}
              <div className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl transition-all duration-300 group-hover:shadow-pink-200 ${selectedOutfit?.id === outfit.id ? 'ring-4 ring-pink-300 scale-110' : ''}`}>
                 
                 {/* L'image du cintre */}
                 <div className="relative w-14 h-14">
                   <Image 
                      src="/cintre.jpg" 
                      alt="Cintre" 
                      fill
                      className="object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                      unoptimized // Sécurité pour l'affichage
                   />
                 </div>

                 {/* Nom de l'acteur */}
                 <div className="absolute -bottom-3 bg-black text-white text-[10px] uppercase font-bold px-3 py-1 tracking-widest rounded-full shadow-md group-hover:bg-pink-500 transition-colors">
                    {outfit.actor}
                 </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Zone d'analyse (Modale qui apparaît) */}
      <AnimatePresence mode="wait">
        {selectedOutfit && (
          <motion.div 
            key={selectedOutfit.id}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-40 h-[60vh] bg-white rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Bouton Fermer */}
            <button 
              onClick={() => setSelectedOutfit(null)}
              className="absolute top-6 right-6 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>

            <div className="h-full overflow-y-auto p-8 md:p-12">
                <div className="mx-auto max-w-6xl grid md:grid-cols-12 gap-12 items-start">
                    
                    {/* Colonne Image du Personnage */}
                    <div className="md:col-span-3 flex justify-center md:justify-start">
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="relative w-48 h-48 md:w-full md:h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-pink-50"
                        >
                            <Image 
                                src={selectedOutfit.image} 
                                alt={selectedOutfit.actor} 
                                fill 
                                className="object-cover object-top"
                                unoptimized // CRUCIAL : Force l'affichage sans traitement Next.js
                            />
                        </motion.div>
                    </div>

                    {/* Colonne Texte */}
                    <div className="md:col-span-9">
                        {/* En-tête */}
                        <div className="mb-8 border-b border-pink-100 pb-6">
                            <motion.h2 
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              className="font-serif text-5xl text-black mb-3"
                            >
                              {selectedOutfit.name}
                            </motion.h2>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`inline-block px-4 py-1 text-xs font-bold text-white uppercase tracking-widest rounded-full ${selectedOutfit.color}`}>
                                    {selectedOutfit.style}
                                </span>
                                <span className="text-sm text-gray-400 font-mono uppercase tracking-widest">
                                    Actor: {selectedOutfit.actor}
                                </span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Description simple */}
                            <motion.div
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ delay: 0.3 }}
                            >
                                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Le Look</h3>
                                <p className="text-gray-600 italic font-serif text-lg leading-relaxed">
                                    {selectedOutfit.desc}
                                </p>
                            </motion.div>

                            {/* Analyse Profonde */}
                            <motion.div 
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.4 }}
                               className="bg-pink-50/50 p-6 rounded-xl border border-pink-100"
                            >
                                <div className="flex items-center gap-2 mb-3 text-pink-600">
                                    <Info size={18} />
                                    <span className="font-mono text-xs uppercase tracking-widest font-bold">Analyse Sémiologique</span>
                                </div>
                                <p className="text-gray-800 font-medium leading-relaxed">
                                    {selectedOutfit.meaning}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-[-1]">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-100 rounded-full blur-3xl"></div>
      </div>

    </main>
  )
}