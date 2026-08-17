# Inventory Management System - Database Setup

## Issue
Inventory system production mein kaam nahi kar raha tha kyunki Vercel pe file system read-only hai. Ab database use karega.

## Solution
Database tables create karne hain Neon PostgreSQL mein.

## Steps

### 1. Neon Console Open Karein
https://console.neon.tech/

### 2. SQL Editor Mein Jao
1. Apna project select karo
2. "SQL Editor" tab par jao

### 3. Tables Create Karo
Yeh SQL query run karo:

```sql
-- Create inventory_items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  minimum_stock INTEGER NOT NULL DEFAULT 0,
  storage_location TEXT,
  description TEXT,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_transactions table
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('addition', 'removal')),
  quantity INTEGER NOT NULL,
  reason TEXT NOT NULL,
  user TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inventory_items_category ON inventory_items(category);
CREATE INDEX IF NOT EXISTS idx_inventory_items_location ON inventory_items(storage_location);
CREATE INDEX IF NOT EXISTS idx_inventory_items_quantity ON inventory_items(quantity);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_item_id ON inventory_transactions(item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_timestamp ON inventory_transactions(timestamp);
```

### 4. Sample Data (Optional)
Agar test data chahiye:

```sql
INSERT INTO inventory_items (id, name, category, quantity, minimum_stock, storage_location, description)
VALUES 
  ('sample-1', 'ESP32', 'Microcontrollers', 10, 5, 'Shelf A1', 'ESP32 Development Board'),
  ('sample-2', 'Arduino Uno', 'Microcontrollers', 15, 3, 'Shelf A2', 'Arduino Uno R3'),
  ('sample-3', 'Resistor 10K', 'Components', 100, 20, 'Drawer B3', '10K Ohm Resistors');
```

### 5. Verify
Check karein ke tables ban gaye:

```sql
SELECT * FROM inventory_items;
SELECT * FROM inventory_transactions;
```

## Testing
1. Tables create karne ke baad Vercel pe redeploy ho jayega automatically
2. Dashboard pe jao: https://robotics-portfolio-seven.vercel.app/admin/inventory
3. "Add Component" button se new item add karo
4. Agar save ho jaye toh working hai!

## Files Changed
- `lib/data/inventory-item-repository-db.ts` - New database repository
- `lib/data/inventory-transaction-repository-db.ts` - New transaction repository  
- `lib/actions/inventory-actions.ts` - Updated to use database
- `scripts/create-inventory-tables.sql` - SQL schema

## How It Works
- Agar `DATABASE_URL` environment variable set hai toh database use karega
- Nahi toh file storage use karega (local development)
- Production (Vercel) pe automatically database use hoga
