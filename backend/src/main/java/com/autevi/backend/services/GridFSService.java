package com.autevi.backend.services;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.FileInputStream;

@Service
public class GridFSService {

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private MongoTemplate mongoTemplate;
    public ObjectId storeFile(FileInputStream fileInputStream, String filename) throws IOException {
        return gridFsTemplate.store(fileInputStream, filename);
    }


    public ObjectId storeFile(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        InputStream inputStream = file.getInputStream();
        return gridFsTemplate.store(inputStream, filename, file.getContentType());
    }

    public GridFsResource getFile(String id) {
        ObjectId objectId = new ObjectId(id);
        GridFSFile gridFSFile = gridFsTemplate.findOne(new org.springframework.data.mongodb.core.query.Query(org.springframework.data.mongodb.core.query.Criteria.where("_id").is(objectId)));
        if (gridFSFile == null) {
            return null;
        }
        return gridFsTemplate.getResource(gridFSFile);
    }

    public void deleteFile(String id) {
        gridFsTemplate.delete(new org.springframework.data.mongodb.core.query.Query(org.springframework.data.mongodb.core.query.Criteria.where("_id").is(id)));
    }

    public InputStream getFileStream(String id) throws IOException {
        GridFSBucket gridFSBucket = GridFSBuckets.create(mongoTemplate.getDb());
        GridFSFile gridFSFile = gridFsTemplate.findOne(new org.springframework.data.mongodb.core.query.Query(org.springframework.data.mongodb.core.query.Criteria.where("_id").is(id)));
        if (gridFSFile == null) {
            return null;
        }
        return gridFSBucket.openDownloadStream(gridFSFile.getObjectId());
    }
}
