#import MySQLdb for connection to our db.
import MySQLdb


#define connection to our MySQL db.
connection = MySQLdb.connect(host = "localhost", user = "root", passwd = "mysql123", db = "pizza")
cur = connection.cursor()

final = open("Harry Gary's Pizza Pie.20130201.csv", 'r')

cur.execute("INSERT INTO STORES (STORE_NAME) VALUES('Tiny Pizzas');")
STORE_ID = cur.lastrowid
connection.commit()

cur_pizzas = []
cur_drivers = []
cur_customers = []

outFile = open('temp.csv','w')

lines = []

add_pizzas = []

with final as f:
    for line in f:
        lines.append(line)

        thisSplit = line.split(',')

        pizza = thisSplit[9]

        toppings = thisSplit[10:]
        toppingsFormatted = ''
        for i in xrange(len(toppings)):
            total = toppings[i].strip('\r')
            total = toppings[i].strip('\n')
            toppingsFormatted += total
            if i != len(toppings)-1:
                toppingsFormatted += ', '

        found = False
        for tuple in add_pizzas:
            if pizza == tuple[0]:
                found = True

        if (not found):
            add_pizzas.append((pizza, toppingsFormatted))

for tuple in add_pizzas:
    cur.execute("INSERT INTO PIZZAS (STORE_ID, PIZZA_NAME, PIZZA_TOPPINGS) VALUES(%s,%s,%s);", (STORE_ID, tuple[0], tuple[1]))
    


completed = []

for i in xrange(len(lines)):
    if (i < len(lines)-1):
        curSplit = lines[i].split(',')
        nextSplit = lines[i+1].split(',')
        if curSplit[0] not in completed:
            if curSplit[0] == nextSplit[0]:
                # Duplicate ids
                pizza = nextSplit[9]

                curLen = 0
                for j in xrange(len(curSplit[10:])):
                    curLen += len(curSplit[10:][j])
                curLen += 2

                outLine = lines[i][:-curLen] + ', ' + pizza + '\n'
                outFile.write(outLine)
                completed.append(curSplit[0])
            else:
                curLen = 0
                for j in xrange(len(curSplit[10:])):
                    curLen += len(curSplit[10:][j])
                curLen += 2

                outLine = lines[i][:-curLen] + '\n'
                outFile.write(outLine)
                completed.append(curSplit[0])

outFile.close()

fresh = open('temp.csv','r')


with fresh as f:
    for line in f:
        result = line.split(',')
        ORDER_ID = result[0]
        driver = result[3]
        ORDER_DATE = result[1] + result[2]
        customer = result[4]
        address = result[5]+ ' ' + result[6] + ' ' + result[7]+', '+result[8]
        PIZZA_NAME = result[9]
        for name in result[10:]:
            PIZZA_NAME += ', '
            PIZZA_NAME += name

        # toppings = result[10:]
        # toppingsFormatted = ''
        # for i in xrange(len(toppings)):
        #     line = toppings[i].strip('\r')
        #     line = toppings[i].strip('\n')
        #     toppingsFormatted += line
        #     if i != len(toppings)-1:
        #         toppingsFormatted += ', '

        # print "Order ID: " + ORDER_ID
        # print "Driver: " + driver
        # print "Date: " + ORDER_DATE
        # print "Customer: " + customer
        # print "Address: " + address
        # print "Pizzas: " + PIZZA_NAME
        # print "Toppings: " + toppingsFormatted


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
            (ORDER_ID, CUSTOMER_ID, ORDER_DATE, STORE_ID, PIZZA_NAME))
        connection.commit()

        # PIZZA_ID = -1
        # for pizza_tuple in cur_pizzas:
        #     if pizza_tuple == PIZZA_NAME:
        #         PIZZA_ID = 1

        # if PIZZA_ID == -1:
        #     # We need to insert this pizza
        #     cur.execute("INSERT INTO PIZZAS (STORE_ID, PIZZA_NAME, PIZZA_TOPPINGS) VALUES(%s,%s,%s);", (STORE_ID, PIZZA_NAME, toppingsFormatted))
        #     connection.commit()
        #     cur_pizzas.append(PIZZA_NAME)
