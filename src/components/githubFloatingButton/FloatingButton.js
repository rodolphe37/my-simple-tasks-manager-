/* eslint-disable jsx-a11y/anchor-is-valid */

import "./floatingButton.css";

const FloatingButton = () => {
  return (
    <div className="infoButtonContainer">
      {/* <div className="presentation">
        {`to contact me or for more information ->`}
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
  </div>*/}

      <nav className="float-action-button">
        <a
          href="https://github.com/rodolphe37/my-simple-tasks-manager-"
          target="new"
          className="buttons"
          title="Github"
          data-toggle="tooltip"
          data-placement="left"
        >
          <svg
            height="36"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="36"
            data-view-component="true"
            className="octicon octicon-mark-github v-align-middle"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/rodolphe-augusto-auteur-d%C3%A9veloppeur-fullstack-react-node-1a20b759/"
          target="new"
          className="buttons"
          title="Linkedin"
          data-toggle="tooltip"
          data-placement="left"
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 291.319 291.319"
            style={{ enableBackground: "new 0 0 291.319 291.319" }}
          >
            <g>
              <path
                style={{ fill: "#0E76A8" }}
                d="M145.659,0c80.45,0,145.66,65.219,145.66,145.66s-65.21,145.659-145.66,145.659S0,226.1,0,145.66
		S65.21,0,145.659,0z"
              />
              <path
                style={{ fill: "#FFFFFF" }}
                d="M82.079,200.136h27.275v-90.91H82.079V200.136z M188.338,106.077
		c-13.237,0-25.081,4.834-33.483,15.504v-12.654H127.48v91.21h27.375v-49.324c0-10.424,9.55-20.593,21.512-20.593
		s14.912,10.169,14.912,20.338v49.57h27.275v-51.6C218.553,112.686,201.584,106.077,188.338,106.077z M95.589,100.141
		c7.538,0,13.656-6.118,13.656-13.656S103.127,72.83,95.589,72.83s-13.656,6.118-13.656,13.656S88.051,100.141,95.589,100.141z"
              />
            </g>
          </svg>
        </a>
        <a
          href="https://www.facebook.com/rodolphe.augusto.7"
          target="new"
          className="buttons"
          title="Facebook"
          data-toggle="tooltip"
          data-placement="left"
        >
          <svg
            height="36"
            viewBox="0 0 512 512"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0"
              fill="#4a7aff"
            />
            <path
              d="m267.234375 511.738281c136.171875-5.878906 244.765625-118.121093 244.765625-255.738281 0-.996094-.027344-1.988281-.039062-2.984375l-177.699219-177.703125-190 198.59375 105.566406 105.566406-48.675781 66.183594zm0 0"
              fill="#0053bf"
            />
            <path
              d="m334.261719 75.3125v57.96875s-66.554688-9.660156-66.554688 33.277344v42.9375h60.113281l-7.511718 65.480468h-52.601563v170.679688h-66.554687v-170.679688l-56.894532-1.074218v-64.40625h55.820313v-49.378906s-3.683594-73.457032 68.703125-86.949219c30.058594-5.605469 65.480469 2.144531 65.480469 2.144531zm0 0"
              fill="#fff"
            />
            <path
              d="m334.261719 133.28125v-57.96875s-35.421875-7.75-65.480469-2.144531c-4.695312.875-9.0625 2.007812-13.136719 3.347656v369.140625h12.0625v-170.679688h52.597657l7.515624-65.480468h-60.113281s0 0 0-42.9375 66.554688-33.277344 66.554688-33.277344zm0 0"
              fill="#dce1eb"
            />
          </svg>
        </a>
        <a
          href="#"
          className="buttons main-button"
          title="Infos & Contact"
          data-toggle="tooltip"
          data-placement="left"
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
          >
            <path
              style={{ fill: "#00C1FD" }}
              d="M256,512c-68.38,0-132.667-26.629-181.02-74.98C26.629,388.667,0,324.38,0,256
	S26.629,123.333,74.98,74.98C123.333,26.629,187.62,0,256,0s132.667,26.629,181.02,74.98C485.371,123.333,512,187.62,512,256
	s-26.629,132.667-74.98,181.02C388.667,485.371,324.38,512,256,512z"
            />
            <path
              style={{ fill: "#08A8EE" }}
              d="M437.02,74.98C388.667,26.629,324.38,0,256,0v512c68.38,0,132.667-26.629,181.02-74.98
	C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.98z"
            />
            <g>
              <polygon
                style={{ fill: "#E4F7FF" }}
                points="301,371 301,221 191,221 191,251 211,251 211,371 190,371 190,401 320,401 320,371 	"
              />
              <path
                style={{ fill: "#E4F7FF" }}
                d="M256,191c24.813,0,45-20.187,45-45s-20.187-45-45-45s-45,20.187-45,45S231.187,191,256,191z"
              />
            </g>
            <g>
              <path
                style={{ fill: "#CBEDFD" }}
                d="M256,191c24.813,0,45-20.187,45-45s-20.187-45-45-45V191z"
              />
              <polygon
                style={{ fill: "#CBEDFD" }}
                points="301,371 301,221 256,221 256,401 320,401 320,371 	"
              />
            </g>
          </svg>
        </a>
      </nav>
    </div>
  );
};

export default FloatingButton;
