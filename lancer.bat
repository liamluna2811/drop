@echo off
REM Lance le site en local sur http://localhost:8000 (nécessite Python),
REM sinon ouvre directement index.html dans le navigateur.
cd /d "%~dp0"
where py >nul 2>nul && (start "" http://localhost:8000 & py -m http.server 8000 & goto :eof)
where python >nul 2>nul && (start "" http://localhost:8000 & python -m http.server 8000 & goto :eof)
start "" index.html
