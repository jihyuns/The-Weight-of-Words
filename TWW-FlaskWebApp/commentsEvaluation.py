from konlpy.tag import Okt
from tensorflow.keras.initializers import glorot_uniform
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  
import os, json, nltk
import numpy as np
import tensorflow as tf

app = Flask(__name__, static_folder='outputs')                 
CORS(app)

if os.path.isfile('nsmcData/train_docs.json'):
    with open('nsmcData/train_docs.json') as f:
        train_docs = json.load(f)
    with open('nsmcData/test_docs.json') as f:
        test_docs = json.load(f)

okt = Okt()
tokens = [t for d in  train_docs for t in d[0]]
text = nltk.Text(tokens, name='NSMC')
selected_words = [f[0] for f in text.vocab().most_common(10000)]

global graph
graph = tf.get_default_graph()
model = tf.keras.models.load_model('modelData/model.h5', custom_objects={'GlorotUniform': glorot_uniform()})

def tokenize(doc):
    return ['/'.join(t) for t in okt.pos(doc, norm=True, stem=True)]

def term_frequency(doc):
    return [doc.count(word) for word in selected_words]

def percentage_pos_neg(review):
    token = tokenize(review)
    tf = term_frequency(token)
    data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
    score = float(model.predict(data))

    if(score > 0.5):
        result = {"result": "1", "score": round(score*100, 2)}
        return result
    else:
        result = {"result": "0", "score": round((1-score)*100, 2)}
        return result

@app.route("/estimator", methods=['GET', 'POST'])
def estimator():
    content = request.json
    with graph.as_default():
        res = percentage_pos_neg(content['comments'])
        result = res
        return jsonify(result)

if __name__ == '__main__':
    app.run('0.0.0.0', port=8000, threaded=True)