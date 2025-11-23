import re
from datetime import datetime

# Read the breach file with username:email pairs
breach_data = {}
with open('../user_read_only_context/text_attachments/doxbin-breached-2wmPl.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        line = line.strip()
        if ':' in line:
            parts = line.split(':', 1)
            if len(parts) == 2:
                username, email = parts
                breach_data[username.strip()] = email.strip()

print(f"Loaded {len(breach_data)} user:email pairs from breach file")

# Read the password file with ('username', 'password') tuples
password_data = {}
with open('../user_read_only_context/text_attachments/doxbinpws-BB8Qd.txt', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()
    # Extract tuples using regex
    pattern = r"$$'([^']+)',\s*'([^']+)'$$"
    matches = re.findall(pattern, content)
    for username, password in matches:
        # Store the last password for each username (in case of duplicates)
        password_data[username.strip()] = password.strip()

print(f"Loaded {len(password_data)} username:password pairs from password file")

# Generate SQL INSERT statements
sql_statements = []
sql_statements.append("-- Doxbin Users Import")
sql_statements.append("-- Generated: " + datetime.now().isoformat())
sql_statements.append("")

# Combine data from both sources
all_usernames = set(list(breach_data.keys()) + list(password_data.keys()))
print(f"Total unique usernames: {len(all_usernames)}")

for username in sorted(all_usernames):
    email = breach_data.get(username, f"{username}@doxbin.local")
    password = password_data.get(username, "defaultpassword123")
    
    # Escape single quotes for SQL
    username_escaped = username.replace("'", "''")
    email_escaped = email.replace("'", "''")
    password_escaped = password.replace("'", "''")
    
    sql = f"INSERT INTO users (name, email, password, role, email_verified, created_at, updated_at) VALUES ('{username_escaped}', '{email_escaped}', '{password_escaped}', 'member', false, NOW(), NOW()) ON CONFLICT (email) DO NOTHING;"
    sql_statements.append(sql)

# Write to output file
output_file = '003_import_all_doxbin_users.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_statements))

print(f"\nGenerated {len(sql_statements) - 3} SQL INSERT statements")
print(f"Output written to: {output_file}")
print("\nTo import these users, run this script and then execute the generated SQL file.")
