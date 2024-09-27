package com.autevi.backend.controllers;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.autevi.backend.entities.Input;
import com.autevi.backend.entities.Video;
import com.autevi.backend.services.GridFSService;
import com.autevi.backend.services.VideoService;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import java.io.IOException;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private GridFSService gridFSService;

    @GetMapping
    public ResponseEntity<List<Video>> getAllVideos() {
        List<Video> videos = videoService.getAllVideos();
        return new ResponseEntity<>(videos, HttpStatus.OK);
    }

    @GetMapping("/stream/{id}")
    public ResponseEntity<String> getVideoStreamUrl(@PathVariable String id) {
        try {
            // Check if the file exists
            org.springframework.core.io.Resource videoResource = gridFSService.getFile(id);
            if (videoResource == null) {
                return new ResponseEntity<>("Video not found", HttpStatus.NOT_FOUND);
            }

            // Construct the streaming URL
            String streamUrl = "/api/videos/stream/data/" + id;

            return new ResponseEntity<>(streamUrl, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error retrieving video stream URL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/stream/data/{id}")
    public ResponseEntity<org.springframework.core.io.Resource> streamVideo(@PathVariable String id) {
        try {
            org.springframework.core.io.Resource videoResource = gridFSService.getFile(id);
            if (videoResource == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return ResponseEntity.ok()
                .contentType(org.springframework.http.MediaType.parseMediaType("video/mp4"))
                .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + videoResource.getFilename() + "\"")
                .body(videoResource);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable String id) {
        Optional<Video> video = videoService.getVideoById(id);
        return video.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Video> createVideo(@RequestParam("name") String name,
                                             @RequestParam("prompt") String prompt,
                                             @RequestParam(value = "files", required = false) MultipartFile[] files,
                                             @RequestParam("language") String language,
                                             @RequestParam("slide") String slide,
                                             @RequestParam("document") String document) {
        List<Object> fileInfo = new ArrayList<>();
        if (files != null && files.length > 0) {
            for (MultipartFile file : files) {
                try {
                    ObjectId fileId = gridFSService.storeFile(file);
                    Map<String, String> fileData = new HashMap<>();
                    fileData.put("id", fileId.toString());
                    fileData.put("type", file.getContentType());
                    fileInfo.add(fileData);
                } catch (IOException e) {
                    // Log the error and return an error response
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }
        
        Input input = new Input();
        input.setPrompt(prompt);
        input.setFiles(fileInfo);
        input.setLanguage(language);
        input.setSlide(slide);
        input.setDocument(document);
        input.setId("yeah boy");
        
        Video video = new Video();
        video.setName(name);
        video.setInput(input);
        input.setVideoId("1233");
        String videoUrl = videoService.sendInputToEndpoint(input, "http://localhost:6969/generate_video");
        video.setUrl(videoService.downloadAndStoreVideo(videoUrl));
        Video createdVideo = videoService.createVideo(video);
        return new ResponseEntity<>(createdVideo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Video> updateVideo(@PathVariable String id, @RequestBody Video videoDetails) {
        Video updatedVideo = videoService.updateVideo(id, videoDetails);
        if (updatedVideo != null) {
            return new ResponseEntity<>(updatedVideo, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable String id) {
        videoService.deleteVideoById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllVideos() {
        videoService.deleteAllVideos();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
