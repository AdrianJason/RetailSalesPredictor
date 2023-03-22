# Fine-Grained Time Series Forecasting Prophet and Apache Spark
<img src="https://github.com/JeremyTallant/RetailSalesPredictor/blob/main/app/static/images/prophetimage.png" alt="Prophet">

This project aims to provide fine-grained time series forecasting using Prophet, a popular time series forecasting library developed by Facebook, and Apache Spark, a powerful distributed data processing framework. The forecasts will be displayed on a web page for easy access and interpretation.
## Table of Contents
1. Overview
2. Installation
3. Usage
4. Data Preparation
5. Forecasting with Prophet
6. Results
7. Web Application
8. File Organization and Structure
## Overview
The primary goal of this project is to develop a scalable and efficient time series forecasting solution by leveraging the capabilities of the Prophet library and Apache Spark. The project will involve data preparation, model training, forecasting, and visualization. The web application will display the data, the model, and the forecast results on a single webpage for easy access and interpretation.
## Installation
To run this project, you'll need to install the necessary dependencies using pip. The required packages are listed in the requirements.txt file. You can install them by following these steps:
1. Clone the repository to your local machine:
```python
git clone https://github.com/JeremyTallant/RetailSalesPredictor.git
```
2. Navigate to the project directory:
```python
cd RetailSalesPredictor
```
3. Install the required dependencies from `requirements.txt`:
```python
pip install -r requirements.txt
```
## Usage 
1. Ensure all the necessary libraries and dependencies are installed. You can refer to the `Installation` section in the README for guidance.

2. Navigate to the root directory of the project.

3. Run the app.py file using the command: 
```python
python app.py
```

6. Open your web browser and navigate to http://127.0.0.1:5000 to view the home page of the web application.

7. From the home page, you can navigate to the different pages to explore the data, model, and results of the project.

8. On the `Data` page, you can view the raw data and the visualizations of the time series data.

9. On the `Model` page, you can view the training and validation results of the Prophet model.

10. On the `Results` page, you can view the forecasted values of the time series data.

11. To interact with the web application, you can use the navigation bar at the top of the page to move between the different pages.

12. If you want to stop the server, press `CTRL+C` in the terminal where the `app.py` script is running.
## Data Preparation
The data preparation phase is a critical step in any machine learning project. It involves cleaning and transforming the raw data into a format that can be used by the machine learning algorithms. In this project, the data preparation phase involves reading the raw data from a CSV file, changing the date column to datetime format, splitting the data into training and testing sets, and saving the processed data to separate CSV files.

To accomplish this, the Pandas library is used to read the CSV file and create a DataFrame. The date column is then converted to a datetime format using the `pd.to_datetime function`. The data is then split into training and testing sets using the `train_end_date` variable, which represents the end of the training data. The training and testing data are saved to separate CSV files in the `processed_data` folder.

By the end of this phase, the data is clean, formatted correctly, and ready for the machine learning phase.
