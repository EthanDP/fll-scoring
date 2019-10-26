<<<<<<< HEAD
from django.conf.urls import url
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator, OriginValidator
=======
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import scoring_system.routing
>>>>>>> 42cd9c334f1b9a76667a19767a9a90099bbb1f6e

from scoring_system.consumers import ScoreConsumer
application = ProtocolTypeRouter({
<<<<<<< HEAD
#     'websocket': AllowedHostsOriginValidator(
#         AuthMiddlewareStack(

#         )
#     )
=======
    'websocket': AuthMiddlewareStack(
        URLRouter(
            scoring_system.routing.websocket_urlpatterns
        )
    ),
>>>>>>> 42cd9c334f1b9a76667a19767a9a90099bbb1f6e
})