import { isArray, isObject, isNil } from "min-dash";
import { formFieldClasses } from "../Util";

import { Description } from "../Description";
import { Errors } from "../Errors";
import { Label } from "../Label";
import { TemplatedInputAdorner } from "./parts/TemplatedInputAdorner";

import { useFlushDebounce } from "../../hooks/useFlushDebounce";

const type = "upload";

const uploadContainerStyle = {
  backgroundColor: "#f5f5f8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem 0",
  flexDirection: "column",
  border: "1px dotted #dbdce2",
  marginTop: "0.5rem",
  borderRadius: 8,
};

export function Upload(props) {
  const {
    disabled,
    errors = [],
    domId,
    onBlur,
    onFocus,
    field,
    readonly,
    value = "",
  } = props;

  const { description, label, appearance = {}, validate = {} } = field;

  const { prefixAdorner, suffixAdorner } = appearance;

  const { required } = validate;

  const [onInputChange, flushOnChange] = useFlushDebounce(({ target }) => {
    props.onChange({
      field,
      value: target.value,
    });
  });

  const onInputBlur = () => {
    flushOnChange && flushOnChange();
    onBlur && onBlur();
  };

  const onInputFocus = () => {
    onFocus && onFocus();
  };

  const descriptionId = `${domId}-description`;
  const errorMessageId = `${domId}-error-message`;

  return (
    <div class={formFieldClasses(type, { errors, disabled, readonly })}>
      <Label htmlFor={domId} label={label} required={required} />
      {/* <TemplatedInputAdorner
        disabled={disabled}
        readonly={readonly}
        pre={prefixAdorner}
        post={suffixAdorner}
      >
        <input
          class="fjs-input"
          disabled={disabled}
          readOnly={readonly}
          id={domId}
          onInput={onInputChange}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          type="text"
          value={value}
          aria-describedby={[descriptionId, errorMessageId].join(" ")}
          required={required}
          aria-invalid={errors.length > 0}
        />
      </TemplatedInputAdorner> */}
      <div class="upload-container" style={uploadContainerStyle}>
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.98 16.0495V15.6708C33.8993 12.4645 32.5534 9.42034 30.2362 7.20288C27.9189 4.98543 24.8185 3.77475 21.6118 3.83516C19.2236 3.81568 16.8806 4.48674 14.8649 5.7676C12.8491 7.04845 11.2464 8.88453 10.2496 11.0549C7.44318 11.3679 4.84925 12.7002 2.95994 14.799C1.07063 16.8977 0.0173835 19.6169 0 22.4407C0.00310335 23.9369 0.301074 25.4179 0.876878 26.7989C1.45268 28.1798 2.29503 29.4338 3.35575 30.489C4.41648 31.5442 5.67479 32.3801 7.05874 32.9487C8.44269 33.5173 9.92515 33.8076 11.4214 33.8029H15.8597V31.4358H11.4214C9.1337 31.312 6.97803 30.3255 5.38886 28.6753C3.79968 27.0251 2.89517 24.8338 2.85764 22.5431C2.82012 20.2524 3.65236 18.0326 5.18663 16.3312C6.72089 14.6299 8.84309 13.5733 11.1255 13.3747H11.9185L12.1907 12.629C12.9247 10.7225 14.2264 9.0872 15.9197 7.9442C17.613 6.8012 19.6164 6.20557 21.6592 6.23779C24.2382 6.1772 26.7366 7.13844 28.61 8.91203C30.4833 10.6856 31.5797 13.1278 31.6602 15.7063C31.6765 16.0217 31.6765 16.3377 31.6602 16.6531L31.5656 17.5053L32.3349 17.8604C33.8228 18.5307 35.0345 19.6931 35.766 21.1519C36.4975 22.6107 36.7042 24.277 36.3513 25.8704C35.9985 27.4637 35.1076 28.8869 33.8286 29.9006C32.5496 30.9142 30.9605 31.4563 29.3286 31.4358H22.9611V33.8029H29.3286C31.4335 33.818 33.4835 33.1313 35.1545 31.8512C36.8256 30.5711 38.0224 28.7707 38.5559 26.7344C39.0894 24.6982 38.9291 22.5422 38.1005 20.6072C37.2718 18.6722 35.8219 17.0685 33.98 16.0495Z"
            fill="black"
          />
          <path
            d="M24.476 26.5237C24.7121 26.5275 24.944 26.4605 25.1417 26.3315C25.3394 26.2025 25.4941 26.0172 25.5857 25.7996C25.6773 25.582 25.7018 25.3419 25.6559 25.1103C25.61 24.8787 25.4959 24.6661 25.3282 24.4998L19.4104 18.582L13.4926 24.4998C13.2987 24.7262 13.1974 25.0175 13.2089 25.3154C13.2204 25.6132 13.3439 25.8958 13.5547 26.1066C13.7655 26.3174 14.048 26.4409 14.3459 26.4524C14.6438 26.4639 14.935 26.3625 15.1614 26.1687L18.2268 23.1506V37.6492C18.2268 37.9631 18.3515 38.2641 18.5735 38.4861C18.7955 38.7081 19.0965 38.8327 19.4104 38.8327C19.7243 38.8327 20.0253 38.7081 20.2473 38.4861C20.4693 38.2641 20.594 37.9631 20.594 37.6492V23.1506L23.6357 26.1923C23.861 26.4095 24.1631 26.5287 24.476 26.5237Z"
            fill="black"
          />
        </svg>
        <p style={{ fontSize: 12, color: "#363a4a" }}>
          Click or drag file to this area to upload
        </p>
        <p style={{ fontSize: 12, color: "#8e96a3" }}>
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </div>
      <Description id={descriptionId} description={description} />
      <Errors id={errorMessageId} errors={errors} />
    </div>
  );
}

Upload.config = {
  type,
  keyed: true,
  label: "Upload",
  group: "basic-input",
  emptyValue: "",
  sanitizeValue: ({ value }) => {
    if (isArray(value) || isObject(value) || isNil(value)) {
      return "";
    }

    // sanitize newlines to spaces
    if (typeof value === "string") {
      return value.replace(/[\r\n\t]/g, " ");
    }

    return String(value);
  },
  create: (options = {}) => ({ ...options }),
};
