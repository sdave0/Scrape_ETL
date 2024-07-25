import requests
from bs4 import BeautifulSoup
import pandas as pd
import sqlite3
from datetime import date
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class ETL:
    """
    A class to represent an ETL (Extract, Transform, Load) process for toll plaza data.

    Attributes:
    -----------
    plaza_id : str
        The ID of the toll plaza to extract data for.
    sql_file_path : str
        The path to the SQLite database file.
    sql_table_name : str
        The name of the table in the SQLite database where data will be loaded.
    url : str
        The URL to fetch the toll plaza data from.
    soup : BeautifulSoup
        The BeautifulSoup object to parse the fetched HTML content.
    df_info : pandas.DataFrame
        The DataFrame to store the transformed data.
    """

    def __init__(self, plaza_id, sql_file_path, sql_table_name):
        """
        Constructs all the necessary attributes for the ETL object.

        Parameters:
        -----------
        plaza_id : str
            The ID of the toll plaza to extract data for.
        sql_file_path : str
            The path to the SQLite database file.
        sql_table_name : str
            The name of the table in the SQLite database where data will be loaded.
        """
        self.plaza_id = plaza_id
        self.sql_file_path = sql_file_path
        self.sql_table_name = sql_table_name
        self.url = f'https://tis.nhai.gov.in/TollInformation.aspx?TollPlazaID={plaza_id}'
        self.soup = ''
        self.df_info = pd.DataFrame()

    def extract(self):
        """
        Extracts data from the URL for the given plaza ID.

        Returns:
        --------
        bool
            True if data was successfully extracted, False otherwise.
        """
        try:
            r = requests.get(self.url)
            self.soup = BeautifulSoup(r.text, 'html.parser')
            if self.soup.find(class_='PA15'):
                logging.info(f'Successfully extracted data for Plaza ID: {self.plaza_id}')
                return True
            logging.warning(f'No data found for Plaza ID: {self.plaza_id}')
            return False
        except Exception as e:
            logging.error(f'Error extracting data for Plaza ID: {self.plaza_id} - {e}')
            return False

    def transform(self):
        """
        Transforms the extracted data into a pandas DataFrame.
        """
        try:
            plaza_name = self.soup.find(class_='PA15').find_all('p')[0].find('label')
            table_html = str(self.soup.find_all('table', class_='tollinfotbl')[0])
            df_info = pd.read_html(table_html)[0].dropna(axis=0, how='all')
            cols = df_info.columns.tolist()
            cols.insert(0, 'Date Scraped')
            cols.insert(1, 'Plaza Name')
            cols.insert(2, 'TollPlazaID')
            df_info['Plaza Name'] = plaza_name.text
            df_info['Date Scraped'] = date.today()
            df_info['TollPlazaID'] = self.plaza_id
            self.df_info = df_info[cols]
            logging.info(f'Transformed data for Plaza ID: {self.plaza_id}')
        except Exception as e:
            logging.error(f'Error transforming data for Plaza ID: {self.plaza_id} - {e}')

    def load(self):
        """
        Loads the transformed data into the specified SQLite database.
        """
        try:
            with sqlite3.connect(self.sql_file_path) as conn:
                self.df_info.to_sql(self.sql_table_name, conn, if_exists='append', index=False)
            logging.info(f'Successfully loaded data for Plaza ID: {self.plaza_id}')
        except Exception as e:
            logging.error(f'Error loading data for Plaza ID: {self.plaza_id} - {e}')

    def run_etl(self):
        """
        Runs the ETL process: extract, transform, and load the data.
        """
        if self.extract():
            self.transform()
            self.load()
            logging.info(f'ETL process complete for Plaza ID: {self.plaza_id}')
        else:
            logging.info(f'Skipped Plaza ID: {self.plaza_id}')
