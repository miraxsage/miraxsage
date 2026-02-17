#!/bin/sh
set -e

# Check if DB exists; if not, it will be created by the migration
if [ ! -f "data/miraxsage.db" ]; then
    echo "Database not found, running migrations..."
    node -e "require('./src/db/migrate.ts')" 2>/dev/null || echo "Migration skipped (will use pre-built DB)"
fi

exec "$@"
