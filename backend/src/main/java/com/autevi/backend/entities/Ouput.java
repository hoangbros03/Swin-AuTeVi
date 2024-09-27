package com.autevi.backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "outputs")
public class Ouput {

    @Id
    private String id;

    private List<String> videos;
    private String slide;
    private String document;

    // Constructors
    public Ouput() {}

    public Ouput(List<String> videos, String slide, String document) {
        this.videos = videos;
        this.slide = slide;
        this.document = document;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getVideos() {
        return videos;
    }

    public void setVideos(List<String> videos) {
        this.videos = videos;
    }

    public String getSlide() {
        return slide;
    }

    public void setSlide(String slide) {
        this.slide = slide;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }
}