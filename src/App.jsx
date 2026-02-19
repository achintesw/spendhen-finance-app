import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, Calendar, User, TrendingUp, Clock, Target, Award, Plus, ChevronLeft, ChevronRight, Coffee, Beer, ShoppingBag, Utensils, X, Check, Edit2, Trash2, Search, Filter } from 'lucide-react';

export default function SpendhenApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showStartupAnimation, setShowStartupAnimation] = useState(false); // Changed to false initially
  const [currentWeekDay, setCurrentWeekDay] = useState(new Date().getDay());
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSortFilter, setShowSortFilter] = useState(false);
  const [sortBy, setSortBy] = useState('none');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Profile editing states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: ''
  });
  
  // Balance history filter states
  const [showBalanceFilter, setShowBalanceFilter] = useState(false);
  const [balanceView, setBalanceView] = useState('Q1'); // Q1, Q2, Q3, Q4, Annual
  
  // Goals / Plan page states
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [customGoal, setCustomGoal] = useState({ name: '', target: '', deadline: '' });
  const [showAddCustomGoal, setShowAddCustomGoal] = useState(false);
  const [showSpendingNotification, setShowSpendingNotification] = useState(false);
  const [spendingNotificationType, setSpendingNotificationType] = useState('daily');
  const [savedAmount, setSavedAmount] = useState(0);
  const [goalProgressInputs, setGoalProgressInputs] = useState({});
  const [allocationGoalId, setAllocationGoalId] = useState(null);
  const [goalTimelines, setGoalTimelines] = useState({});
  const [lockingGoalId, setLockingGoalId] = useState(null);
  const [lockDraft, setLockDraft] = useState({ startDate: '', endDate: '' });
  const [schemeView, setSchemeView] = useState('home'); // 'home' | 'goals'
  const [selectedScheme, setSelectedScheme] = useState(null); // null | scheme id

  
  // Roommate split bills states
  const [roommates, setRoommates] = useState([
    { id: 1, name: 'Alex Chen', color: '#3b82f6' },
    { id: 2, name: 'Jordan Smith', color: '#8b5cf6' }
  ]);
  const [showAddRoommate, setShowAddRoommate] = useState(false);
  const [newRoommateName, setNewRoommateName] = useState('');
  
  // Finance page folder states
  const [activeFolder, setActiveFolder] = useState(null); // null, 'income', 'expenses'
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [newIncome, setNewIncome] = useState({ 
    amount: '', 
    source: '', 
    classification: 'Work', 
    date: '',
    isRecurring: false,
    startDate: '',
    endDate: '',
    frequency: 'weekly',
    customFrequency: '',
    customFrequencyUnit: 'days'
  });
  const [incomeEntries, setIncomeEntries] = useState([
    { 
      id: 1, 
      amount: 450, 
      source: 'Part-time Job', 
      classification: 'Work', 
      date: '2026-02-01',
      isRecurring: true,
      startDate: '2025-12-25',
      endDate: '',
      frequency: 'biweekly',
      customFrequency: '',
      customFrequencyUnit: 'days'
    },
    { 
      id: 2, 
      amount: 50, 
      source: 'Birthday Money', 
      classification: 'Gifts', 
      date: '2026-02-03',
      isRecurring: false,
      startDate: '',
      endDate: '',
      frequency: '',
      customFrequency: '',
      customFrequencyUnit: 'days'
    }
  ]);
  
  const [savingsGoals, setSavingsGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      description: 'Build a safety net for unexpected expenses',
      icon: '🛡️',
      category: 'Security',
      target: 1000,
      current: 0,
      deadline: '',
      color: '#10b981'
    },
    {
      id: 2,
      name: 'Study Abroad',
      description: 'Save for an international semester or summer program',
      icon: '✈️',
      category: 'Education',
      target: 3000,
      current: 0,
      deadline: '',
      color: '#3b82f6'
    },
    {
      id: 3,
      name: 'Spring Break Trip',
      description: 'Fund your next adventure with friends',
      icon: '🏖️',
      category: 'Travel',
      target: 600,
      current: 0,
      deadline: '',
      color: '#f59e0b'
    },
    {
      id: 4,
      name: 'Car Down Payment',
      description: 'Save for your first car or vehicle upgrade',
      icon: '🚗',
      category: 'Transportation',
      target: 2500,
      current: 0,
      deadline: '',
      color: '#6366f1'
    },
    {
      id: 5,
      name: 'Laptop/Tech',
      description: 'Upgrade your devices for school or work',
      icon: '💻',
      category: 'Technology',
      target: 1200,
      current: 0,
      deadline: '',
      color: '#8b5cf6'
    },
    {
      id: 6,
      name: 'Moving Out',
      description: 'First apartment deposit and essentials',
      icon: '🏠',
      category: 'Housing',
      target: 2000,
      current: 0,
      deadline: '',
      color: '#ec4899'
    }
  ]);
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthScreen, setShowAuthScreen] = useState(true);
  const [authMode, setAuthMode] = useState(null); // null, 'login', 'signup', 'forgot'
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  
  // Form data
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [forgotEmail, setForgotEmail] = useState('');
  
  // Mock user database (in production, this would be on a backend)
  const [users, setUsers] = useState([
    { 
      username: 'demo', 
      password: 'demo123', 
      firstName: 'Sarah', 
      lastName: 'Demo', 
      email: 'sarah@example.com', 
      phone: '',
      activated: true 
    }
  ]);
  
  // Weekly events data
  const [weeklyEvents] = useState({
    0: [],
    1: [],
    2: [{ id: 1, title: 'Study group coffee', time: '15:00', plannedSpend: 8, category: 'Coffee Shops' }],
    3: [{ id: 2, title: 'Grocery run', time: '18:00', plannedSpend: 45, category: 'Groceries' }],
    4: [],
    5: [{ id: 3, title: 'Drinks with friends', time: '20:00', plannedSpend: 40, category: 'Bars & Drinks' }],
    6: [{ id: 4, title: 'Dinner date', time: '19:00', plannedSpend: 35, category: 'Dining Out' }]
  });

  // Planned events state
  const [plannedEvents, setPlannedEvents] = useState([
    {
      id: 1,
      name: 'Spring Break Trip',
      priority: 'High',
      startDate: '2026-03-15',
      endDate: '2026-03-22',
      startingBalance: 0,
      limit: 600,
      spent: 0,
      color: '#ef4444'
    },
    {
      id: 2,
      name: 'Textbooks for Spring Semester',
      priority: 'Medium',
      startDate: '2026-02-10',
      endDate: '2026-02-10',
      startingBalance: 0,
      limit: 300,
      spent: 0,
      color: '#f59e0b'
    }
  ]);

  // New event modal states
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEventData, setNewEventData] = useState({
    name: '',
    priority: 'Medium',
    startDate: '',
    endDate: '',
    startingBalance: '',
    limit: ''
  });

  // Day click modal state
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState(null);

  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Bars & Drinks', icon: Beer, limit: 80, spent: 45, priority: 2 },
    { id: 2, category: 'Coffee Shops', icon: Coffee, limit: 40, spent: 32, priority: 3 },
    { id: 3, category: 'Groceries', icon: ShoppingBag, limit: 120, spent: 85, priority: 5 },
    { id: 4, category: 'Dining Out', icon: Utensils, limit: 100, spent: 67, priority: 3 }
  ]);

  const [newCategory, setNewCategory] = useState({
    category: '',
    limit: '',
    priority: 3,
    icon: ShoppingBag
  });

  const weeklyLimit = 200;
  const monthlyLimit = 800;
  const weeklySpent = 93;
  const monthlySpent = expenses.reduce((sum, exp) => sum + exp.spent, 0);

  const [userData, setUserData] = useState({
    name: 'Sarah',
    daysUsing: 47,
    savedAmount: 342,
    currentBalance: 1247,
    historicalBalance: {
      annual: [
        { month: 'Jan', balance: 450 },
        { month: 'Feb', balance: 520 },
        { month: 'Mar', balance: 680 },
        { month: 'Apr', balance: 750 },
        { month: 'May', balance: 840 },
        { month: 'Jun', balance: 920 },
        { month: 'Jul', balance: 780 },
        { month: 'Aug', balance: 856 },
        { month: 'Sep', balance: 1034 },
        { month: 'Oct', balance: 1247 },
        { month: 'Nov', balance: 0 },
        { month: 'Dec', balance: 0 }
      ],
      Q1: [
        { month: 'Jan', balance: 450 },
        { month: 'Feb', balance: 520 },
        { month: 'Mar', balance: 680 }
      ],
      Q2: [
        { month: 'Apr', balance: 750 },
        { month: 'May', balance: 840 },
        { month: 'Jun', balance: 920 }
      ],
      Q3: [
        { month: 'Jul', balance: 780 },
        { month: 'Aug', balance: 856 },
        { month: 'Sep', balance: 1034 }
      ],
      Q4: [
        { month: 'Oct', balance: 1247 },
        { month: 'Nov', balance: 0 },
        { month: 'Dec', balance: 0 }
      ]
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowStartupAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getProgressColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 75) return '#ef4444'; // Red
    if (percentage >= 50) return '#f59e0b'; // Orange
    if (percentage >= 25) return '#eab308'; // Yellow
    return '#10b981'; // Green
  };

  // Inverted for savings goals: red = far away, green = close/complete
  const getGoalProgressColor = (current, target) => {
    const percentage = target > 0 ? (current / target) * 100 : 0;
    if (percentage >= 75) return '#10b981'; // Green — nearly there
    if (percentage >= 50) return '#eab308'; // Yellow — getting close
    if (percentage >= 25) return '#f59e0b'; // Orange — some progress
    return '#ef4444';                       // Red — just started
  };

  const handleAddCategory = () => {
    if (newCategory.category && newCategory.limit) {
      const newId = Math.max(...expenses.map(e => e.id), 0) + 1;
      setExpenses([...expenses, {
        id: newId,
        category: newCategory.category,
        limit: parseFloat(newCategory.limit),
        spent: 0,
        priority: newCategory.priority,
        icon: newCategory.icon
      }]);
      setNewCategory({ category: '', limit: '', priority: 3, icon: ShoppingBag });
      setShowAddCategory(false);
    }
  };

  const handleDeleteCategory = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    setEditingExpense(null);
  };

  const handleCreateEvent = () => {
    if (!newEventData.name || !newEventData.startDate || !newEventData.endDate || !newEventData.limit) {
      alert('Please fill in all required fields');
      return;
    }

    const priorityColors = {
      'Low': '#10b981',
      'Medium': '#f59e0b',
      'High': '#ef4444'
    };

    if (editingEvent) {
      // Update existing event
      setPlannedEvents(plannedEvents.map(event =>
        event.id === editingEvent.id
          ? {
              ...event,
              name: newEventData.name,
              priority: newEventData.priority,
              startDate: newEventData.startDate,
              endDate: newEventData.endDate,
              startingBalance: parseFloat(newEventData.startingBalance) || 0,
              limit: parseFloat(newEventData.limit),
              color: priorityColors[newEventData.priority]
            }
          : event
      ));
    } else {
      // Create new event
      const newId = Math.max(...plannedEvents.map(e => e.id), 0) + 1;
      setPlannedEvents([...plannedEvents, {
        id: newId,
        name: newEventData.name,
        priority: newEventData.priority,
        startDate: newEventData.startDate,
        endDate: newEventData.endDate,
        startingBalance: parseFloat(newEventData.startingBalance) || 0,
        limit: parseFloat(newEventData.limit),
        spent: 0,
        color: priorityColors[newEventData.priority]
      }]);
    }

    // Reset form
    setNewEventData({
      name: '',
      priority: 'Medium',
      startDate: '',
      endDate: '',
      startingBalance: '',
      limit: ''
    });
    setShowNewEventModal(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEventData({
      name: event.name,
      priority: event.priority,
      startDate: event.startDate,
      endDate: event.endDate,
      startingBalance: event.startingBalance.toString(),
      limit: event.limit.toString()
    });
    setShowNewEventModal(true);
  };

  const handleDeleteEvent = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setPlannedEvents(plannedEvents.filter(event => event.id !== id));
      setShowNewEventModal(false);
      setEditingEvent(null);
    }
  };

  const handleToggleGoal = (goalId) => {
    // Only activate — deactivation is via trash icon on active goal card
    if (!selectedGoals.includes(goalId)) {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleDeactivateGoal = (goalId) => {
    setSelectedGoals(selectedGoals.filter(id => id !== goalId));
  };

  const handleUpdateGoalProgress = (goalId, amount) => {
    setSavingsGoals(savingsGoals.map(goal =>
      goal.id === goalId
        ? { ...goal, current: Math.max(0, Math.min(amount, goal.target)) }
        : goal
    ));
  };

  const handleUpdateGoalTarget = (goalId, target) => {
    setSavingsGoals(savingsGoals.map(goal =>
      goal.id === goalId
        ? { ...goal, target: parseFloat(target) || 0 }
        : goal
    ));
  };

  const handleUpdateGoalDeadline = (goalId, deadline) => {
    setSavingsGoals(savingsGoals.map(goal =>
      goal.id === goalId
        ? { ...goal, deadline }
        : goal
    ));
  };

  const handleAddCustomGoal = () => {
    if (!customGoal.name || !customGoal.target) {
      alert('Please fill in goal name and target amount');
      return;
    }

    const newId = Math.max(...savingsGoals.map(g => g.id), 0) + 1;
    const newGoal = {
      id: newId,
      name: customGoal.name,
      description: 'Custom savings goal',
      icon: '💰',
      category: 'Custom',
      target: parseFloat(customGoal.target),
      current: 0,
      deadline: customGoal.deadline,
      color: '#6b7280',
      isCustom: true
    };

    setSavingsGoals([...savingsGoals, newGoal]);
    setSelectedGoals([...selectedGoals, newId]);
    setCustomGoal({ name: '', target: '', deadline: '' });
    setShowAddCustomGoal(false);
  };

  const handleDeleteCustomGoal = (goalId) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setSavingsGoals(savingsGoals.filter(goal => goal.id !== goalId));
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    }
  };

  const triggerSpendingNotification = (type) => {
    const limit = type === 'daily' ? weeklyLimit / 7 : weeklyLimit;
    const spent = type === 'daily' ? weeklySpent / 7 : weeklySpent;
    const saved = Math.max(0, limit - spent);
    setSavedAmount(Math.round(saved));
    setSpendingNotificationType(type);
    setAllocationGoalId(null);
    setShowSpendingNotification(true);
  };

  const handleAllocateToGoal = (goalId) => {
    if (savedAmount > 0 && goalId) {
      const goal = savingsGoals.find(g => g.id === goalId);
      if (goal) {
        handleUpdateGoalProgress(goalId, goal.current + savedAmount);
      }
    }
    setShowSpendingNotification(false);
  };

  const handleReturnToFundingPot = () => {
    setShowSpendingNotification(false);
  };

  const handleConfirmGoalLock = () => {
    if (!lockDraft.startDate) {
      alert('Please select a start date.');
      return;
    }
    setGoalTimelines(prev => ({ ...prev, [lockingGoalId]: { ...lockDraft } }));
    setLockingGoalId(null);
    setLockDraft({ startDate: '', endDate: '' });
    // Also activate the goal if not already active
    if (!selectedGoals.includes(lockingGoalId)) {
      setSelectedGoals(prev => [...prev, lockingGoalId]);
    }
  };

  const handleRemoveGoalLock = (goalId) => {
    setGoalTimelines(prev => {
      const next = { ...prev };
      delete next[goalId];
      return next;
    });
  };

  const handleAddIncome = () => {
    if (!newIncome.amount || !newIncome.source) {
      alert('Please fill in amount and source');
      return;
    }

    if (newIncome.isRecurring && !newIncome.startDate) {
      alert('Please specify a start date for recurring income');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    if (editingIncome) {
      // Update existing income
      setIncomeEntries(incomeEntries.map(entry =>
        entry.id === editingIncome.id
          ? {
              ...entry,
              amount: parseFloat(newIncome.amount),
              source: newIncome.source,
              classification: newIncome.classification,
              date: newIncome.date || entry.date,
              isRecurring: newIncome.isRecurring,
              startDate: newIncome.startDate,
              endDate: newIncome.endDate,
              frequency: newIncome.frequency,
              customFrequency: newIncome.customFrequency,
              customFrequencyUnit: newIncome.customFrequencyUnit
            }
          : entry
      ));
      setEditingIncome(null);
    } else {
      // Create new income
      const newId = Math.max(...incomeEntries.map(i => i.id), 0) + 1;
      
      setIncomeEntries([...incomeEntries, {
        id: newId,
        amount: parseFloat(newIncome.amount),
        source: newIncome.source,
        classification: newIncome.classification,
        date: newIncome.date || today,
        isRecurring: newIncome.isRecurring,
        startDate: newIncome.startDate,
        endDate: newIncome.endDate,
        frequency: newIncome.frequency,
        customFrequency: newIncome.customFrequency,
        customFrequencyUnit: newIncome.customFrequencyUnit
      }]);
    }

    setNewIncome({ 
      amount: '', 
      source: '', 
      classification: 'Work', 
      date: '',
      isRecurring: false,
      startDate: '',
      endDate: '',
      frequency: 'weekly',
      customFrequency: '',
      customFrequencyUnit: 'days'
    });
    setShowAddIncome(false);
  };

  const handleEditIncome = (income) => {
    setEditingIncome(income);
    setNewIncome({
      amount: income.amount.toString(),
      source: income.source,
      classification: income.classification,
      date: income.date,
      isRecurring: income.isRecurring || false,
      startDate: income.startDate || '',
      endDate: income.endDate || '',
      frequency: income.frequency || 'weekly',
      customFrequency: income.customFrequency || '',
      customFrequencyUnit: income.customFrequencyUnit || 'days'
    });
    setShowAddIncome(true);
  };

  const handleDeleteIncome = (id) => {
    if (confirm('Are you sure you want to delete this income entry?')) {
      setIncomeEntries(incomeEntries.filter(entry => entry.id !== id));
    }
  };

  const getTotalIncome = () => {
    return incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
  };

  const getIncomeByClassification = (classification) => {
    return incomeEntries
      .filter(entry => entry.classification === classification)
      .reduce((sum, entry) => sum + entry.amount, 0);
  };

  // Calculate if a date is a payday based on recurring income
  const getPaydaysForDate = (dateStr) => {
    const targetDate = new Date(dateStr);
    const paydays = [];

    incomeEntries.forEach(entry => {
      if (!entry.isRecurring || !entry.startDate) return;

      const startDate = new Date(entry.startDate);
      const endDate = entry.endDate ? new Date(entry.endDate) : null;

      // Check if date is within the active period
      if (targetDate < startDate) return;
      if (endDate && targetDate > endDate) return;

      // Calculate days since start
      const daysSinceStart = Math.floor((targetDate - startDate) / (1000 * 60 * 60 * 24));

      let isPayday = false;
      
      if (entry.frequency === 'daily') {
        isPayday = true;
      } else if (entry.frequency === 'weekly') {
        isPayday = daysSinceStart % 7 === 0;
      } else if (entry.frequency === 'biweekly') {
        isPayday = daysSinceStart % 14 === 0;
      } else if (entry.frequency === 'monthly') {
        // Check if same day of month as start date
        isPayday = targetDate.getDate() === startDate.getDate();
      } else if (entry.frequency === 'custom' && entry.customFrequency) {
        const interval = parseInt(entry.customFrequency);
        if (entry.customFrequencyUnit === 'days') {
          isPayday = daysSinceStart % interval === 0;
        } else if (entry.customFrequencyUnit === 'weeks') {
          isPayday = daysSinceStart % (interval * 7) === 0;
        } else if (entry.customFrequencyUnit === 'months') {
          const monthsSinceStart = 
            (targetDate.getFullYear() - startDate.getFullYear()) * 12 + 
            (targetDate.getMonth() - startDate.getMonth());
          isPayday = monthsSinceStart % interval === 0 && 
                     targetDate.getDate() === startDate.getDate();
        }
      }

      if (isPayday) {
        paydays.push(entry);
      }
    });

    return paydays;
  };

  // Get days until next payday
  const getDaysUntilPayday = (currentDateStr) => {
    const currentDate = new Date(currentDateStr);
    let daysUntil = null;
    let nextPaydayAmount = 0;

    // Check next 14 days for a payday
    for (let i = 1; i <= 14; i++) {
      const checkDate = new Date(currentDate);
      checkDate.setDate(currentDate.getDate() + i);
      const checkDateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      
      const paydays = getPaydaysForDate(checkDateStr);
      if (paydays.length > 0) {
        daysUntil = i;
        nextPaydayAmount = paydays.reduce((sum, entry) => sum + entry.amount, 0);
        break;
      }
    }

    return { daysUntil, amount: nextPaydayAmount };
  };

  const handleLogin = () => {
    const user = users.find(u => u.username === loginData.username && u.password === loginData.password);
    if (user) {
      if (!user.activated) {
        alert('Account not activated. Please check your email/phone for the activation link.');
        return;
      }
      setIsAuthenticated(true);
      setShowAuthScreen(false);
      setShowStartupAnimation(true);
      // Update userData with logged in user's name
      setUserData(prev => ({ ...prev, name: user.firstName }));
      setTimeout(() => setShowStartupAnimation(false), 2000);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSignup = () => {
    if (!signupData.username || !signupData.password || !signupData.firstName || !signupData.lastName || !signupData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    const userExists = users.find(u => u.username === signupData.username);
    if (userExists) {
      alert('Username already exists');
      return;
    }

    // Add user with activated: false
    const newUser = { ...signupData, activated: false };
    setUsers([...users, newUser]);
    
    // Simulate sending verification email/SMS
    const verificationLink = `https://spendhen.app/verify/${signupData.username}`;
    let message = `Verification link sent to ${signupData.email}`;
    if (signupData.phone) {
      message += ` and ${signupData.phone}`;
    }
    message += `\n\nClick this link to activate your account:\n${verificationLink}\n\n(In production, this would be sent via email/SMS)`;
    
    alert(message);
    
    // Reset form and return to auth selection
    setSignupData({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
    setAuthMode(null);
  };

  const handleActivateAccount = (username) => {
    // This would normally be called when user clicks the verification link
    setUsers(users.map(u => u.username === username ? { ...u, activated: true } : u));
    alert('Account activated! You can now login.');
  };

  const handleUpdateProfile = () => {
    const currentUser = users.find(u => u.username === loginData.username);
    if (!currentUser) return;

    const changes = [];
    const timestamp = new Date().toLocaleString();

    if (editProfileData.firstName && editProfileData.firstName !== currentUser.firstName) {
      changes.push(`Name changed to: ${editProfileData.firstName} ${editProfileData.lastName || currentUser.lastName}`);
    }
    if (editProfileData.username && editProfileData.username !== currentUser.username) {
      changes.push(`Username changed to: ${editProfileData.username}`);
    }
    if (editProfileData.password && editProfileData.password !== currentUser.password) {
      changes.push('Password updated');
    }
    if (editProfileData.email && editProfileData.email !== currentUser.email) {
      changes.push(`Email changed to: ${editProfileData.email}`);
    }
    if (editProfileData.phone && editProfileData.phone !== currentUser.phone) {
      changes.push(`Phone changed to: ${editProfileData.phone}`);
    }

    if (changes.length === 0) {
      alert('No changes made');
      return;
    }

    // Update user data
    setUsers(users.map(u => 
      u.username === currentUser.username 
        ? { 
            ...u, 
            firstName: editProfileData.firstName || u.firstName,
            lastName: editProfileData.lastName || u.lastName,
            username: editProfileData.username || u.username,
            password: editProfileData.password || u.password,
            email: editProfileData.email || u.email,
            phone: editProfileData.phone || u.phone
          }
        : u
    ));

    // Update userData display name
    setUserData(prev => ({ ...prev, name: editProfileData.firstName || currentUser.firstName }));

    // Update loginData if username changed
    if (editProfileData.username && editProfileData.username !== currentUser.username) {
      setLoginData(prev => ({ ...prev, username: editProfileData.username }));
    }

    // Simulate sending notification email/SMS
    const message = `Profile Updated\n\nChanges made:\n${changes.join('\n')}\n\nTimestamp: ${timestamp}\n\nNotification sent to: ${editProfileData.email || currentUser.email}${editProfileData.phone ? ` and ${editProfileData.phone}` : ''}`;
    
    alert(message);
    setShowEditProfile(false);
    setEditProfileData({ firstName: '', lastName: '', username: '', password: '', email: '', phone: '' });
  };

  const getBalanceData = () => {
    if (balanceView === 'Annual') {
      return userData.historicalBalance.annual.filter(m => m.balance > 0);
    }
    return userData.historicalBalance[balanceView];
  };

  const calculateTrendline = (data) => {
    if (data.length < 2) return null;
    
    // Simple linear regression
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    data.forEach((point, i) => {
      const x = i;
      const y = Math.abs(point.balance);
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    });
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
  };

  const handleForgotPassword = () => {
    const user = users.find(u => u.email === forgotEmail);
    if (user) {
      alert(`Password reset link sent to ${forgotEmail}`);
      setAuthMode('login');
      setForgotEmail('');
    } else {
      alert('Email not found');
    }
  };

  const getFilteredAndSortedExpenses = () => {
    let filtered = expenses;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(exp => 
        exp.category.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    let sorted = [...filtered];
    
    if (sortBy === 'priority') {
      sorted.sort((a, b) => sortOrder === 'desc' ? b.priority - a.priority : a.priority - b.priority);
    } else if (sortBy === 'spent') {
      sorted.sort((a, b) => sortOrder === 'desc' ? b.spent - a.spent : a.spent - b.spent);
    } else if (sortBy === 'remaining') {
      sorted.sort((a, b) => {
        const aRemaining = a.limit - a.spent;
        const bRemaining = b.limit - b.spent;
        return sortOrder === 'desc' ? bRemaining - aRemaining : aRemaining - bRemaining;
      });
    } else if (sortBy === 'percentage') {
      sorted.sort((a, b) => {
        const aPercent = (a.spent / a.limit) * 100;
        const bPercent = (b.spent / b.limit) * 100;
        return sortOrder === 'desc' ? bPercent - aPercent : aPercent - bPercent;
      });
    } else if (sortOrder === 'alpha') {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortOrder === 'alphaReverse') {
      sorted.sort((a, b) => b.category.localeCompare(a.category));
    }

    return sorted;
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold && currentWeekDay < 6) setCurrentWeekDay(prev => prev + 1);
    else if (diff < -threshold && currentWeekDay > 0) setCurrentWeekDay(prev => prev - 1);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const navigateDay = (direction) => {
    if (direction === 'next' && currentWeekDay < 6) setCurrentWeekDay(prev => prev + 1);
    else if (direction === 'prev' && currentWeekDay > 0) setCurrentWeekDay(prev => prev - 1);
  };

  const getDayName = (dayIndex) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
  
  const getDateForDay = (dayIndex) => {
    const today = new Date();
    const diff = dayIndex - today.getDay();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    return targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getMotivationalMessage = () => {
    const currentDay = new Date().getDay();
    const weekProgress = currentDay / 7;
    const spendProgress = weeklySpent / weeklyLimit;
    if (spendProgress > weekProgress + 0.3) return "🐔 Whoa there! You're spending faster than planned. Let's slow down!";
    else if (spendProgress > weekProgress + 0.15) return "⚠️ You're slightly ahead of your weekly budget. Stay mindful!";
    else if (spendProgress < weekProgress - 0.1) return "🌟 Amazing! You're crushing your budget goals!";
    else return "✨ Great job! You're right on track with your spending!";
  };

  const renderAuthScreen = () => {
    if (authMode === null) {
      // Initial auth choice screen
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '40px 32px',
            maxWidth: '380px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🐔</div>
            <h1 style={{
              margin: '0 0 8px 0',
              fontSize: '32px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '700',
              color: '#1f2937'
            }}>Spendhen</h1>
            <p style={{
              margin: '0 0 32px 0',
              fontSize: '15px',
              color: '#6b7280',
              fontFamily: '"Inter", sans-serif'
            }}>Smart budgeting for college students</p>

            <button
              onClick={() => setAuthMode('login')}
              style={{
                width: '100%',
                background: '#1f2937',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                cursor: 'pointer',
                marginBottom: '12px',
                transition: 'transform 0.2s ease'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Login
            </button>

            <button
              onClick={() => setAuthMode('signup')}
              style={{
                width: '100%',
                background: 'white',
                border: '2px solid #1f2937',
                borderRadius: '12px',
                padding: '16px',
                color: '#1f2937',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                cursor: 'pointer',
                marginBottom: '20px',
                transition: 'transform 0.2s ease'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Create Account
            </button>

            {/* Demo: Show pending activations for testing */}
            {users.filter(u => !u.activated).length > 0 && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(234, 179, 8, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(234, 179, 8, 0.3)'
              }}>
                <p style={{
                  margin: '0 0 12px 0',
                  fontSize: '13px',
                  color: '#92400e',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '600'
                }}>Pending Activations (Demo)</p>
                {users.filter(u => !u.activated).map(user => (
                  <button
                    key={user.username}
                    onClick={() => handleActivateAccount(user.username)}
                    style={{
                      width: '100%',
                      background: '#eab308',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: '600',
                      fontFamily: '"Inter", sans-serif',
                      cursor: 'pointer',
                      marginBottom: '8px'
                    }}
                  >
                    Activate: {user.username}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (authMode === 'login') {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            <button
              onClick={() => setAuthMode(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={24} color="#6b7280" />
            </button>

            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '24px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '700',
              color: '#1f2937'
            }}>Login</h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '6px',
                fontFamily: '"Inter", sans-serif'
              }}>Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="Enter your username"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '6px',
                fontFamily: '"Inter", sans-serif'
              }}>Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={stayLoggedIn}
                onChange={(e) => setStayLoggedIn(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label style={{
                fontSize: '14px',
                color: '#6b7280',
                fontFamily: '"Inter", sans-serif'
              }}>Stay logged in</label>
            </div>

            <button
              onClick={() => setAuthMode('forgot')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#1f2937',
                fontSize: '13px',
                fontFamily: '"Inter", sans-serif',
                cursor: 'pointer',
                marginBottom: '20px',
                textDecoration: 'underline',
                padding: 0
              }}
            >
              Forgot Username/Password?
            </button>

            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                background: '#1f2937',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
            >
              Login
            </button>
          </div>
        </div>
      );
    }

    if (authMode === 'signup') {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            margin: '20px 0'
          }}>
            <button
              onClick={() => setAuthMode(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={24} color="#6b7280" />
            </button>

            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '24px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '700',
              color: '#1f2937'
            }}>Create Account</h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '6px',
                fontFamily: '"Inter", sans-serif'
              }}>Username *</label>
              <input
                type="text"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                placeholder="Choose a username"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '6px',
                fontFamily: '"Inter", sans-serif'
              }}>Password *</label>
              <input
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                placeholder="Create a password"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>First Name *</label>
                <input
                  type="text"
                  value={signupData.firstName}
                  onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                  placeholder="First name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>Last Name *</label>
                <input
                  type="text"
                  value={signupData.lastName}
                  onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                  placeholder="Last name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '6px',
                fontFamily: '"Inter", sans-serif'
              }}>Email *</label>
              <input
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '6px',
                fontFamily: '"Inter", sans-serif'
              }}>Phone Number (Optional)</label>
              <input
                type="tel"
                value={signupData.phone}
                onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                placeholder="(555) 123-4567"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              onClick={handleSignup}
              style={{
                width: '100%',
                background: '#1f2937',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      );
    }

    if (authMode === 'forgot') {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            <button
              onClick={() => setAuthMode('login')}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={24} color="#6b7280" />
            </button>

            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '24px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '700',
              color: '#1f2937'
            }}>Reset Password</h2>
            <p style={{
              margin: '0 0 24px 0',
              fontSize: '14px',
              color: '#6b7280',
              fontFamily: '"Inter", sans-serif'
            }}>Enter your email and we'll send you a reset link</p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '6px',
                fontFamily: '"Inter", sans-serif'
              }}>Email</label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              onClick={handleForgotPassword}
              style={{
                width: '100%',
                background: '#1f2937',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
            >
              Send Reset Link
            </button>
          </div>
        </div>
      );
    }
  };

  const renderStartupAnimation = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeOut 0.5s ease 1.5s forwards',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes chickenLaunch {
          0% { transform: translateY(150vh) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          70% { transform: translateY(-30vh) scale(1.2); opacity: 1; }
          100% { transform: translateY(-150vh) scale(0.8); opacity: 0; }
        }
        @keyframes dollarFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
      <div style={{
        fontSize: '120px',
        animation: 'chickenLaunch 1.5s ease-out forwards',
        position: 'relative'
      }}>
        🐔
        {[[-40,'0.8s'],[ 35,'0.9s'],[-20,'1.0s'],[ 55,'0.8s'],[-60,'1.1s'],[ 15,'0.9s'],
           [-35,'1.0s'],[ 50,'0.8s'],[-55,'1.1s'],[ 25,'0.9s'],[-10,'1.0s'],[ 45,'0.8s']
          ].map(([ox, dur], i) => (
          <span key={i} style={{
            position: 'absolute',
            fontSize: '24px',
            left: '50%',
            top: '50%',
            animation: `dollarFloat ${dur} ease-out ${i * 0.1}s forwards`,
            transform: `translateX(${ox}px)`
          }}>💵</span>
        ))}
      </div>
    </div>
  );

  const NavButton = ({ icon: Icon, label, page, currentPage, onClick }) => (
    <button onClick={onClick} style={{
      background: currentPage === page ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
      backdropFilter: currentPage === page ? 'blur(10px)' : 'none',
      border: currentPage === page ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
      borderRadius: '16px',
      padding: '10px 14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}>
      <Icon size={22} color="white" strokeWidth={currentPage === page ? 2.5 : 2} />
      <span style={{
        color: 'white',
        fontSize: '11px',
        fontWeight: currentPage === page ? '600' : '400',
        fontFamily: '"Inter", sans-serif'
      }}>{label}</span>
    </button>
  );


  // Calculate roommate balances
  const getRoommateBalances = () => {
    const balances = {};
    
    roommates.forEach(roommate => {
      balances[roommate.id] = {
        name: roommate.name,
        color: roommate.color,
        iOwe: 0,
        theyOwe: 0
      };
    });
    
    expenses.forEach(expense => {
      if (expense.isSplit && expense.splitWith && expense.splitWith.length > 0) {
        const numberOfPeople = expense.splitWith.length + 1;
        const shareAmount = (expense.totalAmount || expense.spent) / numberOfPeople;
        
        expense.splitWith.forEach(roommateId => {
          if (balances[roommateId]) {
            if (expense.settlementStatus?.[roommateId] !== 'settled') {
              balances[roommateId].theyOwe += shareAmount;
            }
          }
        });
      }
    });
    
    return balances;
  };

  const handleAddRoommate = () => {
    if (newRoommateName.trim()) {
      const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
      const newRoommate = {
        id: Date.now(),
        name: newRoommateName.trim(),
        color: colors[roommates.length % colors.length]
      };
      setRoommates([...roommates, newRoommate]);
      setNewRoommateName('');
      setShowAddRoommate(false);
    }
  };

  const handleRemoveRoommate = (roommateId) => {
    setRoommates(roommates.filter(r => r.id !== roommateId));
  };

  const handleToggleSplitRoommate = (expenseId, roommateId) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === expenseId) {
        const splitWith = exp.splitWith || [];
        const newSplitWith = splitWith.includes(roommateId)
          ? splitWith.filter(id => id !== roommateId)
          : [...splitWith, roommateId];
        
        const numberOfPeople = newSplitWith.length + 1;
        const totalAmount = exp.totalAmount || exp.spent;
        const myShare = totalAmount / numberOfPeople;
        
        return {
          ...exp,
          splitWith: newSplitWith,
          isSplit: newSplitWith.length > 0,
          myShare: myShare,
          totalAmount: totalAmount,
          settlementStatus: newSplitWith.reduce((acc, id) => {
            acc[id] = exp.settlementStatus?.[id] || 'pending';
            return acc;
          }, {})
        };
      }
      return exp;
    }));
  };

  const handleMarkSettled = (expenseId, roommateId) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === expenseId) {
        return {
          ...exp,
          settlementStatus: {
            ...exp.settlementStatus,
            [roommateId]: exp.settlementStatus?.[roommateId] === 'settled' ? 'pending' : 'settled'
          }
        };
      }
      return exp;
    }));
  };

  const renderHomePage = () => {
    const dailyEvents = weeklyEvents[currentWeekDay] || [];
    const isToday = currentWeekDay === new Date().getDay();

    // Get the date for the current week day being viewed
    const viewDate = new Date();
    const diff = currentWeekDay - viewDate.getDay();
    const targetDate = new Date(viewDate);
    targetDate.setDate(viewDate.getDate() + diff);
    const viewDateStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;

    // Get planned events for this day
    const dailyPlannedEvents = plannedEvents.filter(event => {
      return viewDateStr >= event.startDate && viewDateStr <= event.endDate;
    });

    // Check if this day is a payday
    const paydays = getPaydaysForDate(viewDateStr);
    const isPayday = paydays.length > 0;
    const paydayAmount = paydays.reduce((sum, entry) => sum + entry.amount, 0);

    // Check days until next payday (only for today)
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const { daysUntil, amount: nextPaydayAmount } = isToday ? getDaysUntilPayday(todayStr) : { daysUntil: null, amount: 0 };
    const showPaydayCountdown = isToday && daysUntil !== null && daysUntil <= 5;

    // Combine both types of events
    const allDailyEvents = [
      ...dailyEvents,
      ...dailyPlannedEvents.map(event => ({
        id: `planned-${event.id}`,
        title: event.name,
        category: event.priority,
        plannedSpend: event.limit,
        color: event.color,
        isPlannedEvent: true
      }))
    ];

    return (
      <div style={{ paddingBottom: '120px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        
        {/* Neutral Gray Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(31, 41, 59, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          padding: '40px 24px 28px 24px',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>🐔</div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                margin: 0,
                color: 'white',
                fontSize: '24px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                letterSpacing: '-0.02em'
              }}>Hey {userData.name}!</h1>
              <p style={{
                margin: '4px 0 0 0',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '13px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '400'
              }}>{getMotivationalMessage()}</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            position: 'relative',
            marginBottom: '16px'
          }}>
            <button onClick={() => navigateDay('prev')} disabled={currentWeekDay === 0} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: currentWeekDay === 0 ? 'rgba(0,0,0,0.05)' : 'rgba(107, 114, 128, 0.1)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentWeekDay === 0 ? 'not-allowed' : 'pointer',
              opacity: currentWeekDay === 0 ? 0.4 : 1,
              zIndex: 10
            }}>
              <ChevronLeft size={18} color="#4b5563" strokeWidth={2} />
            </button>

            <button onClick={() => navigateDay('next')} disabled={currentWeekDay === 6} style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: currentWeekDay === 6 ? 'rgba(0,0,0,0.05)' : 'rgba(107, 114, 128, 0.1)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentWeekDay === 6 ? 'not-allowed' : 'pointer',
              opacity: currentWeekDay === 6 ? 0.4 : 1,
              zIndex: 10
            }}>
              <ChevronRight size={18} color="#4b5563" strokeWidth={2} />
            </button>

            <div style={{ padding: '0 36px', marginBottom: '20px' }}>
              {/* Payday Countdown Banner */}
              {showPaydayCountdown && (
                <div style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                  <span style={{ fontSize: '16px' }}>💰</span>
                  <span style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {daysUntil === 1 ? 'Tomorrow is Payday!' : `${daysUntil} days to Payday!`} ${nextPaydayAmount > 0 ? `(+$${nextPaydayAmount})` : ''}
                  </span>
                </div>
              )}

              <h2 style={{
                margin: 0,
                fontSize: '28px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '700',
                color: '#1f2937',
                letterSpacing: '-0.03em'
              }}>
                {getDayName(currentWeekDay)}
                {isToday && <span style={{ 
                  fontSize: '13px', 
                  color: '#6b7280',
                  marginLeft: '10px',
                  fontWeight: '500'
                }}>• Today</span>}
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: '#6b7280',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '400'
              }}>{getDateForDay(currentWeekDay)}</p>
            </div>

            {/* Payday Indicator */}
            {isPayday && (
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                border: '2px solid rgba(16, 185, 129, 0.5)'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>💰💵💰</div>
                <h3 style={{
                  margin: '0 0 6px 0',
                  fontSize: '24px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '700',
                  color: 'white',
                  letterSpacing: '-0.02em'
                }}>$ PAYDAY $</h3>
                <p style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontFamily: '"Inter", sans-serif'
                }}>+${paydayAmount}</p>
              </div>
            )}

            <div style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              {allDailyEvents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <Calendar size={40} color="#d1d5db" strokeWidth={1.5} style={{ margin: '0 auto 10px' }} />
                  <p style={{
                    margin: 0,
                    color: '#9ca3af',
                    fontSize: '14px',
                    fontFamily: '"Inter", sans-serif'
                  }}>No planned expenses</p>
                </div>
              ) : (
                allDailyEvents.map(event => (
                  <div key={event.id} style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: allDailyEvents.indexOf(event) < allDailyEvents.length - 1 ? '12px' : '0',
                    borderLeft: event.isPlannedEvent ? `3px solid ${event.color}` : '3px solid #1f2937',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: '0 0 4px 0',
                          fontSize: '15px',
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>{event.title}</h3>
                        <p style={{
                          margin: '0 0 10px 0',
                          fontSize: '13px',
                          color: '#6b7280',
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          {event.time ? `${event.time} • ` : ''}{event.category}
                        </p>
                        <div style={{
                          background: event.isPlannedEvent ? event.color : '#1f2937',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          display: 'inline-block'
                        }}>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: 'white',
                            fontFamily: '"Inter", sans-serif'
                          }}>${event.plannedSpend}</span>
                        </div>
                      </div>
                      {event.isPlannedEvent && (
                        <div style={{
                          background: 'rgba(107, 114, 128, 0.1)',
                          borderRadius: '8px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          {event.category}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{
              marginTop: '16px',
              display: 'flex',
              gap: '4px',
              justifyContent: 'center'
            }}>
              {[0, 1, 2, 3, 4, 5, 6].map(day => (
                <div key={day} style={{
                  width: currentWeekDay === day ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: currentWeekDay === day ? '#1f2937' : 'rgba(31, 41, 59, 0.2)',
                  transition: 'all 0.3s ease'
                }} />
              ))}
            </div>
          </div>

          {/* Stats Grid with Prominent Colors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{
              gridColumn: '1 / -1',
              background: 'rgba(16, 185, 129, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '18px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.1)'
            }}>
              <TrendingUp size={20} color="#10b981" strokeWidth={2} style={{ marginBottom: '8px' }} />
              <p style={{
                margin: '0 0 4px 0',
                fontSize: '24px',
                fontWeight: '700',
                color: '#10b981',
                fontFamily: '"Inter", sans-serif'
              }}>${userData.savedAmount}</p>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#059669',
                fontFamily: '"Inter", sans-serif'
              }}>Saved this month</p>
            </div>

            <div style={{
              background: weeklySpent > weeklyLimit 
                ? 'rgba(239, 68, 68, 0.1)' 
                : 'rgba(16, 185, 129, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '14px',
              border: weeklySpent > weeklyLimit 
                ? '1px solid rgba(239, 68, 68, 0.2)' 
                : '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <Target size={18} color={weeklySpent > weeklyLimit ? '#ef4444' : '#10b981'} strokeWidth={2} style={{ marginBottom: '6px' }} />
              <p style={{
                margin: '0 0 2px 0',
                fontSize: '18px',
                fontWeight: '700',
                color: weeklySpent > weeklyLimit ? '#ef4444' : '#10b981',
                fontFamily: '"Inter", sans-serif'
              }}>${weeklySpent}/{weeklyLimit}</p>
              <p style={{
                margin: 0,
                fontSize: '11px',
                color: weeklySpent > weeklyLimit ? '#dc2626' : '#059669',
                fontFamily: '"Inter", sans-serif'
              }}>Weekly</p>
            </div>

            <div style={{
              background: monthlySpent > monthlyLimit 
                ? 'rgba(239, 68, 68, 0.1)' 
                : 'rgba(107, 114, 128, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '14px',
              border: monthlySpent > monthlyLimit 
                ? '1px solid rgba(239, 68, 68, 0.2)' 
                : '1px solid rgba(107, 114, 128, 0.2)'
            }}>
              <Calendar size={18} color={monthlySpent > monthlyLimit ? '#ef4444' : '#6b7280'} strokeWidth={2} style={{ marginBottom: '6px' }} />
              <p style={{
                margin: '0 0 2px 0',
                fontSize: '18px',
                fontWeight: '700',
                color: monthlySpent > monthlyLimit ? '#ef4444' : '#1f2937',
                fontFamily: '"Inter", sans-serif'
              }}>${monthlySpent}/{monthlyLimit}</p>
              <p style={{
                margin: 0,
                fontSize: '11px',
                color: monthlySpent > monthlyLimit ? '#dc2626' : '#6b7280',
                fontFamily: '"Inter", sans-serif'
              }}>Monthly</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancePage = () => {
    const availableIcons = [
      { name: 'Beer', component: Beer },
      { name: 'Coffee', component: Coffee },
      { name: 'Shopping', component: ShoppingBag },
      { name: 'Dining', component: Utensils },
      { name: 'Target', component: Target }
    ];

    const filteredExpenses = getFilteredAndSortedExpenses();

    return (
      <div style={{ paddingBottom: '120px' }}>
        {/* Compact Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(31, 41, 59, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          padding: '32px 24px 20px 24px',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}>
          <h1 style={{
            margin: '0 0 6px 0',
            color: 'white',
            fontSize: '26px',
            fontFamily: '"Inter", sans-serif',
            fontWeight: '600',
            letterSpacing: '-0.02em'
          }}>Spend Coop</h1>
          <p style={{
            margin: 0,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '13px',
            fontFamily: '"Inter", sans-serif'
          }}>Track and manage your spending limits</p>
        </div>

        <div style={{ padding: '20px 24px 24px 24px' }}>
          {/* Search and Sort Bar */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px'
          }}>
            {/* Search Bar */}
            <div style={{
              flex: 1,
              position: 'relative'
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  boxSizing: 'border-box',
                  background: 'white'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <X size={16} color="#6b7280" />
                </button>
              )}
            </div>

            {/* Sort/Filter Button */}
            <button
              onClick={() => setShowSortFilter(!showSortFilter)}
              style={{
                background: showSortFilter ? '#1f2937' : 'white',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={showSortFilter ? 'white' : '#6b7280'} strokeWidth="2">
                <path d="M3 6h18M7 12h10M11 18h2"/>
              </svg>
              <span style={{
                color: showSortFilter ? 'white' : '#6b7280',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: '"Inter", sans-serif'
              }}>Sort</span>
            </button>
          </div>

          {/* Sort/Filter Panel */}
          {showSortFilter && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.5)'
            }}>
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                color: '#1f2937'
              }}>Sort & Filter</h3>

              {/* Sort By Options */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{
                  margin: '0 0 10px 0',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  fontFamily: '"Inter", sans-serif'
                }}>Sort by:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    { value: 'none', label: 'Default' },
                    { value: 'priority', label: 'Priority' },
                    { value: 'spent', label: '$ Spent' },
                    { value: 'remaining', label: '$ Remaining' },
                    { value: 'percentage', label: 'Percentage' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      style={{
                        background: sortBy === option.value ? '#1f2937' : 'white',
                        color: sortBy === option.value ? 'white' : '#6b7280',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px 14px',
                        fontSize: '13px',
                        fontWeight: '500',
                        fontFamily: '"Inter", sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Options */}
              <div>
                <p style={{
                  margin: '0 0 10px 0',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  fontFamily: '"Inter", sans-serif'
                }}>Order:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    { value: 'desc', label: 'High to Low' },
                    { value: 'asc', label: 'Low to High' },
                    { value: 'alpha', label: 'A-Z' },
                    { value: 'alphaReverse', label: 'Z-A' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortOrder(option.value)}
                      style={{
                        background: sortOrder === option.value ? '#1f2937' : 'white',
                        color: sortOrder === option.value ? 'white' : '#6b7280',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px 14px',
                        fontSize: '13px',
                        fontWeight: '500',
                        fontFamily: '"Inter", sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Folder View or Category List */}
          {!activeFolder ? (
            /* Show Folders */
            <div>
              {/* Income Folder */}
              <div
                onClick={() => setActiveFolder('income')}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '20px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px'
                    }}>💰</div>
                    <div>
                      <h3 style={{
                        margin: '0 0 4px 0',
                        fontSize: '20px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>Income</h3>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#6b7280',
                        fontFamily: '"Inter", sans-serif'
                      }}>{incomeEntries.length} entries • ${getTotalIncome()}</p>
                    </div>
                  </div>
                  <ChevronRight size={24} color="#6b7280" strokeWidth={2} />
                </div>
              </div>

              {/* Expenses Folder */}
              <div
                onClick={() => setActiveFolder('expenses')}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '20px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px'
                    }}>💸</div>
                    <div>
                      <h3 style={{
                        margin: '0 0 4px 0',
                        fontSize: '20px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>Expenses</h3>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#6b7280',
                        fontFamily: '"Inter", sans-serif'
                      }}>{expenses.length} categories • ${monthlySpent} spent</p>
                    </div>
                  </div>
                  <ChevronRight size={24} color="#6b7280" strokeWidth={2} />
                </div>
              </div>
            </div>
          ) : activeFolder === 'income' ? (
            /* Income View */
            <div>
              {/* Back Button */}
              <button
                onClick={() => setActiveFolder(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '500',
                  color: '#6b7280'
                }}
              >
                <ChevronLeft size={18} />
                Back to Folders
              </button>

              {/* Add Income Button */}
              {!showAddIncome ? (
                <button
                  onClick={() => setShowAddIncome(true)}
                  style={{
                    width: '100%',
                    background: '#10b981',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                    transition: 'transform 0.2s ease',
                    marginBottom: '20px'
                  }}
                >
                  <Plus size={20} color="white" strokeWidth={2.5} />
                  <span style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '"Inter", sans-serif'
                  }}>Add Income</span>
                </button>
              ) : (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(107, 114, 128, 0.2)',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '20px',
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>{editingIncome ? 'Edit Income' : 'New Income'}</h3>
                    <button
                      onClick={() => {
                        setShowAddIncome(false);
                        setEditingIncome(null);
                        setNewIncome({ 
                          amount: '', 
                          source: '', 
                          classification: 'Work', 
                          date: '',
                          isRecurring: false,
                          startDate: '',
                          endDate: '',
                          frequency: 'weekly',
                          customFrequency: '',
                          customFrequencyUnit: 'days'
                        });
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      <X size={20} color="#6b7280" />
                    </button>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#6b7280',
                      marginBottom: '6px',
                      fontFamily: '"Inter", sans-serif'
                    }}>Amount ($) *</label>
                    <input
                      type="number"
                      value={newIncome.amount}
                      onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                      placeholder="150"
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                        fontSize: '15px',
                        fontFamily: '"Inter", sans-serif',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#6b7280',
                      marginBottom: '6px',
                      fontFamily: '"Inter", sans-serif'
                    }}>Source *</label>
                    <input
                      type="text"
                      value={newIncome.source}
                      onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
                      placeholder="e.g., Part-time job, Freelance project"
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                        fontSize: '15px',
                        fontFamily: '"Inter", sans-serif',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#6b7280',
                      marginBottom: '6px',
                      fontFamily: '"Inter", sans-serif'
                    }}>Classification *</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['Work', 'Sales', 'Miscellaneous', 'Gifts'].map((classification) => (
                        <button
                          key={classification}
                          onClick={() => setNewIncome({ ...newIncome, classification })}
                          style={{
                            flex: '1 1 calc(50% - 4px)',
                            padding: '12px',
                            borderRadius: '12px',
                            border: newIncome.classification === classification ? '2px solid #10b981' : '1px solid #d1d5db',
                            background: newIncome.classification === classification ? '#10b981' : 'white',
                            color: newIncome.classification === classification ? 'white' : '#6b7280',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: '"Inter", sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {classification}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#6b7280',
                      marginBottom: '6px',
                      fontFamily: '"Inter", sans-serif'
                    }}>Date (Optional)</label>
                    <input
                      type="date"
                      value={newIncome.date}
                      onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                        fontSize: '15px',
                        fontFamily: '"Inter", sans-serif',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Recurring Income Section */}
                  <div style={{ 
                    marginBottom: '20px',
                    padding: '16px',
                    background: 'rgba(16, 185, 129, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <input
                        type="checkbox"
                        checked={newIncome.isRecurring}
                        onChange={(e) => setNewIncome({ ...newIncome, isRecurring: e.target.checked })}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <label style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#1f2937',
                        fontFamily: '"Inter", sans-serif',
                        cursor: 'pointer'
                      }}
                      onClick={() => setNewIncome({ ...newIncome, isRecurring: !newIncome.isRecurring })}
                      >
                        This is recurring income
                      </label>
                    </div>

                    {newIncome.isRecurring && (
                      <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                          <div>
                            <label style={{
                              display: 'block',
                              fontSize: '13px',
                              fontWeight: '500',
                              color: '#6b7280',
                              marginBottom: '6px',
                              fontFamily: '"Inter", sans-serif'
                            }}>Start Date *</label>
                            <input
                              type="date"
                              value={newIncome.startDate}
                              onChange={(e) => setNewIncome({ ...newIncome, startDate: e.target.value })}
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid #d1d5db',
                                fontSize: '15px',
                                fontFamily: '"Inter", sans-serif',
                                boxSizing: 'border-box'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{
                              display: 'block',
                              fontSize: '13px',
                              fontWeight: '500',
                              color: '#6b7280',
                              marginBottom: '6px',
                              fontFamily: '"Inter", sans-serif'
                            }}>End Date (Optional)</label>
                            <input
                              type="date"
                              value={newIncome.endDate}
                              onChange={(e) => setNewIncome({ ...newIncome, endDate: e.target.value })}
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid #d1d5db',
                                fontSize: '15px',
                                fontFamily: '"Inter", sans-serif',
                                boxSizing: 'border-box'
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <label style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#6b7280',
                            marginBottom: '6px',
                            fontFamily: '"Inter", sans-serif'
                          }}>Payment Frequency</label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px' }}>
                            {[
                              { value: 'daily', label: 'Daily' },
                              { value: 'weekly', label: 'Weekly' },
                              { value: 'biweekly', label: 'Bi-weekly' },
                              { value: 'monthly', label: 'Monthly' },
                              { value: 'custom', label: 'Custom' }
                            ].map((freq) => (
                              <button
                                key={freq.value}
                                onClick={() => setNewIncome({ ...newIncome, frequency: freq.value })}
                                style={{
                                  padding: '10px',
                                  borderRadius: '10px',
                                  border: newIncome.frequency === freq.value ? '2px solid #10b981' : '1px solid #d1d5db',
                                  background: newIncome.frequency === freq.value ? '#10b981' : 'white',
                                  color: newIncome.frequency === freq.value ? 'white' : '#6b7280',
                                  fontSize: '13px',
                                  fontWeight: '600',
                                  fontFamily: '"Inter", sans-serif',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {freq.label}
                              </button>
                            ))}
                          </div>

                          {newIncome.frequency === 'custom' && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <div style={{ flex: 1 }}>
                                <label style={{
                                  display: 'block',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  color: '#6b7280',
                                  marginBottom: '4px',
                                  fontFamily: '"Inter", sans-serif'
                                }}>Every</label>
                                <input
                                  type="number"
                                  value={newIncome.customFrequency}
                                  onChange={(e) => setNewIncome({ ...newIncome, customFrequency: e.target.value })}
                                  placeholder="2"
                                  min="1"
                                  style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: '1px solid #d1d5db',
                                    fontSize: '14px',
                                    fontFamily: '"Inter", sans-serif',
                                    boxSizing: 'border-box'
                                  }}
                                />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{
                                  display: 'block',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  color: '#6b7280',
                                  marginBottom: '4px',
                                  fontFamily: '"Inter", sans-serif'
                                }}>Unit</label>
                                <select
                                  value={newIncome.customFrequencyUnit}
                                  onChange={(e) => setNewIncome({ ...newIncome, customFrequencyUnit: e.target.value })}
                                  style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: '1px solid #d1d5db',
                                    fontSize: '14px',
                                    fontFamily: '"Inter", sans-serif',
                                    boxSizing: 'border-box',
                                    background: 'white'
                                  }}
                                >
                                  <option value="days">Days</option>
                                  <option value="weeks">Weeks</option>
                                  <option value="months">Months</option>
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleAddIncome}
                    style={{
                      width: '100%',
                      background: '#10b981',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '"Inter", sans-serif',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Check size={18} />
                    {editingIncome ? 'Save Changes' : 'Add Income'}
                  </button>
                </div>
              )}

              {/* Income Summary */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}>
                <h3 style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>Income Summary</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '12px',
                    padding: '14px',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                  }}>
                    <p style={{
                      margin: '0 0 4px 0',
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#10b981',
                      fontFamily: '"Inter", sans-serif'
                    }}>${getTotalIncome()}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#059669',
                      fontFamily: '"Inter", sans-serif'
                    }}>Total Income</p>
                  </div>

                  <div style={{
                    background: 'rgba(107, 114, 128, 0.1)',
                    borderRadius: '12px',
                    padding: '14px',
                    border: '1px solid rgba(107, 114, 128, 0.2)'
                  }}>
                    <p style={{
                      margin: '0 0 4px 0',
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1f2937',
                      fontFamily: '"Inter", sans-serif'
                    }}>{incomeEntries.length}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#6b7280',
                      fontFamily: '"Inter", sans-serif'
                    }}>Entries</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {['Work', 'Sales', 'Miscellaneous', 'Gifts'].map(classification => {
                    const amount = getIncomeByClassification(classification);
                    return (
                      <div key={classification} style={{
                        background: 'white',
                        borderRadius: '10px',
                        padding: '12px',
                        textAlign: 'center'
                      }}>
                        <p style={{
                          margin: '0 0 2px 0',
                          fontSize: '16px',
                          fontWeight: '700',
                          color: '#1f2937',
                          fontFamily: '"Inter", sans-serif'
                        }}>${amount}</p>
                        <p style={{
                          margin: 0,
                          fontSize: '11px',
                          color: '#6b7280',
                          fontFamily: '"Inter", sans-serif'
                        }}>{classification}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Income Entries List */}
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '18px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                color: '#1f2937'
              }}>Income History</h3>

              {incomeEntries.length === 0 ? (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '40px 20px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '15px',
                    color: '#6b7280',
                    fontFamily: '"Inter", sans-serif'
                  }}>No income entries yet. Click "Add Income +" to get started!</p>
                </div>
              ) : (
                incomeEntries.slice().reverse().map((entry) => (
                  <div key={entry.id} style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '12px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        margin: '0 0 4px 0',
                        fontSize: '16px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>{entry.source}</h4>
                      <p style={{
                        margin: '0 0 4px 0',
                        fontSize: '13px',
                        color: '#6b7280',
                        fontFamily: '"Inter", sans-serif'
                      }}>
                        {entry.classification} • {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      {entry.isRecurring && (
                        <p style={{
                          margin: '0 0 6px 0',
                          fontSize: '12px',
                          color: '#10b981',
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: '500'
                        }}>
                          🔄 Recurring: {entry.frequency === 'custom' 
                            ? `Every ${entry.customFrequency} ${entry.customFrequencyUnit}`
                            : entry.frequency.charAt(0).toUpperCase() + entry.frequency.slice(1)}
                          {entry.startDate && ` • Started ${new Date(entry.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                        </p>
                      )}
                      <div style={{
                        background: '#10b981',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        display: 'inline-block'
                      }}>
                        <span style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          color: 'white',
                          fontFamily: '"Inter", sans-serif'
                        }}>+${entry.amount}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                      <button
                        onClick={() => handleEditIncome(entry)}
                        style={{
                          background: 'rgba(107, 114, 128, 0.1)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Edit2 size={16} color="#6b7280" />
                      </button>
                      <button
                        onClick={() => handleDeleteIncome(entry.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Expenses View (existing category list) */
            <div>
              {/* Back Button */}
              <button
                onClick={() => setActiveFolder(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '500',
                  color: '#6b7280'
                }}
              >
                <ChevronLeft size={18} />
                Back to Folders
              </button>

              {/* Category List */}
              {/* Priority Legend */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(20px)',
                borderRadius: '14px',
                padding: '10px 14px',
                marginBottom: '16px',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '6px'
              }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', fontFamily: '"Inter", sans-serif', whiteSpace: 'nowrap' }}>Priority scale:</span>
                <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'flex-end' }}>
                  {[
                    { emojis: '💵', label: 'Low', color: '#10b981' },
                    { emojis: '💵💵💵', label: 'Medium', color: '#f59e0b' },
                    { emojis: '💵💵💵💵💵', label: 'High', color: '#ef4444' }
                  ].map(item => (
                    <div key={item.label} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: `${item.color}12`,
                      borderRadius: '10px',
                      padding: '6px 8px',
                      border: `1px solid ${item.color}30`,
                      minWidth: 0,
                      flex: 1
                    }}>
                      <span style={{ fontSize: '11px', lineHeight: 1, marginBottom: '3px', letterSpacing: '-1px' }}>{item.emojis}</span>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: item.color, fontFamily: '"Inter", sans-serif' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {filteredExpenses.length === 0 && searchQuery ? (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '15px',
                    color: '#6b7280',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    No categories found matching "{searchQuery}"
                  </p>
                </div>
              ) : (
                filteredExpenses.map(expense => {
            const percentage = (expense.spent / getAdjustedLimit(expense.limit)) * 100;
            const isOverBudget = percentage > 100;
            const progressColor = getProgressColor(expense.spent, expense.limit);
            const Icon = expense.icon;
            const isEditing = editingExpense === expense.id;
            
            return (
              <div key={expense.id} style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}>
                {isEditing ? (
                  <div>
                    {/* Delete Button in Top Right */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>Edit Category</h3>
                      <button
                        onClick={() => handleDeleteCategory(expense.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: 'none',
                          borderRadius: '10px',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '4px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '500'
                      }}>Category Name</label>
                      <input
                        type="text"
                        defaultValue={expense.category}
                        onChange={(e) => {
                          const updatedExpenses = expenses.map(exp =>
                            exp.id === expense.id ? { ...exp, category: e.target.value } : exp
                          );
                          setExpenses(updatedExpenses);
                        }}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1px solid #d1d5db',
                          fontSize: '16px',
                          fontFamily: '"Inter", sans-serif',
                          boxSizing: 'border-box',
                          background: 'white'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '4px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '500'
                      }}>Monthly Limit ($)</label>
                      <input
                        type="number"
                        defaultValue={expense.limit}
                        onChange={(e) => {
                          const updatedExpenses = expenses.map(exp =>
                            exp.id === expense.id ? { ...exp, limit: parseFloat(e.target.value) || 0 } : exp
                          );
                          setExpenses(updatedExpenses);
                        }}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1px solid #d1d5db',
                          fontSize: '16px',
                          fontFamily: '"Inter", sans-serif',
                          boxSizing: 'border-box',
                          background: 'white'
                        }}
                      />
{selectedScheme && getAdjustedLimit(expense.limit) < expense.limit && (
  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#8b5cf6', fontWeight: '600', fontFamily: '"Inter", sans-serif' }}>
    Scheme active: Adjusted limit ${getAdjustedLimit(expense.limit)}
  </p>
)}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '8px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '500'
                      }}>Priority Level</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {[1, 2, 3, 4, 5].map(level => (
                          <button
                            key={level}
                            onClick={() => {
                              const updatedExpenses = expenses.map(exp =>
                                exp.id === expense.id ? { ...exp, priority: level } : exp
                              );
                              setExpenses(updatedExpenses);
                            }}
                            style={{
                              background: (expenses.find(e => e.id === expense.id)?.priority || 3) >= level 
                                ? '#1f2937' 
                                : 'rgba(107, 114, 128, 0.1)',
                              border: 'none',
                              borderRadius: '10px',
                              padding: '10px 14px',
                              fontSize: '18px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            💵
                          </button>
                        ))}
                      </div>
                    </div>
{/* Split with Roommates */}
{roommates.length > 0 && (
  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
    <label style={{
      display: 'block',
      marginBottom: '8px',
      fontSize: '13px',
      fontWeight: '600',
      color: '#374151',
      fontFamily: '"Inter", sans-serif'
    }}>
      Split with Roommates
    </label>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {roommates.map(roommate => {
        const isSelected = expense.splitWith?.includes(roommate.id);
        return (
          <button
            key={roommate.id}
            type="button"
            onClick={() => handleToggleSplitRoommate(expense.id, roommate.id)}
            style={{
              padding: '8px 12px',
              borderRadius: '20px',
              border: isSelected ? `2px solid ${roommate.color}` : '2px solid #e5e7eb',
              background: isSelected ? `${roommate.color}15` : 'white',
              color: isSelected ? roommate.color : '#6b7280',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: '"Inter", sans-serif'
            }}
          >
            {roommate.name.split(' ')[0]}
          </button>
        );
      })}
    </div>
    {expense.splitWith && expense.splitWith.length > 0 && (
      <div style={{
        background: '#f3f4f6',
        borderRadius: '10px',
        padding: '12px',
        marginTop: '12px'
      }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#6b7280', fontFamily: '"Inter", sans-serif' }}>
          Split {expense.splitWith.length + 1} ways
        </p>
        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>
          Your share: ${((expense.spent || 0) / (expense.splitWith.length + 1)).toFixed(2)}
        </p>
      </div>
    )}
  </div>
)}
                    <button
                      onClick={() => setEditingExpense(null)}
                      style={{
                        width: '100%',
                        background: '#1f2937',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: '"Inter", sans-serif',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Check size={18} />
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'rgba(107, 114, 128, 0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={24} color="#6b7280" strokeWidth={2} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: '0 0 4px 0',
                          fontSize: '18px',
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>{expense.category}</h3>
{/* Split Indicator */}
{expense.isSplit && expense.splitWith && expense.splitWith.length > 0 && (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '4px',
    fontSize: '11px',
    color: '#8b5cf6',
    fontWeight: '600',
    fontFamily: '"Inter", sans-serif'
  }}>
    <span style={{ fontSize: '14px' }}>🔀</span>
    <span>
      Split with {expense.splitWith.map(id => {
        const roommate = roommates.find(r => r.id === id);
        return roommate ? roommate.name.split(' ')[0] : '';
      }).filter(Boolean).join(', ')}
    </span>
  </div>
)}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#6b7280',
                            fontFamily: '"Inter", sans-serif'
                          }}>Monthly limit: ${expense.limit}</p>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(expense.priority)].map((_, i) => (
                              <span key={i} style={{ fontSize: '12px' }}>💵</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingExpense(expense.id)}
                        style={{
                          background: 'rgba(107, 114, 128, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: 'none',
                          borderRadius: '10px',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Edit2 size={16} color="#6b7280" strokeWidth={2} />
                      </button>
                    </div>

                    <div style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      borderRadius: '12px',
                      height: '8px',
                      overflow: 'hidden',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        background: isOverBudget 
                          ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                          : `linear-gradient(90deg, ${progressColor} 0%, ${progressColor}dd 100%)`,
                        height: '100%',
                        width: `${Math.min(percentage, 100)}%`,
                        transition: 'width 0.5s ease',
                        borderRadius: '12px'
                      }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{
                          margin: '0 0 2px 0',
                          fontSize: '20px',
                          fontWeight: '700',
                          color: isOverBudget ? '#ef4444' : progressColor,
                          fontFamily: '"Inter", sans-serif'
                        }}>${expense.spent}</p>
                        <p style={{
                          margin: 0,
                          fontSize: '12px',
                          color: '#6b7280',
                          fontFamily: '"Inter", sans-serif'
                        }}>spent</p>
<div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '4px' }}>
  <p style={{
    margin: 0,
    fontSize: '11px',
    color: '#6b7280',
    fontFamily: '"Inter", sans-serif'
  }}>
    Limit: ${expense.limit}
  </p>
  {selectedScheme && getAdjustedLimit(expense.limit) < expense.limit && (
    <p style={{
      margin: 0,
      fontSize: '11px',
      color: '#8b5cf6',
      fontWeight: '600',
      fontFamily: '"Inter", sans-serif'
    }}>
      → ${getAdjustedLimit(expense.limit)}
    </p>
  )}
</div>

                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{
                          margin: '0 0 2px 0',
                          fontSize: '20px',
                          fontWeight: '700',
                          color: isOverBudget ? '#ef4444' : progressColor,
                          fontFamily: '"Inter", sans-serif'
                        }}>${isOverBudget ? 0 : expense.limit - expense.spent}</p>
                        <p style={{
                          margin: 0,
                          fontSize: '12px',
                          color: '#6b7280',
                          fontFamily: '"Inter", sans-serif'
                        }}>remaining</p>
                      </div>
                      <div style={{
                        background: `${progressColor}20`,
                        borderRadius: '10px',
                        padding: '8px 12px'
                      }}>
                        <p style={{
                          margin: 0,
                          fontSize: '16px',
                          fontWeight: '600',
                          color: isOverBudget ? '#ef4444' : progressColor,
                          fontFamily: '"Inter", sans-serif'
                        }}>{Math.round(percentage)}%</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })
          )}

          {!showAddCategory ? (
            <button
              onClick={() => setShowAddCategory(true)}
              style={{
                width: '100%',
                background: '#1f2937',
                border: 'none',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(31, 41, 59, 0.2)',
                transition: 'transform 0.2s ease'
              }}
            >
              <Plus size={20} color="white" strokeWidth={2.5} />
              <span style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif'
              }}>Add New Category</span>
            </button>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(107, 114, 128, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '20px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>New Category</h3>
                <button
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategory({ category: '', limit: '', priority: 3, icon: ShoppingBag });
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '4px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '500'
                }}>Category Name</label>
                <input
                  type="text"
                  value={newCategory.category}
                  onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
                  placeholder="e.g., Entertainment"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box',
                    background: 'white'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '4px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '500'
                }}>Monthly Limit ($)</label>
                <input
                  type="number"
                  value={newCategory.limit}
                  onChange={(e) => setNewCategory({ ...newCategory, limit: e.target.value })}
                  placeholder="100"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box',
                    background: 'white'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '4px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '500'
                }}>Icon</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {availableIcons.map(({ name, component: IconComponent }) => (
                    <button
                      key={name}
                      onClick={() => setNewCategory({ ...newCategory, icon: IconComponent })}
                      style={{
                        background: newCategory.icon === IconComponent 
                          ? '#1f2937' 
                          : 'rgba(107, 114, 128, 0.1)',
                        border: 'none',
                        borderRadius: '12px',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <IconComponent 
                        size={24} 
                        color={newCategory.icon === IconComponent ? 'white' : '#6b7280'} 
                        strokeWidth={2} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '8px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '500'
                }}>Priority Level</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map(level => (
                    <button
                      key={level}
                      onClick={() => setNewCategory({ ...newCategory, priority: level })}
                      style={{
                        background: newCategory.priority >= level 
                          ? '#1f2937' 
                          : 'rgba(107, 114, 128, 0.1)',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      💵
                    </button>
                  ))}
                </div>
                <p style={{
                  margin: '8px 0 0 0',
                  fontSize: '11px',
                  color: '#6b7280',
                  fontFamily: '"Inter", sans-serif'
                }}>1 = Low priority, 5 = High priority</p>
              </div>
              <button
                onClick={handleAddCategory}
                disabled={!newCategory.category || !newCategory.limit}
                style={{
                  width: '100%',
                  background: (!newCategory.category || !newCategory.limit)
                    ? '#d1d5db'
                    : '#1f2937',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '"Inter", sans-serif',
                  cursor: (!newCategory.category || !newCategory.limit) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Check size={18} />
                Create Category
              </button>
            </div>
          )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCalendarPage = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Check if a date has any events
    const hasEvent = (day) => {
      if (!day) return false;
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return plannedEvents.some(event => {
        return dateStr >= event.startDate && dateStr <= event.endDate;
      });
    };

    // Get events for a specific date
    const getEventsForDate = (day) => {
      if (!day) return [];
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return plannedEvents.filter(event => {
        return dateStr >= event.startDate && dateStr <= event.endDate;
      });
    };

    // Sort upcoming events by start date
    const upcomingEvents = [...plannedEvents].sort((a, b) => 
      new Date(a.startDate) - new Date(b.startDate)
    );

    return (
      <div style={{ paddingBottom: '120px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(31, 41, 59, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          padding: '40px 24px 28px 24px',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}>
          <h1 style={{
            margin: '0 0 8px 0',
            color: 'white',
            fontSize: '28px',
            fontFamily: '"Inter", sans-serif',
            fontWeight: '600',
            letterSpacing: '-0.02em'
          }}>Financial Calendar</h1>
          <p style={{
            margin: 0,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif'
          }}>Plan ahead for your spending goals</p>
        </div>

        <div style={{ padding: '24px' }}>
          {/* New Event Button */}
          <button
            onClick={() => {
              setEditingEvent(null);
              setNewEventData({
                name: '',
                priority: 'Medium',
                startDate: '',
                endDate: '',
                startingBalance: '',
                limit: ''
              });
              setShowNewEventModal(true);
            }}
            style={{
              width: '100%',
              background: '#1f2937',
              border: 'none',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(31, 41, 59, 0.2)',
              transition: 'transform 0.2s ease',
              marginBottom: '24px'
            }}
          >
            <Plus size={20} color="white" strokeWidth={2.5} />
            <span style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: '"Inter", sans-serif'
            }}>New Event</span>
          </button>

          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.5)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                style={{
                  background: 'rgba(107, 114, 128, 0.1)',
                  border: 'none',
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={20} color="#4b5563" strokeWidth={2.5} />
              </button>
              <h2 style={{
                margin: 0,
                fontSize: '20px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                color: '#1f2937'
              }}>{monthName}</h2>
              <button
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                style={{
                  background: 'rgba(107, 114, 128, 0.1)',
                  border: 'none',
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={20} color="#4b5563" strokeWidth={2.5} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
              marginBottom: '12px'
            }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  fontFamily: '"Inter", sans-serif',
                  padding: '8px 0'
                }}>{day}</div>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px'
            }}>
              {days.map((day, index) => {
                const isToday = day === new Date().getDate() && 
                                month === new Date().getMonth() && 
                                year === new Date().getFullYear();
                const dayHasEvent = hasEvent(day);
                const dayEvents = getEventsForDate(day);
                
                // Check if this day is a payday
                const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
                const isPayday = dateStr ? getPaydaysForDate(dateStr).length > 0 : false;
                
                return (
                  <div 
                    key={index} 
                    onClick={() => {
                      if (day !== null) {
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        setSelectedDayData({ date: dateStr, day, month, year, events: dayEvents });
                        setShowDayModal(true);
                      }
                    }}
                    style={{
                    aspectRatio: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    background: day === null ? 'transparent' : 
                               isToday ? '#1f2937' : 'rgba(255, 255, 255, 0.5)',
                    color: day === null ? 'transparent' : 
                          isToday ? 'white' : '#1f2937',
                    fontSize: '16px',
                    fontWeight: isToday ? '700' : '500',
                    fontFamily: '"Inter", sans-serif',
                    cursor: day === null ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isToday ? '0 4px 12px rgba(31, 41, 59, 0.3)' : 'none',
                    position: 'relative',
                    padding: '4px'
                  }}>
                    {isPayday && (
                      <div style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#10b981'
                      }}>$</div>
                    )}
                    <span>{day}</span>
                    {dayHasEvent && (
                      <div style={{
                        display: 'flex',
                        gap: '2px',
                        marginTop: '2px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}>
                        {dayEvents.slice(0, 3).map((event, i) => (
                          <div
                            key={i}
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: event.color
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '20px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '600',
              color: '#1f2937'
            }}>Upcoming Events</h3>
            
            {upcomingEvents.length === 0 ? (
              <div style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '40px 20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                textAlign: 'center'
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  color: '#6b7280',
                  fontFamily: '"Inter", sans-serif'
                }}>No upcoming events. Click "New Event" to create one!</p>
              </div>
            ) : (
              <div style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}>
                {upcomingEvents.map((event, index) => {
                  const startDate = new Date(event.startDate);
                  const endDate = new Date(event.endDate);
                  const isSameDay = event.startDate === event.endDate;
                  const dateString = isSameDay
                    ? startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

                  // Check if event is active today
                  const today = new Date();
                  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                  const isActiveToday = todayStr >= event.startDate && todayStr <= event.endDate;
                  const percentage = (event.spent / event.limit) * 100;
                  const remaining = event.limit - event.spent;
                  const progressColor = getProgressColor(event.spent, event.limit);

                  return (
                    <div
                      key={event.id}
                      onClick={() => handleEditEvent(event)}
                      style={{
                        borderLeft: `4px solid ${event.color}`,
                        paddingLeft: '16px',
                        marginBottom: index < upcomingEvents.length - 1 ? '16px' : '0',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                        ':hover': {
                          transform: 'translateX(4px)'
                        }
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isActiveToday ? '12px' : '0' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            margin: '0 0 4px 0',
                            fontSize: '16px',
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: '600',
                            color: '#1f2937'
                          }}>{event.name}</h4>
                          <p style={{
                            margin: '0 0 8px 0',
                            fontSize: '13px',
                            color: '#6b7280',
                            fontFamily: '"Inter", sans-serif'
                          }}>{dateString}</p>
                          <div style={{
                            background: event.color,
                            borderRadius: '8px',
                            padding: '8px 12px',
                            display: 'inline-block'
                          }}>
                            <p style={{
                              margin: 0,
                              fontSize: '16px',
                              fontWeight: '600',
                              color: 'white',
                              fontFamily: '"Inter", sans-serif'
                            }}>${event.limit} budget</p>
                          </div>
                        </div>
                        <div style={{
                          background: 'rgba(107, 114, 128, 0.1)',
                          borderRadius: '8px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          {event.priority} Priority
                        </div>
                      </div>

                      {/* Show spending progress if event is active today */}
                      {isActiveToday && (
                        <div style={{ marginTop: '12px' }}>
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '12px',
                            height: '8px',
                            overflow: 'hidden',
                            marginBottom: '12px'
                          }}>
                            <div style={{
                              background: `linear-gradient(90deg, ${progressColor} 0%, ${progressColor}dd 100%)`,
                              height: '100%',
                              width: `${Math.min(percentage, 100)}%`,
                              transition: 'width 0.5s ease',
                              borderRadius: '12px'
                            }} />
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <p style={{
                                margin: '0 0 2px 0',
                                fontSize: '18px',
                                fontWeight: '700',
                                color: progressColor,
                                fontFamily: '"Inter", sans-serif'
                              }}>${event.spent}</p>
                              <p style={{
                                margin: 0,
                                fontSize: '11px',
                                color: '#6b7280',
                                fontFamily: '"Inter", sans-serif'
                              }}>spent</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <p style={{
                                margin: '0 0 2px 0',
                                fontSize: '18px',
                                fontWeight: '700',
                                color: progressColor,
                                fontFamily: '"Inter", sans-serif'
                              }}>${remaining}</p>
                              <p style={{
                                margin: 0,
                                fontSize: '11px',
                                color: '#6b7280',
                                fontFamily: '"Inter", sans-serif'
                              }}>remaining</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <p style={{
                                margin: '0 0 2px 0',
                                fontSize: '18px',
                                fontWeight: '700',
                                color: progressColor,
                                fontFamily: '"Inter", sans-serif'
                              }}>{Math.round(percentage)}%</p>
                              <p style={{
                                margin: 0,
                                fontSize: '11px',
                                color: '#6b7280',
                                fontFamily: '"Inter", sans-serif'
                              }}>used</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* New Event Modal */}
        {showNewEventModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '28px',
              maxWidth: '400px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>{editingEvent ? 'Edit Event' : 'New Event'}</h3>
                <button
                  onClick={() => {
                    setShowNewEventModal(false);
                    setEditingEvent(null);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={24} color="#6b7280" />
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: '"Inter", sans-serif'
                }}>Event Name *</label>
                <input
                  type="text"
                  value={newEventData.name}
                  onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })}
                  placeholder="e.g., Spring Break Trip"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: '"Inter", sans-serif'
                }}>Priority / Significance *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Low', 'Medium', 'High'].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setNewEventData({ ...newEventData, priority })}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '12px',
                        border: newEventData.priority === priority ? '2px solid #1f2937' : '1px solid #d1d5db',
                        background: newEventData.priority === priority ? '#1f2937' : 'white',
                        color: newEventData.priority === priority ? 'white' : '#6b7280',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: '"Inter", sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                    fontFamily: '"Inter", sans-serif'
                  }}>Start Date *</label>
                  <input
                    type="date"
                    value={newEventData.startDate}
                    onChange={(e) => setNewEventData({ ...newEventData, startDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '15px',
                      fontFamily: '"Inter", sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                    fontFamily: '"Inter", sans-serif'
                  }}>End Date *</label>
                  <input
                    type="date"
                    value={newEventData.endDate}
                    onChange={(e) => setNewEventData({ ...newEventData, endDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '15px',
                      fontFamily: '"Inter", sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: '"Inter", sans-serif'
                }}>Starting Balance</label>
                <input
                  type="number"
                  value={newEventData.startingBalance}
                  onChange={(e) => setNewEventData({ ...newEventData, startingBalance: e.target.value })}
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                  fontFamily: '"Inter", sans-serif'
                }}>Budget Limit *</label>
                <input
                  type="number"
                  value={newEventData.limit}
                  onChange={(e) => setNewEventData({ ...newEventData, limit: e.target.value })}
                  placeholder="500"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {editingEvent && (
                  <button
                    onClick={() => handleDeleteEvent(editingEvent.id)}
                    style={{
                      flex: 1,
                      background: '#ef4444',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: '"Inter", sans-serif',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                )}
                <button
                  onClick={handleCreateEvent}
                  style={{
                    flex: editingEvent ? 1 : 'auto',
                    width: editingEvent ? 'auto' : '100%',
                    background: '#1f2937',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '"Inter", sans-serif',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Check size={18} />
                  {editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Day Click Modal */}
        {showDayModal && selectedDayData && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}
          onClick={() => setShowDayModal(false)}
          >
            <div 
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '28px',
                maxWidth: '400px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {new Date(selectedDayData.year, selectedDayData.month, selectedDayData.day).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </h3>
                <button
                  onClick={() => setShowDayModal(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={24} color="#6b7280" />
                </button>
              </div>

              {(() => {
                const dateStr = `${selectedDayData.year}-${String(selectedDayData.month + 1).padStart(2, '0')}-${String(selectedDayData.day).padStart(2, '0')}`;
                const dayPaydays = getPaydaysForDate(dateStr);
                const hasPayday = dayPaydays.length > 0;
                const paydayTotal = dayPaydays.reduce((sum, e) => sum + e.amount, 0);

                return (
                  <>
                    {/* Payday banner in modal */}
                    {hasPayday && (
                      <div style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '14px',
                        padding: '14px 18px',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <span style={{ fontSize: '28px' }}>💰</span>
                        <div>
                          <p style={{ margin: '0 0 2px 0', fontSize: '16px', fontWeight: '700', color: 'white', fontFamily: '"Inter", sans-serif' }}>
                            Payday
                          </p>
                          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.9)', fontFamily: '"Inter", sans-serif' }}>
                            {dayPaydays.map(e => e.source).join(', ')} · +${paydayTotal}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedDayData.events.length === 0 && !hasPayday ? (
                      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <p style={{ margin: 0, fontSize: '18px', fontWeight: '500', color: '#6b7280', fontFamily: '"Inter", sans-serif' }}>
                          No Events Scheduled
                        </p>
                      </div>
                    ) : selectedDayData.events.length === 0 && hasPayday ? (
                      <div style={{ textAlign: 'center', padding: '20px 20px 10px' }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>
                          No other events on this day.
                        </p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {selectedDayData.events.map(event => {
                          const today = new Date();
                          const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                          const isActiveToday = todayStr >= event.startDate && todayStr <= event.endDate;
                          const percentage = (event.spent / event.limit) * 100;
                          const remaining = event.limit - event.spent;
                          const progressColor = getProgressColor(event.spent, event.limit);

                          return (
                            <div
                              key={event.id}
                              style={{
                                background: 'rgba(249, 250, 251, 1)',
                                borderRadius: '16px',
                                padding: '20px',
                                border: `2px solid ${event.color}`
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <h4 style={{
                                  margin: 0,
                                  fontSize: '18px',
                                  fontFamily: '"Inter", sans-serif',
                                  fontWeight: '600',
                                  color: '#1f2937'
                                }}>{event.name}</h4>
                                <div style={{
                                  background: event.color,
                                  borderRadius: '8px',
                                  padding: '4px 10px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  color: 'white',
                                  fontFamily: '"Inter", sans-serif'
                                }}>
                                  {event.priority} Priority
                                </div>
                              </div>

                              <div style={{
                                background: event.color,
                                borderRadius: '10px',
                                padding: '10px 14px',
                                marginBottom: '16px',
                                display: 'inline-block'
                              }}>
                                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'white', fontFamily: '"Inter", sans-serif' }}>Budget: ${event.limit}</p>
                              </div>

                              {isActiveToday && (
                                <>
                                  <div style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', height: '10px', overflow: 'hidden', marginBottom: '16px' }}>
                                    <div style={{ background: `linear-gradient(90deg, ${progressColor} 0%, ${progressColor}dd 100%)`, height: '100%', width: `${Math.min(percentage, 100)}%`, transition: 'width 0.5s ease', borderRadius: '12px' }} />
                                  </div>
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '12px' }}>
                                    {[
                                      { val: `$${event.spent}`, label: 'Spent' },
                                      { val: `$${remaining}`, label: 'Remaining' },
                                      { val: `${Math.round(percentage)}%`, label: 'Used' }
                                    ].map(stat => (
                                      <div key={stat.label} style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '700', color: progressColor, fontFamily: '"Inter", sans-serif' }}>{stat.val}</p>
                                        <p style={{ margin: 0, fontSize: '11px', color: '#6b7280', fontFamily: '"Inter", sans-serif', fontWeight: '500' }}>{stat.label}</p>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    );
  };

  const SCHEMES = [
    {
      id: 'coast',
      label: 'Coasting',
      emoji: '🏖️',
      tagline: 'Bare minimum, no stress',
      description: 'Track spending loosely. No strict goals — just stay aware of where your money goes.',
      energy: 1,
      color: '#6b7280',
      gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
      perks: ['Basic expense tracking', 'Loose weekly awareness', 'No pressure alerts']
    },
    {
      id: 'steady',
      label: 'Steady',
      emoji: '🚶',
      tagline: 'Slow and consistent',
      description: 'Build small saving habits over time without disrupting your lifestyle.',
      energy: 2,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      perks: ['Monthly savings targets', 'Gentle budget reminders', 'Goal progress tracking']
    },
    {
      id: 'balanced',
      label: 'Balanced',
      emoji: '⚖️',
      tagline: 'Smart middle ground',
      description: 'Mix of enjoying the present and saving for the future — the most popular choice.',
      energy: 3,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      perks: ['Weekly & monthly goals', 'Spending summaries', 'Payday allocation prompts']
    },
    {
      id: 'focused',
      label: 'Focused',
      emoji: '🎯',
      tagline: 'Goal-driven saving',
      description: 'Every dollar has a job. Savings goals are front and center every time you open the app.',
      energy: 4,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      perks: ['Active goal tracking', 'Budget alerts at 75%', 'Surplus auto-allocation']
    },
    {
      id: 'grind',
      label: 'Full Grind',
      emoji: '🔥',
      tagline: 'Maximum savings mode',
      description: 'Cut spending at every corner. Every extra dollar gets routed to your goals — no exceptions.',
      energy: 5,
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      perks: ['Daily spend check-ins', 'Strict category limits', 'Aggressive goal timelines']
    }
  ];
// Scheme budget multipliers
const SCHEME_MULTIPLIERS = {
  'coasting': 1.0,
  'steady': 0.95,
  'balanced': 0.85,
  'focused': 0.75,
  'grind': 0.65
};

// Get adjusted limit based on active scheme
const getAdjustedLimit = (baseLimit) => {
  if (!selectedScheme) return baseLimit;
  const multiplier = SCHEME_MULTIPLIERS[selectedScheme] || 1.0;
  return Math.round(baseLimit * multiplier);
};
  const renderGoalsPage = () => {
    const activeGoals = savingsGoals.filter(goal => selectedGoals.includes(goal.id));
    const schemes = SCHEMES;
    if (schemeView === 'goals') {
      return (
        <div style={{ paddingBottom: '120px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(31, 41, 59, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            padding: '40px 24px 28px 24px',
            borderRadius: '0 0 24px 24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
          }}>

            <button
              onClick={() => setSchemeView('home')}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '10px',
                padding: '6px 12px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '12px'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              Plan
            </button>
            <h1 style={{ margin: '0 0 4px 0', color: 'white', fontSize: '26px', fontFamily: '"Inter", sans-serif', fontWeight: '600', letterSpacing: '-0.02em' }}>Savings Goals</h1>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontFamily: '"Inter", sans-serif' }}>Set targets and track your progress</p>
          </div>

          <div style={{ padding: '24px' }}>

          {/* Spending Summary Trigger Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <button
              onClick={() => triggerSpendingNotification('daily')}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '14px',
                padding: '14px',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>📅</div>
              <p style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: '600',
                color: '#1f2937',
                fontFamily: '"Inter", sans-serif'
              }}>Day Summary</p>
            </button>
            <button
              onClick={() => triggerSpendingNotification('weekly')}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '14px',
                padding: '14px',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>📊</div>
              <p style={{
                margin: 0,
                fontSize: '13px',
                fontWeight: '600',
                color: '#1f2937',
                fontFamily: '"Inter", sans-serif'
              }}>Week Summary</p>
            </button>
          </div>

          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                margin: '0 0 14px 0',
                fontSize: '20px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                color: '#1f2937'
              }}>Active Goals ({activeGoals.length})</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeGoals.map(goal => {
                  const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
                  const remaining = goal.target - goal.current;
                  const progressColor = getGoalProgressColor(goal.current, goal.target);
                  const inputVal = goalProgressInputs[goal.id] !== undefined ? goalProgressInputs[goal.id] : goal.current;

                  return (
                    <div
                      key={goal.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '20px',
                        border: `2px solid ${goal.color}`,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                      }}
                    >
                      {/* Header row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                          <div style={{ fontSize: '32px' }}>{goal.icon}</div>
                          <div>
                            <h4 style={{
                              margin: '0 0 2px 0',
                              fontSize: '16px',
                              fontFamily: '"Inter", sans-serif',
                              fontWeight: '700',
                              color: '#1f2937'
                            }}>{goal.name}</h4>
                            <p style={{
                              margin: 0,
                              fontSize: '12px',
                              color: '#6b7280',
                              fontFamily: '"Inter", sans-serif'
                            }}>{goal.category}</p>
                          </div>
                        </div>
                        {/* Trash icon for ALL active goals */}
                        <button
                          onClick={() => handleDeactivateGoal(goal.id)}
                          title="Deactivate goal"
                          style={{
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '10px',
                            padding: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Trash2 size={16} color="#ef4444" />
                        </button>
                      </div>

                      {/* Progress bar */}
                      <div style={{
                        background: 'rgba(229, 231, 235, 1)',
                        borderRadius: '99px',
                        height: '10px',
                        overflow: 'hidden',
                        marginBottom: '10px'
                      }}>
                        <div style={{
                          background: `linear-gradient(90deg, ${progressColor} 0%, ${progressColor}cc 100%)`,
                          height: '100%',
                          width: `${Math.min(percentage, 100)}%`,
                          transition: 'width 0.5s ease',
                          borderRadius: '99px'
                        }} />
                      </div>

                      {/* Stats row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div>
                          <p style={{ margin: '0 0 1px 0', fontSize: '18px', fontWeight: '700', color: progressColor, fontFamily: '"Inter", sans-serif' }}>${goal.current}</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>saved</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ margin: '0 0 1px 0', fontSize: '18px', fontWeight: '700', color: '#6b7280', fontFamily: '"Inter", sans-serif' }}>${remaining}</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>to go</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: '0 0 1px 0', fontSize: '18px', fontWeight: '700', color: progressColor, fontFamily: '"Inter", sans-serif' }}>{Math.round(percentage)}%</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>done</p>
                        </div>
                      </div>

                      {/* Direct progress input */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: '600',
                            color: '#9ca3af',
                            marginBottom: '4px',
                            fontFamily: '"Inter", sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>Saved so far ($)</label>
                          <input
                            type="number"
                            value={inputVal}
                            onChange={(e) => {
                              setGoalProgressInputs(prev => ({ ...prev, [goal.id]: e.target.value }));
                            }}
                            onBlur={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val)) {
                                handleUpdateGoalProgress(goal.id, val);
                              }
                              setGoalProgressInputs(prev => {
                                const next = { ...prev };
                                delete next[goal.id];
                                return next;
                              });
                            }}
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              border: `1px solid ${goal.color}55`,
                              fontSize: '15px',
                              fontFamily: '"Inter", sans-serif',
                              boxSizing: 'border-box',
                              background: 'white',
                              color: '#1f2937',
                              outline: 'none'
                            }}
                          />
                        </div>
                        <div style={{ width: '90px' }}>
                          <label style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: '600',
                            color: '#9ca3af',
                            marginBottom: '4px',
                            fontFamily: '"Inter", sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>Target ($)</label>
                          <input
                            type="number"
                            value={goal.target}
                            onChange={(e) => handleUpdateGoalTarget(goal.id, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              border: '1px solid #d1d5db',
                              fontSize: '15px',
                              fontFamily: '"Inter", sans-serif',
                              boxSizing: 'border-box',
                              background: 'white',
                              color: '#1f2937',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      {goal.deadline && (
                        <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#6b7280', fontFamily: '"Inter", sans-serif', textAlign: 'center' }}>
                          🗓 Deadline: {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Goals */}
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '20px',
            fontFamily: '"Inter", sans-serif',
            fontWeight: '600',
            color: '#1f2937'
          }}>Available Goals</h3>
          <p style={{
            margin: '-8px 0 14px 0',
            fontSize: '13px',
            color: '#9ca3af',
            fontFamily: '"Inter", sans-serif'
          }}>Tap to activate. Remove via 🗑 in the active card.</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '16px'
          }}>
            {savingsGoals.map(goal => {
              const isSelected = selectedGoals.includes(goal.id);
              const timeline = goalTimelines[goal.id];
              const isLocked = !!timeline;
              
              return (
                <div
                  key={goal.id}
                  onClick={() => handleToggleGoal(goal.id)}
                  style={{
                    background: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: isSelected ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                    border: isLocked
                      ? `2px solid ${goal.color}`
                      : isSelected ? `2px solid ${goal.color}` : '2px solid rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Lock button — top left */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLocked) {
                        handleRemoveGoalLock(goal.id);
                      } else {
                        setLockDraft({ startDate: '', endDate: '' });
                        setLockingGoalId(goal.id);
                      }
                    }}
                    title={isLocked ? 'Remove timeline lock' : 'Lock in a timeline for this goal'}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: isLocked ? `${goal.color}22` : 'rgba(107, 114, 128, 0.1)',
                      border: isLocked ? `1px solid ${goal.color}55` : '1px solid transparent',
                      borderRadius: '8px',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '14px',
                      lineHeight: 1,
                      zIndex: 2
                    }}
                  >
                    {isLocked ? '🔒' : '🔓'}
                  </button>

                  {/* Active checkmark — top right */}
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: goal.color,
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={16} color="white" strokeWidth={3} />
                    </div>
                  )}
                  
                  <div style={{ fontSize: '36px', marginBottom: '6px', marginTop: '12px' }}>{goal.icon}</div>
                  <h4 style={{
                    margin: '0 0 4px 0',
                    fontSize: '14px',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>{goal.name}</h4>
                  <p style={{
                    margin: '0 0 8px 0',
                    fontSize: '11px',
                    color: '#6b7280',
                    fontFamily: '"Inter", sans-serif',
                    lineHeight: '1.4'
                  }}>{goal.description}</p>

                  {/* Timeline pill if locked */}
                  {isLocked && (
                    <div style={{
                      background: `${goal.color}18`,
                      borderRadius: '6px',
                      padding: '4px 7px',
                      marginBottom: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{ fontSize: '10px' }}>📅</span>
                      <span style={{ fontSize: '10px', fontWeight: '600', color: goal.color, fontFamily: '"Inter", sans-serif' }}>
                        {new Date(timeline.startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {timeline.endDate ? ` → ${new Date(timeline.endDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ' →'}
                      </span>
                    </div>
                  )}

                  <div style={{
                    background: isSelected ? goal.color : 'rgba(107, 114, 128, 0.1)',
                    borderRadius: '8px',
                    padding: '5px 9px',
                    display: 'inline-block'
                  }}>
                    <p style={{
                      margin: 0,
                      fontSize: '12px',
                      fontWeight: '600',
                      color: isSelected ? 'white' : '#6b7280',
                      fontFamily: '"Inter", sans-serif'
                    }}>${goal.target}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lock Timeline Modal */}
          {lockingGoalId !== null && (() => {
            const goal = savingsGoals.find(g => g.id === lockingGoalId);
            if (!goal) return null;
            return (
              <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                zIndex: 3500,
                padding: '0 0 90px 0'
              }}
              onClick={() => setLockingGoalId(null)}
              >
                <div
                  style={{
                    background: 'white',
                    borderRadius: '28px 28px 24px 24px',
                    padding: '28px 24px 24px 24px',
                    width: '100%',
                    maxWidth: '430px',
                    boxShadow: '0 -8px 40px rgba(0,0,0,0.2)'
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '28px' }}>{goal.icon}</span>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>
                          Lock Timeline
                        </h3>
                        <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>{goal.name}</p>
                      </div>
                    </div>
                    <button onClick={() => setLockingGoalId(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
                      <X size={22} color="#6b7280" />
                    </button>
                  </div>

                  <p style={{ margin: '12px 0 20px 0', fontSize: '13px', color: '#6b7280', fontFamily: '"Inter", sans-serif', lineHeight: '1.5' }}>
                    Set a dedicated time window for this goal. The app will track your progress and remind you within this period.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={lockDraft.startDate}
                        onChange={e => setLockDraft(prev => ({ ...prev, startDate: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '12px',
                          border: `1.5px solid ${lockDraft.startDate ? goal.color : '#d1d5db'}`,
                          fontSize: '14px',
                          fontFamily: '"Inter", sans-serif',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '6px', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        End Date
                      </label>
                      <input
                        type="date"
                        value={lockDraft.endDate}
                        onChange={e => setLockDraft(prev => ({ ...prev, endDate: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '12px',
                          border: `1.5px solid ${lockDraft.endDate ? goal.color : '#d1d5db'}`,
                          fontSize: '14px',
                          fontFamily: '"Inter", sans-serif',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {lockDraft.startDate && lockDraft.endDate && new Date(lockDraft.endDate) > new Date(lockDraft.startDate) && (() => {
                    const days = Math.round((new Date(lockDraft.endDate) - new Date(lockDraft.startDate)) / (1000 * 60 * 60 * 24));
                    const perDay = (goal.target / days).toFixed(2);
                    return (
                      <div style={{ background: `${goal.color}12`, borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', border: `1px solid ${goal.color}30` }}>
                        <p style={{ margin: 0, fontSize: '13px', color: goal.color, fontFamily: '"Inter", sans-serif', fontWeight: '600' }}>
                          📈 {days} days · ~${perDay}/day to hit your ${goal.target} goal
                        </p>
                      </div>
                    );
                  })()}

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => setLockingGoalId(null)}
                      style={{ flex: 1, padding: '14px', borderRadius: '14px', border: '1px solid #e5e7eb', background: 'white', color: '#6b7280', fontSize: '15px', fontWeight: '600', fontFamily: '"Inter", sans-serif', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmGoalLock}
                      style={{ flex: 2, padding: '14px', borderRadius: '14px', border: 'none', background: goal.color, color: 'white', fontSize: '15px', fontWeight: '600', fontFamily: '"Inter", sans-serif', cursor: 'pointer', boxShadow: `0 4px 14px ${goal.color}44` }}
                    >
                      🔒 Lock This Goal
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Add Custom Goal Button */}
          {!showAddCustomGoal ? (
            <button
              onClick={() => setShowAddCustomGoal(true)}
              style={{
                width: '100%',
                background: '#1f2937',
                border: 'none',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(31, 41, 59, 0.2)',
                transition: 'transform 0.2s ease'
              }}
            >
              <Plus size={20} color="white" strokeWidth={2.5} />
              <span style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif'
              }}>Add Custom Goal</span>
            </button>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(107, 114, 128, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '20px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>Custom Goal</h3>
                <button
                  onClick={() => {
                    setShowAddCustomGoal(false);
                    setCustomGoal({ name: '', target: '', deadline: '' });
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>Goal Name *</label>
                <input
                  type="text"
                  value={customGoal.name}
                  onChange={(e) => setCustomGoal({ ...customGoal, name: e.target.value })}
                  placeholder="e.g., New Bike"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>Target Amount ($) *</label>
                <input
                  type="number"
                  value={customGoal.target}
                  onChange={(e) => setCustomGoal({ ...customGoal, target: e.target.value })}
                  placeholder="500"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>Deadline (Optional)</label>
                <input
                  type="date"
                  value={customGoal.deadline}
                  onChange={(e) => setCustomGoal({ ...customGoal, deadline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                onClick={handleAddCustomGoal}
                style={{
                  width: '100%',
                  background: '#1f2937',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '"Inter", sans-serif',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Check size={18} />
                Create Goal
              </button>
            </div>
          )}
        </div>

        {/* Spending Notification Modal */}
        {showSpendingNotification && (() => {
          const limit = spendingNotificationType === 'daily' ? weeklyLimit / 7 : weeklyLimit;
          const spent = spendingNotificationType === 'daily' ? weeklySpent / 7 : weeklySpent;
          const hasSavings = savedAmount > 0;
          const activeGoals = savingsGoals.filter(goal => selectedGoals.includes(goal.id));

          return (
            <div style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              zIndex: 3000,
              padding: '0 0 90px 0'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '28px 28px 24px 24px',
                padding: '28px 24px 24px 24px',
                width: '100%',
                maxWidth: '430px',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.2)'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 2px 0', fontSize: '22px', fontWeight: '700', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>
                      {spendingNotificationType === 'daily' ? '📅 Daily Summary' : '📊 Weekly Summary'}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>
                      {spendingNotificationType === 'daily' ? "Here's how today looked" : "Here's how your week looked"}
                    </p>
                  </div>
                  <button onClick={() => setShowSpendingNotification(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    <X size={22} color="#6b7280" />
                  </button>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { label: 'Limit', value: `$${Math.round(limit)}`, color: '#6366f1' },
                    { label: 'Spent', value: `$${Math.round(spent)}`, color: spent > limit ? '#ef4444' : '#1f2937' },
                    { label: hasSavings ? '✓ Saved' : 'Over', value: `$${savedAmount}`, color: hasSavings ? '#10b981' : '#ef4444' }
                  ].map(stat => (
                    <div key={stat.label} style={{ background: '#f9fafb', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                      <p style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '700', color: stat.color, fontFamily: '"Inter", sans-serif' }}>{stat.value}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {hasSavings ? (
                  <>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%)',
                      border: '1px solid rgba(16,185,129,0.3)',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      marginBottom: '20px',
                      textAlign: 'center'
                    }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#065f46', fontFamily: '"Inter", sans-serif' }}>
                        🎉 You saved <strong>${savedAmount}</strong>! Where should it go?
                      </p>
                    </div>

                    {activeGoals.length > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '600', color: '#6b7280', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Allocate to a Goal</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                          {activeGoals.map(goal => (
                            <button
                              key={goal.id}
                              onClick={() => setAllocationGoalId(allocationGoalId === goal.id ? null : goal.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 14px',
                                borderRadius: '12px',
                                border: allocationGoalId === goal.id ? `2px solid ${goal.color}` : '1px solid #e5e7eb',
                                background: allocationGoalId === goal.id ? `${goal.color}10` : 'white',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span style={{ fontSize: '24px' }}>{goal.icon}</span>
                              <div style={{ flex: 1 }}>
                                <p style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '600', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>{goal.name}</p>
                                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>${goal.current} / ${goal.target}</p>
                              </div>
                              {allocationGoalId === goal.id && (
                                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: goal.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Check size={14} color="white" strokeWidth={3} />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={handleReturnToFundingPot}
                        style={{
                          flex: 1,
                          padding: '14px',
                          borderRadius: '14px',
                          border: '1px solid #e5e7eb',
                          background: 'white',
                          color: '#6b7280',
                          fontSize: '14px',
                          fontWeight: '600',
                          fontFamily: '"Inter", sans-serif',
                          cursor: 'pointer'
                        }}
                      >
                        💰 Keep in Pot
                      </button>
                      {allocationGoalId && (
                        <button
                          onClick={() => handleAllocateToGoal(allocationGoalId)}
                          style={{
                            flex: 1,
                            padding: '14px',
                            borderRadius: '14px',
                            border: 'none',
                            background: '#10b981',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: '"Inter", sans-serif',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
                          }}
                        >
                          ✓ Allocate ${savedAmount}
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      marginBottom: '20px',
                      textAlign: 'center'
                    }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#991b1b', fontFamily: '"Inter", sans-serif' }}>
                        You went over budget this {spendingNotificationType === 'daily' ? 'day' : 'week'}. Try to cut back next time! 💪
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSpendingNotification(false)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '14px',
                        border: 'none',
                        background: '#1f2937',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: '600',
                        fontFamily: '"Inter", sans-serif',
                        cursor: 'pointer'
                      }}
                    >
                      Got it
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    );
    }
    // ── Plan Home Screen ──────────────────────────────────────────
    return (
      <div style={{ paddingBottom: '120px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(31, 41, 59, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          padding: '40px 24px 28px 24px',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}>
          <h1 style={{ margin: '0 0 4px 0', color: 'white', fontSize: '28px', fontFamily: '"Inter", sans-serif', fontWeight: '700', letterSpacing: '-0.02em' }}>
            My Plan
          </h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontFamily: '"Inter", sans-serif' }}>
            Choose how you want to approach saving
          </p>
        </div>

        <div style={{ padding: '24px' }}>

          {/* Selected plan banner */}
          {selectedScheme && (() => {
            const active = schemes.find(s => s.id === selectedScheme);
            return (
              <div style={{
                background: active.gradient,
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '24px',
                boxShadow: `0 8px 24px ${active.color}44`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '40px' }}>{active.emoji}</span>
                  <div>
                    <p style={{ margin: '0 0 2px 0', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.75)', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active Plan</p>
                    <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: 'white', fontFamily: '"Inter", sans-serif' }}>{active.label}</h2>
                    <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontFamily: '"Inter", sans-serif' }}>{active.tagline}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {active.perks.map(perk => (
                    <div key={perk} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '99px', padding: '4px 10px' }}>
                      <span style={{ fontSize: '12px', color: 'white', fontFamily: '"Inter", sans-serif', fontWeight: '500' }}>✓ {perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Plan picker */}
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>
            {selectedScheme ? 'Change Plan' : 'Choose Your Plan'}
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>
            Pick the saving intensity that fits your lifestyle.
          </p>

          {/* Energy bar legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>Low effort</span>
            <div style={{ flex: 1, height: '6px', borderRadius: '99px', background: 'linear-gradient(to right, #6b7280, #3b82f6, #8b5cf6, #f59e0b, #ef4444)' }} />
            <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>Max savings</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {schemes.map(scheme => {
              const isActive = selectedScheme === scheme.id;
              return (
                <div
                  key={scheme.id}
                  onClick={() => setSelectedScheme(isActive ? null : scheme.id)}
                  style={{
                    background: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '18px',
                    padding: '18px 20px',
                    border: isActive ? `2px solid ${scheme.color}` : '2px solid rgba(255,255,255,0.5)',
                    boxShadow: isActive ? `0 4px 20px ${scheme.color}30` : '0 2px 10px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    position: 'relative'
                  }}
                >
                  {/* Energy dots */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flexShrink: 0 }}>
                    {[1,2,3,4,5].map(dot => (
                      <div key={dot} style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: dot <= scheme.energy ? scheme.color : '#e5e7eb',
                        transition: 'background 0.2s ease'
                      }} />
                    ))}
                  </div>

                  <div style={{ fontSize: '34px', flexShrink: 0 }}>{scheme.emoji}</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>{scheme.label}</h4>
                      <span style={{ fontSize: '12px', color: scheme.color, fontWeight: '600', fontFamily: '"Inter", sans-serif' }}>{scheme.tagline}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', fontFamily: '"Inter", sans-serif', lineHeight: '1.4' }}>
                      {scheme.description}
                    </p>
                  </div>

                  {isActive && (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: scheme.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Goals Folder */}
          <div
            onClick={() => setSchemeView('goals')}
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '20px',
              marginTop: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid rgba(255,255,255,0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>🏆</div>
              <div>
                <h3 style={{ margin: '0 0 3px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>Goals</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontFamily: '"Inter", sans-serif' }}>
                  {activeGoals.length > 0 ? `${activeGoals.length} active goal${activeGoals.length > 1 ? 's' : ''}` : 'Set savings targets'}
                </p>
              </div>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>

        </div>
      </div>
    );
  };

  const renderProfilePage = () => {
    const balanceData = getBalanceData();
    const trendline = calculateTrendline(balanceData);

    return (
      <div style={{ paddingBottom: '120px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(31, 41, 59, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          padding: '40px 24px 40px 24px',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>👤</div>
              <div>
                <h1 style={{
                  margin: '0 0 4px 0',
                  color: 'white',
                  fontSize: '28px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: '600',
                  letterSpacing: '-0.02em'
                }}>{userData.name}</h1>
                <p style={{
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontFamily: '"Inter", sans-serif'
                }}>Spendhen Member</p>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => {
              const currentUser = users.find(u => u.firstName === userData.name);
              if (currentUser) {
                setEditProfileData({
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName,
                  username: currentUser.username,
                  password: '',
                  email: currentUser.email,
                  phone: currentUser.phone
                });
              }
              setShowEditProfile(true);
            }}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: '"Inter", sans-serif',
              cursor: 'pointer',
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#1f2937',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <Award size={24} color="white" strokeWidth={2} />
              </div>
              <p style={{
                margin: '0 0 4px 0',
                fontSize: '28px',
                fontWeight: '700',
                color: '#1f2937',
                fontFamily: '"Inter", sans-serif'
              }}>{userData.daysUsing}</p>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: '#6b7280',
                fontFamily: '"Inter", sans-serif'
              }}>Days using Spendhen</p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#10b981',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <TrendingUp size={24} color="white" strokeWidth={2} />
              </div>
              <p style={{
                margin: '0 0 4px 0',
                fontSize: '28px',
                fontWeight: '700',
                color: '#10b981',
                fontFamily: '"Inter", sans-serif'
              }}>${userData.savedAmount}</p>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: '#6b7280',
                fontFamily: '"Inter", sans-serif'
              }}>Total saved</p>
            </div>
          </div>

          <div style={{
            background: userData.currentBalance > 0 
              ? 'rgba(16, 185, 129, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: userData.currentBalance > 0 
              ? '0 4px 20px rgba(16, 185, 129, 0.15)' 
              : '0 4px 20px rgba(239, 68, 68, 0.15)',
            border: userData.currentBalance > 0 
              ? '1px solid rgba(16, 185, 129, 0.2)' 
              : '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <p style={{
              margin: '0 0 8px 0',
              fontSize: '14px',
              color: userData.currentBalance > 0 ? '#059669' : '#dc2626',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '500'
            }}>Current Balance</p>
            <p style={{
              margin: 0,
              fontSize: '40px',
              fontWeight: '700',
              color: userData.currentBalance > 0 ? '#10b981' : '#ef4444',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '-0.02em'
            }}>
              {userData.currentBalance > 0 ? '+' : '-'}${Math.abs(userData.currentBalance)}
            </p>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '13px',
              color: userData.currentBalance > 0 ? '#059669' : '#dc2626',
              fontFamily: '"Inter", sans-serif'
            }}>
              {userData.currentBalance > 0 ? '🎉 You\'re in the green!' : '⚠️ Watch your spending'}
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{
                margin: 0,
                fontSize: '20px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                color: '#1f2937'
              }}>Balance History</h2>
              
              {/* Filter Button */}
              <button
                onClick={() => setShowBalanceFilter(!showBalanceFilter)}
                style={{
                  background: showBalanceFilter ? '#1f2937' : 'rgba(107, 114, 128, 0.1)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Filter size={16} color={showBalanceFilter ? 'white' : '#6b7280'} strokeWidth={2} />
                <span style={{
                  color: showBalanceFilter ? 'white' : '#6b7280',
                  fontSize: '13px',
                  fontWeight: '600',
                  fontFamily: '"Inter", sans-serif'
                }}>{balanceView}</span>
              </button>
            </div>

            {/* Filter Panel */}
            {showBalanceFilter && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <p style={{
                  margin: '0 0 10px 0',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#6b7280',
                  fontFamily: '"Inter", sans-serif'
                }}>View Period:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Q1', 'Q2', 'Q3', 'Q4', 'Annual'].map(period => (
                    <button
                      key={period}
                      onClick={() => setBalanceView(period)}
                      style={{
                        background: balanceView === period ? '#1f2937' : 'white',
                        color: balanceView === period ? 'white' : '#6b7280',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: '600',
                        fontFamily: '"Inter", sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {balanceData.map((record, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px'
                }}>
                  <div>
                    <p style={{
                      margin: '0 0 4px 0',
                      fontSize: '16px',
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>{record.month}</p>
                    <p style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#6b7280',
                      fontFamily: '"Inter", sans-serif'
                    }}>Month end balance</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      margin: 0,
                      fontSize: '24px',
                      fontWeight: '700',
                      color: record.balance > 0 ? '#10b981' : '#ef4444',
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      {record.balance > 0 ? '+' : '-'}${Math.abs(record.balance)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trend Graph with Trendline */}
            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '12px'
            }}>
              <p style={{
                margin: '0 0 12px 0',
                fontSize: '14px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
                color: '#6b7280',
                textAlign: 'center'
              }}>
                {balanceView === 'Annual' ? 'Annual Trend' : `${balanceView} Trend`}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                height: '140px',
                gap: '8px',
                position: 'relative'
              }}>
                {/* Trendline */}
                {trendline && (
                  <svg style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                  }}>
                    <line
                      x1="10%"
                      y1={`${100 - (trendline.intercept / Math.max(...balanceData.map(r => Math.abs(r.balance))) * 100)}%`}
                      x2="90%"
                      y2={`${100 - ((trendline.intercept + trendline.slope * (balanceData.length - 1)) / Math.max(...balanceData.map(r => Math.abs(r.balance))) * 100)}%`}
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.5"
                    />
                  </svg>
                )}

                {balanceData.map((record, index) => {
                  const maxBalance = Math.max(...balanceData.map(r => Math.abs(r.balance)));
                  const height = maxBalance > 0 ? (Math.abs(record.balance) / maxBalance) * 100 : 0;
                  
                  return (
                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '100%',
                        height: `${height}%`,
                        background: record.balance > 0 
                          ? 'linear-gradient(to top, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(to top, #ef4444 0%, #dc2626 100%)',
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.5s ease',
                        minHeight: height > 0 ? '4px' : '0'
                      }} />
                      <p style={{
                        margin: '8px 0 0 0',
                        fontSize: balanceView === 'Annual' ? '10px' : '12px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '600',
                        color: '#6b7280'
                      }}>{record.month}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
{/* Roommate Split Bills Section */}
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
    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>
      Roommate Split Bills
    </h3>
    <button
      onClick={() => setShowAddRoommate(true)}
      style={{
        background: '#1f2937',
        border: 'none',
        borderRadius: '10px',
        padding: '8px 16px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      <Plus size={16} /> Add Roommate
    </button>
  </div>

  {/* Balance Summary */}
  {(() => {
    const balances = getRoommateBalances();
    const totalTheyOwe = Object.values(balances).reduce((sum, b) => sum + b.theyOwe, 0);
    const totalIOwe = Object.values(balances).reduce((sum, b) => sum + b.iOwe, 0);
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          background: '#10b98115',
          border: '1px solid #10b98130',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#059669', fontWeight: '600', fontFamily: '"Inter", sans-serif' }}>
            OWED TO YOU
          </p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#10b981', fontFamily: '"Inter", sans-serif' }}>
            ${totalTheyOwe.toFixed(2)}
          </p>
        </div>
        <div style={{
          background: '#ef444415',
          border: '1px solid #ef444430',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#dc2626', fontWeight: '600', fontFamily: '"Inter", sans-serif' }}>
            YOU OWE
          </p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#ef4444', fontFamily: '"Inter", sans-serif' }}>
            ${totalIOwe.toFixed(2)}
          </p>
        </div>
      </div>
    );
  })()}

  {/* Roommate List */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {roommates.map(roommate => {
      const balances = getRoommateBalances();
      const balance = balances[roommate.id];
      
      return (
        <div key={roommate.id} style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: `2px solid ${roommate.color}20`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: roommate.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '16px'
            }}>
              {roommate.name.charAt(0)}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>
                {roommate.name}
              </p>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontFamily: '"Inter", sans-serif' }}>
                {balance.theyOwe > 0 ? `Owes you $${balance.theyOwe.toFixed(2)}` : 
                 balance.iOwe > 0 ? `You owe $${balance.iOwe.toFixed(2)}` : 
                 'All settled up'}
              </p>
            </div>
{/* Settlement Button */}
{balance.theyOwe > 0 && (
  <button
    onClick={() => {
      // Mark all split expenses with this roommate as settled
      setExpenses(expenses.map(exp => {
        if (exp.isSplit && exp.splitWith?.includes(roommate.id)) {
          return {
            ...exp,
            settlementStatus: {
              ...exp.settlementStatus,
              [roommate.id]: 'settled'
            }
          };
        }
        return exp;
      }));
    }}
    style={{
      padding: '6px 12px',
      borderRadius: '8px',
      border: 'none',
      background: '#10b981',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      fontFamily: '"Inter", sans-serif'
    }}
  >
    ✓ Settle Up
  </button>
)}
          </div>
          <button
            onClick={() => handleRemoveRoommate(roommate.id)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <Trash2 size={18} color="#ef4444" />
          </button>
        </div>
      );
    })}
  </div>
</div>

{/* Add Roommate Modal */}
{showAddRoommate && (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px'
  }}
  onClick={() => setShowAddRoommate(false)}
  >
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '24px',
      maxWidth: '400px',
      width: '100%'
    }}
    onClick={e => e.stopPropagation()}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>
        Add Roommate
      </h3>
      <input
        type="text"
        placeholder="Roommate name"
        value={newRoommateName}
        onChange={e => setNewRoommateName(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: '1px solid #d1d5db',
          fontSize: '15px',
          fontFamily: '"Inter", sans-serif',
          marginBottom: '16px',
          boxSizing: 'border-box'
        }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setShowAddRoommate(false)}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #d1d5db',
            background: 'white',
            color: '#6b7280',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleAddRoommate}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '10px',
            border: 'none',
            background: '#1f2937',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}
```
        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              margin: '20px 0'
            }}>
              <button
                onClick={() => setShowEditProfile(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={24} color="#6b7280" />
              </button>

              <h2 style={{
                margin: '0 0 24px 0',
                fontSize: '24px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '700',
                color: '#1f2937'
              }}>Edit Profile</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '6px',
                    fontFamily: '"Inter", sans-serif'
                  }}>First Name</label>
                  <input
                    type="text"
                    value={editProfileData.firstName}
                    onChange={(e) => setEditProfileData({ ...editProfileData, firstName: e.target.value })}
                    placeholder="First name"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '15px',
                      fontFamily: '"Inter", sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '6px',
                    fontFamily: '"Inter", sans-serif'
                  }}>Last Name</label>
                  <input
                    type="text"
                    value={editProfileData.lastName}
                    onChange={(e) => setEditProfileData({ ...editProfileData, lastName: e.target.value })}
                    placeholder="Last name"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '15px',
                      fontFamily: '"Inter", sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>Username</label>
                <input
                  type="text"
                  value={editProfileData.username}
                  onChange={(e) => setEditProfileData({ ...editProfileData, username: e.target.value })}
                  placeholder="Username"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>New Password (leave blank to keep current)</label>
                <input
                  type="password"
                  value={editProfileData.password}
                  onChange={(e) => setEditProfileData({ ...editProfileData, password: e.target.value })}
                  placeholder="New password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>Email</label>
                <input
                  type="email"
                  value={editProfileData.email}
                  onChange={(e) => setEditProfileData({ ...editProfileData, email: e.target.value })}
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px',
                  fontFamily: '"Inter", sans-serif'
                }}>Phone Number</label>
                <input
                  type="tel"
                  value={editProfileData.phone}
                  onChange={(e) => setEditProfileData({ ...editProfileData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                onClick={handleUpdateProfile}
                style={{
                  width: '100%',
                  background: '#1f2937',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '"Inter", sans-serif',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      maxWidth: '430px',
      margin: '0 auto',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f9fafb 0%, #e5e7eb 100%)',
      fontFamily: '"Inter", sans-serif',
      position: 'relative'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Show auth screen if not authenticated */}
      {showAuthScreen && renderAuthScreen()}
      
      {/* Show startup animation after login */}
      {showStartupAnimation && renderStartupAnimation()}
      
      {/* Main app content - only show when authenticated */}
      {isAuthenticated && !showStartupAnimation && (
        <>
          {currentPage === 'home' && renderHomePage()}
          {currentPage === 'finance' && renderFinancePage()}
          {currentPage === 'goals' && renderGoalsPage()}
          {currentPage === 'calendar' && renderCalendarPage()}
          {currentPage === 'profile' && renderProfilePage()}

          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, rgba(31, 41, 59, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            padding: '12px 12px 28px 12px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: '24px 24px 0 0',
            boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: 'none',
            zIndex: 1000
          }}>
            <NavButton icon={Calendar} label="Home" page="home" currentPage={currentPage} onClick={() => setCurrentPage('home')} />
            <NavButton icon={DollarSign} label="Finance" page="finance" currentPage={currentPage} onClick={() => setCurrentPage('finance')} />
            <NavButton icon={Award} label="Plan" page="goals" currentPage={currentPage} onClick={() => setCurrentPage('goals')} />
            <NavButton icon={Target} label="Calendar" page="calendar" currentPage={currentPage} onClick={() => setCurrentPage('calendar')} />
            <NavButton icon={User} label="Profile" page="profile" currentPage={currentPage} onClick={() => setCurrentPage('profile')} />
          </div>
        </>
      )}
    </div>
  );
}
