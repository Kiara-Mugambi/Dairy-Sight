import os
import time
import urllib.request
import face_recognition

# Step 1: Download Sample Images
def download_sample_faces(directory):
    """
    Downloads sample images of famous people for testing.
    :param directory: Path to save the images.
    """
    sample_images = {
        "Elon_Musk": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
        "Bill_Gates": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bill_Gates_2014.jpg",
        "Oprah_Winfrey": "https://upload.wikimedia.org/wikipedia/commons/8/89/Oprah_Winfrey_2011.jpg"
    }
    
    os.makedirs(directory, exist_ok=True)
    
    for name, url in sample_images.items():
        file_path = os.path.join(directory, f"{name}.jpg")
        if os.path.exists(file_path):
            print(f"{name} already downloaded.")
            continue

        print(f"Downloading {name}...")
        for attempt in range(3):  # Retry up to 3 times
            try:
                urllib.request.urlretrieve(url, file_path)
                print(f"{name} downloaded successfully.")
                time.sleep(2)  # Add delay to avoid hitting rate limits
                break
            except urllib.error.HTTPError as e:
                print(f"Failed to download {name}: {e}. Retrying...")
                time.sleep(5)
            except Exception as e:
                print(f"An unexpected error occurred: {e}. Retrying...")
                time.sleep(5)
        else:
            print(f"Failed to download {name} after multiple attempts.")

# Step 2: Encode Known Faces
def encode_known_faces(directory):
    """
    Encodes all the faces in the directory.
    :param directory: Path to the directory with face images.
    :return: Dictionary of face encodings with names as keys.
    """
    known_faces = {}
    print("Encoding known faces...")
    
    for file_name in os.listdir(directory):
        name = file_name.split('.')[0]
        file_path = os.path.join(directory, file_name)
        print(f"Processing {file_name}...")
        
        image = face_recognition.load_image_file(file_path)
        encodings = face_recognition.face_encodings(image)
        
        if encodings:
            known_faces[name] = encodings[0]
        else:
            print(f"No face found in {file_name}.")
    
    print("Encoding completed.")
    return known_faces

# Main Script
if __name__ == "__main__":
    # Directory for known faces
    known_faces_dir = "known_faces_demo"

    # Download and encode known faces
    download_sample_faces(known_faces_dir)
    known_faces_encodings = encode_known_faces(known_faces_dir)
