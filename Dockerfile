FROM python:3.9-slim
WORKDIR /app
COPY app.py /app
RUN pip install flask boto3 flask-cors
CMD ["python", "app.py"]