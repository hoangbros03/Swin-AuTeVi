class Video {
  constructor(id, url, jsonObject, description, input) {
    this.id = id;
    this.url = url;
    this.jsonObject = jsonObject;
    this.input = input;
  }

  setId(id) {
    if (typeof id !== 'string') {
      throw new Error('Id must be a string');
    }
    this.id = id;
  }

  setUrl(url) {
    if (typeof url !== 'string') {
      throw new Error('URL must be a string');
    }
    this.url = url;
  }

  setJsonObject(jsonObject) {
    if (typeof jsonObject !== 'object' || jsonObject === null) {
      throw new Error('JSON object must be a valid object');
    }
    this.jsonObject = jsonObject;
  }


  setInput(input) {
    this.input = input;
  }

  getId() {
    return this.id;
  }

  getUrl() {
    return this.url;
  }

  getJsonObject() {
    return { ...this.jsonObject };
  }

  getInput() {
    return this.input;
  } 
}

export default Video;
