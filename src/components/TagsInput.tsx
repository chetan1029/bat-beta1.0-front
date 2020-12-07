import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { map } from "lodash";

interface TagsInputProps {
    label?: string;
    placeholder?: string;
    tags?: [string];
    selectedTags?: (tags: any) => void;
}

const TagsInput = (props: TagsInputProps) => {
    const [tags, setTags] = useState<any>(props.tags);
    const [value, setValue] = useState<any>("");

    const handleChange = (event: any) => {
        const { value } = event.target
        setValue(value)
    }

    const handleKeyDown = (event: any) => {
        const { value } = event.target
        if ([13].includes(event.keyCode)) {
            addTags(value)
        }
    }

    const removeTags = (indexToRemove: number) => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    const addTags = (value: string) => {
        if (value !== "") {
            setTags([...tags, value]);
            props.selectedTags && props.selectedTags([...tags, value]);
            setValue("")
        }
    };

    return (
        <>
            <Form.Label htmlFor="usr">{props.label}</Form.Label>
            <Form.Control
                type="text"
                className="form-control"
                id="title"
                name="tags"
                value={value}
                placeholder={props.placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <ul id="tags">
                {map(tags, (tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span
                            className='tag-close-icon'
                            onClick={() => removeTags(index)}>
                            x
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
};

TagsInput.defaultProps = {
    label: "Tags",
    placeholder: "Tags",
    tags: [],
    selectedTags: () => {},
}

export default TagsInput;