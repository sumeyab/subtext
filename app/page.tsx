"use client"

import { useState, useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  
  // Configuration du ressort pour un effet parallaxe fluide et luxueux
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // CORRECTION ICI : On ne prend que la taille de la fenêtre depuis 'window'
      const { innerWidth, innerHeight } = window
      
      // On utilise 'e.clientX' pour la position de la souris
      const x = (e.clientX / innerWidth) - 0.5
      const y = (e.clientY / innerHeight) - 0.5
      
      setCursorPosition({ x: e.clientX, y: e.clientY })
      mouseX.set(x)
      mouseY.set(y)
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Mouvements inversés pour le texte et l'image (profondeur)
  const moveTextX = useTransform(mouseX, [-0.5, 0.5], [15, -15])
  const moveTextY = useTransform(mouseY, [-0.5, 0.5], [15, -15])
  const moveImageX = useTransform(mouseX, [-0.5, 0.5], [-20, 20])
  const moveImageY = useTransform(mouseY, [-0.5, 0.5], [-20, 20])
  const rotateImage = useTransform(mouseX, [-0.5, 0.5], [-2, 2])

  return (
    <main className="relative min-h-screen bg-[#F9F9F7] text-[#1a1a1a] selection:bg-black selection:text-white overflow-x-hidden font-serif">
      
      {/* Curseur Minimaliste */}
      <div
        className="pointer-events-none fixed z-[100] h-4 w-4 rounded-full bg-black mix-blend-multiply transition-transform duration-75 ease-out hidden md:block"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Header */}
      <nav className="fixed left-0 right-0 top-0 z-50 px-8 py-8 bg-[#F9F9F7]/80 backdrop-blur-sm transition-all">
        <div className="flex justify-between items-center max-w-7xl mx-auto border-b border-black/10 pb-6">
            <div className="font-serif text-sm font-bold tracking-[0.2em]">SUBTEXT ©</div>
            <div className="hidden md:block text-[10px] uppercase tracking-widest opacity-50 font-sans">Magazine Culturel & Analytique</div>
            <div className="text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:opacity-50 transition-opacity font-sans">Menu</div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-8 pt-40 md:pt-48 pb-20">
        
        {/* --- HERO SECTION CÔTE À CÔTE --- */}
        <section className="mb-40 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            
            {/* 1. BLOC TEXTE (Aligné à droite du bloc, vers l'image) */}
            <motion.div 
                style={{ x: moveTextX, y: moveTextY }} 
                className="flex flex-col items-center md:items-end text-center md:text-right z-10"
            >
                <motion.h1 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-serif text-[15vw] md:text-[8rem] lg:text-[10rem] leading-[0.8] tracking-tighter text-black mix-blend-darken whitespace-nowrap"
                >
                    SUBTEXT
                </motion.h1>

                <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-6 font-serif text-2xl md:text-3xl italic font-light text-gray-600 max-w-md"
                >
                    La culture par le prisme du cinéma.
                </motion.h2>
            </motion.div>

            {/* 2. LE TABLEAU (Aligné à gauche du bloc, vers le texte) */}
            <motion.div 
                style={{ x: moveImageX, y: moveImageY, rotateY: rotateImage }}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
                className="relative z-20 mt-8 md:mt-0"
            >
                {/* Cadre DORÉ moderne avec ombre portée douce */}
                <div className="relative w-[70vw] md:w-[320px] shadow-2xl transition-shadow duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] bg-[#d4af37] p-3">
                     <img
                        src="/tableau-landing-page.jpg"
                        alt="Le Baiser - Gustav Klimt"
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </motion.div>

        </section>

        {/* --- LE MENU DES DOSSIERS --- */}
        <section className="border-t border-black pt-12">
            <div className="flex items-end justify-between mb-12">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest font-sans">Dossiers Disponibles</h2>
                <span className="font-mono text-xs font-sans">01 / ∞</span>
            </div>

            <div className="group">
                <Link href="/the-big-short" className="block">
                    {/* Conteneur principal du lien */}
                    <div className="relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-black/10 transition-all duration-500 group-hover:border-black group-hover:pl-4 overflow-visible">
                        
                        {/* 1. L'AFFICHE (Apparition au survol) */}
                        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-auto z-30 opacity-0 scale-90 rotate-3 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none drop-shadow-2xl">
                             <Image 
                                src="/affiche-tbs.jpg" 
                                alt="Affiche The Big Short" 
                                width={300} 
                                height={450}
                                className="object-cover rounded-sm shadow-xl"
                             />
                        </div>

                        {/* Numéro & Catégorie */}
                        <div className="relative z-20 mb-4 md:mb-0 flex gap-4 md:gap-12 font-mono text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity mix-blend-multiply font-sans">
                            <span>No. 001</span>
                            <span>Finance / Crise</span>
                        </div>

                        {/* Titre */}
                        <div className="relative z-20 md:absolute md:left-1/2 md:-translate-x-1/2">
                            <h3 className="font-serif text-4xl md:text-6xl italic text-gray-400 transition-colors duration-300 group-hover:text-black mix-blend-darken">
                                The Big Short
                            </h3>
                        </div>

                        {/* Action */}
                        <div className="relative z-20 mt-4 md:mt-0 flex items-center gap-2 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-sans">
                            <span className="text-xs font-bold uppercase tracking-widest">Lire l'analyse</span>
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Placeholder pour le prochain dossier */}
            <div className="py-12 border-b border-black/10 opacity-30 cursor-not-allowed">
                 <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex gap-12 font-mono text-xs uppercase tracking-widest font-sans">
                        <span>No. 002</span>
                        <span>Mode / Sociologie</span>
                    </div>
                    <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
                        <h3 className="font-serif text-4xl md:text-6xl italic">
                            Le Diable s'habille en Prada
                        </h3>
                    </div>
                    <div className="text-xs uppercase tracking-widest font-sans">Bientôt</div>
                </div>
            </div>

        </section>

      </div>
    </main>
  )
}