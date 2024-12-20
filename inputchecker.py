import os 
image_path = "/home/kiara/DairySightProjects/FaceReq/image1.jpeg"

if not os.path.exists(image_path):
	print(f"image file not found at {image_path}")
else:
	print("Image file found, proceeding...")
