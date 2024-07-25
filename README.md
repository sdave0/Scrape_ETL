# ETL + Scrape 

## Introduction
This project implements an ETL (Extract, Transform, Load) pipeline to scrape, process, and store toll plaza data from the [National Highways Authority of India](https://tis.nhai.gov.in/) website. The ETL process is automated using Python and leverages multithreading to handle multiple toll plaza pages concurrently, storing the transformed data in an SQLite database.

## Prerequisites
- Python 3.x
- SQLite3

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/toll-plaza-etl.git
    cd toll-plaza-etl
    ```

2. Create and activate a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

## Usage
1. Run the ETL process for multiple plaza IDs:
    ```sh
    python main.py
    ```

## Tools Used
- Python
- requests, request-html
- BeautifulSoup
- SQLite3
- Pandas
- re module
- Multithreading
- OOPs
- SQL

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
