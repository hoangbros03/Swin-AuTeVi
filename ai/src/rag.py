import os

import boto3
from langchain_aws import BedrockEmbeddings
import FAISS

# txt loader
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import CharacterTextSplitter

# pdf loader
from langchain_community.document_loaders import PyPDFLoader

os.environ['AWS_DEFAULT_REGION'] = os.getenv('AWS_DEFAULT_REGION')
os.environ['AWS_SECRET_ACCESS_KEY'] = os.getenv('AWS_SECRET_ACCESS_KEY')
os.environ['AWS_ACCESS_KEY_ID'] = os.getenv('AWS_ACCESS_KEY_ID')

def get_client_and_embedding():
    boto3_client = boto3.client("bedrock-runtime")
    br_embeddings = BedrockEmbeddings(model_id="amazon.titan-embed-text-v2:0", client=boto3_client)
    return boto3_client, br_embeddings

def get_faiss_db(docs, embed_model):
    db = FAISS.from_documents(docs, embed_model)
    print(db.index.ntotal)
    return db

def get_similarity_docs(query, db, k=5):
    return db.similarity_search(query, k=k)

def get_document_list(file_path: str):
    if file_path[-3:] == "pdf":
        loader = PyPDFLoader(file_path)
        return loader.load_and_split()
    elif file_path[-3:] == "txt":
        loader = TextLoader(file_path)
        documents = loader.load()
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        return text_splitter.split_documents(documents)
    else:
        raise ValueError("File is not txt or pdf")

