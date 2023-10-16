FROM python

WORKDIR /app/

RUN pip install falcon
RUN pip install gunicorn

COPY . .

CMD ["python", "myfalcon.py"]
