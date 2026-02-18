# SpendHen 🐔💰

> A personal finance management app that adapts to your saving style

[🔗 Live Demo](#) *(https://spendhen-finance-4lyhuznl2-achint-eswars-projects.vercel.app/)*

---

## 📖 About This Project

SpendHen is a personal passion project exploring the personal finance space. Instead of forcing users into rigid budgeting systems, it lets them choose their "savings intensity" — from minimal tracking to aggressive goal-setting.

**Why I Built This:**  
I noticed existing finance apps are very technical and formulaic, oftentimes focusing entirely on the raw numbers. SpendHen adapts to how you *actually* want to manage your spending, keeping you accountable, but maintaining flexibility for the user. Meant for college students with a variety of responsibilities, the app is being developed to teach stronger spending habits early on to those who may not be as educated.
---

## ✨ Key Features

### 📊 5 Customizable Saving Plans
Choose your intensity: **Coasting** → **Steady** → **Balanced** → **Focused** → **Full Grind**
- Visual energy indicators (1-5 dots)
- Each plan adapts feature visibility
- Pick what matches your lifestyle

### 💰 Smart Income Tracking
- Recurring income with custom frequencies (daily, weekly, biweekly, monthly, or custom)
- Automatic payday predictions across all pages
- Timeline locking for temporary income sources
- Green "$" indicators on calendar for user "paydays"

### 📁 Folder-Based Organization
- Income & Expenses separated into distinct folders
- Reduces cognitive load by separating concerns
- One-level deep (no nested complexity)

### 🎯 Goals System
- Lock goals to specific timelines
- Direct progress input (type current amount, not increments)
- Spending summaries with surplus allocation
- Inverted progress colors: red = just started, green = almost there

### 📅 Event Planning
- Budget for upcoming expenses with date ranges
- Track spending progress for active events
- Priority-based categorization (1-5 💵 indicators)

### 🏠 Contextual Home View
- Day-by-day swipe navigation
- Payday countdown (when within 5 days)
- "$ PAYDAY $" celebration banner on income days

---

## 🛠️ Tech Stack

- React 18 with Hooks (useState, useEffect, useRef)
- Lucide React for iconography
- Vanilla CSS with inline styles (glassmorphic design)
- Complex state management (6 pages, 40+ state variables)
- Custom algorithms (payday calculations, recurring date logic)

**Philosophy:** No heavy framework dependencies — pure React to demonstrate fundamentals and state management patterns.

---

## 🎨 Design Decisions

### Color Psychology
- 🟢 Green = Income (positive reinforcement)
- 🔴 Red = Expenses (caution/warning)
- 🔄 Inverted Goals = Red when far from target, green when close (celebrates progress)

### UX Patterns
- Folder metaphor for Finance page (reduces overwhelm)
- Progressive disclosure (advanced features revealed only when needed)
- Swipe navigation on Home (mimics calendar apps)
- Emoji-based priority (visual > text labels)

---

## 📸 Screenshots

### Plan Selection
*Choose your savings approach from 5 intensity levels*

![Plan Selection](screenshots/plan-selection.png)

### Finance Management
*Folder-based organization with income/expense separation*

![Finance Folders](screenshots/finance-folders.png)

### Goals Tracking
*Timeline locking with inverted progress visualization*

![Goals Page](screenshots/goals-tracking.png)

### Calendar Integration
*Payday indicators and event budgeting*

![Calendar View](screenshots/calendar-view.png)

---

## 🚧 Project Status

### Current State: Frontend Prototype

✅ **What's Working:**
- Full UI/UX flow across 6 interconnected pages
- Complex state management and data relationships
- Payday prediction algorithm
- Goal system with timeline locking
- Responsive mobile-first design

⚠️ **Known Limitations:**
- Data resets on page refresh *(localStorage planned)*
- Simulated authentication *(backend integration planned)*
- Manual progress tracking *(transaction log planned)*

### Roadmap

- [ ] Phase 2: localStorage persistence
- [ ] Phase 3: Firebase/Supabase backend integration
- [ ] Phase 4: Transaction log with auto-categorization
- [ ] Phase 5: Receipt scanning with OCR
- [ ] Phase 6: Data export (CSV/PDF reports)
- [ ] Phase 7: React Native mobile app

---

## 💭 Development Reflections

### Biggest Challenge
Designing the payday prediction algorithm to handle edge cases:
- Custom frequency intervals (e.g., "every 10 days")
- Monthly payments landing on different weekday positions
- Multiple overlapping income sources on the same day

**Solution:** Used modular arithmetic for day-based frequencies and date comparison for monthly intervals.

### Key Learning
Balancing feature richness with simplicity requires defined prioritization. Certain implementations arose after key surveying and research were done, for example, the folder pattern emerged after realizing a flat list of 10+ categories felt overwhelming. The Income/Expenses folders came from users who wanted a clear distinction between "money coming in" and "money going out." Additionally, balancing design and utility is a very fine line, as the end product needs to aesthetically fit a certain mold, but still maintain a high level of functionality.

### What I'd Do Differently
Start with an even more defined structure. Create a strong white paper indicating my key goals and how to achieve them. From there, build a cohesive path towards the creation of various facets of the application. 

---

## 🚀 Running Locally
```bash
# Clone the repository
git clone https://github.com/achintesw/spendhen-finance-app.git
cd spendhen-finance-app

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

**Note:** Data will reset on page refresh in the current version. When the login screen appears: Use "demo" for username and "demo123" for password.

---

## 📦 Project Structure
```
spendhen-finance-app/
├── public/
│   └── index.html           # Entry HTML file
├── src/
│   ├── App.jsx              # Main application component
│   └── index.js             # React DOM render
├── screenshots/             # App preview images
├── package.json             # Dependencies and scripts
├── .gitignore              # Git ignore rules
└── README.md               # You are here
```

---

## 🙏 Acknowledgments

Built as a passion project to:
- Explore UX design in the personal finance space
- Practice complex React state management
- Challenge myself to build something
- Explore personal finance app development

**Inspiration:**  
Existing finance apps either overwhelm with features or oversimplify to the point of being unhelpful. I wanted something in between that adapts to the user's preferences and habits, allowing the user to maintain comfort while staying accountable.

---

## 📝 License

Standard

---

## 📬 Contact

**Achint Eswar**  
- GitHub: [github.com/achintesw](https://github.com/achintesw)
- Email: achint.eswar@gmail.com
- LinkedIn: [linkedin.com/in/achint-eswar](https://linkedin.com/in/achint-eswar)

---

*This is a frontend prototype showcasing UX/UI design and React state management capabilities. Backend integration and data persistence are planned for future development phases.*
