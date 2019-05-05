# from pyspark.sql import SparkSession

# spark = SparkSession.builder.appName('electric').getOrCreate()

# csv_df = spark.read.csv('../data/2015/Apt7_2015.csv')

# df = csv_df.toPandas()

# print(df[:, 1])

import pandas as pd

df = pd.read_csv('../data/2015/Apt7_2015.csv')
front = 0
cycle = 0
position = 0
power = []
for value in df.values:
    date = int(value[0][14:16])
    if abs(date - front) == 15:
        print(position)
        power[position // 96] = value[1]
    else :
        cycle = cycle + 1

    front = int(value[0][14:16])
print(power)