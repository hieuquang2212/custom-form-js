import { get, set } from "min-dash";

import { INPUTS } from "../Util";

import {
  ToggleSwitchEntry,
  isToggleSwitchEntryEdited,
  isCheckboxEntryEdited,
  CheckboxEntry,
} from "@bpmn-io/properties-panel";

export function RequiredEntry(props) {
  const { editField, field } = props;

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
    id: "required",
    component: Required,
    getValue,
    field,
    isEdited: isToggleSwitchEntryEdited,
    onChange,
    isDefaultVisible: (field) => INPUTS.includes(field.type),
  });

  return entries;
}

function Required(props) {
  const { field, getValue, id, onChange } = props;

  return CheckboxEntry({
    element: field,
    getValue: getValue("required"),
    id,
    label: "Bắt buộc",
    setValue: onChange("required"),
  });
}
