import React, { useRef, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./TextEditor-style.css"

function TextEditor({ className, content, onChange }) {
  const [value, setValue] = useState(content)

  const toolbarOptions = [
    [{ header: 1 }, { header: 2 }], // custom button values
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    // ["link", "image", "formula"],
    ["link", "image", "formula"],

    [{ size: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["clean"], // remove formatting button
  ]

  const handleChange = (value) => {
    setValue(value)
    if (onChange) {
      onChange(value)
    }
  }


  // const handleChange = (value) => {
  //   setValue(value);
  
  //   // Получение чистого текста
  //   const tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = value;
  //   const plainText = tempDiv.innerText || tempDiv.textContent || "";
  
  //   if (onChange) {
  //     onChange(plainText); // Передаем чистый текст в onChange
  //   }
  // };
  






  const module = {
    toolbar: toolbarOptions,
  }

  return (
    <ReactQuill
      modules={module}
      theme='snow'
      value={value}
      onChange={handleChange}
    />
  )
}

export default TextEditor

// function TextEditor({className,content}) {
//   const [value, setValue] = useState("")
//   return <ReactQuill theme='snow' value={content} onChange={setValue} />
// }
// export default TextEditor
// import ReactQuill, { Quill } from "react-quill"
// import "react-quill/dist/quill.snow.css" // Если вы используете стили по умолчанию
// // Создаем кастомный blot
// const BlockEmbed = Quill.import("blots/block/embed")
// class CustomElementBlot extends BlockEmbed {
//   static blotName = "customElement"
//   static tagName = "div"
//   static className = "custom-element"
//   static create(value) {
//     let node = super.create()
//     node.setAttribute("data-value", value)
//     node.innerHTML = value
//     return node
//   }
//   static value(node) {
//     return node.getAttribute("data-value")
//   }
// }
// // Регистрируем кастомный blot в Quill
// Quill.register(CustomElementBlot)
// function TextEditor({content}) {
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//       ["clean"], // Очистка форматирования
//       [{ customElement: ["Insert Custom Element"] }], // Кастомный элемент в тулбаре
//     ],
//   }
//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "list",
//     "bullet",
//     "link",
//     "image",
//     "customElement",
//   ]
//   return (
//     <div>
//       <ReactQuill
//         theme='snow'
//         modules={modules}
//         formats={formats}
//         value={content}
//         placeholder='Type something here...'
//       />
//     </div>
//   )
// }

// export default TextEditor
