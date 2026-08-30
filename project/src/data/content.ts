export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  excerpt: string;
  content: string[];
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'ai-surveillance-pipeline',
    title: 'The AI Surveillance Pipeline',
    subtitle: 'How your prompts became a intelligence asset',
    category: 'Surveillance',
    date: '2025-12-15',
    readTime: '8 min',
    author: 'Editorial Desk',
    tags: ['AI', 'Privacy', 'Surveillance', 'FISA'],
    excerpt: 'Every question you ask an AI model is logged, stored, and potentially accessible to intelligence agencies under FISA Section 702. The infrastructure was built before the public knew it existed.',
    content: [
      'The infrastructure was built before the public knew it existed. Section 702 of the Foreign Intelligence Surveillance Act, originally passed in 2008 and reauthorized multiple times since, allows U.S. intelligence agencies to collect communications of non-U.S. persons located outside the United States without a individual court order. The program operates through upstream collection from internet backbone providers and through PRISM, which accesses data directly from the servers of major tech companies.',
      'What changed in the AI era is the nature of the data. Traditional surveillance captured what you did — who you called, what you searched, where you went. AI prompt logs capture what you were thinking about. The distinction matters because intent has historically required a higher legal threshold to access. A phone record tells you someone called a bankruptcy attorney. An AI prompt log tells you they were researching Chapter 7 exemptions, asking about asset protection, and exploring whether their business partner could force a sale.',
      'The behavioral profile angle is what makes this different from traditional surveillance. A phone record tells you who someone called and for how long. An AI prompt log tells you what they were thinking about. If someone asks an AI about bankruptcy law, about symptoms of depression, about how to dissolve a business partnership — that\'s a window into intent and state of mind that law enforcement has historically needed a warrant to access through other means.',
      'There are technical countermeasures. Running open-weight models locally — Meta\'s Llama series, Mistral, or the smaller variants distributed through Ollama — keeps your queries on your own hardware. No server-side retention. No human review. The trade-off is capability: local models are smaller, less capable, and require hardware that most people don\'t have. For casual use, cloud APIs are fine. For anything you wouldn\'t want read back to you in a deposition, keep it local.',
      'None of this is alarmist. The data exists. The legal framework to access it is being expanded, not contracted. And the companies operating these systems have, so far, been notably quiet about the specifics of how they respond to government requests. OpenAI\'s latest transparency report covers national security requests only in aggregate, with reporting delayed by months. Anthropic, Google, and Microsoft operate under similar constraints. The gap between what these companies collect and what the public knows about how it\'s shared is not closing. It\'s widening. And the companies building these models — Google, Microsoft, Amazon — are the same ones named in the NSA PRISM program slides revealed by Edward Snowden in 2013. PRISM was not a conspiracy theory. It was a classified surveillance partnership, documented in the government\'s own internal slides, later confirmed by the government\'s own inspector general. Whether comparable arrangements exist for AI prompt data is not publicly known. That the question has to be asked at all is the answer.',
    ],
  },
  {
    id: '2',
    slug: 'brics-dollar-transition',
    title: 'BRICS and the Dollar: Designed Transition or Organic Shift?',
    subtitle: 'The institutions were in place before the narrative began',
    category: 'Geopolitics',
    date: '2025-12-10',
    readTime: '10 min',
    author: 'Editorial Desk',
    tags: ['BRICS', 'Dollar', 'Economics', 'Geopolitics'],
    excerpt: 'The BRICS financial architecture was not built in response to recent events. The New Development Bank has been operational since 2015. The question is whether the transition was anticipated.',
    content: [
      'The narrative you\'ve been hearing is that BRICS is challenging the dollar. The framing implies a recent, reactive development — a response to sanctions, to geopolitical tension, to the weaponization of the SWIFT system. The timeline tells a different story.',
      'The New Development Bank, commonly called the BRICS Bank, was established in 2014 and became operational in 2015. Its founding members — Brazil, Russia, India, China, and South Africa — each contributed equally to the initial capital. The bank was designed to finance infrastructure and sustainable development projects in BRICS and other emerging economies, explicitly as an alternative to the World Bank and IMF, where voting power is dominated by Western nations.',
      'The Contingent Reserve Arrangement was established the same year, 2014, with an initial size of $100 billion. It functions as a safety net for BRICS countries facing liquidity pressures — a regional alternative to the IMF\'s conditional lending facilities. The arrangement was signed at the same summit that created the NDB. This was not a response to 2022 or 2023. This was a decade in the making.',
      'The BRICS Pay system, a cross-border payment messaging system designed as an alternative to SWIFT, has been in development since 2019. The mBridge project — a multi-CBDC (central bank digital currency) platform involving the central banks of China, Hong Kong, Thailand, and the UAE — conducted its first pilot in 2021. The infrastructure for de-dollarization has been built methodically, quietly, over years.',
      'The question the conventional framing avoids: cui bono — who benefits? The BRICS financial architecture was not built in response to recent events. The New Development Bank has been operational since 2015. The Contingency Reserve Arrangement was established the same year. These institutions were built quietly, over a decade, while the dollar was still unchallenged. That kind of foresight is either impressive or worth questioning. If the transition was anticipated by the parties involved — and the timeline suggests it was — then the relevant question is not whether BRICS is challenging the dollar, but whether the challenge was always part of the plan.',
      'The practical takeaway: diversification is not speculation. Holding some assets outside the dollar system — gold, productive land, even a foreign currency account — is not a bet against America. It is the same risk management that central banks are already practicing with their own reserves. The question is not whether the dollar will collapse. It will not. The question is whether your portfolio assumes it will not.',
    ],
  },
  {
    id: '3',
    slug: 'seventy-two-hour-protocol',
    title: 'The 72-Hour Protocol',
    subtitle: 'What the government tells you to do vs. what it prepares for itself',
    category: 'Preparedness',
    date: '2025-12-05',
    readTime: '7 min',
    author: 'Editorial Desk',
    tags: ['Preparedness', 'Government', 'Infrastructure'],
    excerpt: 'Ready.gov recommends 72 hours of supplies. FEMA\'s own continuity plans assume disruptions lasting weeks to months. The gap is not accidental.',
    content: [
      'Ready.gov, the Department of Homeland Security\'s public preparedness website, recommends that every household maintain a 72-hour emergency kit. The recommendation includes water (one gallon per person per day), non-perishable food, a battery-powered radio, flashlight, first-aid kit, and basic supplies. The framing is consistent: most emergencies are temporary, help will arrive within days, and individual preparedness is about bridging the gap.',
      'The government\'s own continuity plans tell a different story. FEMA\'s Continuity of Operations Plan (COOP) framework, developed under Federal Continuity Directive 1, requires federal agencies to maintain the capability to perform essential functions for up to 30 days. The directive specifies that agencies must have alternate facilities, redundant communications, and access to vital records. The 30-day requirement is not a suggestion — it is a regulatory standard for federal continuity.',
      'The disconnect is structural. The public is told to prepare for 72 hours. The government prepares for 30 days minimum. The gap between these two numbers is not a rounding error. It reflects a fundamental difference in how the government views its own continuity versus the continuity of the population it serves.',
      'Consider the Strategic National Stockpile. Maintained by the Department of Health and Human Services, the stockpile is designed to respond to public health emergencies — pandemics, bioterrorism, natural disasters. During COVID-19, the stockpile was depleted within days of the outbreak. The supply was not sufficient for a sustained national emergency. The government knew this. The 2019 simulation code-named "Crimson Contagion," conducted by HHS, modeled an influenza pandemic and projected that the stockpile would be inadequate. The simulation\'s findings were not acted upon before the actual pandemic arrived.',
      'The 72-hour recommendation is not wrong for what it is. Most localized emergencies — power outages, severe weather, localized infrastructure failures — are resolved within days. But the recommendation is framed as sufficient preparation for any emergency, which it is not. The framing serves a purpose: it manages public behavior. A population that believes 72 hours is adequate does not panic-buy, does not hoard, and does not create supply chain disruptions in anticipation of events that may not occur. The recommendation is a crowd-management tool as much as a preparedness guide.',
      'The practical implication is not that you should panic. It is that you should calibrate your preparedness to the threats the government itself takes seriously, not to the threats it tells you to prepare for. A two-week supply of food and water is not extreme. It is what the government considers the minimum for its own operations. The question is why the same standard is not recommended for the public.',
    ],
  },
  {
    id: '4',
    slug: 'gold-paper-vs-physical',
    title: 'Gold: Paper vs. Physical',
    subtitle: 'The 100:1 ratio and what it means for the price you see',
    category: 'Finance',
    date: '2025-11-28',
    readTime: '9 min',
    author: 'Editorial Desk',
    tags: ['Gold', 'Finance', 'Markets', 'COMEX'],
    excerpt: 'For every ounce of physical gold in COMEX warehouses, there are roughly 100 ounces of paper claims. The price you see is the price of the paper, not the metal.',
    content: [
      'In September 2020, JP Morgan Chase admitted to wire fraud and settled with the Department of Justice for $920 million. The charges involved a practice called "spoofing" — placing orders the trader intended to cancel before execution, in order to move the market price. JP Morgan traders did this across precious metals futures and Treasury markets over a period of eight years. The settlement was one of the largest corporate penalties in DOJ history. It is a matter of public record. What regulators proved was individual trader misconduct. What the settlement was structured to avoid examining is whether the pattern served a broader function.',
      'Spoofing is not a conspiracy theory. It is a documented market manipulation technique that has resulted in billions of dollars in penalties across multiple banks and trading firms. The CFTC has brought over 80 spoofing cases since 2010, when the practice was explicitly criminalized by the Dodd-Frank Act. JP Morgan\'s settlement was the largest, but it was not the first and it has not been the last.',
      'The structural concern with gold pricing is not about individual bad actors, though. It\'s about the ratio of paper claims to physical metal. The COMEX, the primary U.S. futures exchange for gold, typically has open interest (outstanding paper contracts) representing roughly 100 ounces of gold for every 1 ounce of physical gold in registered COMEX warehouses. This ratio fluctuates — sometimes it\'s 80:1, sometimes 120:1 — but the order of magnitude has been consistent for years. The price you see quoted as "the price of gold" is the price of a paper contract, not the price of a coin you can hold in your hand.',
      'Whether this structure suppresses the price is a legitimate question, not a fringe one. The paper market provides liquidity — but it also allows entities with deep pockets to take positions that dwarf the physical market. When 100 paper ounces exist for every 1 physical ounce, the price is set by the paper, not the metal. The question is who benefits from that arrangement, and whether the arrangement is protected. If a sufficient number of contract holders ever demanded physical delivery simultaneously — as happened on a smaller scale during the March 2020 liquidity crisis, when the COMEX gold spread blew out to $50 above London spot — the paper price would diverge sharply from the physical price. The spread would resolve in favor of the physical.',
      'The point here is not to recommend buying gold. The point is to understand what is being bought. A gold ETF like GLD is a paper claim on gold held in a bank vault. The prospectus discloses that the holder is entitled to shares, not metal. A one-ounce coin from a dealer is the metal itself. The difference matters in the scenario where the paper and physical prices diverge. Whether that scenario is likely is a separate question. Whether the difference is understood is not.',
    ],
  },
  {
    id: '5',
    slug: 'operation-mockingbird-legacy',
    title: 'Operation Mockingbird: The Legacy',
    subtitle: 'Documented CIA media infiltration and what came after',
    category: 'Media',
    date: '2025-11-20',
    readTime: '8 min',
    author: 'Editorial Desk',
    tags: ['CIA', 'Media', 'Intelligence', 'History'],
    excerpt: 'The CIA maintained relationships with at least 25 news organizations and 400 journalists during the Cold War. The program was never formally terminated.',
    content: [
      'Operation Mockingbird was not a conspiracy theory. It was a CIA program, acknowledged by the Church Committee in 1975, that maintained covert relationships with American journalists and news organizations to influence domestic and international media coverage. The Church Committee\'s final report, published in 1976, found that the CIA maintained contacts with approximately 25 news organizations and 400 journalists over the course of the program.',
      'The program\'s origins trace to the early 1950s, when CIA director Allen Dulles established a covert action division to manage media assets. The initial purpose was counter-propaganda during the Cold War — planting stories in foreign newspapers to counter Soviet narratives. The program expanded to include domestic U.S. media, despite the CIA\'s charter prohibiting domestic operations. The Church Committee found that CIA assets had worked for the New York Times, CBS, Time, Newsweek, the Associated Press, United Press International, and others.',
      'The CIA\'s position, stated in testimony to the Church Committee, was that the program was curtailed after the committee\'s revelations. George H.W. Bush, who became CIA director in 1976, issued a directive limiting CIA relationships with journalists. The directive did not ban all such relationships — it required approval from the CIA director for any new media asset recruitment. Existing relationships were not required to be disclosed.',
      'The question is whether the program ended or evolved. In 2001, after the September 11 attacks, the CIA\'s restrictions on domestic operations were loosened. The Patriot Act expanded surveillance authorities. The Pentagon\'s "perception management" programs, documented by the New York Times in 2008, involved paying military analysts to appear on news networks as independent commentators. The analysts were given talking points and access to classified briefings. The program reached millions of viewers through appearances on Fox News, CNN, NBC, CBS, and ABC.',
      'The modern media landscape does not require a Mockingbird program in the classical sense. The consolidation of media ownership — six corporations control roughly 90% of U.S. media outlets — means that narrative control can be exercised through ownership rather than through covert asset recruitment. The intelligence community\'s public relations apparatus, through official statements, background briefings, and think-tank partnerships, shapes coverage without requiring journalists to be on the CIA\'s payroll. The question is whether the program\'s goals were achieved through institutional means rather than covert ones.',
      'The Church Committee\'s findings are public. The Pentagon\'s perception management program is documented. The consolidation of media ownership is measurable. What is not documented is whether the CIA\'s media relationships continued in a modified form after the Church Committee reforms. The absence of evidence is not evidence of absence — it is, in the context of intelligence operations, the expected outcome. The question is whether the institutional structures that replaced the covert program serve the same function.',
    ],
  },
  {
    id: '6',
    slug: 'loneliness-structural-causes',
    title: 'The Loneliness Epidemic: Structural Causes',
    subtitle: 'Why the health framing obscures what actually changed',
    category: 'Society',
    date: '2025-11-15',
    readTime: '8 min',
    author: 'Editorial Desk',
    tags: ['Society', 'Policy', 'Health', 'Community'],
    excerpt: 'The Surgeon General framed loneliness as a public health crisis. The framing treats the symptom, not the cause. The causes are structural and policy-driven.',
    content: [
      'In May 2023, Surgeon General Vivek Murthy published an 82-page advisory titled "Our Epidemic of Loneliness and Isolation." The document cited a statistic that got a lot of attention: roughly half of U.S. adults report experiencing measurable levels of loneliness. It also cited a statistic that got less attention: loneliness among young adults has increased every year since 2012, which happens to be the year smartphone penetration crossed 50% in the United States.',
      'The advisory framed loneliness as a public health crisis. That framing is not wrong — the health correlates are real. A 2022 meta-analysis published in the Journal of Affective Disorders examined 113 studies and found that loneliness is associated with a 26% increase in all-cause mortality. But the framing as a health crisis treats loneliness as a symptom to be managed rather than a condition with structural causes.',
      'Consider the physical environment. Robert Putnam documented the collapse of community organizations in "Bowling Alone" back in 2000. His data showed that participation in clubs, churches, unions, and neighborhood associations began declining in the mid-1960s and has not stopped. The suburban development patterns that accelerated after the Federal-Aid Highway Act of 1956 — single-family zoning, car-dependent transportation, separated residential and commercial space — made spontaneous interaction structurally less likely. You don\'t run into neighbors when you drive from an attached garage to a parking lot. The built environment produces a specific kind of isolation as a byproduct. It\'s not designed to isolate you. It\'s designed to sell you a car and a lawn. Isolation is the externality — or the feature. A population that doesn\'t gather doesn\'t organize. A population that doesn\'t organize doesn\'t push back. Whether that\'s an accident of policy or something more deliberate is a question worth sitting with.',
      'The digital layer compounds this, but the mechanism is more specific than "social media makes people lonely." The platforms are optimized for engagement, which is not the same thing as connection. Engagement metrics reward content that triggers an emotional response — and the easiest emotional responses to trigger are outrage and anxiety. Content that facilitates deep relationship-building does not generate the session-length metrics that drive ad revenue. The architecture is not neutral. It appears to be optimized for a specific kind of attention that happens to be incompatible with the kind of attention relationships require.',
      'Then there\'s labor. The decline of stable employment — what David Graeber called "bullshit jobs" in his 2018 book — and the rise of gig work means that the workplace, one of the primary social institutions of the 20th century, no longer reliably produces the social networks it once did. When your coworkers change every six months, you don\'t build the durable ties that previous generations relied on for everything from childcare to emergency support.',
      'The health framing matters because it determines the response. If loneliness is a health crisis, the response is therapy, medication, and individual intervention. If loneliness is a structural condition, the response is different: zoning reform, labor policy, platform regulation, and investment in public space. The framing is not neutral. It determines whether the solution is individual or systemic. The Surgeon General\'s advisory, by framing loneliness as a health crisis, pointed the response toward individual treatment. The structural causes — the built environment, the labor market, the platform architecture — were acknowledged but not centered. The question is whether that framing was a choice, and who benefits from it.',
    ],
  },
  {
    id: '7',
    slug: 'uap-whistleblower-testimony',
    title: 'The UAP Whistleblower: What Was Admitted and What Was Avoided',
    subtitle: 'David Grusch, AARO, and the gap between testimony and response',
    category: 'Phenomena',
    date: '2025-11-10',
    readTime: '9 min',
    author: 'Editorial Desk',
    tags: ['UAP', 'UFO', 'Intelligence', 'Whistleblower'],
    excerpt: 'A former National Reconnaissance Office official testified under oath that the U.S. government operates a multi-decade UAP retrieval program. Congress asked questions. Then Congress stopped asking.',
    content: [
      'In June 2023, David Grusch — a former National Reconnaissance Office official and member of the UAP Task Force — gave an on-camera interview to The Debrief stating that the U.S. government has operated a multi-decade program to retrieve and reverse-engineer craft of non-human origin. The following month, he testified under oath before the House Oversight Committee. Under federal whistleblower protections, his testimony was reviewed and cleared by the Intelligence Community Inspector General before he spoke publicly.',
      'The claims were extraordinary. Grusch stated that the U.S. government possesses intact and partially intact craft of non-human origin, that a crash retrieval program has operated since the 1930s, and that the program is funded through a misappropriated black budget outside normal congressional oversight. He stated that he was denied access to these programs despite holding appropriate clearances, and that individuals involved in the program were harmed or harassed for attempting to disclose information to Congress.',
      'What matters here is not whether you believe the claims. What matters is the institutional response — or the absence of one. Grusch testified under oath, subject to perjury charges. His claims were deemed credible and urgent by the Intelligence Community Inspector General, the office statutorily required to evaluate whistleblower disclosures from the intelligence community. That office referred the matter to Congress. The House Oversight Committee held a hearing. Senators were briefed in classified settings.',
      'Then the momentum stopped. The Senate passed an amendment to the FY2024 National Defense Authorization Act — the Schumer-Rounds amendment — that would have created a review board with authority to compel the disclosure of UAP-related records, modeled on the JFK Records Act. The amendment passed the Senate unanimously. By the time the final bill was signed into law in December 2023, the provision had been gutted. The review board was removed. The authority to compel disclosure was removed. What remained was a requirement that government agencies report UAP-related records to Congress — a reporting requirement, not a disclosure mechanism. The question is who lobbied for the changes, and why.',
      'The Pentagon\'s All-domain Anomaly Resolution Office, or AARO, was established in 2022 to investigate UAP reports across military domains. In March 2024, AARO released a report concluding that there was no evidence of a UAP retrieval program or extraterrestrial technology. The report was 63 pages. It acknowledged that some UAP remain unexplained. It did not explain how it evaluated Grusch\'s specific claims or what classified programs it investigated. Grusch, in his congressional testimony, stated that AARO had not interviewed him about the retrieval program. AARO\'s director, Dr. Sean Kirkpatrick, stated that AARO had interviewed Grusch. The contradiction was not publicly resolved.',
      'The pattern is recognizable to anyone who has studied government secrecy. An insider makes a claim under whistleblower protections. The claim is evaluated by the appropriate oversight body and deemed credible. Congress takes initial interest. Legislation is proposed. The legislation is weakened or removed. An official office issues a report that finds no evidence. The report does not address the specific claims it is supposed to evaluate. The matter fades from public attention. The question is not whether the claims are true. The question is whether the process that followed them was designed to answer the question or to close it.',
      'There is a historical parallel. In 1966, the Air Force commissioned the University of Colorado to conduct an independent study of UFOs — the Condon Committee — after public pressure mounted following a wave of sightings. The committee\'s final report, published in 1968, concluded that further study of UFOs was not warranted. The report was used to justify the closure of Project Blue Book in 1969. The committee\'s director, physicist Edward Condon, was later criticized by the American Institute of Aeronautics and Astronautics for what they called a "lack of scientific objectivity" in the report\'s conclusions. The Air Force cited the report as the basis for ending official UFO investigation. The pattern — an official study, a dismissive conclusion, a closure — is not new.',
      'The UAP question is not about whether aliens exist. It is about whether a government program operates outside congressional oversight, whether taxpayer funds are spent without congressional authorization, and whether the institutions designed to provide oversight are capable of doing so when the subject matter is treated as untouchable. The Schumer-Rounds amendment was the most significant congressional attempt to compel disclosure since the Church Committee. It was removed. The question is whether its removal was a response to the evidence or a response to the question.',
    ],
  },
];

export const categories = [
  { name: 'Surveillance', description: 'How your data became an intelligence asset' },
  { name: 'Geopolitics', description: 'Power, money, and the architecture of control' },
  { name: 'Preparedness', description: 'What the government prepares for vs. what it tells you' },
  { name: 'Finance', description: 'Markets, manipulation, and the paper economy' },
  { name: 'Media', description: 'How narratives are shaped and by whom' },
  { name: 'Society', description: 'Structural causes behind personal crises' },
  { name: 'Phenomena', description: 'What challenges our understanding of reality' },
];
