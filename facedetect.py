import cv2
import face_recognition

def detect_and_crop(image_path):

	print("Loading Image.....")
	image = cv2.imread(image_path)
	if image is None:
		raise ValueError(f"Image at path '{image_path}' could not be loaded")
	print("Image Loaded Successfully.")

	rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
	print("Converted image to RGB")

	face_locations = face_recognition.face_locations(rgb_image)
	print(f"Number of faces detected: {len(face_locations)}")

	if len(face_locations) > 0:
		top, right, bottom, left = face_locations[0]
		face_image = image[top:bottom, left:right]
		print("Face cropped successfully")
		return face_image

	else:
		raise Exception("No face Detected!")

if  __name__ == "_main_":
	image_path = "/home/kiara/DairySightProjects/FaceReq/image1.jpeg"

	try:
		cropped_face = detect_and_crop_face(image_path)

		output_path = "/home/kiara/DairySightProjects/FaceReq/cropped_face.jpeg"
		cv2.imwrite(output_path, cropped_face)
		print(f"Face detected and saved as 'output_path'")
	except Exception as e:
		print(f"Error: {e}")
