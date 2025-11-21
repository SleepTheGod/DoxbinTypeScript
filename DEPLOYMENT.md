# DoxBin Deployment Guide

This is a PHP-based doxbin application that can be deployed on any server with PHP and MySQL support.

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or MariaDB 10.2+
- Apache with mod_rewrite enabled
- PHP extensions: mysqli, pdo, curl, mbstring

## Deployment Options

### Option 1: Traditional Server Deployment (Recommended)

Use the included `deploy.sh` script to deploy to `/var/www/html/doxbin`:

\`\`\`bash
sudo bash deploy.sh
\`\`\`

The script will:
- Install required PHP packages
- Copy all files to `/var/www/html/doxbin`
- Create necessary Smarty cache directories
- Set proper permissions
- Configure Apache with mod_rewrite
- Create .htaccess for clean URLs

After deployment:
1. Visit `http://your-server/doxbin/install.php`
2. Enter your database credentials
3. Optionally add Google reCAPTCHA keys
4. Click "Save Settings" to initialize the database
5. **Important:** Delete `install.php` after installation

### Option 2: Vercel Deployment (PHP Runtime)

This project includes `vercel.json` for Vercel deployment with PHP runtime:

\`\`\`bash
vercel deploy
\`\`\`

**Note:** You'll need to:
- Set up a MySQL database (PlanetScale, Railway, or external MySQL)
- Add environment variables in Vercel dashboard
- Run the installation manually by visiting the deployed URL + `/install.php`

### Option 3: Manual Deployment

1. Copy all files to your web server directory
2. Create Smarty cache directories:
   \`\`\`bash
   mkdir -p smarty/templates_c smarty/cache
   chmod 777 smarty/templates_c smarty/cache
   \`\`\`
3. Ensure `config` file is writable:
   \`\`\`bash
   chmod 666 config
   \`\`\`
4. Visit `/install.php` in your browser
5. Configure database and optional captcha
6. Delete `install.php` after successful installation

## Database Setup

Create a MySQL database and user:

\`\`\`sql
CREATE DATABASE doxbin;
CREATE USER 'doxbin_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON doxbin.* TO 'doxbin_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

## Configuration

The `config` file stores settings in JSON format:

\`\`\`json
{
  "db_host": "127.0.0.1",
  "db_user": "doxbin_user",
  "db_pass": "your_password",
  "db_db": "doxbin",
  "cap_sec_key": "your_recaptcha_secret",
  "cap_site_key": "your_recaptcha_site_key"
}
\`\`\`

## Security Considerations

1. **Always delete `install.php` after installation**
2. Ensure `smarty/templates_c` and `smarty/cache` are writable but not in web root
3. Use strong database passwords
4. Enable reCAPTCHA to prevent spam submissions
5. Consider adding rate limiting for submissions
6. Keep PHP and MySQL updated

## Directory Structure

\`\`\`
doxbin/
├── index.php              # Main application entry point
├── Db.class.php          # Database abstraction layer
├── install.php           # Installation wizard (delete after use)
├── config                # Configuration file (JSON)
├── db.sql               # Database schema
├── deploy.sh            # Deployment script
├── vercel.json          # Vercel deployment config
├── smarty/              # Smarty template engine
│   ├── templates/
│   │   └── default/     # Application templates
│   ├── templates_c/     # Compiled templates (auto-generated)
│   └── cache/          # Template cache (auto-generated)
├── legacy/             # CSS, JS, and legacy assets
└── images/             # Images and favicons
\`\`\`

## Troubleshooting

### Smarty Template Errors
- Ensure `smarty/templates_c` and `smarty/cache` exist and are writable (chmod 777)
- Check that all .tpl files are present in `smarty/templates/default/`

### Database Connection Errors
- Verify MySQL is running: `sudo systemctl status mysql`
- Check database credentials in `config` file
- Ensure database user has proper privileges

### Apache Configuration Issues
- Enable mod_rewrite: `sudo a2enmod rewrite`
- Restart Apache: `sudo systemctl restart apache2`
- Check `.htaccess` file is present and readable

### Permission Errors
- Application files: `chown -R www-data:www-data /var/www/html/doxbin`
- Cache directories: `chmod 777 smarty/templates_c smarty/cache`
- Config file: `chmod 666 config`

## URLs

- Home: `/doxbin/`
- Add Dox: `/doxbin/add`
- View Dox: `/doxbin/upload/{id}`
- Raw View: `/doxbin/upload/{id}/raw`
- Terms: `/doxbin/tos`

## Support

For issues, check:
1. PHP error logs: `/var/log/apache2/error.log`
2. File permissions
3. Database connectivity
4. Smarty template compilation

Happy hosting!
