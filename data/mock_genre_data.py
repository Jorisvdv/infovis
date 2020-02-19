import numpy as np
import json

AMOUNT_OF_TRACKS = 2000
AMOUNT_OF_YEARS = 21
START_YEAR = 1999


def generate_probability_matrix(amount_of_genres):
    """
    Generate a probability matrix P where P_ij is the probability that genre i steals a track from genre j

    Returns:
        probability_matrix (np.Array): probability matrix, columns are normalized to 1
    """

    probability_matrix = np.random.uniform(0, .1, (amount_of_genres, amount_of_genres))
    for i in range(amount_of_genres):
        probability_matrix[i, i] = 0

    return probability_matrix / probability_matrix.sum()


def generate_mock_data(genres):
    """
    Generate a mock data set that contains the amount of tracks that where in the Top 2000 over time for each genre

    Args:
        genres (list): list of genres
        probability_matrix (np.Array): matrix that contains the probabilities that genres steal track from each other
        initialization_probabilities (np.Array): distribution of tracks for initialization

    Returns:
        mock_data (json):
    """

    # initialize the first year
    initialization_probabilities = np.random.uniform(0, 1, size=len(genres))
    initialization_probabilities_normalized = initialization_probabilities / np.sum(initialization_probabilities)
    mock_data = np.expand_dims(AMOUNT_OF_TRACKS * initialization_probabilities_normalized, axis=0)

    last_year = mock_data[0]
    for i in range(AMOUNT_OF_YEARS):
        probability_matrix = generate_probability_matrix(len(genres))

        stolen = np.matmul(probability_matrix, last_year)
        gained = np.matmul(np.transpose(probability_matrix), last_year)
        next_year = last_year + gained - stolen
        next_year = AMOUNT_OF_TRACKS * next_year / np.sum(next_year)

        mock_data = np.concatenate((mock_data, np.expand_dims(next_year, axis=0)), axis=0)
        last_year = next_year

    return mock_data

def convert_to_json(mock_data, genres):
    """
    Convert the mock data to a json in the format below and saves the json object.
    {
        "rock": [
                    {
                        "year": 1999,
                        "value": 293
                    },
                    {
                        "year": 2000,
                        "value": 542
                    },
                    :
                    :
                ],
        "hip hop": ...
        :
        :
    }

    Args:
        mock_data (np.Array)

    """

    mock_json = {}
    for i in range(len(genres)):
        current_year_data = mock_data[:,i]
        data_points = []
        for j in range(AMOUNT_OF_YEARS):
            current_year_data_point = {}
            current_year_data_point["year"] = START_YEAR + j
            current_year_data_point["value"] = current_year_data[j]
            data_points.append(current_year_data_point)
        mock_json[genres[i]] = data_points

    with open("mock_genres.json", "w") as f:
        json.dump(mock_json, f)

    return



if __name__ == "__main__":

    genres = ['rock', 'hiphop', 'jazz', 'techno', 'classic', 'pop']

    mock_data = generate_mock_data(genres)
    convert_to_json(mock_data, genres)
