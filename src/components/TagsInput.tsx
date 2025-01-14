import React, { useEffect, useRef, useState } from 'react';
import { Form } from "react-bootstrap";
import { map, isEmpty, size } from "lodash";
import classNames from "classnames";
import Icon from "./Icon";

interface TagsInputProps {
    label?: string;
    name: string;
    id: string;
    placeholder?: string;
    tags?: [string];
    selectedTags: (tags: any) => void;
}

const TagsInput = (props: TagsInputProps) => {
    const prevTagsRef = useRef();
    const [tags, setTags] = useState<any>(props.tags || []);
    const [value, setValue] = useState<any>("");
    const [error, setError] = useState<any>("");

    useEffect(() => {
        prevTagsRef.current = tags;
    });

    useEffect(() => {
        setTags(props.tags);
    }, [size(props.tags)]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (size(tags) === 0) {
            setError("");
        }
        props.selectedTags(tags);
    }, [size(tags)]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (event: any) => {
        const { value } = event.target;
        setValue(value);
    }

    const handlePaste = (event: any) => {
        console.log(event.clipboardData);
        const value = event.clipboardData.getData('Text');
        addTags(value);
        //event.clipboardData.setData('text/plain', '');
        //event.preventDefault();
    }

    const handleKeyDown = (event: any) => {
        const { value } = event.target;
        if ([13].includes(event.keyCode)) {
            addTags(value);
        }
    }

    const removeTags = (indexToRemove: number) => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    const addTags = (value: string) => {
        if (!isEmpty(value)) {
            if (map(tags, value => value.toLowerCase()).includes(value.toLowerCase())) {
               setError(`${props.name} already added`);
               setValue("");
            } else {
                setTags([...tags, value]);
                setValue("");
                setError("");
            }
        }
    };

    return (
        <>
            {props.label ?<Form.Label htmlFor="tags">{props.label}</Form.Label> : null}
            <Form.Control
                type="text"
                className={classNames("form-control", error && "border-danger")}
                id={props.id}
                name={props.name}
                value={value}
                placeholder={props.placeholder}
                autoComplete="off"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
            />
            {error &&
            <span className="text-danger font-10">
                {error}
            </span>
            }
            <ul id="tags">
                {map(tags, (tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span
                            className='tag-close-icon'
                            onClick={() => removeTags(index)}>
                            <Icon name="x" className='icon icon-xs' />
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
