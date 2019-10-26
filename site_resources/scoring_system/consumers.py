import asyncio
import json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async

# from .models import

class ScoreConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print("connected ", event)

    async def websocket_receive(self, event):
        print("receive ", event)

    async def websocket_disconnected(self, event):
        print("disconnected ", event)