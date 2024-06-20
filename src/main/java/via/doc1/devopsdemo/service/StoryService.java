package via.doc1.devopsdemo.service;

import via.doc1.devopsdemo.model.Story;

import java.util.List;
import java.util.Optional;

public interface StoryService {
    List<Story> findAll();
    Optional<Story> findById(Long id);
    Story save(Story story);
    void deleteById(Long id);
}

