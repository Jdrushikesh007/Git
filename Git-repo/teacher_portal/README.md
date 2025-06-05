# Teacher Portal

## Requirements
- Python 3.10+
- Django 5.x

## Setup

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install django
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver
```

Visit http://127.0.0.1:8000/ in your browser.

## Features
- Django authentication login/logout
- Student listing with inline edit & delete
- Add student modal with duplicate name+subject merging logic
- Vanilla JS + Tailwind CSS front‑end
