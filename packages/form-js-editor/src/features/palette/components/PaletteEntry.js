import { useService } from "../../../render/hooks";

export function PaletteEntry(props) {
  const { type, label, icon, iconUrl, getPaletteIcon } = props;

  const modeling = useService("modeling");
  const formEditor = useService("formEditor");

  const Icon = getPaletteIcon({ icon, iconUrl, label, type });

  const onKeyDown = (event) => {
    if (event.code === "Enter") {
      const { fieldType: type } = event.target.dataset;

      const { schema } = formEditor._getState();

      // add new form field to last position
      modeling.addFormField({ type }, schema, schema.components.length);
    }
  };

  const getViewBox = (type) => {
    if (type === "people") return "3 -5 54 54";
    else if (type === "upload") return "-6 -3 54 54";
    else return "0 0 54 54";
  };

  return (
    <button
      type="button"
      class="fjs-palette-field fjs-drag-copy fjs-no-drop"
      data-field-type={type}
      title={`Create ${getIndefiniteArticle(type)} ${label} element`}
      onKeyDown={onKeyDown}
    >
      {Icon ? (
        <Icon
          class="fjs-palette-field-icon"
          width="36"
          height="36"
          viewBox={getViewBox(type)}
        />
      ) : null}
      <span class="fjs-palette-field-text">{label}</span>
    </button>
  );
}

// helpers ///////////

function getIndefiniteArticle(type) {
  if (["image"].includes(type)) {
    return "an";
  }

  return "a";
}
