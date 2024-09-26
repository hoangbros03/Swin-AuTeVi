# Use the official Python image from the Docker Hub
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 6969

# Command to run the FastAPI app
CMD ["fastapi", "dev", "src/main.py", "--port", "6969"]
