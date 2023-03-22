# Fine-Grained Time Series Forecasting Prophet and Apache Spark
<img src="https://github.com/JeremyTallant/RetailSalesPredictor/blob/main/app/static/images/prophetimage.png" alt="Prophet">

This project aims to provide fine-grained time series forecasting using Prophet, a popular time series forecasting library developed by Facebook, and Apache Spark, a powerful distributed data processing framework. The forecasts will be displayed on a web page for easy access and interpretation.
## Table of Contents
1. Overview
2. Installation
3. Usage
4. Data Preparation
5. Forecasting with Prophet
6. Hyperparameter Tuning and Model Training on All Store-Item Combinations
7. Results
8. Web Application
9. File Organization and Structure
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
## Forecasting with Prophet
This section describes the forecasting process using Prophet and Apache Spark. The code was implemented in Databricks, a cloud-based data engineering platform that provides an interactive workspace for data scientists, engineers, and analysts to collaborate on big data projects.

The forecasting process in this project utilizes Facebook Prophet, a time-series forecasting library. The data was first read into a Spark session and aggregated to the daily level. The data was then transformed to a Pandas DataFrame to use in Prophet.

The Prophet model was fitted to the historical data using the Prophet library's built-in functions. The Prophet model was then used to make future forecasts.

The metrics for evaluating the model were calculated using the mean absolute error (MAE), mean squared error (MSE), root mean squared error (RMSE), and mean absolute percentage error (MAPE). These metrics were calculated using the actual and predicted values of the historical data.
## Hyperparameter Tuning and Model Training on All Store-Item Combinations
To improve the accuracy of our forecasts, we performed hyperparameter tuning on the Prophet model using a grid search approach. We tested various combinations of parameters such as `changepoint_prior_scale`, `holidays_prior_scale`, `n_changepoints`, and `seasonality_mode` on a subset of the data. After analyzing the results, we selected the best set of parameters based on the Mean Absolute Percentage Error (MAPE) metric.

We then trained the Prophet model with the optimized set of parameters on 50 store and item combinations. The resulting models were stored in a dictionary with a tuple key of `(store, item)` for easy access.

We then used these models to make predictions on the test dataset for each store and item combination and computed evaluation metrics such as MAE, MSE, RMSE, and MAPE. The results are stored in a Pandas DataFrame called `metrics_df`.

Overall, this approach allowed us to improve the accuracy of our forecasts and make predictions for every store and item combination that was tested in the dataset.
## Results 
The Facebook Prophet model was able to accurately predict the sales performance of Store 1, Item 1 based on historical data from January 1, 2013 to January 31, 2017. The model achieved a root mean squared error (RMSE) of 4.31, indicating that the predicted sales values were on average within +/- 4.31 units of the actual sales values. The model was able to capture the seasonal trends and overall sales performance of the item, with predicted sales values closely following the actual sales values. In addition to the RMSE, we also calculated several other metrics to evaluate the performance of the model:

* MAE (Mean Absolute Error): The MAE is 3.40, which means that on average, the model's predicted sales values were within +/- 3.40 units of the actual sales values.

* MSE (Mean Squared Error): The MSE is 18.60, which means that on average, the squared difference between the predicted and actual sales values was 18.60 units.

* MAPE (Mean Absolute Percentage Error): The MAPE is 20.37%, which means that on average, the model's predicted sales values were within +/- 20.37% of the actual sales values.

Overall, the model appears to have performed reasonably well for Store 1, Item 1, with RMSE, MAE, MSE, and MAPE values indicating that the predicted sales values were generally within a few units or percentage points of the actual sales values. To evaluate the scalability and practicality of our Facebook Prophet model, we deployed it on 50 store and item combinations and stored the results in a dataframe. This allowed us to easily access and analyze the predicted sales values for each combination using simple queries.

The results of the model were encouraging, with the predicted sales values closely following the actual sales values for most store and item combinations. The model was able to capture seasonal trends and overall sales performance, making it a useful tool for forecasting sales in retail stores.

With the ability to easily access and analyze the results for each store and item combination, our Facebook Prophet model has the potential to be a valuable tool for retailers looking to forecast sales performance and optimize their inventory management. Future work could include incorporating external factors such as weather or promotions into the model to further improve its accuracy and practicality.
