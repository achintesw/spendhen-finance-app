#!/usr/bin/env python3
"""
Automated script to add Roommate Split Bills feature to SpendHen App.jsx
Run this in your spendhen-finance-app folder: python3 add-roommate-splits.py
"""

import re
import sys
from pathlib import Path

def add_roommate_splits():
    # Read the current App.jsx
    app_path = Path('src/App.jsx')
    
    if not app_path.exists():
        print("❌ Error: src/App.jsx not found!")
        print("Make sure you're running this from the spendhen-finance-app folder")
        sys.exit(1)
    
    with open(app_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("📖 Reading App.jsx...")
    
    # Backup original
    backup_path = Path('src/App.jsx.backup')
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"💾 Backup created: {backup_path}")
    
    # 1. Add roommate state variables
    print("➕ Adding roommate state variables...")
    state_insert = """
  
  // Roommate split bills states
  const [roommates, setRoommates] = useState([
    { id: 1, name: 'Alex Chen', color: '#3b82f6' },
    { id: 2, name: 'Jordan Smith', color: '#8b5cf6' }
  ]);
  const [showAddRoommate, setShowAddRoommate] = useState(false);
  const [newRoommateName, setNewRoommateName] = useState('');"""
    
    # Find the line after selectedScheme state
    pattern = r"(const \[selectedScheme, setSelectedScheme\] = useState\(null\);[^\n]*\n)"
    content = re.sub(pattern, r"\1" + state_insert + "\n", content, count=1)
    
    # 2. Add helper functions
    print("➕ Adding helper functions...")
    
    helpers = '''
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
'''
    
    # Insert helpers before renderHomePage function
    pattern = r"(  const renderHomePage = \(\) => {)"
    content = re.sub(pattern, helpers + "\n" + r"\1", content, count=1)
    
    print("✅ Roommate Split Bills feature added!")
    print("⚠️  Note: UI components for Profile and Finance pages need manual addition")
    print("📄 See ROOMMATE_SPLITS_IMPLEMENTATION.md for UI code to add")
    
    # Write updated content
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated: {app_path}")
    print(f"💾 Original backed up to: {backup_path}")
    print("\n🎯 Next steps:")
    print("1. Review the changes")
    print("2. Add UI components from ROOMMATE_SPLITS_IMPLEMENTATION.md")
    print("3. Test with: npm start")
    print("4. Push to GitHub: git add . && git commit -m 'Add roommate split bills feature' && git push")

if __name__ == '__main__':
    try:
        add_roommate_splits()
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
