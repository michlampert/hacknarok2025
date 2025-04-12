from fastapi import FastAPI, HTTPException
from schemas import EmotionRequest

from setup import start

customers = start()
messeges = [[] for _ in range(4)]
app = FastAPI()


@app.get("/")
async def root():
    return {"Hello": "World"}


@app.get("/emotion/{id}")
async def emotion(id: int):
    if id < 0 or id > 3:
        raise HTTPException(status_code=404, detail="User not found")

    try:
        emotion,date,sender_id = messeges[id].pop(0)
    except IndexError:
        return ""
    sender_name = customers[sender_id].name
    receiver_name = customers[id].name

    customers[id].add_message(sender_name,receiver_name,emotion,date)
    customers[sender_id].add_message(sender_name,receiver_name,emotion,date)

    return emotion


@app.post("/emotion/{id}")
async def post_emotion(id: int, emotion: EmotionRequest):

    messeges[emotion.id].append((emotion.emotion,emotion.date, id))

    return emotion


@app.get("/messages/{id}")
async def get_messages(id: int):

    return customers[id].messages

@app.get("/messages/sender/{sender_id}/receiver/{receiver_id}")
async def get_messages(sender_id: int, receiver_id: int):

    name = customers[receiver_id].name
    messages = [message for message in customers[sender_id].messages if message.receiver == name]
    return messages


