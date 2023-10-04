from sanic import Sanic
from sanic.response import text

app = Sanic("MyHelloWorldApp")

@app.get("/")
async def hello_world(request):
    return text("Hello, world.")
 

# Correct way to attach objects to the application
app = Sanic("MyApp")
app.ctx.db = Database()
