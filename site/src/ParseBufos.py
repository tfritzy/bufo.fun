import os
import json

folder_path = 'E:/dev/bufo.fun/public/all-the-bufo'
files_info = []

for filename in os.listdir(folder_path):
    if filename.endswith('.png') or filename.endswith('.gif'):
        file_info = {
            'name': os.path.splitext(filename)[0],  # Everything before the file extension
            'type': os.path.splitext(filename)[1].replace('.', ''),  # The file extension without the dot
            'tags': [],  # An empty array for tags
            'created': os.path.getctime(os.path.join(folder_path, filename))  # The file creation timestamp
        }
        files_info.append(file_info)

# Specify the path for the output JSON file
json_file_path = 'E:/dev/bufo.fun/bufo_data.json'

# Write the files_info list to a JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(files_info, json_file, indent=4)

print(f'JSON file has been created at {json_file_path}')