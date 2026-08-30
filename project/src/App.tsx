import { useState, useEffect, useRef, forwardRef, lazy, Suspense } from 'react'
import { articles, categories, type Article } from './data/content'

const DailyIntel = lazy(() => import('./DailyIntel'))

type TabView = 'latest' | 'sections' | 'gear' | 'subscribe' | 'intel'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabView | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [showIntelSection, setShowIntelSection] = useState(false)

  const sectionsRef = useRef<HTMLDivElement>(null)
  const latestRef = useRef<HTMLDivElement>(null)
  const gearRef = useRef<HTMLDivElement>(null)
  const subscribeRef = useRef<HTMLDivElement>(null)
  const intelRef = useRef<HTMLDivElement>(null)

  const handleTabClick = (tab: TabView) => {
    if (activeTab === tab) {
      setActiveTab(null)
      return
    }
    setActiveTab(tab)
    setSelectedArticle(null)
    setSelectedCategory(null)
    setShowIntelSection(false)

    setTimeout(() => {
      const refs: Record<TabView, React.RefObject<HTMLDivElement>> = {
        sections: sectionsRef,
        latest: latestRef,
        gear: gearRef,
        subscribe: subscribeRef,
        intel: intelRef,
      }
      refs[tab].current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
    setActiveTab(null)
    setSelectedCategory(null)
    setShowIntelSection(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setSelectedArticle(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat)
    setSelectedArticle(null)
    setShowIntelSection(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleIntelSectionClick = () => {
    setShowIntelSection(true)
    setSelectedArticle(null)
    setSelectedCategory(null)
    setActiveTab(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setEmailError('INVALID INPUT: Enter a valid email address.')
      return
    }
    setSubscribed(true)
    setEmailError('')
  }

  const filteredArticles = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles

  const sortedByDate = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={handleBack} />
  }

  return (
    <div className="min-h-screen bg-concrete-950 text-concrete-300">
      {/* Top hazard bar */}
      <div className="hazard-stripes-thin h-2 w-full" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-concrete-700 bg-concrete-950/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => {
              setSelectedArticle(null)
              setSelectedCategory(null)
              setActiveTab(null)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center border-2 border-vault-200 bg-vault-900 font-display text-lg font-bold text-vault-200">
              <span className="terminal-glow">F</span>
            </div>
            <div>
              <span className="text-stamp-yellow font-display text-xl font-bold uppercase tracking-widest">
                Fallout
              </span>
              <span className="ml-2 hidden font-mono text-xs text-concrete-500 sm:inline">
                v.1.0
              </span>
            </div>
          </button>

          <nav className="flex items-center gap-1">
            <TabButton label="Intel" active={activeTab === 'intel'} onClick={() => handleTabClick('intel')} />
            <TabButton label="Sections" active={activeTab === 'sections'} onClick={() => handleTabClick('sections')} />
            <TabButton label="Latest" active={activeTab === 'latest'} onClick={() => handleTabClick('latest')} />
            <TabButton label="Gear" active={activeTab === 'gear'} onClick={() => handleTabClick('gear')} />
            <TabButton label="Subscribe" active={activeTab === 'subscribe'} onClick={() => handleTabClick('subscribe')} />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="grain-overlay relative overflow-hidden border-b border-concrete-700 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-concrete-900 via-concrete-950 to-concrete-950" />
        <div className="absolute right-0 top-0 h-full w-1 bg-vault-200/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 border border-vault-500/50 bg-vault-900/30 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-vault-200" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-vault-300">
              Signal Active
            </p>
          </div>
          <h1 className="mb-6 font-display text-6xl font-bold uppercase leading-none tracking-tight md:text-7xl">
            <span className="text-stamp-yellow">Question the</span>
            <br />
            <span className="text-stamp-red">Official Story</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl font-mono text-sm leading-relaxed text-concrete-400">
            Independent analysis of political and geopolitical narratives.
            We dissect, expose, and question the official story.
            No agenda. No advertisers. Just documented facts and the questions they raise.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleTabClick('intel')}
              className="group flex items-center gap-2 border-2 border-vault-200 bg-vault-200 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-concrete-950 transition-all hover:bg-vault-100 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
            >
              <span>Daily Intel</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => handleTabClick('latest')}
              className="border-2 border-concrete-600 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-concrete-300 transition-all hover:border-vault-200 hover:text-vault-200"
            >
              Read Latest
            </button>
            <button
              onClick={() => handleTabClick('sections')}
              className="border-2 border-concrete-600 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-concrete-300 transition-all hover:border-vault-200 hover:text-vault-200"
            >
              Browse Sections
            </button>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="border-b border-concrete-700 bg-concrete-900 py-2">
        <div className="flex items-center gap-4 overflow-hidden">
          <span className="ml-4 shrink-0 border border-vault-500/50 bg-vault-900/30 px-2 py-0.5 font-mono text-xs font-bold uppercase text-vault-300">
            FEED
          </span>
          <div className="flex animate-marquee gap-8 whitespace-nowrap font-mono text-xs text-concrete-500">
            <span>BRICS NDB OPERATIONAL SINCE 2015</span>
            <span className="text-vault-500">●</span>
            <span>CFTC: 80+ SPOOFING CASES SINCE 2010</span>
            <span className="text-vault-500">●</span>
            <span>COMEX PAPER:PHYSICAL RATIO ~100:1</span>
            <span className="text-vault-500">●</span>
            <span>FEMA COOP REQUIRES 30-DAY CAPABILITY</span>
            <span className="text-vault-500">●</span>
            <span>READY.GOV RECOMMENDS 72 HOURS</span>
            <span className="text-vault-500">●</span>
            <span>CHURCH COMMITTEE: 25 NEWS ORGS, 400 JOURNALISTS</span>
            <span className="text-vault-500">●</span>
            <span>DAILY INTEL: TEST YOUR INSTINCTS</span>
            <span className="text-vault-500">●</span>
          </div>
        </div>
      </div>

      {/* Sections Panel */}
      {activeTab === 'sections' && (
        <PanelSection ref={sectionsRef} title="Sections" code="SEC.01">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, idx) => {
              const count = articles.filter((a) => a.category === cat.name).length
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="vault-corner group border border-concrete-700 bg-concrete-900 p-6 text-left transition-all hover:border-vault-200 hover:bg-concrete-800"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-concrete-500">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs text-vault-500">
                      [{count} FILE{count !== 1 ? 'S' : ''}]
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-wide text-concrete-100 group-hover:text-vault-200">
                    {cat.name}
                  </h3>
                  <p className="font-mono text-xs leading-relaxed text-concrete-500">{cat.description}</p>
                  <div className="mt-4 flex items-center gap-2 font-mono text-xs text-vault-300 opacity-0 transition-opacity group-hover:opacity-100">
                    <span>ACCESS</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </button>
              )
            })}
            {/* Daily Intel interactive card */}
            <button
              onClick={handleIntelSectionClick}
              className="vault-corner group border-2 border-vault-200/50 bg-vault-900/10 p-6 text-left transition-all hover:border-vault-200 hover:bg-vault-900/20"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs text-vault-400">
                  {String(categories.length + 1).padStart(2, '0')}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-vault-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-vault-200" />
                  DAILY
                </span>
              </div>
              <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-wide text-vault-100 group-hover:terminal-glow">
                Daily Intel
              </h3>
              <p className="font-mono text-xs leading-relaxed text-concrete-400">Test your instincts. Documented or disinformation? Build your streak.</p>
              <div className="mt-4 flex items-center gap-2 font-mono text-xs text-vault-300 opacity-0 transition-opacity group-hover:opacity-100">
                <span>PLAY</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </button>
          </div>
        </PanelSection>
      )}

      {/* Latest Panel */}
      {activeTab === 'latest' && (
        <PanelSection ref={latestRef} title="Latest" code="LAT.01">
          <div className="space-y-0 border border-concrete-700">
            {sortedByDate.map((article, idx) => (
              <button
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="group flex w-full items-start gap-4 border-b border-concrete-700 px-5 py-5 text-left transition-colors last:border-b-0 hover:bg-concrete-800/50"
              >
                <span className="mt-1 shrink-0 font-mono text-sm text-vault-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-3">
                    <span className="border border-vault-500/50 bg-vault-900/20 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-vault-300">
                      {article.category}
                    </span>
                    <span className="font-mono text-xs text-concrete-500">
                      {formatDate(article.date)} · {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-concrete-100 group-hover:text-vault-200">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs leading-relaxed text-concrete-500">{article.excerpt}</p>
                </div>
                <span className="mt-1 shrink-0 font-mono text-vault-300 opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </button>
            ))}
          </div>
        </PanelSection>
      )}

      {/* Gear Panel */}
      {activeTab === 'gear' && (
        <PanelSection ref={gearRef} title="Gear" code="GEA.01">
          <div className="space-y-6">
            <GearCard title="Operational Security" code="OPSEC">
              <GearItem label="Local AI Models" desc="Run open-weight models (Llama, Mistral) on your own hardware to keep queries private. Use Ollama for easy setup." />
              <GearItem label="Encrypted Comms" desc="Signal for messaging, ProtonMail for email. Avoid SMS for anything sensitive." />
              <GearItem label="VPN + DNS" desc="Use a no-logs VPN and encrypted DNS (1.1.1.1 or 9.9.9.9) to reduce metadata leakage." />
              <GearItem label="Browser Hygiene" desc="Firefox with uBlock Origin, or Brave. Disable third-party cookies. Use container tabs for sensitive research." />
            </GearCard>

            <GearCard title="Physical Preparedness" code="PREP">
              <GearItem label="Water" desc="1 gallon per person per day. Aim for 14 days minimum, not 72 hours. Water filtration system as backup." />
              <GearItem label="Food" desc="Non-perishable staples — rice, beans, canned goods, dried fruit. Rotate stock. 14-day minimum." />
              <GearItem label="Power" desc="Solar generator (Jackery/EcoFlow) + panels. Battery packs for devices. Hand-crank radio." />
              <GearItem label="Documents" desc="Physical copies of ID, insurance, medical records, property deeds. Sealed, waterproof, accessible." />
            </GearCard>

            <GearCard title="Financial Resilience" code="FIN">
              <GearItem label="Physical Gold" desc="Coins (1 oz American Eagle, Maple Leaf, Krugerrand) — not paper gold. Understand the 100:1 paper-to-physical ratio." />
              <GearItem label="Cash" desc="Physical currency in small bills. Bank holidays happen. ATMs go down. Cash is king when systems fail." />
              <GearItem label="Diversification" desc="Don't hold everything in dollars. Consider a foreign currency account. Productive land if you can." />
            </GearCard>
          </div>
        </PanelSection>
      )}

      {/* Subscribe Panel */}
      {activeTab === 'subscribe' && (
        <PanelSection ref={subscribeRef} title="Subscribe" code="SUB.01">
          <div className="vault-corner mx-auto max-w-lg border border-concrete-700 bg-concrete-900 p-8 text-center">
            {!subscribed ? (
              <>
                <div className="mb-4 flex items-center justify-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-vault-200" />
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-vault-300">Awaiting Input</span>
                </div>
                <h3 className="mb-2 font-display text-3xl font-bold uppercase tracking-wide text-vault-100 terminal-glow">
                  Join the List
                </h3>
                <p className="mb-6 font-mono text-xs leading-relaxed text-concrete-400">
                  New analysis delivered when it&apos;s ready — no schedule, no spam, no advertisers.
                  Unsubscribe anytime.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-concrete-600 bg-concrete-950 px-4 py-3 font-mono text-sm text-vault-100 placeholder-concrete-600 focus:border-vault-200 focus:outline-none focus:shadow-[0_0_10px_rgba(250,204,21,0.15)]"
                  />
                  {emailError && (
                    <p className="font-mono text-xs text-rust-500">
                      ⚠ {emailError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full border-2 border-vault-200 bg-vault-200 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-concrete-950 transition-all hover:bg-vault-100 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                  >
                    Transmit
                  </button>
                </form>
              </>
            ) : (
              <div className="animate-fade-in">
                <div className="mb-4 font-display text-4xl font-bold text-vault-200 terminal-glow">✓</div>
                <h3 className="mb-2 font-display text-2xl font-bold uppercase tracking-wide text-vault-100">
                  Signal Received
                </h3>
                <p className="font-mono text-xs text-concrete-400">
                  You&apos;re on the list. Watch your inbox.
                  No spam, no schedule, just analysis when it matters.
                </p>
              </div>
            )}
          </div>
        </PanelSection>
      )}

      {/* Intel Panel */}
      {activeTab === 'intel' && (
        <PanelSection ref={intelRef} title="Daily Intel" code="INT.01">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 border-l-2 border-vault-200/40 bg-vault-900/10 px-5 py-3">
              <p className="font-mono text-xs leading-relaxed text-concrete-400">
                One statement. Two choices: <span className="text-vault-300">Documented</span> or <span className="text-rust-400">Disinformation</span>.
                Decide correctly to build your streak. New signal daily. Browse the archive for past intel.
              </p>
            </div>
            <Suspense fallback={
              <div className="vault-corner border border-concrete-700 bg-concrete-900 p-8">
                <div className="flex items-center gap-3 font-mono text-sm text-concrete-500">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-vault-300" />
                  <span>DECRYPTING SIGNAL...</span>
                </div>
              </div>
            }>
              <DailyIntel embedded />
            </Suspense>
          </div>
        </PanelSection>
      )}

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-16">
        {showIntelSection && (
          <div className="mb-8">
            <button
              onClick={() => {
                setShowIntelSection(false)
                handleTabClick('sections')
              }}
              className="mb-4 font-mono text-xs text-concrete-500 hover:text-vault-300"
            >
              ← ALL FILES
            </button>
            <div className="flex items-center gap-3">
              <span className="h-8 w-1 bg-vault-200" />
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-vault-100 terminal-glow">
                  Daily Intel
                </h2>
                <p className="mt-1 font-mono text-xs text-concrete-500">
                  Test your instincts. Documented or disinformation? Build your streak.
                </p>
              </div>
            </div>
          </div>
        )}

        {showIntelSection && (
          <div className="mx-auto max-w-2xl">
            <Suspense fallback={
              <div className="vault-corner border border-concrete-700 bg-concrete-900 p-8">
                <div className="flex items-center gap-3 font-mono text-sm text-concrete-500">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-vault-300" />
                  <span>DECRYPTING SIGNAL...</span>
                </div>
              </div>
            }>
              <DailyIntel embedded />
            </Suspense>
          </div>
        )}

        {!showIntelSection && selectedCategory && (
          <div className="mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-4 font-mono text-xs text-concrete-500 hover:text-vault-300"
            >
              ← ALL FILES
            </button>
            <div className="flex items-center gap-3">
              <span className="h-8 w-1 bg-vault-200" />
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-vault-100">
                  {selectedCategory}
                </h2>
                <p className="mt-1 font-mono text-xs text-concrete-500">
                  {categories.find((c) => c.name === selectedCategory)?.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {!selectedCategory && !showIntelSection && (
          <div className="mb-10 flex items-center gap-3">
            <span className="h-8 w-1 bg-vault-200" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-concrete-200">
              All Files
            </h2>
            <span className="font-mono text-xs text-concrete-600">
              [{articles.length} RECORDS]
            </span>
          </div>
        )}

        {!showIntelSection && (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredArticles.map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={idx}
              onClick={() => handleArticleClick(article)}
            />
          ))}
        </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-concrete-700 bg-concrete-900">
        <div className="hazard-stripes-thin h-1.5 w-full" />
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border-2 border-vault-200 bg-vault-900 font-display text-sm font-bold text-vault-200">
                F
              </div>
              <div>
                <span className="text-stamp-yellow font-display text-lg font-bold uppercase tracking-widest">
                  Fallout
                </span>
                <p className="font-mono text-xs text-concrete-600">
                  Independent analysis. No advertisers. No agenda.
                </p>
              </div>
            </div>
            <div className="flex gap-4 font-mono text-xs uppercase text-concrete-500">
              <button onClick={() => handleTabClick('intel')} className="hover:text-vault-300">Intel</button>
              <span className="text-concrete-700">|</span>
              <button onClick={() => handleTabClick('sections')} className="hover:text-vault-300">Sections</button>
              <span className="text-concrete-700">|</span>
              <button onClick={() => handleTabClick('latest')} className="hover:text-vault-300">Latest</button>
              <span className="text-concrete-700">|</span>
              <button onClick={() => handleTabClick('gear')} className="hover:text-vault-300">Gear</button>
              <span className="text-concrete-700">|</span>
              <button onClick={() => handleTabClick('subscribe')} className="hover:text-vault-300">Subscribe</button>
            </div>
          </div>
          <div className="mt-8 border-t border-concrete-700 pt-6 text-center font-mono text-xs text-concrete-600">
            All claims sourced from public records. Theories presented as questions, not assertions.
          </div>
        </div>
      </footer>
    </div>
  )
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`border px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
        active
          ? 'border-vault-200 bg-vault-900/40 text-vault-200 shadow-[0_0_12px_rgba(250,204,21,0.15)]'
          : 'border-transparent text-concrete-400 hover:border-concrete-700 hover:bg-concrete-800 hover:text-concrete-200'
      }`}
    >
      {label}
    </button>
  )
}

const PanelSection = forwardRef<HTMLDivElement, { title: string; code: string; children: React.ReactNode }>(
  function PanelSection({ title, code, children }, ref) {
    return (
      <section
        ref={ref}
        className="animate-fade-in border-b border-concrete-700 bg-concrete-900/30"
      >
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-6 w-1 bg-vault-200" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-vault-100">
              {title}
            </h2>
            <span className="font-mono text-xs text-concrete-600">[{code}]</span>
            <span className="ml-auto flex items-center gap-2 font-mono text-xs text-concrete-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vault-300" />
              ONLINE
            </span>
          </div>
          {children}
        </div>
      </section>
    )
  }
)

function GearCard({ title, code, children }: { title: string; code: string; children: React.ReactNode }) {
  return (
    <div className="vault-corner border border-concrete-700 bg-concrete-900">
      <div className="flex items-center justify-between border-b border-concrete-700 bg-concrete-800/50 px-5 py-3">
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-vault-100">
          {title}
        </h3>
        <span className="font-mono text-xs text-concrete-500">[{code}]</span>
      </div>
      <div className="divide-y divide-concrete-800">
        {children}
      </div>
    </div>
  )
}

function GearItem({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex gap-4 px-5 py-4">
      <span className="mt-0.5 shrink-0 font-mono text-sm text-vault-500">▸</span>
      <div>
        <p className="font-mono text-sm font-bold text-concrete-200">{label}</p>
        <p className="mt-1 font-mono text-xs leading-relaxed text-concrete-500">{desc}</p>
      </div>
    </div>
  )
}

function ArticleCard({ article, index, onClick }: { article: Article; index: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="vault-corner group flex flex-col border border-concrete-700 bg-concrete-900 p-6 text-left transition-all hover:border-vault-200 hover:bg-concrete-800"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="border border-vault-500/50 bg-vault-900/20 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-vault-300">
          {article.category}
        </span>
        <span className="font-mono text-xs text-concrete-600">
          {formatDate(article.date)} · {article.readTime}
        </span>
      </div>
      <h3 className="mb-2 font-display text-xl font-bold uppercase leading-tight tracking-wide text-concrete-100 group-hover:text-vault-200">
        {article.title}
      </h3>
      <p className="mb-4 font-mono text-xs leading-relaxed text-concrete-500">
        {article.excerpt}
      </p>
      <div className="mt-auto flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="border border-concrete-700 px-2 py-0.5 font-mono text-xs text-concrete-500"
          >
            #{tag}
          </span>
        ))}
      </div>
    </button>
  )
}

function ArticleView({ article, onBack }: { article: Article; onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [article])

  return (
    <div className="min-h-screen bg-concrete-950 text-concrete-300">
      <div className="hazard-stripes-thin h-2 w-full" />
      <header className="sticky top-0 z-50 border-b border-concrete-700 bg-concrete-950/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 font-mono text-xs text-concrete-400 hover:text-vault-300">
            <span>←</span>
            <span className="uppercase tracking-wider">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center border-2 border-vault-200 bg-vault-900 font-display text-sm font-bold text-vault-200">
              F
            </div>
            <span className="text-stamp-yellow font-display text-lg font-bold uppercase tracking-widest">
              Fallout
            </span>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="border border-vault-500/50 bg-vault-900/20 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-vault-300">
              {article.category}
            </span>
            <span className="font-mono text-xs text-concrete-600">
              FILE #{article.id}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-vault-100 terminal-glow md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 font-display text-lg font-light uppercase tracking-wide text-concrete-400">
            {article.subtitle}
          </p>
          <div className="mt-4 flex items-center gap-3 font-mono text-xs text-concrete-600">
            <span>{article.author}</span>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{article.readTime} READ</span>
          </div>
        </div>

        <div className="mb-12 border-l-2 border-vault-200/40 bg-vault-900/10 px-6 py-4">
          <p className="font-mono text-sm italic leading-relaxed text-vault-100">{article.excerpt}</p>
        </div>

        <div className="article-prose">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2 border-t border-concrete-700 pt-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="border border-concrete-700 px-3 py-1 font-mono text-xs text-concrete-500"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={onBack}
          className="mt-10 border-2 border-concrete-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-concrete-300 transition-all hover:border-vault-200 hover:text-vault-200"
        >
          ← Back to All Files
        </button>
      </article>

      <footer className="border-t border-concrete-700 bg-concrete-900">
        <div className="hazard-stripes-thin h-1.5 w-full" />
        <div className="px-6 py-8 text-center font-mono text-xs text-concrete-600">
          All claims sourced from public records. Theories presented as questions, not assertions.
        </div>
      </footer>
    </div>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
