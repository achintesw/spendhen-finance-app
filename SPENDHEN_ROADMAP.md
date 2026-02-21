# SpendHen Development Roadmap
## College-Focused Personal Finance App

**Repository:** https://github.com/achintesw/spendhen-finance-app  
**Live Demo:** https://spendhen-finance-app.vercel.app  
**Tech Stack:** React 18, Lucide Icons, Vercel (deployment)

---

## Project Overview

SpendHen is a personal finance app designed for college students. Unlike rigid budgeting apps, it adapts to different saving intensities (5 customizable "plans" from minimal tracking to aggressive saving) and includes college-specific features like roommate split bills, meal plan tracking, and textbook budgeting.

### Current State
- **Base App:** Fully functional with 6 pages (Home, Finance, Calendar, Plan, Profile, Auth)
- **Core Features:** Income/expense tracking, recurring income, payday predictions, goals with timeline locking, event budgeting
- **Deployment:** Auto-deploys to Vercel on every GitHub push
- **Data Persistence:** Currently in-memory (resets on refresh) - localStorage planned

---

## Phase Structure

Each phase adds one complete feature with:
1. **State Management:** New state variables
2. **UI Components:** Visual interface elements
3. **Logic/Helpers:** Calculation and data manipulation functions
4. **Integration:** Connections to existing features
5. **Polish:** Visual indicators, feedback, and UX refinements

---

# PHASE 1: ROOMMATE SPLIT BILLS ✅ COMPLETE

## Status: Deployed & Production-Ready

## Feature Summary
Split expenses with roommates, track who owes what, and settle debts with one click.

## Implementation Details

### State Variables Added
```javascript
// Location: After line 47 (after selectedScheme state)
const [roommates, setRoommates] = useState([
  { id: 1, name: 'Alex Chen', color: '#3b82f6' },
  { id: 2, name: 'Jordan Smith', color: '#8b5cf6' }
]);
const [showAddRoommate, setShowAddRoommate] = useState(false);
const [newRoommateName, setNewRoommateName] = useState('');
```

### Expense Structure Updates
Each expense object now includes:
```javascript
{
  // ... existing fields ...
  isSplit: false,              // whether expense is split
  splitWith: [],               // array of roommate IDs
  myShare: 0,                  // calculated user's portion
  totalAmount: 0,              // total bill amount
  settlementStatus: {}         // { roommateId: 'pending' | 'settled' }
}
```

### Helper Functions Added
- `getRoommateBalances()` - Calculates total owed/owing per roommate
- `handleAddRoommate()` - Adds new roommate with color assignment
- `handleRemoveRoommate(roommateId)` - Removes roommate from list
- `handleToggleSplitRoommate(expenseId, roommateId)` - Toggles split for expense
- Settlement logic - Marks expenses as settled inline

### UI Components

**Profile Page (Lines 6150-6370):**
- Roommate management section
- Balance summary cards (Owed to You / You Owe)
- Roommate list with color-coded avatars
- "Add Roommate" button + modal
- "Settle Up" buttons (appear when balance exists)
- Remove roommate buttons (trash icon)

**Finance Page (Lines 3329-3380):**
- Split toggle in expense edit form
- Roommate selection buttons (tap to toggle)
- "Split X ways" indicator
- "Your share: $X" calculation display

**Finance Page - Card View (Line 3424):**
- 🔀 Split indicator on expense cards
- "Split with [names]" text under category

### How It Works

**User Flow:**
1. **Add Roommates:** Profile → Add Roommate → Enter name
2. **Split Expense:** Finance → Expenses → Edit category → Toggle roommate buttons
3. **View Balances:** Profile → See "Owed to You" / "You Owe" totals
4. **Settle Debt:** Profile → Click "Settle Up" button → Marks all splits with that roommate as settled

**Calculation Logic:**
- Equal splits only (total / number of people)
- User always included in count (3-way split = user + 2 roommates)
- Balances aggregate across all unsettled split expenses
- Settlement marks expense.settlementStatus[roommateId] = 'settled'

### Files Modified
- `src/App.jsx` - All changes in one file
  - State variables: Lines 48-51
  - Helper functions: Lines 1670-1750 (approx)
  - Profile UI: Lines 6150-6370
  - Finance edit form: Lines 3329-3380
  - Finance card indicator: Line 3424

### Testing Checklist
- ✅ Add roommate (appears with unique color)
- ✅ Remove roommate (disappears from list)
- ✅ Split expense with 1+ roommates
- ✅ See split indicator on expense card
- ✅ View updated balances in Profile
- ✅ Settle debt (balances update to $0.00)

### Known Limitations
- Equal splits only (no custom percentages)
- No transaction history per roommate
- No "I paid for them" scenario (assumes user always paid)
- Settlement is all-or-nothing (can't partially settle)

### Future Enhancements (Post-MVP)
- Custom split percentages
- "They paid" option with reverse balance tracking
- Transaction log per roommate
- Export split history to CSV
- Request payment feature

---

# PHASE 2: MEAL PLAN TRACKING

## Status: Not Started - Planned Next

## Feature Summary
Track dining dollars and meal swipes with burn rate analysis and semester timeline awareness.

## Target Outcome
Students can monitor dining plan usage, see if they're on pace to use all swipes/dollars, and get alerts when burning through funds too quickly.

## Implementation Plan

### State Variables to Add
```javascript
// Location: After roommates state
const [mealPlan, setMealPlan] = useState({
  diningDollars: 500,           // starting balance
  diningDollarsUsed: 0,         // spent so far
  mealSwipes: 150,              // starting swipes
  mealSwipesUsed: 0,            // used so far
  semesterStart: '2025-01-15',  // semester dates for burn rate calc
  semesterEnd: '2025-05-15'
});
const [showMealPlanSettings, setShowMealPlanSettings] = useState(false);
```

### Helper Functions Needed
```javascript
// Calculate burn rate
const getMealPlanBurnRate = () => {
  const today = new Date();
  const semStart = new Date(mealPlan.semesterStart);
  const semEnd = new Date(mealPlan.semesterEnd);
  
  const totalDays = (semEnd - semStart) / (1000 * 60 * 60 * 24);
  const daysElapsed = (today - semStart) / (1000 * 60 * 60 * 24);
  const daysRemaining = totalDays - daysElapsed;
  
  // Calculate pacing
  const dollarsPerDay = mealPlan.diningDollarsUsed / daysElapsed;
  const swipesPerWeek = (mealPlan.mealSwipesUsed / daysElapsed) * 7;
  
  // Calculate if on pace
  const expectedDollarsUsed = (mealPlan.diningDollars / totalDays) * daysElapsed;
  const expectedSwipesUsed = (mealPlan.mealSwipes / totalDays) * daysElapsed;
  
  return {
    dollarsPerDay,
    swipesPerWeek,
    dollarsOnPace: mealPlan.diningDollarsUsed <= expectedDollarsUsed,
    swipesOnPace: mealPlan.mealSwipesUsed <= expectedSwipesUsed,
    daysRemaining,
    dollarProjection: dollarsPerDay * totalDays,
    swipeProjection: (swipesPerWeek / 7) * totalDays
  };
};

// Handle usage
const handleUseDiningDollars = (amount) => {
  setMealPlan(prev => ({
    ...prev,
    diningDollarsUsed: prev.diningDollarsUsed + amount
  }));
};

const handleUseMealSwipe = () => {
  setMealPlan(prev => ({
    ...prev,
    mealSwipesUsed: prev.mealSwipesUsed + 1
  }));
};
```

### UI Components to Add

**Profile Page - New Section (after Roommate section):**

```jsx
{/* Meal Plan Tracking */}
<div style={{
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: '24px',
  marginTop: '24px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.5)'
}}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
    <h3>Meal Plan</h3>
    <button onClick={() => setShowMealPlanSettings(true)}>⚙️ Settings</button>
  </div>

  {/* Dining Dollars Card */}
  <div style={{ marginBottom: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <span>Dining Dollars</span>
      <span>${(mealPlan.diningDollars - mealPlan.diningDollarsUsed).toFixed(2)} left</span>
    </div>
    <div style={{ /* progress bar */ }}>
      <div style={{ 
        width: `${(mealPlan.diningDollarsUsed / mealPlan.diningDollars) * 100}%`,
        background: '#10b981',
        height: '8px'
      }}></div>
    </div>
    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
      Pace: ${getMealPlanBurnRate().dollarsPerDay.toFixed(2)}/day
      {!getMealPlanBurnRate().dollarsOnPace && ' ⚠️ Spending too fast'}
    </p>
  </div>

  {/* Meal Swipes Card */}
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <span>Meal Swipes</span>
      <span>{mealPlan.mealSwipes - mealPlan.mealSwipesUsed} left</span>
    </div>
    <div style={{ /* progress bar */ }}></div>
    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
      Pace: {getMealPlanBurnRate().swipesPerWeek.toFixed(1)}/week
      {!getMealPlanBurnRate().swipesOnPace && ' ⚠️ Using too many'}
    </p>
  </div>

  {/* Quick Actions */}
  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
    <button onClick={() => handleUseDiningDollars(10)}>Use $10</button>
    <button onClick={handleUseMealSwipe}>Use 1 Swipe</button>
  </div>
</div>

{/* Settings Modal */}
{showMealPlanSettings && (
  <div style={{ /* modal overlay */ }}>
    <div style={{ /* modal content */ }}>
      <h3>Meal Plan Settings</h3>
      <input type="number" placeholder="Dining Dollars" />
      <input type="number" placeholder="Meal Swipes" />
      <input type="date" placeholder="Semester Start" />
      <input type="date" placeholder="Semester End" />
      <button onClick={/* save settings */}>Save</button>
    </div>
  </div>
)}
```

### Integration Points
- **Profile Page Only:** Self-contained feature
- **No Finance/Calendar changes:** Meal plan is tracked separately from expense categories
- **Home Page (Optional):** Could show dining dollars remaining in daily summary

### User Flow
1. **Setup:** Profile → Meal Plan Settings → Enter dining dollars, swipes, semester dates
2. **Track Usage:** Profile → Click "Use $10" or "Use 1 Swipe" buttons
3. **Monitor Pacing:** See real-time burn rate: "You're using 15 swipes/week, pace for 12/week"
4. **Alerts:** Visual warning if burning too fast: "⚠️ Spending too fast"

### Estimated Time
- State setup: 15 min
- Helper functions: 30 min
- UI components: 45 min
- Settings modal: 30 min
- Testing: 15 min
**Total: ~2 hours**

### Testing Checklist
- [ ] Set meal plan amounts and dates
- [ ] Use dining dollars (balance decrements)
- [ ] Use meal swipe (count decrements)
- [ ] Burn rate calculates correctly
- [ ] Warning appears when over-pacing
- [ ] Progress bars update visually

---

# PHASE 3: TEXTBOOK BUDGET PLANNING

## Status: Not Started

## Feature Summary
Seasonal budget goal for textbooks with semester-based reminders and used vs. new price tracking.

## Target Outcome
Students set aside funds for textbooks each semester and get reminded before the buying period.

## Implementation Plan

### State Variables to Add
```javascript
const [textbookBudget, setTextbookBudget] = useState({
  fallAmount: 400,
  springAmount: 350,
  currentSemester: 'spring',  // 'fall' | 'spring'
  spent: 0,
  books: []  // { title, newPrice, usedPrice, boughtUsed, paid }
});
```

### Helper Functions Needed
```javascript
// Get days until semester start
const getDaysUntilSemesterStart = () => {
  const today = new Date();
  const fallStart = new Date(today.getFullYear(), 7, 20); // Aug 20
  const springStart = new Date(today.getFullYear(), 0, 15); // Jan 15
  
  // Determine which semester is next
  // Return countdown
};

// Calculate savings
const getTextbookSavings = () => {
  const totalUsedSavings = textbookBudget.books.reduce((sum, book) => {
    if (book.boughtUsed && book.newPrice && book.usedPrice) {
      return sum + (book.newPrice - book.usedPrice);
    }
    return sum;
  }, 0);
  
  return {
    totalSaved: totalUsedSavings,
    percentSaved: (totalUsedSavings / textbookBudget.books.reduce((s, b) => s + b.newPrice, 0)) * 100
  };
};
```

### UI Components to Add

**Finance Page or Goals Page - New Textbook Section:**

Create a seasonal goal tile that shows:
- "Fall Textbooks: $400 budget"
- "45 days until buying period"
- Progress bar (how much allocated so far)
- "Add Book" button

**Book Entry Modal:**
- Book title input
- New price input
- Used price input (optional)
- "Bought Used?" checkbox
- Amount paid input

**Savings Display:**
- "You saved $120 buying used books (30%)"
- Green badge for used purchases
- Red badge for new purchases

### Integration Points
- **Goals Page:** Add textbook fund as a special seasonal goal
- **Finance Page:** Could integrate with existing Goals folder
- **Home Page:** Show reminder "Textbook buying period in 20 days"

### User Flow
1. **Set Budget:** Finance/Goals → Set textbook budget ($400 for fall)
2. **Get Reminder:** App shows countdown "30 days until fall semester books"
3. **Track Purchases:** Add each book → Note if bought used or new
4. **See Savings:** "You saved $75 by buying used (25%)"

### Estimated Time
- State setup: 15 min
- Helper functions: 30 min
- UI components: 60 min
- Book modal: 30 min
- Testing: 15 min
**Total: ~2.5 hours**

---

# PHASE 4: IRREGULAR INCOME DISPLAY POLISH

## Status: Not Started

## Feature Summary
Enhanced display for part-time/irregular income with variance tracking and buffer fund suggestions.

## Target Outcome
Students with variable income see their income patterns clearly and get advice on smoothing volatility.

### Current State
The app already has recurring income with custom frequencies. This phase just adds **better visualization** for variable income.

### Implementation Plan

**State Updates (minimal):**
```javascript
// Track income history
const [incomeHistory, setIncomeHistory] = useState([]);
// Whenever income is received, log it
```

**Helper Function:**
```javascript
const getIncomeVariance = () => {
  const amounts = incomeHistory.map(i => i.amount);
  const avg = amounts.reduce((s, a) => s + a, 0) / amounts.length;
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  const variance = max - min;
  
  return { avg, min, max, variance, isHighVariance: variance > avg * 0.5 };
};
```

**UI Component (Finance Page - Income Folder):**

Add an "Income Insights" card:
- "Your income varies: $200 - $600 (avg $350)"
- Visual bar chart showing last 6 months
- Suggestion: "Build a $400 buffer to smooth volatility"

### Estimated Time: ~1.5 hours

---

# PHASE 5: STUDENT LOAN AWARENESS

## Status: Not Started

## Feature Summary
Track student loan balances and see post-graduation payment preview (awareness, not management).

## Implementation Plan

### State Variables
```javascript
const [studentLoans, setStudentLoans] = useState([
  { id: 1, lender: 'Federal Loan', balance: 15000, interestRate: 4.5, type: 'subsidized' }
]);
```

### Helper Functions
```javascript
const calculateMonthlyPayment = (balance, rate, years = 10) => {
  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  return (balance * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
         (Math.pow(1 + monthlyRate, numPayments) - 1);
};

const getTotalDebt = () => {
  return studentLoans.reduce((sum, loan) => sum + loan.balance, 0);
};
```

### UI Component (Profile Page)

**Student Loans Section:**
- "Total Borrowed: $15,000"
- "Estimated Monthly Payment: ~$300/month for 10 years"
- Loan list with balances and rates
- Visual: "Your degree costs" counter
- "Add Loan" button

**NOT included:** Payment tracking, autopay, loan servicer integration (just awareness)

### Estimated Time: ~3 hours

---

# PHASE 6: BEHAVIORAL COACHING

## Status: Not Started - Advanced Feature

## Feature Summary
Contextual prompts, tips, and micro-lessons that teach financial habits through app constraints and user behavior.

## Target Outcome
The app doesn't just track—it teaches. Users learn financial principles through timely, relevant coaching moments.

## Implementation Strategy

### Prompt System Architecture

**State Variables:**
```javascript
const [coachingPrompts, setCoachingPrompts] = useState({
  lastShown: null,
  dismissed: [],
  streaks: {
    daysLoggingExpenses: 0,
    weeksUnderBudget: 0
  }
});

const [showCoachingModal, setShowCoachingModal] = useState(false);
const [currentPrompt, setCurrentPrompt] = useState(null);
```

### Prompt Triggers (Event-Based)

**Trigger Points:**
1. **Overspending Pattern Detected**
   - Condition: `expense.spent > expense.limit * 0.9 && daysLeftInMonth > 7`
   - Prompt: "You're on track to overspend. Lock $50 for the last week?"

2. **Goal Achievement**
   - Condition: `goal.current >= goal.target`
   - Prompt: "🎉 $500 Emergency Fund complete! Studies show having $500 saved reduces stress by 40%."

3. **Irregular Income Detected**
   - Condition: `getIncomeVariance().isHighVariance`
   - Prompt: "Your income varies $200-$600/month. Build a $400 buffer fund to smooth volatility."

4. **First Time Actions**
   - First expense logged: "💡 Tip: Tracking spending for 30 days reveals true patterns"
   - First goal created: "🎯 Setting goals activates commitment devices—a proven wealth-building skill"
   - First split expense: "🔀 Splitting fairly prevents resentment. Research shows financial transparency strengthens relationships."

5. **Milestone Achievements**
   - 7-day streak: "🔥 7 days tracking! Consistency is key."
   - First month under budget: "📊 You spent 15% less than planned—that's discipline!"
   - $100 saved: "💰 Your first $100! Compound interest starts small."

### Prompt Library Structure

```javascript
const COACHING_PROMPTS = {
  overspending: {
    title: "Overspending Alert",
    message: "You're spending faster than planned.",
    insight: "At this rate, you'll overspend by $[amount] this month.",
    actions: [
      { label: "Lock funds for last week", action: () => {} },
      { label: "Adjust my budget", action: () => {} },
      { label: "I'll be careful", action: "dismiss" }
    ],
    educationalNote: "💡 Budgets aren't restrictions—they're plans. Adjust when life changes."
  },
  
  goalAchieved: {
    title: "Goal Complete! 🎉",
    message: "You hit your $[amount] goal in [timeframe]!",
    insight: "This proves you can delay gratification—a key wealth-building skill.",
    actions: [
      { label: "Set new goal", action: () => {} },
      { label: "Celebrate 🎉", action: "dismiss" }
    ],
    educationalNote: "Studies show goal-setters are 42% more likely to achieve financial security."
  },
  
  irregularIncome: {
    title: "Income Pattern Detected",
    message: "Your income varies: $[min] - $[max] (avg $[avg])",
    insight: "Variable income creates financial stress. A buffer fund smooths the ups and downs.",
    actions: [
      { label: "Create buffer fund", action: () => {} },
      { label: "Learn more", action: "explain" },
      { label: "Dismiss", action: "dismiss" }
    ],
    educationalNote: "Strategy: Save surplus on high-income months, use buffer on low months."
  }
};
```

### Prompt Display Component

```jsx
{showCoachingModal && currentPrompt && (
  <div style={{ /* modal overlay */ }}>
    <div style={{ /* modal content */ }}>
      <h2>{currentPrompt.title}</h2>
      <p>{currentPrompt.message}</p>
      <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '8px' }}>
        <p><strong>📈 Insight:</strong> {currentPrompt.insight}</p>
      </div>
      
      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        {currentPrompt.actions.map(action => (
          <button
            key={action.label}
            onClick={() => {
              if (typeof action.action === 'function') action.action();
              else if (action.action === 'dismiss') setShowCoachingModal(false);
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
      
      {/* Educational Note */}
      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px' }}>
        {currentPrompt.educationalNote}
      </p>
    </div>
  </div>
)}
```

### Coaching Trigger Logic

```javascript
// Check for coaching opportunities
useEffect(() => {
  const checkCoachingTriggers = () => {
    // Don't show if recently dismissed
    const lastShown = coachingPrompts.lastShown;
    if (lastShown && new Date() - new Date(lastShown) < 24 * 60 * 60 * 1000) {
      return; // Wait 24 hours between prompts
    }
    
    // Check overspending
    const overspendingExpenses = expenses.filter(exp => 
      exp.spent > exp.limit * 0.9 && getDaysLeftInMonth() > 7
    );
    if (overspendingExpenses.length > 0) {
      triggerPrompt('overspending', { expense: overspendingExpenses[0] });
      return;
    }
    
    // Check goal achievement
    const achievedGoals = savingsGoals.filter(goal => 
      goal.current >= goal.target && !coachingPrompts.dismissed.includes(`goal-${goal.id}`)
    );
    if (achievedGoals.length > 0) {
      triggerPrompt('goalAchieved', { goal: achievedGoals[0] });
      return;
    }
    
    // Check irregular income
    if (incomeHistory.length >= 3) {
      const variance = getIncomeVariance();
      if (variance.isHighVariance && !coachingPrompts.dismissed.includes('irregular-income')) {
        triggerPrompt('irregularIncome', variance);
      }
    }
  };
  
  checkCoachingTriggers();
}, [expenses, savingsGoals, incomeHistory]);

const triggerPrompt = (promptType, data) => {
  const prompt = COACHING_PROMPTS[promptType];
  // Replace placeholders with actual data
  const customizedPrompt = {
    ...prompt,
    message: prompt.message.replace(/\[amount\]/g, data.amount || ''),
    // ... other replacements
  };
  
  setCurrentPrompt(customizedPrompt);
  setShowCoachingModal(true);
  setCoachingPrompts(prev => ({ ...prev, lastShown: new Date().toISOString() }));
};
```

### Progressive Lessons (Unlock Over Time)

**Week 1:** "Track everything for 7 days to see patterns"  
**Week 2:** "Compare your actual vs. planned spending"  
**Week 3:** "Set one small savings goal ($50)"  
**Month 1:** "Review your first month—what surprised you?"  
**Month 2:** "Build your emergency fund to $500"  
**Month 3:** "Advanced: Try the 50/30/20 budgeting rule"

### Gamification Elements (Light Touch)

**Streaks:**
- 🔥 7-day expense logging streak
- 📊 4-week under-budget streak
- 💰 3-month savings streak

**Milestones:**
- First $100 saved
- First goal achieved
- First month completing budget
- 90% expense tracking rate

**Comparative Insights (Anonymous):**
- "You're saving 15% of income—higher than 68% of students"
- "Your dining spending is 20% lower than average"

### Implementation Priority

**Phase 6A: Core Prompts (3 hours)**
- Overspending alert
- Goal achievement celebration
- Irregular income insight

**Phase 6B: Progressive Lessons (2 hours)**
- First-time tips
- Weekly nudges
- Monthly reviews

**Phase 6C: Gamification (2 hours)**
- Streak tracking
- Milestone badges
- Comparative insights

**Total: ~7 hours**

### Testing Checklist
- [ ] Overspending prompt triggers at 90% spent
- [ ] Goal achievement prompt shows on completion
- [ ] Irregular income prompt appears after 3+ entries
- [ ] Prompts don't spam (24-hour cooldown works)
- [ ] Dismiss button works
- [ ] Action buttons execute correctly
- [ ] Educational notes display
- [ ] Streaks increment properly

---

# TECHNICAL ARCHITECTURE NOTES

## File Structure
```
spendhen-finance-app/
├── src/
│   ├── App.jsx                    # Main app (6300+ lines, all features)
│   └── index.js                   # React DOM render
├── public/
│   └── index.html
├── screenshots/                   # For GitHub README
├── package.json
├── README.md
└── .gitignore
```

## State Management Philosophy
- **Single file architecture:** All state in App.jsx (no Context API yet)
- **Co-located logic:** Helpers near where they're used
- **Progressive enhancement:** Each phase adds state without refactoring existing

## Data Persistence Strategy

### Current: In-Memory (Resets on Refresh)
All state held in useState, no localStorage.

### Planned: localStorage (Phase 1.5)
```javascript
// Save on every state change
useEffect(() => {
  localStorage.setItem('spendhen_data', JSON.stringify({
    expenses,
    incomeEntries,
    savingsGoals,
    roommates,
    mealPlan,
    textbookBudget,
    studentLoans
  }));
}, [expenses, incomeEntries, savingsGoals, roommates, mealPlan, textbookBudget, studentLoans]);

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('spendhen_data');
  if (saved) {
    const data = JSON.parse(saved);
    setExpenses(data.expenses || []);
    // ... restore all state
  }
}, []);
```

### Future: Backend (Phase 7+)
- Firebase/Supabase for user accounts
- PostgreSQL for relational data
- API routes for CRUD operations

## Deployment Workflow

**Local Development:**
```bash
npm start                    # Run dev server (localhost:3000)
```

**Push to GitHub:**
```bash
git add .
git commit -m "Description"
git push
```

**Auto-Deploy:**
Vercel detects push → builds → deploys to spendhen-finance-app.vercel.app (2-3 min)

## Code Style & Conventions

**Naming:**
- State: `camelCase` (e.g., `mealPlan`, `showAddRoommate`)
- Functions: `handleXyz` for event handlers, `getXyz` for calculations
- Components: Inline JSX (no separate component files yet)

**Styling:**
- Inline styles (no CSS files)
- Glassmorphic design: `rgba(255, 255, 255, 0.7)` + `backdropFilter: blur(20px)`
- Color scheme: 
  - Income: Green (#10b981)
  - Expenses: Red (#ef4444)
  - Goals: Purple (#8b5cf6)
  - Neutral: Gray (#6b7280)

**Comments:**
- Section markers: `{/* Section Name */}`
- Complex logic: Inline comments explaining calculation

---

# DEVELOPMENT WORKFLOW

## Starting a New Phase

1. **Read Phase Documentation** (this file)
2. **Create feature branch** (optional): `git checkout -b phase-2-meal-plan`
3. **Add state variables** at designated location
4. **Add helper functions** after existing helpers
5. **Add UI components** in designated pages
6. **Test locally**: `npm start`
7. **Commit & Push**: 
   ```bash
   git add .
   git commit -m "Add Phase 2: Meal Plan Tracking"
   git push
   ```
8. **Verify deployment** on Vercel (~3 min)

## Debugging Process

**Common Issues:**
1. **"X is not defined"** → Variable not in scope, check nesting
2. **White screen** → Syntax error, check browser console (F12)
3. **State not updating** → Check useState setter is being called
4. **Infinite loop** → Missing dependency in useEffect

**Debug Tools:**
- Browser console (F12 → Console tab)
- React DevTools (Chrome extension)
- `console.log()` for state inspection

## Testing Checklist Template

For each phase:
- [ ] Feature appears in UI
- [ ] User actions work (buttons, inputs)
- [ ] State updates correctly
- [ ] Calculations are accurate
- [ ] Visual feedback works (colors, icons, animations)
- [ ] No console errors
- [ ] Works on mobile view (F12 → Toggle device)

---

# PORTFOLIO PRESENTATION STRATEGY

## Elevator Pitch
"SpendHen is a college-focused finance app I built with React. Unlike rigid budgeting apps, it adapts to different saving styles and includes features like roommate split bills, meal plan tracking, and textbook budgeting—things mainstream apps ignore but students actually need."

## Technical Talking Points

**For Interviews:**
1. **State Management:** "Managed 40+ state variables across 6 pages without Redux—shows understanding of React fundamentals"
2. **Algorithm Design:** "Built a payday prediction algorithm handling custom frequencies and edge cases like 'every 10 days'"
3. **UX Thinking:** "Added behavioral coaching prompts—not just tracking, but teaching financial habits"
4. **Self-Initiative:** "Identified a gap (inflexible budgeting apps) and built a solution from scratch"

**Code Walkthrough:**
- Show roommate split bills feature (full cycle: add → split → settle)
- Walk through split calculation logic
- Demonstrate responsive design (mobile-first)
- Explain folder pattern for Finance page (UX decision)

## README Highlights

**Must Include:**
- Live demo link (prominently at top)
- Screenshots (5-6 key views)
- "Why I Built This" section (personal motivation)
- Technical stack with justifications
- Known limitations (honesty = professionalism)
- Roadmap (shows forward thinking)

## LinkedIn Post Template
"Built SpendHen, a personal finance app designed for college students. Key features:
• Roommate split bills with one-click settlement
• Meal plan tracking with burn rate analysis
• Adaptive saving plans (5 intensity levels)

Tech: React 18, deployed on Vercel with auto-deployment via GitHub.

Learned: Complex state management, algorithm design (payday predictions), and UX for financial data visualization.

Live demo: [link]
Code: [link]"

---

# CURRENT STATUS SUMMARY

## Completed ✅
- **Base App:** 6-page finance tracker
- **Phase 1:** Roommate split bills (deployed)

## In Progress 🚧
- None (clean slate for next phase)

## Next Up 📋
- **Phase 2:** Meal plan tracking (2 hours)
- **Phase 3:** Textbook budget (2.5 hours)
- **Phase 4:** Irregular income display (1.5 hours)
- **Phase 5:** Student loan awareness (3 hours)
- **Phase 6:** Behavioral coaching (7 hours)

## Estimated Timeline
- **Week 1-2:** Phases 2-3 (college-specific features)
- **Week 3:** Phases 4-5 (awareness features)
- **Week 4:** Phase 6 (advanced coaching)
- **Week 5:** Polish, localStorage, documentation

---

# APPENDIX: QUICK REFERENCE

## Key File Locations

**State Variables:** Lines 1-100  
**Helper Functions:** Lines 1670-1750  
**Home Page:** Lines 1753-2100  
**Finance Page:** Lines 2800-3800  
**Calendar Page:** Lines 3900-4500  
**Goals/Plan Page:** Lines 4655-5700  
**Profile Page:** Lines 5736-6400  

## Important Functions

**`getPaydaysForDate(date)`** - Returns payday info for a date  
**`getRoommateBalances()`** - Calculates split bill balances  
**`getMealPlanBurnRate()`** - Dining dollar/swipe pacing  
**`getIncomeVariance()`** - Income pattern analysis  

## Common Search Terms

To find sections quickly:
- `const renderHomePage` - Home page start
- `const renderFinancePage` - Finance page start
- `const renderProfilePage` - Profile page start
- `expenses.map(expense =>` - Expense display loop
- `roommates.map(roommate =>` - Roommate display loop

## Git Commands Reference

```bash
git status                    # See what changed
git add .                     # Stage all changes
git commit -m "Message"       # Commit with message
git push                      # Push to GitHub (triggers Vercel)
git pull origin main          # Get latest from GitHub
git log                       # See commit history
```

## Vercel Deployment

**Check Status:** https://vercel.com/dashboard  
**Live Site:** https://spendhen-finance-app.vercel.app  
**Auto-Deploy:** Triggers on every GitHub push to `main` branch  
**Build Time:** 2-3 minutes  

---

# RESUMING DEVELOPMENT

## If Starting Fresh Conversation

**Provide This Context:**
1. "I'm working on SpendHen, a college finance app. Here's the roadmap: [share this file]"
2. "Phase 1 (roommate splits) is complete and deployed"
3. "I want to build Phase X next"
4. Share any specific bugs or issues

**What Assistant Needs:**
- This roadmap file
- Current phase you're working on
- Any error messages (copy full text)
- Screenshots if relevant

## Common Handoff Scenarios

**Scenario 1: Bug in Existing Feature**
- Share: Error message, which feature, what you tried
- Provide: Screenshots of the issue
- Expected vs. actual behavior

**Scenario 2: Starting New Phase**
- Confirm: "I want to build Phase 2: Meal Plan Tracking"
- Ask: "Should I follow the plan in the roadmap or adjust anything?"

**Scenario 3: Deployment Issues**
- Share: Vercel deployment logs (from dashboard)
- Describe: What changed before it broke

---

**Document Version:** 1.0  
**Last Updated:** February 18, 2026  
**Status:** Phase 1 Complete, Ready for Phase 2  
**Author:** Development session with Claude (Anthropic)
