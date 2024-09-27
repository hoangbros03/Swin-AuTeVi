package com.autevi.backend.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.autevi.backend.entities.Input;
import com.autevi.backend.entities.Video;
import com.autevi.backend.repositories.VideoRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.FileInputStream;
import java.io.File;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public Optional<Video> getVideoById(String id) {
        return videoRepository.findById(id);
    }

    public void deleteVideoById(String id) {
        videoRepository.deleteById(id);
    }

    public void deleteAllVideos() {
        videoRepository.deleteAll();
    }

    public Video updateVideo(String id, Video videoDetails) {
        Optional<Video> optionalVideo = videoRepository.findById(id);
        if (optionalVideo.isPresent()) {
            Video video = optionalVideo.get();
            video.setUrl(videoDetails.getUrl());
            video.setJson(videoDetails.getJson());
            video.setDescription(videoDetails.getDescription());
            video.setInput(videoDetails.getInput());
            return videoRepository.save(video);
        }
        return null;
    }

    public Video createVideo(Video video) {
        return videoRepository.save(video);
    }

    @Autowired
    private RestTemplate restTemplate;

    public String sendInputToEndpoint(Input input, String endpointUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Input> request = new HttpEntity<>(input, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(endpointUrl, request, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                // Parse the response body to get the video URL
                // Assuming the response is in JSON format and contains a "video" field
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());
                return root.path("video").asText();
            } else {
                // Handle error response
                System.err.println("Error sending input. Status code: " + response.getStatusCode());
                return null;
            }
        } catch (RestClientException | JsonProcessingException e) {
            // Handle exception
            System.err.println("Exception occurred while sending input or parsing response: " + e.getMessage());
            return null;
        }
    }

    @Autowired
    private GridFSService gridFSService;

    public String downloadAndStoreVideo(String videoUrl) {
        try {
            // Make GET request to download the video
            ResponseEntity<byte[]> response = restTemplate.getForEntity(videoUrl, byte[].class);
            
            if (response.getStatusCode().is2xxSuccessful()) {
                byte[] videoBytes = response.getBody();
                
                // Create a temporary file with .mp4 extension
                File tempFile = File.createTempFile("temp-video", ".mp4");
                FileOutputStream fos = new FileOutputStream(tempFile);
                fos.write(videoBytes);
                fos.close();

                // Store the file in GridFS
                ObjectId fileId = gridFSService.storeFile(new FileInputStream(tempFile), "video.mp4");
                
                // Delete the temporary file
                tempFile.delete();

                // Return the MongoDB file ID as a string
                return fileId.toString();
            } else {
                System.err.println("Failed to download video. Status code: " + response.getStatusCode());
                return null;
            }
        } catch (RestClientException | IOException e) {
            System.err.println("Exception occurred while downloading or storing video: " + e.getMessage());
            return null;
        }
    }

    // public void sendInputToEndpoint(Input input, String endpointUrl) {
    //     HttpHeaders headers = new HttpHeaders();
    //     headers.setContentType(MediaType.APPLICATION_JSON);

    //     HttpEntity<Input> request = new HttpEntity<>(input, headers);

    //     try {
    //         ResponseEntity<String> response = restTemplate.postForEntity(endpointUrl, request, String.class);
    //         if (response.getStatusCode().is2xxSuccessful()) {
    //             // Handle successful response
    //             System.out.println("Input sent successfully. Response: " + response.getBody());
    //         } else {
    //             // Handle error response
    //             System.err.println("Error sending input.");
    //         }
    //     } catch (RestClientException e) {
    //         // Handle exception
    //         System.err.println("Exception occurred while sending input: " + e.getMessage());
    //     }
    // }
}
