"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { ArrowDown, Cat, Croissant, Cloud, Package, Radio, Map, Compass, Wind, Sparkles, Heart, Feather } from "lucide-react"
import Link from "next/link"

// --- FOND ANIMÉ GHIBLI ---
const GhibliBackground = () => {
  const icons = [Cat, Croissant, Cloud, Package, Radio, Sparkles]
  const [items, setItems] = useState<{ id: number; x: number; y: number; size: number; iconIndex: number; rotation: number }[]>([])

  useEffect(() => {
    const newItems = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 25 + 15,
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
            className="absolute text-red-400/20" 
            initial={{ opacity: 0 }}
            animate={{ 
              y: [0, -120, 0], 
              x: [0, Math.random() * 40 - 20, 0], 
              opacity: [0, 0.6, 0], 
              rotate: [item.rotation, item.rotation + 20, item.rotation - 20] 
            }}
            transition={{ duration: Math.random() * 15 + 20, repeat: Infinity, ease: "easeInOut" }}
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
  hover: { scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }
}

export default function KikiPage() {
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
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
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <main className="relative min-h-screen bg-[#FFF5F5] text-[#2D2436] selection:bg-violet-300 selection:text-violet-900 font-sans overflow-x-hidden">
      <GhibliBackground />

      <nav className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-500 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <Link href="/" className="font-serif text-sm font-bold tracking-[0.2em] text-[#2D2436] hover:text-red-500 transition-colors">← SUBTEXT</Link>
          <div className="text-[10px] uppercase tracking-widest opacity-50">Dossier N°03</div>
        </div>
      </nav>

      {/* 1. HERO DOSSIER */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <motion.div style={{ scale, opacity }} className="relative z-10 mx-auto max-w-7xl text-center w-full">
          <div className="mb-6 flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-violet-600">
              <span>Miyazaki</span>
              <span>•</span>
              <span>Burnout Créatif</span>
              <span>•</span>
              <span>Émancipation</span>
          </div>

          <h1 className="mb-8 font-serif text-[12vw] md:text-[8rem] font-black italic leading-[0.9] tracking-tighter text-[#2D2436] whitespace-nowrap px-4 drop-shadow-sm">
            KIKI'S <span className="text-red-500">SERVICE</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-balance font-serif text-xl md:text-2xl italic leading-relaxed text-[#2D2436]/70 px-4">
            La perte de la magie comme métaphore du passage à l'âge adulte.
          </p>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="opacity-50 text-violet-400">
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
           className="mx-auto max-w-3xl border-l-4 border-red-400 pl-8 bg-white/60 backdrop-blur-md rounded-r-lg p-8 shadow-sm"
         >
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-red-500">L'Argument</h3>
            <p className="font-serif text-lg leading-relaxed text-gray-700 text-justify">
               Sorti en 1989, <em>Kiki la petite sorcière</em> détonne dans la filmographie de Hayao Miyazaki. Pas de guerre apocalyptique, pas de monstre gluant, pas de méchant. L'enjeu est minuscule : une jeune fille de 13 ans s'installe dans une ville inconnue pour y devenir livreuse. Pourtant, sous cette apparente légèreté, Miyazaki signe son œuvre la plus introspective. Il y décortique avec une précision chirurgicale le moment précis où l'innocence se brise pour laisser place à la mélancolie de l'adolescence. C'est l'histoire d'une artiste qui perd son don parce qu'elle a oublié pourquoi elle aimait créer.
            </p>
         </motion.div>
      </section>

      {/* 3. SYMBOLISME : LES TOTEMS */}
      <section className="relative z-10 bg-[#2D2436] px-8 py-32 text-[#FFF5F5]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="mx-auto max-w-6xl relative z-20">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-16 border-b border-white/10 pb-8"
            >
                <h2 className="font-serif text-4xl font-light text-white md:text-5xl">Les Objets <span className="text-violet-400 font-bold italic">Totems</span></h2>
                <p className="mt-4 max-w-xl text-gray-400">Dans l'univers de Miyazaki, les objets ne sont pas de simples accessoires, ils matérialisent l'état psychologique de l'héroïne.</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* LA RADIO */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-red-400/50 hover:bg-white/10"
                >
                    <div className="mb-4 flex items-center gap-3 text-red-400">
                        <Radio size={28} />
                        <h3 className="font-serif text-2xl font-bold">La Radio Rouge</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-300 leading-relaxed">
                        Cet objet ancre Kiki dans son époque. Alors que sa mère prépare des potions dans un silence traditionnel, Kiki s'envole au son de la J-Pop (Yumi Arai). La radio symbolise son désir de modernité et sa rupture avec les traditions séculaires des sorcières. C'est le bruit du monde extérieur qu'elle désire tant rejoindre.
                    </p>
                </motion.div>

                {/* LE CHAT JIJI */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.1 }}
                  className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-violet-400/50 hover:bg-white/10"
                >
                    <div className="mb-4 flex items-center gap-3 text-violet-400">
                        <Cat size={28} />
                        <h3 className="font-serif text-2xl font-bold">Jiji</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-300 leading-relaxed">
                        Jiji n'est pas un animal magique, il est le "Moi" immature de Kiki. Il exprime ses peurs et son cynisme. La perte de capacité à comprendre Jiji à la fin du film n'est pas une tragédie, mais une étape nécessaire : Kiki n'a plus besoin de dialoguer avec elle-même pour se rassurer. Elle s'ouvre aux autres.
                    </p>
                </motion.div>

                {/* LE BALAI */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.2 }}
                  className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-yellow-400/50 hover:bg-white/10"
                >
                    <div className="mb-4 flex items-center gap-3 text-yellow-400">
                        <Wind size={28} />
                        <h3 className="font-serif text-2xl font-bold">Le Balai</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-300 leading-relaxed">
                        Au début, Kiki utilise le balai de sa mère : c'est le poids de l'héritage. Lorsqu'il se brise, elle doit emprunter un balai-brosse ordinaire à un balayeur de rue. Ce changement marque son émancipation : elle ne dépend plus de la magie familiale, mais de sa propre capacité à transformer un outil banal en instrument de vol.
                    </p>
                </motion.div>

                {/* LA BOULANGERIE */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.3 }}
                  className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-orange-400/50 hover:bg-white/10"
                >
                    <div className="mb-4 flex items-center gap-3 text-orange-400">
                        <Croissant size={28} />
                        <h3 className="font-serif text-2xl font-bold">Guchokipanya</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-300 leading-relaxed">
                        La boulangerie d'Osono représente l'ancrage social. C'est ici que Kiki apprend la valeur de l'échange non-magique. Elle troque son travail contre un toit. C'est le lieu où elle cesse d'être une "invitée" volante pour devenir une citoyenne active de Koriko.
                    </p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 4. ANALYSE (LA DÉPRESSION CRÉATIVE) */}
      <section className="relative z-10 border-t border-violet-100 bg-white px-8 py-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          <div className="sticky top-32 h-fit">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h2 className="mb-6 font-serif text-5xl font-light text-violet-900">Le Spleen de <br/><span className="text-red-500 font-bold">La Sorcière</span></h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  Le cœur du film réside dans cette perte soudaine de pouvoir. Miyazaki illustre ici le concept de "Slump" (passage à vide) que connaissent tous les créatifs.
                </p>
            </motion.div>
          </div>
          <div className="space-y-12">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-lg border-l-4 border-violet-500 bg-violet-50 p-8 shadow-sm"
            >
              <h3 className="mb-2 font-serif text-2xl font-bold text-violet-800">La Désacralisation du Talent</h3>
              <p className="text-gray-700 leading-relaxed">
                Tant que le vol était un jeu, Kiki excellait. Dès que c'est devenu un travail — avec des clients ingrats, des horaires, des contraintes financières — la magie s'est évaporée. Le film pose une question brutale : comment garder son âme quand sa passion devient son gagne-pain ? Kiki ne perd pas sa magie à cause d'un sort, mais à cause de l'épuisement mental et de la routine.
              </p>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                className="relative rounded-lg border-l-4 border-red-500 bg-red-50 p-8 shadow-lg"
            >
              <div className="absolute -right-2 -top-2 rotate-6 bg-white px-3 py-1 font-mono text-xs font-bold text-red-500 shadow-md border border-red-100 rounded-full">CLÉ DU FILM</div>
              <h3 className="mb-2 font-serif text-2xl font-bold text-red-800">La Leçon d'Ursula</h3>
              <p className="text-gray-700 leading-relaxed">
                Ursula, la peintre vivant en forêt, verbalise la thèse de Miyazaki. Elle explique à Kiki que la magie, comme l'art, n'est pas un flux constant. Forcer ne sert à rien. Il faut accepter les périodes de vide, dormir, manger, marcher, et laisser l'inspiration revenir d'elle-même. C'est une éloge de la patience et de l'acceptation de ses propres faiblesses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ANALYSE DU FILM : LES 3 AXES --- */}
      <section className="relative z-10 bg-[#FFF5F5] px-8 py-32">
        <div className="mx-auto max-w-4xl space-y-24">
            
            {/* Acte I */}
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={fadeInUp}
            >
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-800">I. L'Envol <span className="text-lg italic text-violet-500 ml-2">(L'Innocence)</span></h2>
                <div className="prose prose-lg text-gray-600 font-serif text-justify">
                    <p>
                        Le début du film est marqué par une euphorie totale. Kiki décide de partir un soir de pleine lune, portée par l'enthousiasme de la jeunesse. Elle ne voit le monde qu'à travers le prisme de ses attentes romantiques. Son arrivée à Koriko est une séquence visuelle éblouissante où elle découvre une ville idéalisée (un mélange de Stockholm et Lisbonne). À ce stade, le vol est naturel, sans effort, comme respirer. C'est la phase de la "lune de miel" avec la vie adulte.
                    </p>
                </div>
            </motion.div>

            {/* Acte II */}
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={fadeInUp}
            >
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-800">II. La Chute <span className="text-lg italic text-red-500 ml-2">(Le Burnout)</span></h2>
                <div className="prose prose-lg text-gray-600 font-serif text-justify">
                    <p>
                        C'est le pivot dramatique du récit. La réalité sociale frappe Kiki de plein fouet : indifférence des policiers, froideur d'une cliente (la scène de la tarte au hareng est cruciale), solitude urbaine. Kiki tombe littéralement malade. Elle perd sa capacité à voler et, plus tragiquement, sa capacité à comprendre Jiji. Le chat redevient un animal ordinaire, signifiant que Kiki a perdu le lien avec son enfance. Ce silence soudain est l'une des représentations les plus justes de la dépression au cinéma d'animation.
                    </p>
                </div>
            </motion.div>

            {/* Acte III */}
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={fadeInUp}
            >
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-800">III. La Résilience <span className="text-lg italic text-violet-500 ml-2">(L'Acceptation)</span></h2>
                <div className="prose prose-lg text-gray-600 font-serif text-justify">
                    <p>
                        Le climax n'est pas un combat magique, mais un sauvetage physique. Pour sauver son ami Tombo, Kiki doit forcer sa magie à revenir. Elle ne vole plus avec l'élégance du début, mais avec un balai-brosse maladroit et instable. Elle s'écrase presque, elle lutte contre le vent. C'est une magie "sale", laborieuse, mais réelle. À la fin, Jiji ne parle plus. Kiki l'accepte. Elle n'a pas "guéri" pour redevenir comme avant, elle a évolué. Elle a intégré sa fragilité.
                    </p>
                </div>
            </motion.div>

        </div>
      </section>

      {/* 5. IMPACT SECTION */}
      <section className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center bg-violet-900 px-8 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        {/* Cercles décoratifs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative z-20 mx-auto max-w-5xl text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
          >
              <Heart className="mx-auto mb-8 h-24 w-24 text-red-400 fill-red-400/20" />
              <h2 className="mb-8 font-serif text-5xl font-black uppercase leading-none md:text-7xl tracking-tight">Le Droit d'Échouer</h2>
              <p className="max-w-2xl mx-auto text-violet-200 text-lg font-serif">
                  Kiki nous apprend que la vulnérabilité fait partie intégrante du processus de croissance. Ce n'est pas un film sur la victoire héroïque, mais sur la persévérance douce et la reconstruction de soi.
              </p>
          </motion.div>
        </div>
      </section>

      {/* SOUS-TEXTE (PHILOSOPHIE) */}
      <section className="relative z-10 bg-[#2D2436] text-[#FFF5F5] px-8 py-32">
        <div className="mx-auto max-w-4xl">
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12 font-serif text-4xl font-light md:text-5xl border-b border-white/20 pb-8"
            >
                Le Sous-Texte : <span className="italic text-violet-300">L'Intégration Sociale</span>
            </motion.h2>

            <div className="grid gap-12 md:grid-cols-2">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-lg leading-relaxed text-gray-300 text-justify"
                >
                    <p className="mb-6">
                        Au-delà de la magie, Miyazaki adresse un message aux jeunes femmes japonaises des années 80 qui quittaient les campagnes pour travailler dans les métropoles. La sorcellerie est ici une allégorie transparente du <strong>talent individuel</strong> (que l'on soit graphiste, ingénieur ou écrivain).
                    </p>
                    <p>
                        La question centrale n'est pas "comment voler ?", mais "comment s'insérer dans une communauté sans perdre son identité ?". Kiki apprend que l'indépendance ne signifie pas l'isolement, mais la capacité à tisser des liens (avec Osono, Ursula, Tombo) qui ne reposent pas uniquement sur l'utilité magique.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="font-serif text-lg leading-relaxed text-gray-300 text-justify"
                >
                    <div className="border-l-4 border-red-500 pl-6 italic my-2 text-xl text-white font-bold">
                        "Nous volons avec notre esprit."
                    </div>
                    <p className="mt-6 text-sm text-gray-400">
                        Cette réplique résume la philosophie du film. La magie n'est pas un carburant inépuisable ou une technique mécanique. C'est une énergie spirituelle. Si l'esprit est brisé par la solitude ou le surmenage, le corps ne suit plus. C'est une vision holistique du travail qui préfigure les débats actuels sur la santé mentale.
                    </p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* --- LIEN BONUS : BOUTON AMÉLIORÉ --- */}
      <section className="relative z-10 bg-[#FFF5F5] py-32 text-center overflow-hidden">
        <Link href="/kiki/atlas" className="group relative inline-flex items-center justify-center p-1 rounded-full transition-transform hover:scale-105 active:scale-95 duration-300">
           
           {/* Anneau extérieur décoratif (Rose des vents) */}
           <div className="absolute inset-0 rounded-full border-2 border-dashed border-violet-300 animate-[spin_20s_linear_infinite]"></div>
           <div className="absolute inset-[-10px] rounded-full border border-red-100 opacity-50"></div>

           <div className="relative flex items-center gap-6 overflow-hidden rounded-full bg-[#FAF3E0] border-4 border-[#8B5E3C] px-12 py-6 shadow-[0_10px_40px_-10px_rgba(139,94,60,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(139,94,60,0.4)] transition-shadow">
              
              {/* Texture papier vieux parchemin */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-40 mix-blend-multiply"></div>
              
              {/* Icône Boussole Animée */}
              <div className="relative z-10 p-3 bg-white rounded-full border-2 border-[#8B5E3C] shadow-inner group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out">
                 <Compass size={32} className="text-[#8B5E3C]" />
              </div>

              <div className="relative z-10 flex flex-col items-start text-left">
                 <span className="font-serif text-2xl font-black italic text-[#5D4037] tracking-tight group-hover:text-red-600 transition-colors">
                    L'Atlas de Koriko
                 </span>
                 <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#8B5E3C]/70">
                       Lat. 57°N / Long. 18°E
                    </span>
                    <span className="h-px w-8 bg-[#8B5E3C]/30"></span>
                    <Map size={12} className="text-[#8B5E3C]/50" />
                 </div>
              </div>

              {/* Petite animation de balai qui traverse */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-2xl opacity-0 group-hover:opacity-100 group-hover:left-[110%] transition-all duration-1000 ease-in-out pointer-events-none">
                 🧹
              </div>

              {/* Lignes pointillées décoratives */}
              <div className="absolute top-2 right-4 w-16 h-1 border-t-2 border-dotted border-[#8B5E3C]/20"></div>
              <div className="absolute bottom-2 left-4 w-12 h-1 border-b-2 border-dotted border-[#8B5E3C]/20"></div>

           </div>
        </Link>
      </section>

      <div className="bg-[#2D2436] py-16 text-center text-white/40 border-t border-white/10">
        <p className="font-serif text-sm font-light italic">Fin du dossier N°03 — SUBTEXT</p>
      </div>
    </main>
  )
}