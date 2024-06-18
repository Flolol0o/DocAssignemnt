// src/components/StoryForm.js
import React, { useState } from 'react';
import { createStory } from '../services/StoryService.js';

const StoryForm = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !content) {
      alert('Please fill out title and content fields');
      return;
    }

    const storyData = { id, title, content, department };

    try {
      const createdStory = await createStory(storyData);
      console.log('Story created successfully:', createdStory);
      setId('');
      setTitle('');
      setContent('');
      setDepartment('');
      alert('Story created successfully');
    } catch (error) {
      console.error('Error creating story:', error);
      alert('Failed to create story');
    }
  };

  return (
    <div>
      <h2>Create Story</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <br />
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <label>
          Department:
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Story</button>
      </form>
    </div>
  );
};

export default StoryForm;
