import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Alert, Card, Col, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import { filter, forEach, isEmpty, isEqual, map, size, uniqBy, xorWith, get } from "lodash";
import Dropzone from "react-dropzone";
import TagsInput from "./TagsInput";
import Icon from "./Icon";
import classNames from "classnames";

interface VariationDetailsProps {
    errors?: any;
    label?: string;
    onSetVariationOptions: (any, boolean) => void;
}

const VariationDetails = (props: VariationDetailsProps) => {
    const { t } = useTranslation();
    const prevVariationsRef = useRef();
    const { label, onSetVariationOptions, errors } = props;
    const [hasMultiVariations, setHasMultiVariations] = useState<any>(false);
    const [variations, setVariations] = useState<any>([]);
    const [variationOptions, setVariationOptions] = useState<any>([{
        name: "",
        value: "",
        image: "",
        model_number: "",
        manufacturer_part_number: "",
        weight: { value: "", unit: "lb" },
        show: true,
    }]);
    const [variationOptError, setVariationOptError] = useState<any>("");

    const handleOnSelect = (e: any) => {
        setHasMultiVariations(e.target.checked);
        if (e.target.checked) {
            setVariations([{ name: "Size", option: "" }]);
        } else {
            setVariationOptions([{
                name: "",
                value: "",
                image: "",
                model_number: "",
                manufacturer_part_number: "",
                weight: { value: "", unit: "lb" },
                show: true,
            }]);
        }
    }

    const handleInputChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const newVariations = [...variations];
        newVariations[index] = { ...newVariations[index], [name]: value };
        setVariations(newVariations);
    }

    const handleOptionInputChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const newVariationsOptions = [...variationOptions];
        newVariationsOptions[index] = { ...newVariationsOptions[index], [name]: value };
        setVariationOptions(newVariationsOptions);
    }

    const handleWeightChange = (key: string, value: string, index: number) => {
        const newVariationsOptions = [...variationOptions];
        const finalValue = !isNaN(parseFloat(value)) ? parseFloat(value) : "invalid";
        newVariationsOptions[index] = {
            ...newVariationsOptions[index],
            weight: { ...newVariationsOptions[index].weight, [key]: finalValue }
        };
        setVariationOptions(newVariationsOptions);
    }

    const handleUploadImage = (file: any, index: number) => {
        const newVariationsOptions = [...variationOptions];
        newVariationsOptions[index] = {
            ...newVariationsOptions[index],
            image: Object.assign(file, { preview: URL.createObjectURL(file) })
        };
        setVariationOptions(newVariationsOptions);
    }

    useEffect(() => {
        prevVariationsRef.current = variations;
    });

    const prevVariations = prevVariationsRef.current;

    useEffect(() => {
        let allOptions: any[] = [];
        let newOptions: any[] = [];

        if (size(variations) > 0) {
            forEach(variations, (variation) => {
                forEach(variation.option, option => {
                    allOptions.push({ name: variation.name, value: option })
                })
            })

            if ((size(prevVariations) === 1 && size(variations) > 1) || (size(prevVariations) > 1 && size(variations) === 1)) {
                newOptions = []
                setVariationOptions([])
            }

            if (size(variations) > 1) {
                forEach(allOptions, (option, index) => {
                    forEach(allOptions, (opt) => {
                        if (!isEmpty(allOptions[index + 1]) && (option.name !== opt.name)) {
                            newOptions.push({
                                name: `${option.value} ${opt.value}`,
                                value: [option, opt]
                            })
                        }
                    })
                })
            } else if (size(variations) === 1) {
                forEach(allOptions, (option) => {
                    newOptions.push({
                        name: option.value,
                        value: [option]
                    })
                })
            }

            const uniqueOpts: Array<any> = [];
            const newOpts: Array<any> = [];

            forEach(uniqBy(newOptions, "value"), varOption => {
                newOpts.push({
                    name: varOption.name,
                    value: varOption.value,
                    image: "",
                    model_number: "",
                    manufacturer_part_number: "",
                    weight: { value: "", unit: "lb" },
                    show: true,
                });
            });

            newOpts.map(x => uniqueOpts.filter(a => isEmpty(xorWith(a.value, x.value, isEqual))).length > 0 ? null : uniqueOpts.push(x));

            setVariationOptions(uniqueOpts);
        }
    }, [variations]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        !variationOptError && onSetVariationOptions(filter(variationOptions, option => !!option.show), hasMultiVariations)
    }, [variationOptions]) // eslint-disable-line react-hooks/exhaustive-deps

    const removeVariation = (index: number) => {
        const newVariations = [...variations];
        newVariations.splice(index, 1);
        setVariations(newVariations);
    }

    const removeVariationOptions = (index: number, show, undo: boolean = false) => {
        if (size(filter(variationOptions, option => !!option.show)) === 1) {
            setVariationOptError("At least one variation option required.")
        }
        const newVariationsOptions = [...variationOptions];
        if (!!show) {
            newVariationsOptions[index] = { ...newVariationsOptions[index], show: false };
            setVariationOptions(newVariationsOptions);
        } else if (!show && undo) {
            if (variationOptError && size(filter(variationOptions, option => !!option.show)) === 0) {
                setVariationOptError("");
            }
            newVariationsOptions[index] = { ...newVariationsOptions[index], show: true };
            setVariationOptions(newVariationsOptions);
        } else {
            newVariationsOptions.splice(index, 1);
            setVariationOptions(newVariationsOptions);
        }
    }

    return (
        <>
            <div className="my-3">
                <h4>{label}</h4>
                <Form.Check
                    type="checkbox"
                    id={"hasMultiVariations"}
                    className={"pl-0 ml-4"}
                    label={"This component has multiple options, like different sizes or colors"}
                    value={hasMultiVariations}
                    onChange={handleOnSelect}
                />
            </div>

            {hasMultiVariations &&
            <Card className="mb-4">
              <h6
                className="link  text-blue text-right m-3"
                onClick={() => setVariations([...variations, { name: "", option: "" }])}
              >
                + {t('Add one more')}
              </h6>
              <Card.Body>
                  {map(variations, (variation, index) => (
                      <Row key={index}>
                          <Col lg={4}>
                              <Form.Group className="mb-4">
                                  <Form.Label htmlFor="usr">{`${t("Name ")}${index + 1}`}</Form.Label>
                                  <Form.Control
                                      type="text"
                                      className={classNames("form-control", get(errors, `variationOptions[${index}].name`) && "border-danger")}
                                      id={`name${index}`}
                                      name={"name"}
                                      value={variation.name}
                                      placeholder={`${t("Name ")}${index + 1}`}
                                      autoComplete="off"
                                      onChange={(e: any) => handleInputChange(e, index)}
                                  />
                                  {get(errors, `variations[${index}].name`) &&
                                  <span className="text-danger font-10">
                                        {get(errors, `variations[${index}].name`)}
                                    </span>
                                  }
                              </Form.Group>
                          </Col>
                          <Col lg={4}>
                              <Form.Group className="mb-4">
                                  <TagsInput
                                      label={t('Option Value')}
                                      placeholder={t('Option Value')}
                                      id="option"
                                      name="option"
                                      tags={variations[index].option}
                                      selectedTags={(tags: [string]) => handleInputChange({
                                          target: {
                                              name: "option",
                                              value: tags
                                          }
                                      }, index)}
                                  />
                              </Form.Group>
                          </Col>
                          <div onClick={() => removeVariation(index)}
                               style={{ position: "sticky", marginTop: "2.5em" }}>
                              <Icon name="delete" className="mx-1 svg-outline-danger cursor-pointer" />
                          </div>
                      </Row>
                  ))}
              </Card.Body>
            </Card>
            }
            {variationOptError && <Alert variant="danger" className="my-2">{variationOptError}</Alert>}
            {get(errors, "options") && variationOptions.length === 0 &&
            <Alert variant="danger" className="my-2">{get(errors, "options")}</Alert>}
            {map(variationOptions, (option, index) => (
                <Row key={index} className="mt-2 mx-0">
                    {!!option.show ?
                        <>
                            {hasMultiVariations &&
                            <div className="react-dropzone"
                                 style={{ maxHeight: "3.5em", marginTop: "1.8em" }}>
                                {option.image ?
                                    <div className={"variation-image"}>
                                        <img src={option.image.preview} alt={option.image.name}/>
                                    </div> :
                                    <Dropzone accept={"image/*"}
                                              onDropAccepted={(files) => handleUploadImage(files[0], index)} multiple
                                              maxFiles={1}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div className="small-dropzone" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Icon name={"upload"} className="icon-sm"/>
                                                <span className="font-10">Upload</span>
                                            </div>
                                        )}
                                    </Dropzone>
                                }
                            </div>
                            }
                            <Col lg={4}>
                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="model_number">{`${t("Model Number ")}${option.name}`}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={classNames("form-control", get(errors, `variationOptions[${index}].model_number`) && "border-danger")}
                                        id={`model_number${index}`}
                                        name={"model_number"}
                                        value={option.modelNo}
                                        placeholder={`${t("Model Number ")}${option.name}`}
                                        autoComplete="off"
                                        onChange={(e: any) => handleOptionInputChange(e, index)}
                                    />
                                    {get(errors, `variationOptions[${index}].model_number`) &&
                                    <span className="text-danger font-10">
                                        {get(errors, `variationOptions[${index}].model_number`)}
                                    </span>
                                    }
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group className="mb-4">
                                    <Form.Label
                                        htmlFor="manufacturer_part_number">{`${t("Manufacturer Number ")}${option.name}`}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={classNames("form-control", get(errors, `variationOptions[${index}].manufacturer_part_number`) && "border-danger")}
                                        id={`manufacturer_part_number${index}`}
                                        name={"manufacturer_part_number"}
                                        value={option.modelNo}
                                        placeholder={`${t("Manufacturer Number ")}${option.name}`}
                                        autoComplete="off"
                                        onChange={(e: any) => handleOptionInputChange(e, index)}
                                    />
                                    {get(errors, `variationOptions[${index}].manufacturer_part_number`) &&
                                    <span className="text-danger font-10">
                                        {get(errors, `variationOptions[${index}].manufacturer_part_number`)}
                                    </span>
                                    }
                                </Form.Group>
                            </Col>
                            <Col lg={3}>
                                <Form.Label htmlFor="usr">{`${t("Weight ")}${option.name}`}</Form.Label>
                                <Form.Group className="mb-4">
                                    <InputGroup>
                                        <Form.Control
                                            className={classNames("form-control", get(errors, `variationOptions[${index}].weight`) && "border-danger")}
                                            aria-label={`${t("Weight ")}${option.name}`}
                                            aria-describedby="basic-addon2"
                                            placeholder={`${t("Weight ")}${option.name}`}
                                            onChange={(e: any) => handleWeightChange("value", e.target.value, index)}
                                        />
                                        <DropdownButton
                                            as={InputGroup.Append}
                                            variant="outline-secondary"
                                            title={option.weight.unit}
                                            id="input-group-dropdown-2"
                                        >
                                            <Dropdown.Item
                                                onClick={() => handleWeightChange("unit", "lb", index)}>{t("lb")}</Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => handleWeightChange("unit", "kg", index)}>{t("kg")}</Dropdown.Item>
                                        </DropdownButton>
                                    </InputGroup>
                                    {get(errors, `variationOptions[${index}].weight`) &&
                                    <span className="text-danger font-10">
                                        {get(errors, `variationOptions[${index}].weight`)}
                                    </span>
                                    }
                                </Form.Group>
                            </Col>
                            {size(variationOptions) > 1 && !!hasMultiVariations &&
                            <div onClick={() => removeVariationOptions(index, option.show)}
                                 style={{ position: "sticky", marginTop: "3em" }}>
                              <Icon name="delete" className="mx-1 svg-outline-danger cursor-pointer"/>
                            </div>
                            }
                        </> :
                        <>
                            <div className="d-flex align-items-center justify-content-center cursor-pointer"
                                 onClick={() => removeVariationOptions(index, option.show)}>
                                <div className={"delete-box"}>
                                    <Icon name="delete-white"/>
                                </div>
                            </div>
                            <Col lg={3} className="d-flex align-items-center">
                                {t("This variant will not be created. You can undo this action")}
                            </Col>
                            <button className="btn btn-outline-primary cursor-pointer"
                                    onClick={() => removeVariationOptions(index, option.show, true)}>
                                {t("Undo")}
                            </button>
                        </>
                    }
                </Row>
            ))}
        </>
    );
}

export default VariationDetails;