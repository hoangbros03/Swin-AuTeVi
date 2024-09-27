class Input {
  constructor(prompt, medias = []) {
    this.prompt = prompt;
    this.medias = medias;
  }

  setPrompt(prompt) {
    if (typeof prompt !== 'string') {
      throw new Error('Prompt must be a string');
    }
    this.prompt = prompt;
  }

  addMedia(media) {
    this.medias.push(media);
  }

  removeMedia(index) {
    if (index >= 0 && index < this.medias.length) {
      this.medias.splice(index, 1);
    }
  }

  getPrompt() {
    return this.prompt;
  }

  getMedias() {
    return [...this.medias];
  }
}

export default Input;


