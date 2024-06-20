// src/components/StoryList.js
import React, { useEffect, useState } from 'react';
import { getAllStories, deleteStory } from '../services/StoryService.js';

const API_URL = 'http://localhost:8080/stories';

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);
  const [editingStory, setEditingStory] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const data = await getAllStories();
      setStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError('Failed to fetch stories');
    }
  };

  const handleEdit = (story) => {
    setEditingStory(story);
    setUpdatedTitle(story.title);
    setUpdatedContent(story.content);
  };

  const handleUpdate = async () => {
    try {
      const updatedStory = { ...editingStory, title: updatedTitle, content: updatedContent };
      const response = await fetch(`${API_URL}/${editingStory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStory),
      });

      if (!response.ok) {
        throw new Error('Failed to update story');
      }

      const updatedStoryFromServer = await response.json();
      const updatedStories = stories.map(s => (s.id === updatedStoryFromServer.id ? updatedStoryFromServer : s));
      setStories(updatedStories);
      setEditingStory(null);
      setUpdatedTitle('');
      setUpdatedContent('');
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingStory(null);
    setUpdatedTitle('');
    setUpdatedContent('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteStory(id);
      const updatedStories = stories.filter(story => story.id !== id);
      setStories(updatedStories);
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Stories</h2>
      <ul>
        {stories.map(story => (
          <li key={story.id}>
            {editingStory && editingStory.id === story.id ? (
              <div>
                <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                <textarea value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{story.title}</h3>
                <p>{story.content}</p>
                <button onClick={() => handleEdit(story)}>Edit</button>
                <button onClick={() => handleDelete(story.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
