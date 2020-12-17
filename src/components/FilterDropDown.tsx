import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { get, map } from "lodash";

interface FilterDropDownProps {
    filters: any;
    onChangeFilters: (any) => void;
}

const FilterDropDown = (props: FilterDropDownProps) => {
    const { t } = useTranslation();
    const { filters, onChangeFilters } = props;
    const dropdown: any = useRef();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState<any>(Object.keys(filters)[0]);
    const [selected, setSelected] = useState<any>({});

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    useEffect(() => {
        onChangeFilters(selected);
    }, [selected]);

    const handleClick = e => {
        if (!dropdown.current.contains(e.target)) {
            setIsOpen(false)
            return;
        }
    };

    const onSelectOption = (e: any, value: any) => {
        const option = get(selected, `${selectedFilter}`);
        if (!option) {
            setSelected({
                ...selected,
                [selectedFilter]: [
                    value
                ]
            });
        } else if (option && !(option.includes(value))) {
            setSelected({
                ...selected,
                [selectedFilter]: [
                    ...selected[selectedFilter],
                    value
                ]
            });
        } else {
            const index = get(selected, `${selectedFilter}`).indexOf(value);
            get(selected, `${selectedFilter}`).splice(index, 1);
            setSelected({
                ...selected,
                [selectedFilter]: get(selected, `${selectedFilter}`),
            });
        }
    }

    return (
        <Dropdown ref={dropdown} className={"filter-dropdown"} flip={true} show={isOpen}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" onClick={() => setIsOpen(!isOpen)}>
                {t('More filters')}
            </Dropdown.Toggle>

            <Dropdown.Menu align={"right"}>
                <div className={"filter-name"}>
                    {map(Object.keys(filters), (key, i) =>
                        <Dropdown.Item key={i} active={key === selectedFilter} onClick={() => setSelectedFilter(key)}>
                            {key}
                        </Dropdown.Item>
                    )}
                </div>
                <div className={"filter-options"}>
                    {map(filters[selectedFilter], (value, key) => (
                        <div className={"dropdown-item"} key={key}>
                            <Form.Check type='radio' id={`${value}${key}`}
                                        label={value}
                                        checked={get(selected, `${selectedFilter}`) && get(selected, `${selectedFilter}`).includes(value)}
                                        onChange={(e: any) => null}
                                        onClick={(e: any) => onSelectOption(e, value)}/>
                        </div>
                    ))}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default FilterDropDown;