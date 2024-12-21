#!/usr/bin/env bash
python -m pip install --upgrade pip
pip install -r requirements.txt
cd server/newproject
python manage.py collectstatic 
python manage.py migrate