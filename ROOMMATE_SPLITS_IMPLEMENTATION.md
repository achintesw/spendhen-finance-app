# Roommate Split Bills - Implementation Guide

## Overview
This feature adds the ability to split expenses with roommates, track who owes what, and manage settlements.

## Changes Required

### 1. NEW STATE VARIABLES (Add after line 47)

```javascript
// Roommate split bills states
const [roommates, setRoommates] = useState([
  { id: 1, name: 'Alex Chen', color: '#3b82f6' },
  { id: 2, name: 'Jordan Smith', color: '#8b5cf6' }
]);
const [showAddRoommate, setShowAddRoommate] = useState(false);
const [newRoommateName, setNewRoommateName] = useState('');
const [showRoommateBalances, setShowRoommateBalances] = useState(false);
const [splitExpenseId, setSplitExpenseId] = useState(null); // which expense is being split
```

### 2. UPDATE EXPENSE STRUCTURE

Each expense in the expenses array needs these additional fields:
```javascript
{
  // ... existing fields ...
  isSplit: false,
  splitWith: [], // array of roommate IDs
  myShare: 0,
  totalAmount: 0,
  paidBy: 'me', // 'me' or roommate id
  settlementStatus: {} // { roommateId: 'pending' | 'settled' }
}
```

### 3. NEW HELPER FUNCTIONS (Add after existing helpers)

```javascript
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
      const shareAmount = expense.totalAmount / numberOfPeople;
      
      expense.splitWith.forEach(roommateId => {
        if (balances[roommateId]) {
          if (expense.paidBy === 'me' && expense.settlementStatus[roommateId] !== 'settled') {
            balances[roommateId].theyOwe += shareAmount;
          }
        }
      });
    }
  });
  
  return balances;
};

// Handle roommate actions
const handleAddRoommate = () => {
  if (newRoommateName.trim()) {
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
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
          [roommateId]: exp.settlementStatus[roommateId] === 'settled' ? 'pending' : 'settled'
        }
      };
    }
    return exp;
  }));
};
```

### 4. PROFILE PAGE - ADD ROOMMATE SECTION

Add this section in the Profile page render, after the Balance History section:

```javascript
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

### 5. FINANCE PAGE - ADD SPLIT TOGGLE TO EXPENSE EDIT FORM

In the expense edit form (where you edit categories), add this section after the priority input:

```javascript
{/* Split with Roommates */}
{roommates.length > 0 && (
  <div style={{ marginTop: '16px' }}>
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
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
    {expense.isSplit && expense.splitWith.length > 0 && (
      <div style={{
        background: '#f3f4f6',
        borderRadius: '10px',
        padding: '12px',
        marginTop: '8px'
      }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#6b7280', fontFamily: '"Inter", sans-serif' }}>
          Split {expense.splitWith.length + 1} ways
        </p>
        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1f2937', fontFamily: '"Inter", sans-serif' }}>
          Your share: ${(expense.spent / (expense.splitWith.length + 1)).toFixed(2)}
        </p>
      </div>
    )}
  </div>
)}
```

## Summary of Changes

1. **State**: 4 new state variables for roommates
2. **Helpers**: 5 new helper functions for split logic
3. **Profile**: New roommate management section
4. **Finance**: Split toggle in expense forms
5. **Logic**: Auto-calculate shares, track settlements

## Testing Checklist

- [ ] Add a roommate
- [ ] Split an expense with roommate
- [ ] Check balance summary updates
- [ ] Mark expense as settled
- [ ] Remove a roommate
- [ ] Create new split expense

