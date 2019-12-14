import asyncio
import json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async

# from .models import

class ScoreConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print("connected ", event)
        await self.channel_layer.group_add(
            "match_view",
            self.channel_name
        )
        await self.send({
            'type': 'websocket.accept'
        })

    async def websocket_receive(self, event):
        print("Receive: ", event)
        data = event.get('text', None)
        print("data")
        if data:
            loaded_data = json.loads(data)
            
            if loaded_data['message'] == 'user connected':
                print("Hey")
                await self.channel_layer.group_send(
                    "match_view",
                    {
                        'type': 'score_update',
                        'text': 'score request'
                    }
                )
            elif loaded_data['message'] == 'start timer':
                print("Should send a socket message here")
                await self.channel_layer.group_send(
                    "match_view",
                    {
                        'type': 'start_match',
                        'text': 'match start'
                    }
                )
            else:
                await self.channel_layer.group_send(
                    "match_view",
                    {
                        'type': 'score_update',
                        'text': loaded_data['message']
                    }
                )

    async def score_update(self, event):
        await self.send({
            'type': 'websocket.send',
            'text': event['text']
        })

    async def start_match(self, event):
        await self.send({
            'type': 'websocket.send',
            'text': event['text']
        })

    async def websocket_disconnect(self, event):
        print("disconnected ", event)

    # @database_sync_to_async
    # def get_thread(self):
    #     pass
