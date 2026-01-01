"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { ArrowDown, TrendingDown, AlertTriangle, Home, Layers, Scale, Briefcase } from "lucide-react"
import Link from "next/link"

// Fond animé
const FinancialBackground = () => {
  const [items, setItems] = useState<{ id: number; x: number; y: number; fontSize: number; content: string }[]>([])

  useEffect(() => {
    const newItems = [...Array(25)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      fontSize: Math.random() * 40 + 10,
      content: Math.random() > 0.5 ? `${(Math.random() * 10).toFixed(1)}%` : Math.random() > 0.3 ? "AAA" : "SHORT"
    }))
    setItems(newItems)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-10">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute font-mono font-bold text-[#1a1a1a]"
          initial={{ opacity: 0 }}
          animate={{ y: [0, -100, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: `${item.fontSize}px`, left: `${item.x}%`, top: `${item.y}%` }}
        >
          {item.content}
        </motion.div>
      ))}
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

export default function BigShortPage() {
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
    <main className="relative min-h-screen bg-[#F9F9F7] text-[#1a1a1a] selection:bg-red-500 selection:text-white">
      <FinancialBackground />

      {/* Navigation Retour */}
      <nav className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-500 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <Link href="/" className="font-serif text-sm font-bold tracking-[0.2em] text-[#1a1a1a] hover:text-red-600 transition-colors">← SUBTEXT</Link>
          <div className="text-[10px] uppercase tracking-widest opacity-50">Dossier N°01</div>
        </div>
      </nav>

      {/* 1. HERO DOSSIER */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-8 pt-20">
        <motion.div style={{ scale, opacity }} className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-8 flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-red-500">
             <span>Finance</span>
             <span>•</span>
             <span>Langage</span>
             <span>•</span>
             <span>Effondrement</span>
          </div>

          <h1 className="mb-8 font-serif text-[12vw] font-light leading-[0.85] tracking-tight text-[#1a1a1a] lg:text-[10rem]">
            THE BIG <span className="font-bold text-red-600">SHORT</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-balance font-serif text-2xl italic leading-relaxed text-[#1a1a1a]/80">
            Parier contre l'Amérique. Devenir riche. Avoir raison. Mais à quel prix ?
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
           className="mx-auto max-w-3xl border-l-2 border-red-600 pl-8"
         >
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-red-600">Le Pitch</h3>
            <p className="font-serif text-lg leading-relaxed text-gray-700">
                2005. Wall Street est en pleine euphorie. Les banques s'enrichissent grâce à un marché immobilier qui semble infaillible. Mais quatre outsiders – un gestionnaire de fonds asocial, un trader colérique, deux jeunes investisseurs et un banquier opportuniste – découvrent ce que le monde refuse de voir : l'économie mondiale repose sur une bombe à retardement. Ils décident alors de faire l'impensable : parier contre l'Amérique.
            </p>
         </motion.div>
      </section>

      {/* 3. LEXIQUE : LES ARMES DU CRIME */}
      <section className="relative z-10 bg-[#1a1a1a] px-8 py-32 text-[#F9F9F7]">
        <div className="mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-16 border-b border-white/10 pb-8"
            >
                <h2 className="font-serif text-4xl font-light text-white md:text-5xl">Le Vocabulaire <span className="text-red-600">Interdit</span></h2>
                <p className="mt-4 max-w-xl text-gray-400">Pour comprendre le film (et la crise), il faut décoder ces quatre termes qui ont servi à maquiller la réalité.</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* SHORT SELLING */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  className="group border border-white/10 bg-white/5 p-8 transition-colors hover:border-red-600/50"
                >
                    <div className="mb-4 flex items-center gap-3 text-red-500">
                        <TrendingDown size={24} />
                        <h3 className="font-serif text-2xl font-bold">Le "Short"</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                        Vendre à découvert. C'est parier sur la chute. Vous empruntez un titre pour le vendre aujourd'hui, en espérant le racheter moins cher quand il se sera effondré.
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-white/60">
                        <span className="font-bold text-white">Dans le film :</span> C'est l'obsession de Michael Burry. Tout le monde parie sur la hausse (Long), lui seul parie sur la mort du système (Short).
                    </div>
                </motion.div>

                {/* MBS */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.1 }}
                  className="group border border-white/10 bg-white/5 p-8 transition-colors hover:border-blue-500/50"
                >
                    <div className="mb-4 flex items-center gap-3 text-blue-500">
                        <Home size={24} />
                        <h3 className="font-serif text-2xl font-bold">MBS (Obligation)</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                        (Mortgage-Backed Security). C'est une <strong>obligation</strong>, c'est-à-dire un titre de dette. La banque regroupe des milliers de prêts immobiliers en un seul paquet (obligation) et le vend en bourse comme un placement "sûr".
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-white/60">
                        <span className="font-bold text-white">Dans le film :</span> La tour de Jenga de Ryan Gosling. Si les briques du bas (les prêts) sont pourries, la tour (le MBS) s'effondre.
                    </div>
                </motion.div>

                {/* SWAPS (CDS) */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.2 }}
                  className="group border border-white/10 bg-white/5 p-8 transition-colors hover:border-green-500/50"
                >
                    <div className="mb-4 flex items-center gap-3 text-green-500">
                        <Scale size={24} />
                        <h3 className="font-serif text-2xl font-bold">CDS (Swap)</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                        (Credit Default Swap). Une assurance incendie sur la maison de votre voisin. Si la maison brûle (faillite), l'assureur vous paie le gros lot.
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-white/60">
                        <span className="font-bold text-white">Dans le film :</span> Les banques vendent ces contrats à Burry en riant, car elles pensent que le marché immobilier ne peut pas brûler.
                    </div>
                </motion.div>

                {/* CDO SYNTHETIQUE */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{ ...fadeInUp, ...cardHover }}
                  transition={{ delay: 0.3 }}
                  className="group border border-white/10 bg-white/5 p-8 transition-colors hover:border-yellow-500/50"
                >
                    <div className="mb-4 flex items-center gap-3 text-yellow-500">
                        <Layers size={24} />
                        <h3 className="font-serif text-2xl font-bold">CDO Synthétique</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                        Un pari sur un pari. On ne s'échange plus de vrais prêts, mais des contrats virtuels. C'est ce qui permet de multiplier les pertes à l'infini.
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-white/60">
                        <span className="font-bold text-white">Dans le film :</span> La scène du casino avec Selena Gomez. C'est le moment où la fraude devient systémique.
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 4. ANALYSE (PRIME vs SUBPRIME) */}
      <section className="relative z-10 border-t border-black/10 bg-white px-8 py-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          <div className="sticky top-32 h-fit">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h2 className="mb-6 font-serif text-5xl font-light text-red-600">La Mécanique</h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  Avant les graphiques, il y a des humains. Le marché immobilier repose sur une distinction simple qui a été effacée pour le profit.
                </p>
            </motion.div>
          </div>
          <div className="space-y-12">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-none border-l-4 border-black bg-gray-50 p-8 shadow-sm"
            >
              <h3 className="mb-2 font-serif text-2xl font-bold">Le "Prime"</h3>
              <p className="text-sm text-gray-500">L'emprunteur idéal.</p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm">
                <li>Emploi stable, revenus vérifiés.</li>
                <li><strong>Risque de défaut : &lt; 1%</strong></li>
              </ul>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="relative rounded-none border-l-4 border-red-600 bg-red-50 p-8 shadow-xl"
            >
              <div className="absolute -right-4 -top-4 rotate-12 bg-red-600 px-4 py-1 font-mono text-xs font-bold text-white shadow-lg">CIBLE</div>
              <h3 className="mb-2 font-serif text-2xl font-bold text-red-700">Le "Subprime"</h3>
              <p className="text-sm text-red-500">L'emprunteur ignoré, devenu la proie.</p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-red-900">
                <li>Pas de revenus (NINJA loans).</li>
                <li>Taux variables explosifs.</li>
                <li><strong>Risque de défaut : IMMÉDIAT</strong></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- INSERTION : ANALYSE DU FILM (ACTE I, II, III) --- */}
      <section className="relative z-10 bg-[#F9F9F7] px-8 py-32">
        <div className="mx-auto max-w-4xl space-y-24">
            
            {/* Acte I */}
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={fadeInUp}
            >
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-900">I. Le Pari du Solitaire <span className="text-lg italic text-gray-500 ml-2">(Michael Burry)</span></h2>
                <div className="prose prose-lg text-gray-700 font-serif">
                    <p>
                        Tout commence dans un bureau sombre, éclairé par des écrans, sur fond de Heavy Metal. <strong>Michael Burry</strong> est le premier à regarder là où personne ne veut voir : les détails. Il analyse les milliers de prêts individuels qui composent les obligations notées AAA.
                    </p>
                    <p className="mt-4">
                        Il découvre que le socle de l'économie américaine est pourri. Il décide de parier contre. Mais avoir raison trop tôt, c'est comme avoir tort.
                    </p>
                    <p className="mt-4">
                        Ses investisseurs paniquent. Ils le traitent de fou. L'un d'eux se retire violemment. Burry saigne de l'argent en payant les primes d'assurance (CDS) mois après mois, alors que le marché continue de monter. C'est la souffrance de la lucidité face à l'aveuglement collectif.
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
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-900">II. L'Opportunisme & Le Déni <span className="text-lg italic text-gray-500 ml-2">(Vennett & Baum)</span></h2>
                <div className="prose prose-lg text-gray-700 font-serif">
                    <p>
                        L'information fuite. <strong>Jared Vennett</strong> (Ryan Gosling) la récupère non pas pour sauver le monde, mais pour s'enrichir. Il incarne le cynisme éclairé. Il vend l'apocalypse avec le sourire.
                    </p>
                    <p className="mt-4">
                        Face à lui, <strong>Mark Baum</strong> (Steve Carell) est le sceptique en colère. Il ne croit pas aux chiffres, il veut voir la réalité. L'enquête de terrain en Floride est glaçante : des quartiers entiers de maisons vides, un locataire avec un alligator dans sa piscine, des courtiers qui se vantent de vendre des prêts à des gens insolvables.
                    </p>
                    <p className="mt-4 font-bold">
                        C'est le moment où la théorie devient tangible : la bulle est réelle.
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
                <h2 className="mb-8 font-serif text-4xl font-light text-gray-900">III. Le "Glitch" du Système <span className="text-lg italic text-gray-500 ml-2">(Le Point de Bascule)</span></h2>
                <div className="prose prose-lg text-gray-700 font-serif">
                    <p>
                        C'est le pivot du film, le moment où l'incompétence laisse place à la fraude pure. Burry et Baum voient les défauts de paiement exploser (les gens ne paient plus leurs maisons), <strong>pourtant, la valeur des obligations ne baisse pas.</strong>
                    </p>
                    <p className="mt-4">
                        Les banques et les agences de notation maintiennent artificiellement les prix élevés. Pourquoi ? Pour vendre leurs propres actifs toxiques aux clients naïfs avant que tout s'effondre.
                    </p>
                    <p className="mt-4">
                        <strong>Charlie et Jamie</strong>, les deux jeunes investisseurs, réalisent l'ampleur du désastre avec l'aide de Ben Rickert (Brad Pitt). Ils sont excités de devenir riches, jusqu'à ce que Rickert les fige avec une réalité brutale :
                    </p>
                    <blockquote className="border-l-4 border-red-600 pl-6 italic my-8 text-xl text-red-700 font-bold">
                        "Arrêtez de danser. Vous pariez contre l'économie américaine. Si on a raison, des gens perdent leur maison, leur boulot, leur retraite."
                    </blockquote>
                </div>
            </motion.div>

        </div>
      </section>

      {/* 5. LE CRASH */}
      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center bg-red-600 px-8 py-32 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-multiply"></div>
        <div className="relative z-20 mx-auto max-w-5xl text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
          >
              <AlertTriangle className="mx-auto mb-8 h-24 w-24 animate-pulse text-black/30" />
              <h2 className="mb-16 font-serif text-6xl font-black uppercase leading-none md:text-9xl">LE CRASH</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
              {/* CARD 1: JOBS */}
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="bg-white text-red-600 p-8 shadow-2xl flex flex-col items-center justify-center"
              >
                  <Briefcase className="h-12 w-12 mb-4" />
                  <span className="font-mono text-6xl font-black leading-none mb-2">8M</span>
                  <p className="font-medium text-lg uppercase tracking-widest">Emplois Perdus</p>
              </motion.div>

              {/* CARD 2: HOMES */}
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white text-red-600 p-8 shadow-2xl flex flex-col items-center justify-center"
              >
                  <Home className="h-12 w-12 mb-4" />
                  <span className="font-mono text-6xl font-black leading-none mb-2">6M</span>
                  <p className="font-medium text-lg uppercase tracking-widest">Maisons Saisies</p>
              </motion.div>
          </div>

        </div>
      </section>

      {/* --- INSERTION : LE SOUS-TEXTE (MORAL / PSYCHO) --- */}
      <section className="relative z-10 bg-[#1a1a1a] text-[#F9F9F7] px-8 py-32">
        <div className="mx-auto max-w-4xl">
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12 font-serif text-4xl font-light md:text-5xl border-b border-white/20 pb-8"
            >
                Le Sous-Texte : <span className="italic text-gray-400">La Victoire Amère</span>
            </motion.h2>

            <div className="grid gap-12 md:grid-cols-2">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-lg leading-relaxed text-gray-300"
                >
                    <p className="mb-6">
                        Techniquement, c'est une <em>Success Story</em>. Les héros ont vu juste, ils ont vaincu le système et empoché des milliards. Mais le film nous prive de la catharsis habituelle. Il n'y a pas de champagne à la fin.
                    </p>
                    <p>
                        Le personnage de <strong>Mark Baum</strong> est la clé morale de l'œuvre. Hanté par le suicide de son frère, il porte en lui une culpabilité sourde. Il cherche la vérité pour punir les coupables, mais finit par comprendre qu'en encaissant son chèque, il devient complice du désastre.
                    </p>
                </motion.div>

                {/* MODIFICATION ICI : DÉVELOPPEMENT SUR LE "REBRANDING" DU SYSTÈME */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="font-serif text-lg leading-relaxed text-gray-300"
                >
                    <p className="mb-6">
                        <strong>Le chaos était volontaire.</strong> Le film démontre que la complexité financière n'est pas accidentelle, c'est une arme. Elle sert d'écran de fumée pour que personne — ni les clients, ni les régulateurs, ni même les PDG — ne regarde sous le capot.
                    </p>
                    <div className="border-l-2 border-red-500 pl-4 bg-white/5 p-4 rounded-r-lg">
                        <strong className="text-white block mb-2">La leçon finale :</strong>
                        <p className="text-base text-gray-400">
                            Quelques années après la crise, les banques ont relancé les CDO. Elles les ont simplement renommés <em>"Bespoke Tranche Opportunities"</em>.
                        </p>
                        <p className="mt-2 text-base text-gray-400">
                            Le système n'a pas changé ses méthodes, il a juste changé son vocabulaire pour effacer la mauvaise réputation du passé. Tant que la complexité rapporte, le risque reste le même.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      <div className="bg-[#1a1a1a] py-16 text-center text-white/40 border-t border-white/10">
        <p className="font-serif text-sm font-light italic">Fin du dossier N°01 — SUBTEXT</p>
      </div>
    </main>
  )
}