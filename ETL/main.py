from ETL import ETL
from datetime import date
from fetch_plaza_ids import get_all_plaza_ids
import concurrent.futures
from functools import partial

def create_etl_object_and_run(plaza_id, db_file_path, db_table_name):
    plaza_etl = ETL(plaza_id, db_file_path, db_table_name)
    plaza_etl.run_etl()

if __name__ == "__main__":
    db_file_path = r'C:\Users\shubh\Documents\Project\Scrape_ETL\ETL\nhai_info.db'
    db_table_name = f'nhai_toll_info_{date.today()}'
    ids = get_all_plaza_ids()[:100]
    partial_etl_function = partial(create_etl_object_and_run, db_file_path=db_file_path, db_table_name=db_table_name)
    with concurrent.futures.ThreadPoolExecutor(10) as executor:
        executor.map(partial_etl_function, ids)
