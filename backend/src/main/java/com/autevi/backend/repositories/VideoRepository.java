package com.autevi.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.autevi.backend.entities.Video;

@Repository
public interface VideoRepository extends MongoRepository<Video, String> {
    // You can add custom query methods here if needed
}
