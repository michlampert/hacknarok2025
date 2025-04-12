from pydantic import BaseModel,constr
from datetime import datetime


class EmotionRequest(BaseModel):
    id: int
    emotion: constr(min_length=1)
    date: datetime


class Message:
    def __init__(self,sender, receiver, emotion, send_date):
        self.sender = sender
        self.receiver = receiver
        self.emotion = emotion
        self.send_date = send_date
        self.received_date = datetime.now()


class Customer:
    def __init__(self,id,name,email):
        self.id = id
        self.name = name
        self.email = email
        self.messages = []

    def add_message(self,sender_id,receiver_id,emotion,date):
        self.messages.append(Message(sender_id,receiver_id,emotion, date))




