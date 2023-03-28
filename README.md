# Fine-Grained Time Series Forecasting Prophet and Apache Spark
<img src="https://github.com/JeremyTallant/RetailSalesPredictor/blob/main/app/static/images/prophetimage.png" alt="Prophet">

This project aims to provide fine-grained time series forecasting using Prophet, a popular time series forecasting library developed by Facebook, and Apache Spark, a powerful distributed data processing framework. The forecasts will be displayed on a web page for easy access and interpretation.
## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Data Preparation](#data-preparation)
- [Forecasting with Prophet](#forecasting-with-prophet)
- [Hyperparameter Tuning and Model Training on All Store-Item Combinations](#hyperparameter-tuning-and-model-training-on-all-store-item-combinations)
- [Results](#results)
- [Future Work](#future-work)
- [File Organization and Structure](#file-organization-and-structure)
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

<img width="1440" alt="Screenshot 2023-03-22 at 9 25 58 PM" src="https://user-images.githubusercontent.com/112406455/227085127-de2967de-45da-4c50-a973-7029053cffbc.png">

7. From the home page, you can navigate to the different pages to explore the data, model, and results of the project.

8. On the `Data` page, you can view the raw data and the visualizations of the time series data.

<img width="1440" alt="Screenshot 2023-03-22 at 9 26 15 PM" src="https://user-images.githubusercontent.com/112406455/227085406-7b6a6b92-4d80-477e-a426-0e36b0e0ea8b.png">

9. On the `Model` page, you can view the training and validation results of the Prophet model.

<img width="1439" alt="Screenshot 2023-03-25 at 8 01 34 PM" src="https://user-images.githubusercontent.com/112406455/227749625-e14fe379-2a8b-4855-9364-ff0e6c0a704a.png">

10. On the `Results` page, you can view both the predicted and actual values of the time series test data in a chart, along with a table that displays the evaluation metrics for the selected store and item combination.

<img width="1439" alt="Screenshot 2023-03-27 at 3 56 23 PM" src="https://user-images.githubusercontent.com/112406455/228065085-c2f0f592-b81e-49d5-a8bf-49b8c589e028.png">

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

We then trained the Prophet model with the optimized set of parameters on all store and item combinations. The resulting models were stored in a dictionary with a tuple key of `(store, item)` for easy access.

We then used these models to make predictions on the test dataset for each store and item combination and computed evaluation metrics such as MAE, MSE, RMSE, and MAPE. The results are stored in a Pandas DataFrame called `metrics_df`.

Overall, this approach allowed us to improve the accuracy of our forecasts and make predictions for every store and item combination that was tested in the dataset.
## Results 
The Facebook Prophet model was able to accurately predict the sales performance of Store 1, Item 1 based on historical data from January 1, 2013 to January 31, 2017. The model achieved a root mean squared error (RMSE) of 4.31, indicating that the predicted sales values were on average within +/- 4.31 units of the actual sales values. The model was able to capture the seasonal trends and overall sales performance of the item, with predicted sales values closely following the actual sales values. In addition to the RMSE, we also calculated several other metrics to evaluate the performance of the model:

* MAE (Mean Absolute Error): The MAE is 3.40, which means that on average, the model's predicted sales values were within +/- 3.40 units of the actual sales values.

* MSE (Mean Squared Error): The MSE is 18.60, which means that on average, the squared difference between the predicted and actual sales values was 18.60 units.

* MAPE (Mean Absolute Percentage Error): The MAPE is 20.37%, which means that on average, the model's predicted sales values were within +/- 20.37% of the actual sales values.

Overall, the model appears to have performed reasonably well for Store 1, Item 1, with RMSE, MAE, MSE, and MAPE values indicating that the predicted sales values were generally within a few units or percentage points of the actual sales values. To evaluate the scalability and practicality of our Facebook Prophet model, we deployed it on all store and item combinations and stored the results in a dataframe. This allowed us to easily access and analyze the predicted sales values for each combination using simple queries.

The results of the model were encouraging, with the predicted sales values closely following the actual sales values for most store and item combinations. The model was able to capture seasonal trends and overall sales performance, making it a useful tool for forecasting sales in retail stores.

With the ability to easily access and analyze the results for each store and item combination, our Facebook Prophet model has the potential to be a valuable tool for retailers looking to forecast sales performance and optimize their inventory management. Future work could include incorporating external factors such as weather or promotions into the model to further improve its accuracy and practicality.
## Future Work
Although our pre-trained Facebook Prophet model provides accurate sales forecasts for a range of store and item combinations, there is still room for further improvement and development. Here are a few potential areas for future work:

**Dynamic Updating**: Currently, our model is trained on historical sales data and is not updated in real-time. A possible improvement could be to build a mechanism to dynamically update the model as new sales data becomes available. This could help ensure that the forecasts remain accurate and up-to-date.

**Integration with Inventory Management Systems**: Our web application currently provides retailers with sales forecasts, but it does not include recommendations for inventory management. An interesting area for future work could be to integrate our forecasts with inventory management systems to provide retailers with real-time recommendations for optimal inventory levels.

**Expansion of Model Capabilities**: While our pre-trained model is effective at forecasting sales trends and handling missing data, there may be other factors that impact sales performance that are not currently accounted for in the model. Future work could involve expanding the model to include additional factors such as marketing campaigns, seasonal trends, or external events.

**User Interface Improvements**: While our web application provides a user-friendly interface for visualizing sales forecasts, there is always room for improvement in terms of usability and design. Future work could involve incorporating feedback from users and incorporating improvements to make the interface even more intuitive and user-friendly.

Overall, there are many exciting directions for future work on this project, and we look forward to continuing to improve and expand upon our current capabilities.
## File Organization and Structure
* `app/` contains the Flask web application, with static files (`css`, `js`, and `images`) and templates.
* `data/` contains the raw `store.csv` data and processed data, including the `processed_data/` folder with `test_data.csv` and `train_data.csv`.
* `database/` contains the `model.sql` file with the schema of the database used to store data for rendering in the Flask app.
*  `notebooks/` contains Jupyter notebooks for data exploration, preprocessing, and model training.
* **Note** that there are two files for model training: `model_training.ipynb` and `model_training.dbc`. We used a regular Jupyter notebook for `model_training.ipynb` because we were using the free trial version of Databricks and were unable to save the results of the model into a PostgreSQL database using Databricks.
* `README.md` is the main file containing the documentation and instructions for the project.
* `requirements.txt` lists the required Python packages and their versions.
