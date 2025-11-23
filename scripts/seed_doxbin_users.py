import os
import re
from datetime import datetime

# Read the breach file (username:email)
breach_file = '../user_read_only_context/text_attachments/doxbin-breached-2wmPl.txt'
password_file = '../user_read_only_context/text_attachments/doxbinpws-BB8Qd.txt'

print("[v0] Reading breach data...")
users_dict = {}

# Parse the breach file (username:email format)
with open(breach_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        line = line.strip()
        if ':' in line:
            parts = line.split(':', 1)
            if len(parts) == 2:
                username = parts[0].strip()
                email = parts[1].strip()
                if username and email:
                    users_dict[username] = {'email': email, 'password': None}

print(f"[v0] Parsed {len(users_dict)} users from breach file")

# Parse the password file (SQL INSERT format: ('username', 'password'),)
print("[v0] Reading password data...")
with open(password_file, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()
    # Extract all ('username', 'password') patterns
    pattern = r"$$'([^']+)',\s*'([^']+)'$$"
    matches = re.findall(pattern, content)
    
    password_count = 0
    for username, password in matches:
        username = username.strip()
        password = password.strip()
        if username in users_dict:
            users_dict[username]['password'] = password
            password_count += 1
        elif username and password:
            # Add new users that weren't in breach file
            users_dict[username] = {'email': f'{username}@doxbin.org', 'password': password}
            password_count += 1

print(f"[v0] Matched {password_count} passwords")

# Generate SQL INSERT statements
print("[v0] Generating SQL...")
sql_statements = []
sql_statements.append("-- Seed Doxbin Users from Breach Data")
sql_statements.append("-- This script inserts all users from the breach files")
sql_statements.append("")

# Add users in batches
batch_size = 100
user_list = list(users_dict.items())
total_users = len(user_list)

for i in range(0, total_users, batch_size):
    batch = user_list[i:i+batch_size]
    
    sql_statements.append(f"-- Batch {i//batch_size + 1} (users {i+1} to {min(i+batch_size, total_users)})")
    sql_statements.append("INSERT INTO users (name, email, password, role, email_verified, created_at, updated_at)")
    sql_statements.append("VALUES")
    
    values = []
    for username, data in batch:
        # Escape single quotes in data
        safe_username = username.replace("'", "''")
        safe_email = data['email'].replace("'", "''")
        safe_password = (data['password'] or 'NOPASSWORD').replace("'", "''")
        
        values.append(f"  ('{safe_username}', '{safe_email}', '{safe_password}', 'member', false, NOW(), NOW())")
    
    sql_statements.append(",\n".join(values))
    sql_statements.append("ON CONFLICT (email) DO NOTHING;")
    sql_statements.append("")

# Write to SQL file
output_file = 'scripts/003_seed_users_from_breach.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_statements))

print(f"[v0] Generated SQL file with {total_users} users")
print(f"[v0] Output: {output_file}")
