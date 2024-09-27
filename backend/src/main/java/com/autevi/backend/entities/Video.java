package com.autevi.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "videos")
public class Video {

    @Id
    private String id;
    
    private String name;
    private String url;
    private Object json;
    private String description;
    private Input input;

    public Video() {
    }

    public Video(String name, String url, Object json, String description, Input input) {
        this.name = name;
        this.url = url;
        this.json = json;
        this.description = description;
        this.input = input;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Object getJson() {
        return json;
    }

    public void setJson(Object json) {
        this.json = json;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Input getInput() {
        return input;
    }

    public void setInput(Input input) {
        this.input = input;
    }
}

