#!/usr/bin/env sh
# Lance le site en local sur http://localhost:8000
cd "$(dirname "$0")"
echo "Site disponible sur http://localhost:8000 (Ctrl+C pour arrêter)"
python3 -m http.server 8000
