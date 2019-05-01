from .models import Iris
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import IrisSerializer

from sklearn.cluster import KMeans
from sklearn.externals import joblib

import json
import numpy

# Iris Viewset
class IrisViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = IrisSerializer
    queryset = Iris.objects.all()


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, numpy.integer):
            return int(obj)
        elif isinstance(obj, numpy.floating):
            return float(obj)
        elif isinstance(obj, numpy.ndarray):
            return obj.tolist()
        else:
            return super(MyEncoder, self).default(obj)

class IrisTrain(APIView):
    """
    train iris cluster model
    """
    def get(self, request, format=None):
        print("--------------- IrisTrain get --------")
        snippets = Iris.objects.all()
        serializer = IrisSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print("--------------- IrisTrain post --------")
        print(request.data)

        n_clusters = request.data["cluster_number"]
        n_clusters = int(n_clusters)

        print("n_cluster=%d" % n_clusters)

        model = KMeans(n_clusters=n_clusters)

        irisObjects = Iris.objects.all()

        irisDataTrain = [[oneIris.sepal_len, oneIris.sepal_width, oneIris.petal_len, oneIris.petal_width] for oneIris in irisObjects]

        # test data
        print("delgation data print")
        print(irisDataTrain[0])

        model.fit(irisDataTrain)

        # save model for prediction
        joblib.dump(model, 'model.kmeans')

        # test saved prediction
        model = joblib.load('model.kmeans')

        # cluster result
        labels = model.predict(irisDataTrain)

        print("cluster result")
        print(labels)

        print("========================")

        # transfer data to client
        irisDataDict =  [
            {"sepal_len": oneIris.sepal_len, "sepal_width": oneIris.sepal_width, "petal_len": oneIris.petal_len, "petal_width": oneIris.petal_width}
            for oneIris in irisObjects
        ]

        print(irisDataDict[0])
        print(len(irisDataDict))

        for i in range(0, len(irisDataDict)):
            irisDataDict[i]["cluster"] = labels[i]

        print(irisDataDict[0])

        respData = json.dumps(irisDataDict, cls=MyEncoder)

        #respData = "ok"

        return Response(respData, status=status.HTTP_201_CREATED)


class IrisPredict(APIView):
    """
    predict iris cluster
    """
    def post(self, request, format=None):
        print("--------------- IrisPredict post --------")
        print(request.data)

        sepal_len = request.data["sepal_len"]
        sepal_width = request.data["sepal_width"]
        petal_len = request.data["petal_len"]
        petal_width = request.data["petal_width"]

        print("sepal_len=%s" % sepal_len)


        irisDataTrain = [[sepal_len, sepal_width, petal_len, petal_width]]

        # test data
        print("delgation data print")
        print(irisDataTrain[0])

        # test saved prediction
        model = joblib.load('model.kmeans')

        # cluster result
        labels = model.predict(irisDataTrain)

        print("cluster result")
        print(labels)

        print("========================")

        # transfer data to client
        irisDataPredict = {
            "predicted_cluster": labels[0]
        }

        print(irisDataPredict["predicted_cluster"])

        respData = json.dumps(irisDataPredict, cls=MyEncoder)

        return Response(respData, status=status.HTTP_201_CREATED)





