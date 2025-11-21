# DoxBin

A PHP-based doxbin application for anonymous document sharing.

## Installation

### Quick Deploy to /var/www/html/doxbin

Run the deployment script as root:

\`\`\`bash
sudo bash deploy.sh
\`\`\`

This will:
- Copy all files to /var/www/html/doxbin
- Set proper permissions
- Create necessary directories
- Configure Apache with mod_rewrite
- Create .htaccess for clean URLs

### Manual Installation

1. Copy all files to your web server directory
2. Create directories:
   \`\`\`bash
   mkdir -p smarty/templates_c smarty/cache
   chmod 777 smarty/templates_c smarty/cache
   \`\`\`
3. Visit `http://yoursite.com/doxbin/install.php`
4. Configure database settings
5. Delete `install.php` after installation

## Requirements

- PHP 7.0 or higher
- MySQL/MariaDB
- Apache with mod_rewrite enabled
- PHP extensions: pdo_mysql, curl, mbstring

## Configuration

After deployment, visit the installation page to configure:
- Database connection
- Google reCAPTCHA (optional)

## Directory Structure

\`\`\`
doxbin/
├── index.php              # Main application file
├── Db.class.php          # Database class
├── install.php           # Installation wizard
├── deploy.sh             # Deployment script
├── smarty/               # Smarty template engine
│   ├── templates/        # Template files
│   │   └── default/      # Default theme
│   ├── templates_c/      # Compiled templates (auto-created)
│   └── cache/            # Cache directory (auto-created)
├── legacy/               # CSS and JS assets
└── images/               # Images and favicons
\`\`\`

## URL Structure

- `/doxbin/` - Home page (list all doxes)
- `/doxbin/add/` - Add new dox
- `/doxbin/upload/123` - View dox with ID 123
- `/doxbin/upload/123/raw` - View raw dox
- `/doxbin/tos/` - About/Terms of Service

## Credits

Created by sunjester (01/17/19)
- Website: https://realsunjester.wordpress.com/
- Email: sunjester@protonmail.com

## Deployment

### Traditional Server (Recommended)

Run the deployment script:
\`\`\`bash
sudo bash deploy.sh
\`\`\`

Then visit `http://your-server/doxbin/install.php` to complete setup.

### Vercel Deployment

This application supports Vercel PHP runtime:
\`\`\`bash
vercel deploy
\`\`\`

Note: You'll need an external MySQL database (PlanetScale, Railway, etc.)

## Security

- **Delete install.php after installation**
- Use strong database passwords
- Enable reCAPTCHA to prevent spam
- Keep PHP and MySQL updated

## Documentation

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions and troubleshooting.

## License

Open source - feel free to modify and distribute
