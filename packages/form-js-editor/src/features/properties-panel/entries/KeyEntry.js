import { isString, get } from "min-dash";

import {
  hasIntegerPathSegment,
  isProhibitedPath,
  isValidDotPath,
} from "../Util";

import { useService } from "../hooks";

import {
  TextFieldEntry,
  isTextFieldEntryEdited,
} from "@bpmn-io/properties-panel";
import { useCallback } from "preact/hooks";

export function KeyEntry(props) {
  const { editField, field, getService } = props;

  const entries = [];

  entries.push({
    id: "key",
    component: Key,
    editField: editField,
    field: field,
    isEdited: isTextFieldEntryEdited,
    isDefaultVisible: (field) => {
      const formFields = getService("formFields");
      const { config } = formFields.get(field.type);
      return config.keyed;
    },
  });

  return entries;
}

function Key(props) {
  const { editField, field, id } = props;

  const pathRegistry = useService("pathRegistry");

  const debounce = useService("debounce");

  const path = ["key"];

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = (value, error) => {
    if (error) {
      return;
    }

    return editField(field, path, value);
  };

  const validate = useCallback(
    (value) => {
      if (value === field.key) {
        return null;
      }

      if (!isString(value) || value.length === 0) {
        return "Vui lòng nhập trường này";
      }

      if (!isValidDotPath(value)) {
        return "Must be a variable or a dot separated path.";
      }

      if (hasIntegerPathSegment(value)) {
        return "Must not contain numerical path segments.";
      }

      if (isProhibitedPath(value)) {
        return "Must not be a prohibited path.";
      }

      const replacements = {
        [field.id]: value.split("."),
      };

      const oldPath = pathRegistry.getValuePath(field);
      const newPath = pathRegistry.getValuePath(field, { replacements });

      // unclaim temporarily to avoid self-conflicts
      pathRegistry.unclaimPath(oldPath);
      const canClaim = pathRegistry.canClaimPath(newPath, {
        isClosed: true,
        claimerId: field.id,
      });
      pathRegistry.claimPath(oldPath, { isClosed: true, claimerId: field.id });

      return canClaim
        ? null
        : "Must not conflict with other key/path assignments.";
    },
    [field, pathRegistry]
  );

  return TextFieldEntry({
    debounce,
    element: field,
    getValue,
    id,
    label: (
      <span>
        ID <span style={{ color: "red" }}>*</span>
      </span>
    ),
    setValue,
    validate,
  });
}
