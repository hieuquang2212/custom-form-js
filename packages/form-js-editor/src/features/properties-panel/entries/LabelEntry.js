import { INPUTS, LABELED_NON_INPUTS } from "../Util";
import {
  DATETIME_SUBTYPES,
  DATE_LABEL_PATH,
  TIME_LABEL_PATH,
} from "@bpmn-io/form-js-viewer";
import { useService, useVariables } from "../hooks";
import { TextFieldEntry, isFeelEntryEdited } from "@bpmn-io/properties-panel";
import { get, isString } from "min-dash";
import { useCallback } from "preact/hooks";

export function LabelEntry(props) {
  const { field, editField } = props;

  const entries = [];

  entries.push({
    id: "date-label",
    component: DateLabel,
    editField,
    field,
    isEdited: isFeelEntryEdited,
    isDefaultVisible: function (field) {
      return (
        field.type === "datetime" &&
        (field.subtype === DATETIME_SUBTYPES.DATE ||
          field.subtype === DATETIME_SUBTYPES.DATETIME)
      );
    },
  });

  entries.push({
    id: "time-label",
    component: TimeLabel,
    editField,
    field,
    isEdited: isFeelEntryEdited,
    isDefaultVisible: function (field) {
      return (
        field.type === "datetime" &&
        (field.subtype === DATETIME_SUBTYPES.TIME ||
          field.subtype === DATETIME_SUBTYPES.DATETIME)
      );
    },
  });

  const isSimplyLabled = (field) => {
    return [
      ...INPUTS.filter((input) => input !== "datetime"),
      ...LABELED_NON_INPUTS,
    ].includes(field.type);
  };

  entries.push({
    id: "label",
    component: Label,
    editField,
    field,
    isEdited: isFeelEntryEdited,
    isDefaultVisible: isSimplyLabled,
  });

  return entries;
}

function Label(props) {
  const { editField, field, id } = props;

  const debounce = useService("debounce");

  const variables = useVariables().map((name) => ({ name }));

  const path = ["label"];

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = (value) => {
    return editField(field, path, value || "");
  };

  const validate = useCallback(
    (value) => {
      if (value === field.key) {
        return null;
      }

      if (!isString(value) || value.length === 0) {
        return "Vui lòng nhập trường này";
      }

      return null;
    },
    [field]
  );

  return TextFieldEntry({
    debounce,
    element: field,
    getValue,
    id,
    label: (
      <span>
        Nhãn <span style={{ color: "red" }}>*</span>
      </span>
    ),
    singleLine: true,
    setValue,
    variables,
    validate,
  });
}

function DateLabel(props) {
  const { editField, field, id } = props;

  const debounce = useService("debounce");

  const variables = useVariables().map((name) => ({ name }));

  const path = DATE_LABEL_PATH;

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = (value) => {
    return editField(field, path, value || "");
  };

  const validate = useCallback(
    (value) => {
      if (value === field.key) {
        return null;
      }

      if (!isString(value) || value.length === 0) {
        return "Vui lòng nhập trường này";
      }

      return null;
    },
    [field]
  );

  return TextFieldEntry({
    debounce,
    element: field,
    getValue,
    id,
    label: (
      <span>
        Nhãn <span style={{ color: "red" }}>*</span>
      </span>
    ),
    singleLine: true,
    setValue,
    variables,
    validate,
  });
}

function TimeLabel(props) {
  const { editField, field, id } = props;

  const debounce = useService("debounce");

  const variables = useVariables().map((name) => ({ name }));

  const path = TIME_LABEL_PATH;

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = (value) => {
    return editField(field, path, value || "");
  };

  const validate = useCallback(
    (value) => {
      if (value === field.key) {
        return null;
      }

      if (!isString(value) || value.length === 0) {
        return "Vui lòng nhập trường này";
      }

      return null;
    },
    [field]
  );

  return TextFieldEntry({
    debounce,
    element: field,
    getValue,
    id,
    label: (
      <span>
        Nhãn <span style={{ color: "red" }}>*</span>
      </span>
    ),
    singleLine: true,
    setValue,
    variables,
    validate,
  });
}

// helpers //////////

/**
 * @param {string} type
 * @returns {string}
 */
// function getLabelText(type) {
//   switch (type) {
//     case "group":
//     case "dynamiclist":
//       return "Group label";
//     case "table":
//       return "Table label";
//     case "iframe":
//       return "Title";
//     default:
//       return "Nhãn";
//   }
// }
