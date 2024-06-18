// src/services/StoryService.js

const API_URL = 'http://localhost:8080/stories';

const getAllStories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch stories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};

const createStory = async (storyData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    });

    if (!response.ok) {
      throw new Error('Failed to create story');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};

const deleteStory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete story');
    }
  } catch (error) {
    console.error('Error deleting story:', error);
    throw error;
  }
};

export { getAllStories, createStory, deleteStory };
