#!/bin/bash

# DoxBin Deployment Script
# This script deploys the DoxBin application to /var/www/html/doxbin

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_DIR="/var/www/html/doxbin"
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  DoxBin Deployment Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Error: This script must be run as root (use sudo)${NC}"
    exit 1
fi

# Check if Apache/PHP is installed
if ! command -v php &> /dev/null; then
    echo -e "${YELLOW}PHP is not installed. Installing PHP...${NC}"
    apt-get update
    apt-get install -y php php-mysql php-curl php-mbstring php-xml
fi

# Check if MySQL/MariaDB is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}MySQL/MariaDB is not installed.${NC}"
    echo -e "${YELLOW}Please install MySQL or MariaDB before continuing.${NC}"
    echo -e "${YELLOW}Run: apt-get install mysql-server${NC}"
    exit 1
fi

# Create deployment directory
echo -e "${GREEN}Creating deployment directory...${NC}"
mkdir -p "$DEPLOY_DIR"

# Copy all files except deployment script
echo -e "${GREEN}Copying files to $DEPLOY_DIR...${NC}"
rsync -av --exclude='deploy.sh' \
          --exclude='app' \
          --exclude='components' \
          --exclude='hooks' \
          --exclude='lib' \
          --exclude='public' \
          --exclude='node_modules' \
          --exclude='.next' \
          --exclude='package.json' \
          --exclude='package-lock.json' \
          --exclude='pnpm-lock.yaml' \
          --exclude='tsconfig.json' \
          --exclude='next.config.mjs' \
          --exclude='postcss.config.mjs' \
          --exclude='components.json' \
          "$CURRENT_DIR/" "$DEPLOY_DIR/"

# Create necessary Smarty directories
echo -e "${GREEN}Creating Smarty cache directories...${NC}"
mkdir -p "$DEPLOY_DIR/smarty/templates_c"
mkdir -p "$DEPLOY_DIR/smarty/cache"

# Set proper permissions
echo -e "${GREEN}Setting permissions...${NC}"
chown -R www-data:www-data "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"
chmod 777 "$DEPLOY_DIR/smarty/templates_c"
chmod 777 "$DEPLOY_DIR/smarty/cache"
chmod 666 "$DEPLOY_DIR/config" 2>/dev/null || touch "$DEPLOY_DIR/config" && chmod 666 "$DEPLOY_DIR/config"

# Create .htaccess for clean URLs
echo -e "${GREEN}Creating .htaccess file...${NC}"
cat > "$DEPLOY_DIR/.htaccess" << 'EOF'
RewriteEngine On
RewriteBase /doxbin/

# Redirect home to index.php
RewriteRule ^home/?$ index.php [L]

# Handle add page
RewriteRule ^add/?$ index.php?page=add [L]

# Handle TOS page
RewriteRule ^tos/?$ index.php?page=tos [L]

# Handle upload view with ID
RewriteRule ^upload/([0-9]+)/?$ index.php?page=upload&id=$1 [L]

# Handle raw view with ID
RewriteRule ^upload/([0-9]+)/raw/?$ index.php?page=raw&id=$1 [L]

# Handle submit
RewriteRule ^submit/?$ index.php?page=submit [L]
EOF

# Create Apache configuration
echo -e "${GREEN}Creating Apache configuration...${NC}"
cat > /etc/apache2/sites-available/doxbin.conf << EOF
<Directory /var/www/html/doxbin>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
EOF

# Enable Apache rewrite module
echo -e "${GREEN}Enabling Apache rewrite module...${NC}"
a2enmod rewrite

# Enable the site configuration
a2ensite doxbin.conf

# Reload Apache
echo -e "${GREEN}Reloading Apache...${NC}"
systemctl reload apache2

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Visit: ${GREEN}http://your-server/doxbin/install.php${NC}"
echo -e "2. Configure your database settings"
echo -e "3. After installation, delete install.php"
echo -e "4. Your DoxBin will be available at: ${GREEN}http://your-server/doxbin/${NC}"
echo ""
echo -e "${YELLOW}Important directories:${NC}"
echo -e "  - Application: ${GREEN}$DEPLOY_DIR${NC}"
echo -e "  - Templates: ${GREEN}$DEPLOY_DIR/smarty/templates/default/${NC}"
echo -e "  - Cache: ${GREEN}$DEPLOY_DIR/smarty/templates_c/${NC}"
echo ""
