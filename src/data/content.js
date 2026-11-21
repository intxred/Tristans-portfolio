export const profileLinks = {
  github: 'https://github.com/intxred',
  linkedin: 'https://www.linkedin.com/in/tristan-jared-balane-1833a8283/',
}

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'products', label: 'Products' },
  { id: 'case-studies', label: 'Case Studies' },
]

export const cmdkItems = [
  { label: 'Home', href: '#home' },
  { label: 'Automation Playground 🧩', action: 'automation' },
  { label: 'Pin a note 📌 (Corkboard)', action: 'corkboard' },
  { label: 'About', href: '#about' },
  { label: 'Toolkit', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Products', href: '#products' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Contact', href: '#contact' },
  { label: 'Email me', href: 'mailto:hello@redbuilds.dev' },
  { label: 'View GitHub', href: profileLinks.github },
  { label: 'View LinkedIn', href: profileLinks.linkedin },
]

export const tickerLines = [
  'Available for freelance work',
  'Open to full-time roles',
  'Based in Manila, PH — GMT+8',
  'Replies within 24 hours',
]

// Logos load from public/images/stack/<slug>/logo.jpg
export const stackCardsData = [
  {
    slug: 'quillio',
    title: 'Quillio — Learn your way in',
    link: 'https://quillio.site',
    badgeMain: '❮ Desktop app ❯',
    desc: 'A free, offline quiz app for Mac and Windows. Write your own questions, set the pass mark, and put an exam in front of any app so it only opens after a pass.',
  },
  {
    slug: 'red-and-spice',
    title: 'Red & Spice — Bold flavors, unforgettable bites',
    link: 'https://red-and-spice.vercel.app/',
    badgeMain: '❮ Website ❯',
    desc: 'Website for Red & Spice: bold flavors, unforgettable bites.',
  },
  {
    slug: 'truthbot',
    title: 'TruthBot — A second opinion on the news',
    link: 'https://truth-bot.pages.dev',
    badgeMain: '❮ ML web app ❯',
    desc: 'Paste a headline and article and get a Real or Fake verdict, a confidence score and writing signals from a trained classifier.',
  },
]

export const experience = [
  { year: '2026', role: 'Full-Stack Developer/ IT Specialist', org: 'Independent · Freelance' },
  { year: '2025', role: 'Freelance Developer', org: 'Independent Contractor' },
  { year: '2024', role: 'Freelance Developer', org: 'Freelance Projects' },
  { year: '2022', role: 'Student', org: 'Self-Taught' },
]

export const stackTagsRow1 = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Express', 'PostgreSQL']
export const stackTagsRow2 = ['AWS', 'Docker', 'Google Apps Script', 'Git & GitHub Actions']

export const projectTiles = [
  { slug: 'quillio', url: 'https://quillio.site', size: 'tile-1', bg: 'front-ink', title: 'Quillio', stack: 'Python · Desktop · Offline', desc: 'Free offline quiz app for Mac and Windows. Put an exam in front of any app so it only opens after a pass.', tags: 'Desktop · Education · Automation' },
  { slug: 'truthbot', url: 'https://truth-bot.pages.dev', size: 'tile-2', bg: 'front-red', title: 'TruthBot', stack: 'Flask · Logistic Regression · TF-IDF', desc: 'Paste a headline and article and get a Real or Fake verdict, a confidence score and writing signals.', tags: 'Machine Learning · API' },
  { slug: 'rezoome', url: 'https://rezoome.pages.dev', size: 'tile-3', bg: 'front-ink', title: 'Rezoomé', stack: 'JavaScript · Cloudflare Pages', desc: 'Free resume builder with ATS scoring, keyword matching and PDF download. No sign-up.', tags: 'Web App · Career Tools' },
  { slug: 'vantage', url: 'https://vantagee.figma.site', size: 'tile-4', bg: 'front-tan', title: 'Vantage', stack: 'Figma Sites', desc: 'A website designed and published with Figma Sites.', tags: 'Web Design · Figma' },
  { slug: 'neurograph', url: 'https://neurograph-gold.vercel.app', size: 'tile-5', bg: 'front-white', title: 'NeuroGraph', stack: 'React · D3 · Neo4j', desc: 'Local AI chat that builds a Neo4j knowledge graph you can explore visually.', tags: 'AI · Graph · Security' },
  { slug: 'inventory-system', url: 'https://script.google.com/macros/s/AKfycbyjMyWo1byKI3-RhB-rNJvaIzCGV0lidoCxUZbmFCBLf9SnJ2AxS16Z8_Ouu9buLOHx/exec', size: 'tile-6', bg: 'front-ink', title: 'Inventory System', stack: 'Apps Script · Sheets', desc: 'Asset inventory interface on Google Sheets with category-aware dropdowns.', tags: 'Automation · Google Workspace' },
]

/* Each certification has its own folder: public/images/certifications/<slug>/
   logo.jpg         (the issuer / badge logo shown on the card)
   certificate.jpg  (your certificate screenshot, shown when the card is clicked) */
export const certifications = [
  { slug: 'freecodecamp-js', icon: 'm1', title: 'Oracle Cloud Generative AI Professional', year: '2024', issuer: 'Oracle', tags: ['Cloud', 'Artificial Intelligence'] },
  { slug: 'odin-fullstack', icon: 'm2', title: 'Computer System Servicing NC2', year: '2023', issuer: 'Tesda', tags: ['Computer Systems', 'Networks'] },
  { slug: 'aws-cloud', icon: 'm3', title: 'Lean Six Sigma Yellow Belt', year: '2024', issuer: 'ASQ Cloud', tags: ['Process Improvement', 'Production'] },
  { slug: 'ibm-docker', icon: 'm4', title: 'Safety Officer 2', year: '2024', issuer: '5MCSS', tags: ['Risk Management', 'OSH'] },
  { slug: 'meta-react', icon: 'm5', title: 'IT Specialist', year: '2023', issuer: 'CISCO', tags: ['Support', 'Technical'] },
  { slug: 'github-actions', icon: 'm6', title: 'Generative AI Associate', year: '2025', issuer: 'Microsoft', tags: ['Workflows', 'Automation'] },
]

export const productChips = ['All', 'Web Apps', 'Dashboards', 'Mobile', 'Bots', 'Automation', 'DevOps', 'UI Kits']

/* Products can carry a video. Set `video` to either
     - a file name saved next to the cover:  'video.mp4'  ->  public/images/products/<slug>/video.mp4
     - or a link: a YouTube / Vimeo URL (plays inside the site) or any direct .mp4 URL.
   Leave it out and the card simply opens the image. */
export const productPins = [
  { slug: 'directory-listing', title: 'Landing Page', color: 'D9A857', h: 260, file: 'directory-listing.png' },
  { slug: 'sales-dashboard', title: 'Product Promotion', color: 'C7BFA8', h: 760, file: 'sales-dashboard.png', video: 'video.mp4' },
  { slug: 'order-bot-chat', title: 'Food-chain website', color: 'E8A998', h: 380, file: 'order-bot-chat.png' },
  { slug: 'habit-tracker', title: 'Landing Page(Mobile)', color: 'A9C7B6', h: 880, file: 'habit-tracker.png' },
  { slug: 'prompt-eval-ui', title: 'Robotics & Electronics', color: 'BFAED6', h: 300, file: 'prompt-eval-ui.png' },
  { slug: 'tv-remote', title: 'Product Poster', color: 'E2BF85', h: 560, file: 'tv-remote.png' },
  { slug: 'moderation-panel', title: 'Modals', color: 'ECE7DA', h: 340, file: 'moderation-panel.png' },
  { slug: 'receipt-report', title: 'Cinematic AI & Drama', color: 'F3C8BD', h: 700, file: 'receipt-report.png', video: 'video.mp4'  },
  { slug: 'auth-flow', title: 'Project Plan & Development', color: 'C9DDE0', h: 460, file: 'auth-flow.png' },
  { slug: 'analytics-widget', title: 'Landing Page', color: 'E6C07D', h: 620, file: 'analytics-widget.png' },
]

export const caseStudies = [
  { slug: 'horizons-workforce', cat: 'automation', date: 'Nov 21, 2026', tags: ['Dashboards', 'Workforce'], title: 'Horizons: Live Visibility Into Every Line of Business', color: 'D9A857', file: 'case-horizons.png' },
  { slug: 'clawcash', cat: 'web', date: 'Nov 21, 2026', tags: ['Mobile', 'Budgeting'], title: 'ClawCash: A Client Budget App That Keeps Loans and Spending in One Shell', color: 'C7BFA8', file: 'case-clawcash.png' },
]

/* Full write-ups for each case study, matched by slug. */
export const caseStudyStories = [
  {
    slug: 'horizons-workforce',
    title: 'Horizons Workforce Management',
    kind: 'Internal operations tool',
    role: 'Design · Full-stack build',
    tagline: 'One live screen showing who is working, who is idle and who is on break, across every line of business.',
    file: 'case-horizons.png',
    overview:
      'Horizons is a workforce management dashboard for teams that supervise many people across several lines of business (LOBs). It turns employee PC activity into a live picture of the floor: who is working, idle, on break, on leave or finished for the day.',
    problem: [
      'Supervisors had no shared, real-time view of the floor. Who was actually working lived in chat threads, spreadsheets and memory.',
      'Idle time and overbreaks only surfaced after the fact, if at all, so problems were noticed days late and discussed from anecdote instead of data.',
      'Schedules, leave, meeting requests and activity data sat in separate places, so every question ("is anyone covering this LOB right now?") meant checking several sources.',
    ],
    solution: [
      'A Summary Report that answers the daily questions at a glance: active employees, shift ended, on leave, inactive, breaks taken, unscheduled breaks and pending meetings.',
      'Headcount and state breakdown charts that are clickable, so a number is never a dead end: click it and see exactly who is behind it.',
      'Idle and overbreak minutes by LOB, plus breaks by type (break, lunch, bio, unscheduled), so managers can compare teams and spot where time is leaking.',
      'Live Activity, Schedules and Meeting Requests alongside the report, with Employees, Duplicates / Fix and Access Management behind it for keeping the data clean and the right people in the right view.',
      'Auto-refresh with a visible last-sync time, plus one-click export for reporting. Everything runs in Asia/Manila time so shift boundaries are never ambiguous.',
    ],
    impact: [
      {
        title: 'Visibility replaces guesswork',
        body: 'Headcount is split into active, shift ended, on leave and inactive in one glance. A supervisor stops asking "who is on?" and starts asking "is that enough coverage?".',
      },
      {
        title: 'Lost time becomes measurable',
        body: 'When idle and overbreak minutes are tracked per LOB, the conversation moves from "it feels slow" to "this team lost this many minutes, mostly in these breaks". Fixes can target the real source instead of the whole floor.',
      },
      {
        title: 'Fairer, consistent break policy',
        body: 'Breaks by type, with unscheduled breaks called out, make policy checks the same for everyone. The data shows patterns rather than singling out individuals from memory.',
      },
      {
        title: 'Faster staffing decisions',
        body: 'Seeing real-time activity against schedules and approved leave lets managers move people or adjust coverage during the shift, not in the next day\'s report.',
      },
      {
        title: 'Less time spent building reports',
        body: 'Auto-refreshing numbers and one-click export remove the manual spreadsheet work that used to happen at the end of every shift or week.',
      },
      {
        title: 'The right people see the right data',
        body: 'Access management scopes each manager to their own LOB, while a superadmin sees everything. That keeps sensitive activity data limited to those who need it.',
      },
    ],
    responsibleUse:
      'Tracking every employee\'s PC activity changes how work feels, so how it is introduced matters as much as the dashboard. The tool works at the level of status and time (working, idle, on break, shift ended), not what is on anyone\'s screen. It works best when staff are told what is tracked and why, when it is used for coaching and coverage rather than surprise discipline, and when access to the data is limited by role.',
    next: [
      'Alerts when idle or overbreak time passes a set threshold',
      'Trend views over weeks, not just the selected dates',
      'Self-service views so employees can see their own time',
    ],
    tech: ['Google Apps Script', 'HTML/CSS/JS', 'Charts', 'Role-based access'],
  },
  {
    slug: 'clawcash',
    title: 'ClawCash',
    kind: 'Client budget & expenses app',
    role: 'Design · Full-stack build',
    tagline: 'Your money, in one shell. A mobile app that keeps a client\'s spending, loans and due dates in one place.',
    file: 'case-clawcash.png',
    overview:
      'ClawCash is a mobile-first budget and expense app built for a client who was tracking money across notes, chat messages and memory. It brings daily spending, money owed to them, income and upcoming payments into one calm, dark interface with a crab mascot to keep it friendly.',
    problem: [
      'The client\'s money lived in scattered places: money lent to friends, bills coming due, everyday spending and income, none of it connected.',
      'Loans were easy to forget. Without a due date in front of them, money owed stayed owed, and awkward follow-ups depended on memory.',
      'Most budgeting apps felt built for spreadsheets and accountants. The client wanted a quick daily check-in, not a finance course.',
    ],
    solution: [
      'A Home screen that greets you and answers the daily questions: how much was spent today, how the last seven days looked, and whether anything is due.',
      'A highlighted "Owed to you" card for the nearest loan, with the person and due date front and centre, so money lent never slips.',
      'Total on hand and the month\'s net as two big numbers, so the client always knows where they stand without opening a report.',
      'An Upcoming list sorted by due date, with money coming in in green and money going out in red, so the next few weeks are readable in seconds.',
      'Bottom navigation for Loans, Expenses, Income and Wallet, so every task is one tap away on a phone.',
    ],
    impact: [
      {
        title: 'One place instead of five',
        body: 'Spending, loans, income and bills now live together, so the client stops piecing the picture together from chats and notes.',
      },
      {
        title: 'Money owed gets followed up',
        body: 'Due dates are visible on the home screen, so loans are remembered and collected on time instead of drifting.',
      },
      {
        title: 'Fewer surprises',
        body: 'Seeing upcoming bills next to what is on hand makes it clear early when a month will be tight.',
      },
      {
        title: 'A habit, not a chore',
        body: 'A friendly, glanceable home screen turns checking in into a ten-second habit, which is what keeps a budget accurate.',
      },
    ],
    next: [
      'Reminders before loans and bills fall due',
      'Monthly spending breakdown by category',
      'Backup and export of records',
    ],
  },
]


export const resultsStats = [
  { target: 7, label: 'Projects Shipped' },
  { target: 80, label: '% Faster Reporting*' },
  { target:50, label: 'Orders / Week*' },
  { target: 24, label: 'Hour Response Time' },
]

/* Detail copy for each selected project (opens in the project modal).
   Edit freely. Add `live` / `repo` URLs to show buttons for them. */
export const projectDetails = {
  'quillio': {
    slug: 'quillio',
    url: 'https://quillio.site',
    kind: 'Desktop app', status: 'Shipped (Mac) · Windows beta', role: 'Design · Full-stack build',
    purpose: 'A free, offline quiz and assessment app for Mac and Windows. You write your own questions, set the pass mark, and optionally put a full-screen exam in front of chosen apps so they only open after a pass.',
    overview: 'Screen time rarely teaches anything, and ordinary parental controls can only block or allow. Quillio adds a third option: earn it. A background monitor watches for the apps on your list. When one opens, it is closed and a full-screen exam takes over. Pass the mark and the app unlocks for a few minutes; close it and the gate returns about eight seconds later. Everything runs on the local machine with no account, no cloud and no subscription, so a family can set it up once and keep their data private.',
    target: 'Parents and educators who want screen time to start with learning, and anyone who wants a private, customisable quiz tool.',
    features: [
      'Custom subjects, questions, question count and pass mark, with JSON/CSV import',
      'App gate: a background monitor closes guarded apps until the exam is passed',
      'Per-app rules: each app has its own question count, pass mark, unlock time and subjects',
      'PIN-protected parent dashboard; five wrong PIN tries lock entry for five minutes',
      '80 starter questions across 8 subjects, with an explanation after every answer',
      'Fully offline: no accounts, data stays on the computer',
    ],
    challenges: [
      'Enforcing the gate reliably: the monitor polls about every half second, so a guarded app may flash briefly before it closes',
      'Windows cannot block Alt+Tab or the Windows key, so the exam is a full-screen window raised again every second',
      'Making setup safe for children: a hardened Mac install for Standard accounts, so casual attempts to stop the service are much harder',
      'Shipping unsigned installers (Mac .pkg, Windows .exe) and walking users past the Gatekeeper and SmartScreen warnings',
    ],
    outcome: 'Live at quillio.site with a Mac installer, a Windows beta (not yet tested on a real PC), a demo video, setup guide, parent guide and FAQ.',
    tech: ['Python', 'Local database', 'Background monitor service', 'macOS .pkg & Windows installers'],
  },
  'truthbot': {
    slug: 'truthbot',
    url: 'https://truth-bot.pages.dev',
    kind: 'ML web app', status: 'Shipped', role: 'ML · Backend · Frontend',
    purpose: 'A fake news classifier that gives a second opinion. Paste in a headline and article and it returns a Real or Fake verdict, a confidence score and writing signals.',
    overview: 'TruthBot turns a machine-learning classifier into something anyone can use in a browser. The title and article body are cleaned, converted with a TF-IDF vectorizer and scored by a Logistic Regression model trained on a labelled news dataset (80/20 split, 91.2% reported test accuracy). Analysis runs on a Flask API hosted on Render, and the frontend is a lightweight static site on Cloudflare, styled around a paper-and-ink look with red accents.',
    target: 'Readers who want a quick credibility check before trusting or sharing news.',
    features: [
      'Real or Fake verdict with a confidence score, in seconds (English text only)',
      'Writing signals for credibility, bias and misleading-content patterns',
      'Browser-only history of analysed articles',
      'TF-IDF vectorizer feeding a Logistic Regression classifier',
      'Flask API backend hosted on Render',
      'Static frontend deployed on Cloudflare',
    ],
    challenges: [
      'Splitting the system cleanly: the model API on Render, the static site on Cloudflare',
    ],
    outcome: 'Live at truth-bot.pages.dev with a reported 91.2% test accuracy (90.4% precision, 89.1% recall). Planned next: bias detector, sentiment analyzer, source checker, fact checker, readability score and AI content detector.',
    tech: ['Flask', 'Logistic Regression', 'TF-IDF', 'HTML/CSS/JS', 'Render', 'Cloudflare'],
  },
  'rezoome': {
    slug: 'rezoome',
    url: 'https://rezoome.pages.dev',
    kind: 'Web application', status: 'Live', role: 'Design · Frontend build',
    purpose: 'A free resume builder with a built-in ATS score checker and job keyword matching. No sign-up, no watermark, PDF download.',
    overview: 'Many resume builders hide the download behind a paywall or an account. Rezoomé keeps it simple: pick one of three ATS-friendly templates, fill in your details with a live preview, check your resume score, and match your wording against a job description before downloading a clean PDF. It runs entirely in the browser on Cloudflare Pages.',
    target: 'Job seekers who want an ATS-friendly resume without paying or creating an account.',
    features: [
      'Three ATS-friendly templates with live preview',
      'Resume scoring (ATS score)',
      'Job keyword matching against a pasted job description',
      'One-click PDF download, no sign-up or watermark',
    ],
    challenges: [
      'Keeping templates ATS-readable while still looking professional',
      'Generating a clean PDF directly in the browser',
    ],
    outcome: 'Live at rezoome.pages.dev with search and social sharing metadata set up.',
    tech: ['JavaScript', 'PDF export', 'Cloudflare Pages'],
  },
  'vantage': {
    slug: 'vantage',
    url: 'https://vantagee.figma.site',
    kind: 'Web design', status: 'Live', role: 'Design · Publishing',
    purpose: 'A website designed and published with Figma Sites.',
    overview: 'Vantage is a site designed visually in Figma and published straight from the design file, so the layout on the web matches the design exactly.',
    target: 'Anyone visiting the site.',
    features: ['Designed and published with Figma Sites', 'Responsive layout'],
    challenges: ['Turning a Figma design into a live, published site'],
    outcome: 'Live at vantagee.figma.site.',
    tech: ['Figma Sites'],
  },
  'neurograph': {
    slug: 'neurograph',
    url: 'https://neurograph-gold.vercel.app',
    kind: 'AI app', status: 'Production-ready', role: 'Full-stack build · Security',
    purpose: 'A locally run AI chat app that stores what it learns in a Neo4j knowledge graph, so you can see how ideas and conversations connect.',
    overview: 'Most AI chats forget structure: they give you a transcript, not a map. NeuroGraph runs locally and records entities and relationships in a Neo4j knowledge graph, which you can explore visually with React and D3. A full authentication and security stack makes it safe to keep personal conversations on your own machine.',
    target: 'People who want a private, local AI assistant with a visible memory of what it knows.',
    features: [
      'AI chat running locally',
      'Neo4j knowledge graph as memory',
      'Interactive graph visualisation with React and D3',
      'Full authentication and security stack',
    ],
    challenges: [
      'Turning free-form conversation into a graph structure',
      'Keeping a local app secure with proper authentication',
    ],
    outcome: 'Reached a production-ready state.',
    tech: ['React', 'D3.js', 'Neo4j'],
  },
  'inventory-system': {
    slug: 'inventory-system',
    url: 'https://script.google.com/macros/s/AKfycbyjMyWo1byKI3-RhB-rNJvaIzCGV0lidoCxUZbmFCBLf9SnJ2AxS16Z8_Ouu9buLOHx/exec',
    kind: 'Automation', status: 'In use', role: 'Automation · Frontend',
    purpose: 'An asset inventory tool with a clean HTML interface on top of Google Sheets, so equipment and non-asset items can be logged and tracked without a new system.',
    overview: 'Spreadsheets are where small teams already track equipment, but raw rows are error-prone. This tool puts a form-style HTML interface in front of Google Sheets, with dropdown categories that change depending on whether the entry is an asset or a non-asset item. Data stays in the sheet the team already owns.',
    target: 'Small teams and IT support staff who track hardware and supplies in spreadsheets.',
    features: [
      'HTML interface connected to Google Sheets',
      'Context-specific dropdown categories for assets vs non-asset items',
      'Runs on Google Workspace, no new tools to learn',
    ],
    challenges: [
      'Keeping categories consistent so the sheet stays clean',
    ],
    outcome: 'Running on Google Apps Script with Sheets as the database.',
    tech: ['Google Apps Script', 'Google Sheets', 'HTML/CSS/JS'],
  },
}
export const PROJECT_IMAGE_COUNT = 4