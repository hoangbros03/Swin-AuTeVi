class Video {
  constructor(id, url, jsonObject, description, input) {
    this.id = id;
    this.url = url;
    this.jsonObject = jsonObject;
    this.description = description;
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

  setDescription(description) {
    if (typeof description !== 'string') {
      throw new Error('Description must be a string');
    }
    this.description = description;
  }

  setInput(input) {
    if (!(input instanceof Input)) {
      throw new Error('Input must be an instance of Input class');
    }
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

  getDescription() {
    return this.description;
  }

  getInput() {
    return this.input;
  }
}

export default Video;
