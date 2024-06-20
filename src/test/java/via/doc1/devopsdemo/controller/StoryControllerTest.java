package via.doc1.devopsdemo.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import via.doc1.devopsdemo.model.Story;
import via.doc1.devopsdemo.service.StoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StoryControllerTest {

    @Mock
    private StoryService storyService;

    @InjectMocks
    private StoryController storyController;

    private List<Story> mockStories;

    @BeforeEach
    void setUp() {
        mockStories = new ArrayList<>();
        mockStories.add(new Story("1", "Story 1", "Description 1", "Department 1"));
        mockStories.add(new Story("2", "Story 2", "Description 2", "Department 2"));
    }

    @Test
    void testGetAllStories() {
        when(storyService.findAll()).thenReturn(mockStories);

        List<Story> returnedStories = storyController.getAllStories();

        assertEquals(2, returnedStories.size());
        assertEquals("Story 1", returnedStories.get(0).getTitle());
        assertEquals("Story 2", returnedStories.get(1).getTitle());
    }

    @Test
    void testGetStoryById() {
        String id = "1";
        Optional<Story> story = Optional.of(new Story(id, "Story 1", "Description 1", "Department 1"));
        when(storyService.findById(Long.parseLong(id))).thenReturn(story);

        ResponseEntity<Story> responseEntity = storyController.getStoryById(Long.parseLong(id));

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Story 1", responseEntity.getBody().getTitle());
    }

    @Test
    void testGetStoryById_NotFound() {
        String id = "3";
        when(storyService.findById(Long.parseLong(id))).thenReturn(Optional.empty());

        ResponseEntity<Story> responseEntity = storyController.getStoryById(Long.parseLong(id));

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testCreateStory() {
        Story newStory = new Story(null, "New Story", "New Description", "New Department");
        when(storyService.save(any(Story.class))).thenReturn(newStory);

        Story createdStory = storyController.createStory(newStory);

        assertEquals("New Story", createdStory.getTitle());
    }

    @Test
    void testUpdateStory() {
        String id = "1";
        Story updatedStory = new Story(id, "Updated Story", "Updated Description", "Updated Department");
        Optional<Story> existingStory = Optional.of(new Story(id, "Story 1", "Description 1", "Department 1"));
        when(storyService.findById(Long.parseLong(id))).thenReturn(existingStory);
        when(storyService.save(any(Story.class))).thenReturn(updatedStory);

        ResponseEntity<Story> responseEntity = storyController.updateStory(Long.parseLong(id), updatedStory);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Updated Story", responseEntity.getBody().getTitle());
    }

    @Test
    void testUpdateStory_NotFound() {
        String id = "3";
        Story updatedStory = new Story(id, "Updated Story", "Updated Description", "Updated Department");
        when(storyService.findById(Long.parseLong(id))).thenReturn(Optional.empty());

        ResponseEntity<Story> responseEntity = storyController.updateStory(Long.parseLong(id), updatedStory);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testDeleteStory() {
        String id = "1";
        ResponseEntity<Void> responseEntity = storyController.deleteStory(Long.parseLong(id));

        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
        verify(storyService, times(1)).deleteById(Long.parseLong(id));
    }
}
