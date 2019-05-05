# from pyspark.sql import SparkSession

# spark = SparkSession.builder.appName('electric').getOrCreate()

# csv_df = spark.read.csv('../data/2015/Apt7_2015.csv')

# df = csv_df.toPandas()

# print(df[:, 1])

import pandas as pd

df = pd.read_csv('./Apt1_2015.csv')
front = 0
cycle = 0
position = 0
power = []
print(len(df.values))
for value in df.values:
    if int(value[0][14: 16]) % 15 == 0:
        cycle = cycle + value[1]
        if position % 96 == 0:
            power.append([cycle])
        else:
            power[position // 96].append(cycle)
        position = position + 1
        cycle = 0
    else:
        cycle = cycle + value[1]
df = pd.DataFrame(power)
