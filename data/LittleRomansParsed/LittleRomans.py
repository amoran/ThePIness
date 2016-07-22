#import MySQLdb for connection to our db.
import MySQLdb
import os

#import re for RegEx parsing.
# import re

#define connection to our MySQL db.
connection = MySQLdb.connect(host = "localhost", user = "root", passwd = "mysql123", db = "pizza")
cur = connection.cursor()

cur.execute("INSERT INTO STORES (STORE_NAME) VALUES('Little Romans');")
STORE_ID = cur.lastrowid
connection.commit()

cur_pizzas = []

cur.execute("INSERT INTO PIZZAS (STORE_ID, PIZZA_NAME, PIZZA_TOPPINGS) VALUES(%s,%s,%s);", (STORE_ID, 'Cheese', 'CHEESE, EXTRA_CHEESE'))
PIZZA_ID = cur.lastrowid
cur_pizzas.append((STORE_ID,PIZZA_ID,'Good'))
connection.commit()

cur.execute("INSERT INTO PIZZAS (STORE_ID, PIZZA_NAME, PIZZA_TOPPINGS) VALUES(%s,%s,%s);", (STORE_ID, 'Pepperoni', 'CHEESE, PEPPERONI'))
PIZZA_ID = cur.lastrowid
cur_pizzas.append((STORE_ID,PIZZA_ID,'Bad'))
connection.commit()

cur.execute("INSERT INTO PIZZAS (STORE_ID, PIZZA_NAME, PIZZA_TOPPINGS) VALUES(%s,%s,%s);", (STORE_ID, 'Ultimate', 'CHEESE, PEPPERONI, MUSHROOMS, ONIONS, SAUSAGE, BACON, EXTRA_CHEESE, BLACK_OLIVES, GREEN_PEPPERS'))
PIZZA_ID = cur.lastrowid
cur_pizzas.append((STORE_ID,PIZZA_ID,'Ugly'))
connection.commit()



cur_drivers = []
cur_customers = []

for file in os.listdir(os.getcwd()):
    final = open(file, 'r')
    with final as f:
        for line in f:
            result = line.split(';')
            ORDER_ID = result[0]
            driver = result[1]
            ORDER_DATE = result[2]
            customer = result[3]
            address = result[4]
            PIZZA_NAMES = result[5]
            # print "Driver: " + driver
            # print "Date: " + date
            # print "Customer: " + customer
            # print "Address: " + address
            # print "Pizzas: " + pizzas
            DRIVER_ID = -1
            for driver_tuple in cur_drivers:
                if driver_tuple[0] == driver:
                    DRIVER_ID = driver_tuple[1]

            if DRIVER_ID == -1:
                cur.execute("INSERT INTO DRIVERS (DRIVER_NAME, DRIVER_STORE_ID) VALUES(%s,%s);", (driver, STORE_ID))
                DRIVER_ID = cur.lastrowid
                connection.commit()
                cur_drivers.append((driver, DRIVER_ID))

            CUSTOMER_ID = -1
            for customer_tuple in cur_customers:
                if customer_tuple[0] == customer:
                    if customer_tuple[1] == address:
                        CUSTOMER_ID = customer_tuple[2]

            if CUSTOMER_ID == -1:
                # Insert customer into db
                cur.execute("INSERT INTO CUSTOMERS (CUSTOMER_NAME, CUSTOMER_ADDRESS) VALUES(%s,%s);", (customer, address))
                CUSTOMER_ID = cur.lastrowid
                connection.commit()
                cur_customers.append((customer, address, CUSTOMER_ID))

            cur.execute("INSERT INTO ORDERS (ORDER_ID, CUSTOMER_ID, ORDER_DATE, STORE_ID, PIZZA_NAMES) VALUES(%s,%s,%s,%s,%s);", 
                (ORDER_ID, CUSTOMER_ID, ORDER_DATE, STORE_ID, PIZZA_NAMES))
            connection.commit()

