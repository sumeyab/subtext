"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { ArrowDown, Trophy, Star, Flag, Zap, Heart, Dumbbell, Quote, Disc, Play, Music4 } from "lucide-react"
import Link from "next/link"

// --- FOND ANIMÉ ---
const BoxingBackground = () => {
  const icons = [Trophy, Star, Zap, Dumbbell, Flag]
  const [items, setItems] = useState<{ id: number; x: number; y: number; size: number; iconIndex: number; rotation: number }[]>([])

  useEffect(() => {
    const newItems = [...Array(25)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      iconIndex: Math.floor(Math.random() * icons.length),
      rotation: Math.random() * 360
    }))
    setItems(newItems)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((item) => {
        const Icon = icons[item.iconIndex]
        return (
          <motion.div
            key={item.id}
            className="absolute text-blue-500/30" 
            initial={{ opacity: 0 }}
            animate={{ 
              y: [0, -100, 0], 
              opacity: [0, 0.8, 0], 
              rotate: [item.rotation, item.rotation + 45, item.rotation] 
            }}
            transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, ease: "linear" }}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            <Icon size={item.size} strokeWidth={1.5} />
          </motion.div>
        )
      })}
    </div>
  )
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const cardHover: Variants = {
  hover: { scale: 1.02, y: -5, transition: { type: "spring", stiffness: 300 } }
}

export default function RockyPage() {
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  // --- ÉTAT POUR LES NOTES DE MUSIQUE ---
  const [musicNotes, setMusicNotes] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([])

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false)
      } else {
        setIsNavVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    
    // --- GÉNÉRATION DES NOTES CÔTÉ CLIENT (Anti-Hydration Error) ---
    const generatedNotes = [...Array(5)].map((_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 5 + 5,
        delay: i * 0.5
    }))
    setMusicNotes(generatedNotes)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <main className="relative min-h-screen bg-[#E5E7EB] text-[#1a1a1a] selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
      <BoxingBackground />

      {/* Navigation Retour */}
      <nav className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-500 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <Link href="/" className="font-serif text-sm font-bold tracking-[0.2em] text-[#1a1a1a] hover:text-blue-600 transition-colors">← SUBTEXT</Link>
          <div className="text-[10px] uppercase tracking-widest opacity-50">Dossier N°02</div>
        </div>
      </nav>

      {/* 1. HERO DOSSIER */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-8 pt-20">
        <motion.div style={{ scale, opacity }} className="relative z-10 mx-auto max-w-6xl text-center w-full">
          <div className="mb-8 flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-blue-700">
              <span>Boxe</span>
              <span>•</span>
              <span>Résilience</span>
              <span>•</span>
              <span>Rêve Américain</span>
          </div>

          {/* --- TITRE CORRIGÉ : DIMENSIONS SIMILAIRES A BIG SHORT --- */}
          {/* J'ai utilisé text-[15vw] (Big Short est à 12vw, mais Rocky est plus court donc on compense légèrement)
              et j'ai ajouté un max-width (lg:text) pour les grands écrans. 
              Le padding-right (pr-6) protège l'italique. */}
          <h1 className="mb-8 font-serif text-[15vw] lg:text-[12rem] font-black italic leading-[0.85] tracking-tighter text-center drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-white to-red-600 pr-6 py-2 block">
              ROCKY
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-balance font-serif text-xl md:text-2xl italic leading-relaxed text-[#1a1a1a]/80">
            Il ne s'agit pas de frapper fort. Il s'agit de se faire frapper et de continuer à avancer.
          </p>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="opacity-50">
            <ArrowDown className="mx-auto h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. SYNOPSIS ÉPURÉ */}
      <section className="relative z-10 px-8 py-16">
         <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={fadeInUp}
           className="mx-auto max-w-3xl border-l-4 border-blue-700 pl-8"
         >
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-blue-700">Le Pitch</h3>
            <p className="font-serif text-lg leading-relaxed text-gray-700">
               Philadelphie, 1976. Rocky Balboa est un boxeur de seconde zone qui travaille comme homme de main pour un prêteur sur gages. Il n'a pas d'avenir, pas d'argent, juste un cœur d'or et des poings solides. Jusqu'au jour où le champion du monde, Apollo Creed, décide d'offrir une chance à un "inconnu" pour le titre suprême. C'est l'histoire d'un homme qui ne veut pas gagner, mais juste prouver qu'il n'est pas un raté.
            </p>
         </motion.div>
      </section>

      {/* 3. LEXIQUE : LES CODES DU RING */}
      <section className="relative z-10 bg-[#0f172a] px-8 py-32 text-[#F9F9F7]">
        <div className="mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-16 border-b border-white/10 pb-8"
            >
                <h2 className="font-serif text-4xl font-light text-white md:text-5xl">Le Vocabulaire du <span className="text-red-600 font-bold italic">Combat</span></h2>
                <p className="mt-4 max-w-xl text-gray-400">Plus qu'un sport, la boxe est ici une allégorie de la condition sociale.</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* SOUTHPAW */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  className="group border border-white/10 bg-white/5 p-8 transition-colors hover:border-blue-500/50"
                >
                    <div className="mb-4 flex items-center gap-3 text-blue-500">
                        <Dumbbell size={24} />
                        <h3 className="font-serif text-2xl font-bold">Southpaw</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                        "Fausse patte". Un boxeur gaucher. C'est rare, c'est gênant pour l'adversaire, et c'est souvent vu comme un défaut.
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-white/60">
                        <span className="font-bold text-white">Dans le film :</span> Rocky est gaucher. C'est la métaphore de son inadaptation sociale. Il boxe "à l'envers" du monde.
                    </div>
                </motion.div>

                {/* THE DISTANCE */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.1 }}
                  className="group border border-white/10 bg-white/5 p-8 transition-colors hover:border-red-500/50"
                >
                    <div className="mb-4 flex items-center gap-3 text-red-500">
                        <Flag size={24} />
                        <h3 className="font-serif text-2xl font-bold">The Distance</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                        "Tenir la distance". Ne pas être mis K.O. avant la fin du 15ème round. Ce n'est pas gagner, c'est survivre.
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-white/60">
                        <span className="font-bold text-white">Dans le film :</span> C'est le seul but de Rocky. "Si la cloche sonne et que je suis encore debout, je saurai que je ne suis pas un raté."
                    </div>
                </motion.div>

                {/* CUTMAN */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.2 }}
                  className="group border border-white/10 bg-white/5 p-8 transition-colors hover:border-yellow-500/50"
                >
                    <div className="mb-4 flex items-center gap-3 text-yellow-500">
                        <Heart size={24} />
                        <h3 className="font-serif text-2xl font-bold">Cutman</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                        L'homme de coin qui soigne les plaies entre les rounds pour éviter l'arrêt du combat par l'arbitre.
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-white/60">
                        <span className="font-bold text-white">Dans le film :</span> Mickey et Adrian sont ses "cutmen" émotionnels. Ils cicatrisent son âme pour qu'il puisse continuer.
                    </div>
                </motion.div>

                {/* UNDERDOG */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.3 }}
                  className="group border border-white/10 bg-white/5 p-8 transition-colors hover:border-green-500/50"
                >
                    <div className="mb-4 flex items-center gap-3 text-green-500">
                        <Zap size={24} />
                        <h3 className="font-serif text-2xl font-bold">Underdog</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                        L'outsider. Celui sur qui personne ne parie. Celui qui est supposé perdre pour mettre en valeur le champion.
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-white/60">
                        <span className="font-bold text-white">Dans le film :</span> L'essence même du Rêve Américain. N'importe qui, même un inconnu, peut avoir sa chance (One Shot).
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 4. ANALYSE (APOLLO vs ROCKY) */}
      <section className="relative z-10 border-t border-black/10 bg-[#F3F4F6] px-8 py-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          <div className="sticky top-32 h-fit">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h2 className="mb-6 font-serif text-5xl font-light text-blue-800">Le Duel des Mythes</h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  Ce n'est pas juste un combat physique. C'est l'affrontement de deux visions de l'Amérique qui coexistent en 1976.
                </p>
            </motion.div>
          </div>
          <div className="space-y-12">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-none border-l-4 border-red-600 bg-white p-8 shadow-sm"
            >
              <h3 className="mb-2 font-serif text-2xl font-bold text-red-600">Apollo Creed</h3>
              <p className="text-sm text-gray-500">L'Amérique du Spectacle</p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm">
                <li>Riche, célèbre, charismatique.</li>
                <li>Gère son image comme une entreprise.</li>
                <li><strong>Représente :</strong> Le succès, le marketing, l'Establishment.</li>
              </ul>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="relative rounded-none border-l-4 border-blue-800 bg-blue-900 text-white p-8 shadow-xl"
            >
              <div className="absolute -right-4 -top-4 rotate-12 bg-white px-4 py-1 font-mono text-xs font-bold text-blue-900 shadow-lg">HÉROS</div>
              <h3 className="mb-2 font-serif text-2xl font-bold">Rocky Balboa</h3>
              <p className="text-sm text-blue-200">L'Amérique du Peuple</p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm">
                <li>Pauvre, inarticulé, solitaire.</li>
                <li>S'entraîne avec des carcasses de viande.</li>
                <li><strong>Représente :</strong> L'effort brut, l'authenticité, la rue.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ANALYSE DU FILM (ACTE I, II, III) --- */}
      <section className="relative z-10 bg-[#E5E7EB] px-8 py-32">
        <div className="mx-auto max-w-4xl space-y-24">
            {/* Acte I */}
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={fadeInUp}
            >
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-900">I. L'Étalon Italien <span className="text-lg italic text-gray-500 ml-2">(La Misère)</span></h2>
                <div className="prose prose-lg text-gray-700 font-serif">
                    <p>Le film s'ouvre sur un combat minable dans une église enfumée. Rocky gagne 40 dollars. Il rentre chez lui, parle à ses tortues, boit des œufs crus. L'image est grise, granuleuse.</p>
                    <p className="mt-4">Stallone (qui a écrit le scénario) insiste sur la solitude. Rocky n'est pas un guerrier, c'est un homme doux coincé dans un corps de brute. Il courtise Adrian avec une maladresse touchante. Il ne cherche pas la gloire, il cherche juste une connexion humaine.</p>
                </div>
            </motion.div>

            {/* Acte II */}
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={fadeInUp}
            >
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-900">II. Le Montage <span className="text-lg italic text-gray-500 ml-2">(La Transformation)</span></h2>
                <div className="prose prose-lg text-gray-700 font-serif">
                    <p>C'est l'invention d'un genre cinématographique : <strong>le Training Montage</strong>. La musique de Bill Conti (Gonna Fly Now) démarre.</p>
                    <p className="mt-4">Contrairement à Creed qui s'entraîne dans un gymnase de luxe, Rocky utilise la ville. Il court sur les quais, frappe de la viande congelée, monte les marches du musée d'art de Philadelphie. La ville devient sa salle de sport. C'est l'homme qui fusionne avec son environnement. Il ne devient pas technique, il devient <em>inarrêtable</em>.</p>
                </div>
            </motion.div>

            {/* Acte III */}
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={fadeInUp}
            >
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-900">III. Le 15ème Round <span className="text-lg italic text-gray-500 ml-2">(La Dignité)</span></h2>
                <div className="prose prose-lg text-gray-700 font-serif">
                    <p>Le combat est brutal. Rocky tombe, se relève, tombe encore. Apollo, qui pensait faire un show facile, a peur pour la première fois de sa vie.</p>
                    <p className="mt-4">La fin du film est révolutionnaire : <strong>Rocky perd le match.</strong> Aux points. Mais il s'en fiche. Pendant qu'on annonce le vainqueur, il ne regarde même pas l'arbitre. Il hurle "ADRIAN !". Il a tenu la distance. Il a gagné son propre combat, celui de l'estime de soi. Le résultat sportif est secondaire face à la victoire existentielle.</p>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 5. IMPACT SECTION */}
      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center bg-blue-900 px-8 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
        <div className="relative z-20 mx-auto max-w-5xl text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
          >
              <Trophy className="mx-auto mb-8 h-24 w-24 text-yellow-400" />
              <h2 className="mb-16 font-serif text-6xl font-black uppercase leading-none md:text-9xl tracking-tighter">LÉGENDE</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
              {/* CARD 1 */}
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="bg-white text-blue-900 p-8 shadow-2xl flex flex-col items-center justify-center border-b-8 border-red-600"
              >
                  <Star className="h-12 w-12 mb-4 text-red-600" />
                  <span className="font-mono text-6xl font-black leading-none mb-2">3</span>
                  <p className="font-medium text-lg uppercase tracking-widest">Oscars (1977)</p>
              </motion.div>

              {/* CARD 2 */}
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white text-blue-900 p-8 shadow-2xl flex flex-col items-center justify-center border-b-8 border-red-600"
              >
                  <Quote className="h-12 w-12 mb-4 text-red-600" />
                  <span className="font-mono text-4xl font-black leading-none mb-2 mt-2">"ADRIAN!"</span>
                  <p className="font-medium text-lg uppercase tracking-widest mt-2">Cri Mythique</p>
              </motion.div>
          </div>
        </div>
      </section>

      {/* SOUS-TEXTE (PHILOSOPHIE) */}
      <section className="relative z-10 bg-[#1a1a1a] text-[#F9F9F7] px-8 py-32">
        <div className="mx-auto max-w-4xl">
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12 font-serif text-4xl font-light md:text-5xl border-b border-white/20 pb-8"
            >
                Le Sous-Texte : <span className="italic text-gray-400">L'Anti-Héros</span>
            </motion.h2>

            <div className="grid gap-12 md:grid-cols-2">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-lg leading-relaxed text-gray-300"
                >
                    <p className="mb-6">Rocky est sorti en 1976, l'année du bicentenaire des États-Unis, dans une Amérique déprimée par le Vietnam et le Watergate. Le pays avait besoin de croire à nouveau.</p>
                    <p>Mais Rocky n'est pas un héros classique. Il n'est pas brillant, il n'est pas rapide. Sa seule qualité est sa capacité à <strong>encaisser</strong>. C'est une philosophie stoïcienne : on ne contrôle pas ce qui nous arrive, mais on contrôle comment on reste debout.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="font-serif text-lg leading-relaxed text-gray-300"
                >
                    <div className="border-l-4 border-blue-600 pl-6 italic my-2 text-xl text-white font-bold">"C'est pas d'être un bon cogneur qui compte. L'important, c'est de se faire cogner et d'aller quand même de l'avant."</div>
                    <p className="mt-6 text-sm text-gray-500">Cette phrase (issue de Rocky Balboa, 2006) résume toute la saga. Rocky 1 est l'histoire d'un homme qui apprend à se respecter avant d'apprendre à gagner.</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* ================= SECTION MUSIQUE ================= */}
      <section className="relative z-10 overflow-hidden bg-[#0A1128] py-24 text-center text-yellow-500">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
            {musicNotes.map((note) => (
                <motion.div
                    key={note.id}
                    className="absolute text-yellow-600"
                    initial={{ y: 100, x: note.x, opacity: 0 }}
                    animate={{ y: -100, x: note.x, opacity: 1 }}
                    transition={{ duration: note.duration, repeat: Infinity, ease: "linear", delay: note.delay }}
                    style={{ left: `${note.x}%`, top: `${note.y}%` }}
                >
                    <Music4 size={note.size} />
                </motion.div>
            ))}
        </div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-20 mx-auto flex max-w-md flex-col items-center"
        >
             {/* VINYLE ANIMÉ CENTRAL */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative mb-8 flex h-48 w-48 items-center justify-center rounded-full border-4 border-gray-900 bg-black shadow-2xl shadow-yellow-600/20"
            >
                {/* Sillons du vinyle */}
                <div className="absolute inset-2 rounded-full border border-gray-800 opacity-50"></div>
                <div className="absolute inset-6 rounded-full border border-gray-800 opacity-50"></div>
                <div className="absolute inset-10 rounded-full border border-gray-800 opacity-50"></div>
                {/* Label central */}
                <div className="absolute inset-[35%] flex items-center justify-center rounded-full bg-red-700 text-[10px] font-bold uppercase tracking-tighter text-yellow-400 shadow-inner border-2 border-red-800">
                   <div className="text-center leading-tight">
                        Conti<br/>Records<br/><span className="text-[8px]">1976</span>
                   </div>
                </div>
                <Disc className="text-gray-900 opacity-30 mix-blend-overlay" size={160} strokeWidth={1} />
            </motion.div>

            <h2 className="mb-4 font-serif text-4xl italic text-yellow-400 md:text-5xl">La B.O. Mythique</h2>
            <p className="mb-12 max-w-sm font-serif text-sm leading-relaxed text-yellow-200/70">
                Plongez dans la partition de Bill Conti. L'analyse du thème qui a fait courir le monde entier : "Gonna Fly Now".
            </p>

            {/* LIEN BOUTON STYLE LECTEUR CASSETTE RETRO */}
            <Link href="/rocky-1/musique" className="group relative inline-flex items-center gap-4 overflow-hidden rounded-sm border-2 border-yellow-600/50 bg-yellow-600/10 px-8 py-4 text-yellow-500 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-600 hover:text-[#0A1128] hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]">
               <Play className="h-6 w-6 fill-current" />
               <span className="font-mono text-lg font-bold uppercase tracking-[0.2em]">
                  Lancer la K7
               </span>
               <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,.4)_50%)] bg-[length:100%_4px] opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </Link>
        </motion.div>
      </section>

      <div className="bg-[#1a1a1a] py-16 text-center text-white/40 border-t border-white/10">
        <p className="font-serif text-sm font-light italic">Fin du dossier N°02 — SUBTEXT</p>
      </div>
    </main>
  )
}                                     