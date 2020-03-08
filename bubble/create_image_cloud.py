"""
This program creates a cloud of images for all images in a directory.
This is accomplished by moving over an empty canvas in a spiral-like fashion.
Each point on this spiral is treated as a potential center where an 
image can be inserted onto the canvas. If the area around this potential center 
is unoccupied, the image is inserted.
The program is called as follows:
$ python3 create_image_cloud.py --directory some-dir-path
The output is stored as an image named 'art_cloud.png'
"""

from math import pi, sin, cos
import cv2
import numpy as np
from tqdm import tqdm
from glob import glob
import argparse

def insert_image(canvas, mask, image, coordinate):
    """ Draws an image within a larger canvas at some center coordinate """

    y_min = int(round(coordinate[0] - image.shape[0]/2))
    y_max = y_min + image.shape[0]
    x_min = int(round(coordinate[1] - image.shape[1]/2))
    x_max = x_min + image.shape[1]

    canvas[y_min:y_max, x_min:x_max] = image
    mask[y_min:y_max, x_min:x_max] = 1
    return canvas, mask

def area_free(mask, image, coordinate):
    """ Determine whether the place where the image will be placed is free """
    height, width, _ = image.shape

    y_min = int(round(coordinate[0] - height/2))
    y_max = int(round(coordinate[0] + height/2))
    x_min = int(round(coordinate[1] - width/2))
    x_max = int(round(coordinate[1] + width/2))

    region = mask[y_min:y_max, x_min:x_max]

    if np.all(region==0):
        return True

    else:
        return False

def create_seam_space(coordinate, canvas):
    """ Changes the subimage coordinate to create small
        spaces between images in the cloud. """

    height, width, _ = canvas.shape

    if coordinate[0] < height/2:
        coordinate[0] -= height/80
    elif coordinate[0] > height/2:
        coordinate[0] += height/80
    if coordinate[1] < width/2:
        coordinate[1] -= width/80
    elif coordinate[1] > width/2:
        coordinate[1] += width/80

    return coordinate

def create_image_cloud(image_directory):
    """ Creates a painting cloud for all images in a directory """

    # Create a canvas to draw on
    canvas_height = 20_000
    canvas_width = 20_000
    canvas = np.full((canvas_height,canvas_width,3), 0, dtype=np.uint8)

    # Create a mask to keep track of free pixels
    mask = np.full((canvas_height,canvas_width,3), 0, dtype=np.uint8)

    # Spiral starts in the middle of the canvas
    y = int(canvas_height/2)
    x = int(canvas_width/2)

    spiral_length = 100_000
    spiral_resolution = 17

    already_seen_spiral_points = list()
    glob_query = image_directory+'/*.jpg'

    for image_path in tqdm(glob(glob_query)):
        current_image = cv2.imread(image_path)

        for spiral_point in range(spiral_length):

            if spiral_point in already_seen_spiral_points:
                continue

            # Calculates a coordinate for the spiral pixel
            t = spiral_point / spiral_resolution * pi
            dx = (1 + 5 * t) * cos(t)
            dy = (1 + 5 * t) * sin(t)
            coordinate = [y + dy, x + dx]
            area_is_free = area_free(mask, current_image, coordinate)

            if area_is_free:
                coordinate = create_seam_space(coordinate, canvas)
                canvas, mask = insert_image(canvas, mask, current_image, coordinate)
                break

            else:
                already_seen_spiral_points.append(spiral_point)


    resized = cv2.resize(canvas, (1000, 1000))
    cv2.imwrite('art_cloud.png', resized)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--directory', help='The path to the image directory.', required=True)
    args = parser.parse_args()
    create_image_cloud(args.directory)