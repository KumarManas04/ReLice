# ReliceAI!

ReliceAi is a python flask app **deployed on azure using app services** which serves the deep learning model as well as process other **Azure Cosmos DB** request.

# What it does

It provides routes to both **Azure Face API** and **FaceNet-MTCNN-blend**. We have used **Azure Face API** for face detection as well as face matching and we have used FaceNet-MTCNN-blend network for image conversion to embeddings and image similarity calculation. It also provieds routes for the file extraction from **Azure Cosmos DB**.  

## Azure Face API

Azure face api is a part of **microsoft azure cognitive services** it provides face detection and face matching and many other featuers. We have used the face detection and face matching api from the cognitive services for our application.

## How the image searching works

Our model does not directly extract all the images but it first search of sutiable images based on the meta data from our user the meta data includes the age, gender, hair color, skin color, and other features. This decreases the search tree size exponentially and we get the response in very short time. Then we just match the user given image with extracted images from the database(**Azure Cosmos DB**).

## Access Model Files and API website

Model files are prototyped in jupyter notebook with different kids of deep learning frameworks like PyTorch, Keras and we have also used other types of scientific python packages. 

[Relice API Link](https://reliceai.azurewebsites.net)
[Relice Notebook Link](https://github.com/ANUBHAVNATANI/LNMHacks4-Submissions/blob/master/Waitlisted/DeeplearningAndAzure/ML_Models/SiameseNetwork.ipynb)