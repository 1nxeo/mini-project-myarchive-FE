import React from "react";
import styled from "styled-components";

function QbookIcon({ children, ...rest }) {
  return (
    <Stdiv {...rest}>
      <div style={{ margin: "0px", display: "flex", justifyContent: "center" }}>
        <Stimg
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUAAACAAIAAAACAgICAgAD//wDAwMD///9lJw0+AAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsAAAAHdElNRQfiBhgXChR06RP7AAAAvUlEQVQoz3XRUQ6DIAyAYeYNKOwd8QTLEn1eMg+wxF7AB7zBvP7aUlBM5hufP5QEY/58N7iAs7ENHrYVZ20jHDQiwUk4mPF1CAV3RKwNB7i88UMAGnj6LRDKCE9GAKGOmOWMIZQ70JqmwBg08Ljw1CGFcknPaxgJIMoOXlPA8GSRkXZMKRpILHM+Ia1gYPtKIyeknrZsu0oOGLJoYKybsmhgul5Fg0M0qLKXoEoNihyByto8Jsk5ELm+dqfBDwcgN9nfkQsOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI0VDIzOjEwOjIwLTA0OjAw2N+qCAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNFQyMzoxMDoyMC0wNDowMKmCErQAAAAASUVORK5CYII="
          alt=""
        />
      </div>
      <div
        style={{
          margin: "0px",
          fontSize: "17px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </Stdiv>
  );
}

const Stimg = styled.img`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;

const Stdiv = styled.div`
  display: flex;
  background-color: transparent;
  border: 1px transparent;
  margin-left: 8px;
  align-items: center;
`;

export default QbookIcon;
