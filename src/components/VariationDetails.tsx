import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Card, Col, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import { isEmpty, map } from "lodash";
import TagsInput from "./TagsInput";
import Icon from "./Icon";
import { useDropzone } from "react-dropzone";

interface VariationDetailsProps {
    label?: string;
}

const VariationDetails = (props: VariationDetailsProps) => {
    const { t } = useTranslation();
    const { label } = props;
    const [hasVariation, setHasVariation] = useState<any>(false)
    const [variations, setVariations] = useState<any>([])
    const [variationOptions, setVariationOptions] = useState<any>([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
            // setFiles([...files, ...newFiles]);
        }
    });

    const handleOnSelect = (e: any) => {
        setHasVariation(e.target.checked);
        isEmpty(variations) && setVariations([...variations, { name: "Size", option: "" }])
    }

    const handleInputChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const newVariations = [...variations];
        newVariations[index] = { ...newVariations[index], [name]: value };
        setVariations(newVariations);
        if (name === "option") {
            addVariationOptions(newVariations, value)
        }
    }

    const addVariationOptions = (variations: any, value: any) => {
        const allOptions = map(variations, (variation) => variation.option)
        setVariationOptions([...variationOptions, {
            name: value,
            image: "",
            model_number: "",
            manufacturer_part_number: "",
            weight: { value: "", unit: "" }
        }])
    }

    const removeVariation = (index: number) => {
        const newVariations = [...variations];
        newVariations.splice(index, 1);
        setVariations(newVariations);
    }

    const removeVariationOptions = (index: number) => {
        const newVariationsOptions = [...variationOptions];
        newVariationsOptions.splice(index, 1);
        setVariations(newVariationsOptions);
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
            <Card>
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
                          <div className="mt-4" onClick={() => removeVariation(index)}>
                               <Icon name="delete" className="mt-4 mb-3 svg-outline-danger"/>
                          </div>
                      </Row>
                  ))}
              </Card.Body>
            </Card>
            }

            {map(variationOptions, (option, index) => (
                <Row key={index} className="mt-2">
                    <Col lg={1} className="d-flex align-items-center justify-content-center">
                        <div className="d-flex border flex-column" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon name={"upload"}/>
                            <span>Upload</span>
                        </div>
                    </Col>
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
                                onChange={(e: any) => handleInputChange(e, index)}
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
                                onChange={(e: any) => handleInputChange(e, index)}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={2}>
                        <Form.Label htmlFor="usr">{`${t("Weight ")}${option.name}`}</Form.Label>
                        <Form.Group className="mb-4">
                            <InputGroup>
                                <Form.Control
                                    placeholder={`${t("Weight ")}${option.name}`}
                                    onChange={(e: any) => null}
                                />

                                <DropdownButton
                                    as={InputGroup.Append}
                                    variant="outline-secondary"
                                    title="lb"
                                    id="input-group-dropdown-2"
                                >
                                    <Dropdown.Item>{t("lb")}</Dropdown.Item>
                                    <Dropdown.Item>{t("kg")}</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <div className="mt-4" onClick={() => removeVariationOptions(index)}>
                       <Icon name="delete" className="mx-1 mb-3 svg-outline-danger"/>
                    </div>
                </Row>
            ))}
        </>
    );
}

export default VariationDetails;