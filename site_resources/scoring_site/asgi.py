import os
import django
from channels.routing import get_default_application

<<<<<<< HEAD
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "scoring_site.settings")
=======
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cfehome.settings")
>>>>>>> 42cd9c334f1b9a76667a19767a9a90099bbb1f6e
django.setup()
application = get_default_application()