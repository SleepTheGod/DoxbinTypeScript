import os
import re
from datetime import datetime

breach_file = 'user_read_only_context/text_attachments/doxbin-breached-2wmPl.txt'
pws_file = 'user_read_only_context/text_attachments/doxbinpws-BB8Qd.txt'

print(f"Reading breach data from {breach_file}...")
users_data = {}

try:
    with open(breach_file, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            line = line.strip()
            if ':' in line:
                parts = line.split(':', 1)
                if len(parts) == 2:
                    username, email = parts
                    users_data[username] = {'email': email, 'password': None}
    
    print(f"Loaded {len(users_data)} users from breach file")
    
    # Read the password file
    print(f"Reading password data from {pws_file}...")
    with open(pws_file, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            line = line.strip()
            # Match pattern: ('username', 'password')
            match = re.match(r"$$'([^']+)',\s*'([^']+)'$$", line)
            if match:
                username, password = match.groups()
                if username in users_data:
                    users_data[username]['password'] = password
    
    print(f"Matched passwords for users")
    
    import sys
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    # Import the database connection
    from lib.db import sql
    
    print("Inserting users into database...")
    
    inserted_count = 0
    skipped_count = 0
    
    batch = []
    for username, data in users_data.items():
        email = data['email']
        password = data['password'] or 'changeme123'
        
        # Escape single quotes for SQL
        safe_username = username.replace("'", "''")
        safe_email = email.replace("'", "''")
        safe_password = password.replace("'", "''")
        
        batch.append(f"('{safe_username}', '{safe_email}', '{safe_password}', 'user', false, NOW(), NOW())")
        
        # Insert in batches of 1000
        if len(batch) >= 1000:
            values = ',\n'.join(batch)
            query = f"""
                INSERT INTO users (name, email, password, role, email_verified, created_at, updated_at)
                VALUES {values}
                ON CONFLICT (email) DO NOTHING
            """
            
            try:
                result = sql(query)
                inserted_count += len(batch)
                print(f"Inserted {inserted_count} users...")
            except Exception as e:
                print(f"Error inserting batch: {e}")
            
            batch = []
    
    # Insert remaining batch
    if batch:
        values = ',\n'.join(batch)
        query = f"""
            INSERT INTO users (name, email, password, role, email_verified, created_at, updated_at)
            VALUES {values}
            ON CONFLICT (email) DO NOTHING
        """
        try:
            result = sql(query)
            inserted_count += len(batch)
        except Exception as e:
            print(f"Error inserting final batch: {e}")
    
    print(f"\n✅ Complete!")
    print(f"   Processed: {inserted_count} users")
    print(f"   Total users in source: {len(users_data)}")

except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()
    exit(1)
