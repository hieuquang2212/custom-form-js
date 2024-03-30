import {
  ActionEntry,
  AltTextEntry,
  DescriptionEntry,
  DefaultValueEntry,
  DisabledEntry,
  IdEntry,
  IFrameUrlEntry,
  IFrameHeightEntry,
  ImageSourceEntry,
  KeyEntry,
  PathEntry,
  RepeatableEntry,
  LabelEntry,
  ReadonlyEntry,
  SelectEntries,
  TextEntry,
  HtmlEntry,
  HeightEntry,
  NumberEntries,
  ExpressionFieldEntries,
  DateTimeEntry,
  TableDataSourceEntry,
  PaginationEntry,
  RowCountEntry,
  RequiredEntry,
  MinLengthEntry,
} from "../entries";

import {
  CheckboxEntry,
  isCheckboxEntryEdited,
  isFeelEntryEdited,
  FeelNumberEntry,
  isTextFieldEntryEdited,
  TextFieldEntry,
  SelectEntry,
} from "@bpmn-io/properties-panel";
import { useService, useVariables } from "../hooks";
import { INPUTS } from "../Util";
import { get, set } from "min-dash";
import { MaxLengthEntry } from "../entries/MaxLengthEntry";

export function GeneralGroup(field, editField, getService) {
  const entries = [
    ...IdEntry({ field, editField }),
    ...LabelEntry({ field, editField }),
    ...DescriptionEntry({ field, editField }),
    ...KeyEntry({ field, editField, getService }),
    // ...PathEntry({ field, editField, getService }),
    // ...RepeatableEntry({ field, editField, getService }),
    ...DefaultValueEntry({ field, editField }),
    // ...ActionEntry({ field, editField }),
    // ...DateTimeEntry({ field, editField }),
    // ...TextEntry({ field, editField, getService }),
    // ...HtmlEntry({ field, editField, getService }),
    // ...IFrameUrlEntry({ field, editField }),
    // ...IFrameHeightEntry({ field, editField }),
    // ...HeightEntry({ field, editField }),
    // ...NumberEntries({ field, editField }),
    // ...ExpressionFieldEntries({ field, editField }),
    // ...ImageSourceEntry({ field, editField }),
    // ...AltTextEntry({ field, editField }),
    // ...SelectEntries({ field, editField }),
    //...DisabledEntry({ field, editField }),
    // ...ReadonlyEntry({ field, editField }),
    // ...TableDataSourceEntry({ field, editField }),
    // ...PaginationEntry({ field, editField }),
    // ...RowCountEntry({ field, editField })
    ...RequiredEntry({ field, editField, getService }),
    ...MinLengthEntry({ field, editField }),
    ...MaxLengthEntry({ field, editField }),
  ];

  if (entries.length === 0) {
    return null;
  }

  return {
    id: "general",
    label: "General",
    entries,
  };
}

function Required(props) {
  const { field, getValue, id, onChange } = props;

  return CheckboxEntry({
    element: field,
    getValue: getValue("required"),
    id,
    label: "Required",
    setValue: onChange("required"),
  });
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
    label: "Minimum length",
    min: 0,
    setValue: onChange("minLength"),
    variables,
  });
}

function MaxLength(props) {
  const { field, getValue, id, onChange } = props;

  const debounce = useService("debounce");

  const variables = useVariables().map((name) => ({ name }));

  return FeelNumberEntry({
    debounce,
    element: field,
    feel: "optional",
    getValue: getValue("maxLength"),
    id,
    label: "Maximum length",
    min: 0,
    setValue: onChange("maxLength"),
    variables,
  });
}
