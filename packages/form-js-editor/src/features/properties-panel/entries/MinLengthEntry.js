import { get, set } from "min-dash";

import { INPUTS } from "../Util";

import { FeelNumberEntry, isFeelEntryEdited } from "@bpmn-io/properties-panel";
import { useService, useVariables } from "../hooks";

const VALIDATION_TYPE_OPTIONS = {
  custom: {
    value: "",
    label: "Custom",
  },
  email: {
    value: "email",
    label: "Email",
  },
  phone: {
    value: "phone",
    label: "Phone",
  },
};

export function MinLengthEntry(props) {
  const { editField, field } = props;
  const { type } = field;
  const validate = get(field, ["validate"], {});
  const isCustomValidation = [
    undefined,
    VALIDATION_TYPE_OPTIONS.custom.value,
  ].includes(validate.validationType);

  const onChange = (key) => {
    return (value) => {
      const validate = get(field, ["validate"], {});

      editField(field, ["validate"], set(validate, [key], value));
    };
  };

  const getValue = (key) => {
    return () => {
      return get(field, ["validate", key]);
    };
  };

  const entries = [];

  entries.push({
    id: "minLength",
    component: MinLength,
    getValue,
    field,
    isEdited: isFeelEntryEdited,
    onChange,
    isDefaultVisible: (field) =>
      INPUTS.includes(field.type) &&
      (type === "textarea" || (type === "textfield" && isCustomValidation)),
  });

  return entries;
}

function MinLength(props) {
  const { field, getValue, id, onChange } = props;

  const debounce = useService("debounce");

  const variables = useVariables().map((name) => ({ name }));

  return FeelNumberEntry({
    debounce,
    element: field,
    feel: "optional",
    getValue: getValue("minLength"),
    id,
    label: "Độ dài tối thiếu",
    min: 0,
    setValue: onChange("minLength"),
    variables,
  });
}
