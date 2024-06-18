package via.doc1.devopsdemo.service;

import via.doc1.devopsdemo.model.Story;
import via.doc1.devopsdemo.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;

    @Autowired
    public StoryServiceImpl(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @Override
    public List<Story> findAll() {
        return storyRepository.findAll();
    }

    @Override
    public Optional<Story> findById(Long id) {
        return storyRepository.findById(id);
    }

    @Override
    public Story save(Story story) {
        return storyRepository.save(story);
    }

    @Override
    public void deleteById(Long id) {
        storyRepository.deleteById(id);
    }
}

