import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Card, Col, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import { forEach, isEmpty, map, size, uniqBy } from "lodash";
import Dropzone from "react-dropzone";
import TagsInput from "./TagsInput";
import Icon from "./Icon";

interface VariationDetailsProps {
    label?: string;
    onSetVariationOptions: (any) => void;
}

const VariationDetails = (props: VariationDetailsProps) => {
    const { t } = useTranslation();
    const prevVariationsRef = useRef();
    const { label, onSetVariationOptions } = props;
    const [hasVariation, setHasVariation] = useState<any>(false)
    const [variations, setVariations] = useState<any>([])
    const [variationOptions, setVariationOptions] = useState<any>([])

    const handleOnSelect = (e: any) => {
        setHasVariation(e.target.checked);
        isEmpty(variations) && setVariations([...variations, { name: "Size", option: "" }])
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
        newVariationsOptions[index] = { ...newVariationsOptions[index], weight: {...newVariationsOptions[index].weight, [key]: value }};
        setVariationOptions(newVariationsOptions);
    }

    const handleUploadImage = (file: any, index: number) => {
        const newVariationsOptions = [...variationOptions];
        newVariationsOptions[index] = { ...newVariationsOptions[index], image: Object.assign(file,{preview: URL.createObjectURL(file)})};
        setVariationOptions(newVariationsOptions);
    }

    useEffect(() => {
        prevVariationsRef.current = variations;
    });

    const prevVariations = prevVariationsRef.current;

    useEffect(() => {
        let allOptions:any[] = [];
        let newOptions:any[] = [];

        forEach(variations, (variation) => {
          forEach(variation.option, option => {
              allOptions.push({name: variation.name, value: option})

          })  
        })

        if ((size(prevVariations) === 1 && size(variations) > 1) || (size(prevVariations) > 1 && size(variations) === 1)) {
            newOptions = []
            setVariationOptions([])
        }

        if(size(variations) > 1) {
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

        //TODO- remove repeated

        // filter(newOptions, (opt, i) => {
        //     forEach(newOptions, option => isEmpty(xorWith(opt.value, newOptions[i + 1] && newOptions[i + 1].value, isEqual)))
        // })

        forEach(uniqBy(newOptions, "value"), varOption => {
            setVariationOptions((prevState) => uniqBy([...prevState, {
                name: varOption.name,
                value: varOption.value,
                image: "",
                model_number: "",
                manufacturer_part_number: "",
                weight: { value: "", unit: "lb" }
            }], "name"))
        })

    }, [variations, variations && size(variations.option)])

    useEffect(() => {
        onSetVariationOptions(variationOptions)
    }, [variationOptions])

    const removeVariation = (index: number) => {
        const newVariations = [...variations];
        newVariations.splice(index, 1);
        setVariations(newVariations);
    }

    const removeVariationOptions = (index: number) => {
        const newVariationsOptions = [...variationOptions];
        newVariationsOptions.splice(index, 1);
        setVariationOptions(newVariationsOptions);
    }

    return (
        <>
            <div className="my-3">
                <h4>{label}</h4>
                <Form.Check
                    type="checkbox"
                    id={"hasVariation"}
                    className={"pl-0 ml-4"}
                    label={"This component has multiple options, like different sizes or colors"}
                    value={hasVariation}
                    onChange={handleOnSelect}
                />
            </div>

            {hasVariation &&
            <Card className="mb-4">
              <h6
                className="text-blue text-right m-3"
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
                                      className="form-control"
                                      id={`name${index}`}
                                      name={"name"}
                                      value={variation.name}
                                      placeholder={`${t("Name ")}${index + 1}`}
                                      autoComplete="off"
                                      onChange={(e: any) => handleInputChange(e, index)}
                                  />
                              </Form.Group>
                          </Col>
                          <Col lg={4}>
                              <Form.Group className="mb-4">
                                  <TagsInput
                                      label={t('Option Value')}
                                      placeholder={t('Option Value')}
                                      id="option"
                                      name="option"
                                      selectedTags={(tags: [string]) => handleInputChange({
                                          target: {
                                              name: "option",
                                              value: tags
                                          }
                                      }, index)}
                                  />
                              </Form.Group>
                          </Col>
                          <div onClick={() => removeVariation(index)} style={{position: "sticky", marginTop: "2.5em"}}>
                           <Icon name="delete" className="mx-1 svg-outline-danger"/>
                      </div>
                  </Row>
              ))}
          </Card.Body>
        </Card>
        }

        {map(variationOptions, (option, index) => (
            <Row key={index} className="mt-2 mx-0">
                <div className="react-dropzone d-flex align-items-center justify-content-center">
                    {option.image ?
                        <div className={"variation-image"}>
                            <img src={option.image.preview} alt={option.image.name}/>
                        </div> :
                        <Dropzone onDropAccepted={(files) => handleUploadImage(files[0], index)} multiple maxFiles={1}>
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
                <Col lg={4}>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="name">{`${t("Model Number ")}${option.name}`}</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id={`model_number${index}`}
                            name={"model_number"}
                            value={option.modelNo}
                            placeholder={`${t("Model Number ")}${option.name}`}
                            autoComplete="off"
                            onChange={(e: any) => handleOptionInputChange(e, index)}
                        />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="option">{`${t("Manufacturer Number ")}${option.name}`}</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id={`manufacturer_part_number${index}`}
                            name={"manufacturer_part_number"}
                            value={option.modelNo}
                            placeholder={`${t("Manufacturer Number ")}${option.name}`}
                            autoComplete="off"
                            onChange={(e: any) => handleOptionInputChange(e, index)}
                        />
                    </Form.Group>
                </Col>
                <Col lg={3}>
                    <Form.Label htmlFor="usr">{`${t("Weight ")}${option.name}`}</Form.Label>
                    <Form.Group className="mb-4">
                        <InputGroup>
                            <Form.Control
                                placeholder={`${t("Weight ")}${option.name}`}
                                onChange={(e: any) => handleWeightChange("value", e.target.value, index)}
                            />
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={option.weight.unit}
                                id="input-group-dropdown-2"
                            >
                                <Dropdown.Item onClick={() => handleWeightChange("unit", "lb", index)}>{t("lb")}</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleWeightChange("unit", "kg", index)}>{t("kg")}</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <div onClick={() => removeVariationOptions(index)} style={{position: "sticky", marginTop: "3em"}}>
                   <Icon name="delete" className="mx-1 svg-outline-danger"/>
                </div>
            </Row>
        ))}
    </>
);
}

export default VariationDetails;