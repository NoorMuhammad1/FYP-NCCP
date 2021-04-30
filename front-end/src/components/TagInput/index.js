import React, { useState } from 'react';
import { Form }            from 'react-bootstrap';
import './style.css';

function TagInput(props) {
  const [tags, setTags] = useState([]);
  const deleteTag = (indexToRemove) => {
    setTags(
      tags.filter((_, index) => {
        return index !== indexToRemove;
      })
    );
  };
  const addTag = (event) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      if (props.selected) {
        event.target.value = [...tags, event.target.value];
        props.selected(event);
      }
      event.target.value = '';
    }
  };
  return (
    <>
      <Form.Label>{props.label}</Form.Label>
      <div className="tagsBox">
        <ul id="tags">
          {tags.map((tag, index) => {
            return (
              <li className="tag" key={index}>
                <span>{tag}</span>
                <span
                  className="tag-close-icon"
                  onClick={() => deleteTag(index)}
                >
                  x
                </span>
              </li>
            );
          })}
        </ul>

        <input
          type="text"
          name={props.name}
          placeholder="press enter to add new"
          onKeyUp={(event) => (event.key === 'Enter' ? addTag(event) : null)}
        />
      </div>
    </>
  );
}

export default TagInput;
