###
### pip install gs1-compression pandas xlwt openpyxl xlsxwriter xlrd
#
from gs1 import compress_gs1_digital_link
import pandas as pd
from pandas.core.frame import DataFrame

def compress(v,use_optimizations=False,compress_other_key_value_pairs=False):
    return compress_gs1_digital_link(digital_link_uri=v, use_optimizations=use_optimizations, compress_other_key_value_pairs=compress_other_key_value_pairs)

df = pd.read_excel('file.xlsx')
outFrame = []
for v in df[df.columns[0]]:
    outFrame.append(compress(v))

df["Compressed-PY"] = outFrame

writer = pd.ExcelWriter("file-compressed-pd.xlsx", engine='xlsxwriter')
df.to_excel(writer, 'Sheet1',index=0)
writer.save()


# full_uri = "https://id.gs1.org/gtin/9421902960055/lot/2010005828/ser/xyz1234"
# compressed_link = compress(full_uri)
# print("Compressed Link: " + compressed_link)
# #   Compressed Link: https://id.gs1.org/AREjalurbiAUO-cgohCz45Z67b8A